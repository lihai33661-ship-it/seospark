"""
SEO Spark Cold Email Sender
Uses Resend API to send from hello@seospark.net
Reads emails from 邮箱汇总.csv, matches to templates by category
Rate: 1 email/3 seconds to avoid spam detection
"""

import csv
import time
import requests
import os

# ===== CONFIG =====
RESEND_API_KEY = os.getenv("RESEND_API_KEY", "YOUR_KEY_HERE")
FROM_EMAIL = "hello@seospark.net"
FROM_NAME = "SEO Spark"

# ===== TEMPLATES =====
TEMPLATES = {
    "牙医": {
        "subject": "Your patients are searching online. Is your practice showing up?",
        "body": lambda name: f"""Hi {name},

I was searching for dentists and noticed your practice — great reviews online.

But when potential patients search "best dentist near me" on Google, do they find you — or your competitors?

Practices with a blog answering patient questions get 3x more website visitors. Topics like "how much do dental implants cost" or "best teeth whitening options" bring new patients every month.

We built a free tool that writes SEO-optimized blog posts in 60 seconds. No writing. No SEO knowledge needed.

3 free articles, no credit card: https://seospark.net

Best,
{NAME_SIGNATURE}"""
    },
    "律所": {
        "subject": "Quick question about your firm's online presence",
        "body": lambda name: f"""Hi {name},

I found your firm online — solid reputation, good reviews.

But many of your competitors now have blogs answering legal questions like "what to do after a car accident" or "how long does a personal injury case take." Those articles bring them new clients through Google — for free.

Your firm could do the same in literally 60 seconds per article. We built an AI blog writer that generates publish-ready, SEO-optimized content from a single keyword. Built-in keyword strategy, EEAT signals, real-time scoring.

Free tier: 3 articles. https://seospark.net

Best,
{NAME_SIGNATURE}"""
    },
    "水管工": {
        "subject": "Your website could bring you more service calls",
        "body": lambda name: f"""Hi {name},

I found your business on Google. Good reviews.

But here's the gap: when someone searches "emergency plumber near me" or "how to fix a leaky pipe," do they find you, or your competitors?

Most service companies skip blogging because they think it's time-consuming. With AI, it takes 60 seconds. We built a tool that writes SEO blog posts designed specifically for local service businesses.

3 free articles to try: https://seospark.net

Best,
{NAME_SIGNATURE}"""
    },
    "房产经纪": {
        "subject": "Quick content idea for more buyer leads",
        "body": lambda name: f"""Hi {name},

Most real estate agents fight for Zillow leads. The agents who blog — "best neighborhoods in [city]" or "first-time homebuyer guide" — get free organic traffic from Google. Year after year, month after month.

We built SEO Spark: an AI blog writer that creates publish-ready articles in 60 seconds. Built-in SEO scoring.

Free tier: 3 articles. https://seospark.net

Best,
{NAME_SIGNATURE}"""
    },
    "会计": {
        "subject": "Your clients are Googling tax questions. Answer them.",
        "body": lambda name: f"""Hi {name},

People Google tax questions daily: "business deductions 2026," "1099 vs W-2," "estimated tax payments." Every article you write on these topics is a potential new client finding your firm.

Most accountants don't blog because they're too busy. With AI, it takes 60 seconds. We built SEO Spark specifically for professional service firms that need content without the time commitment.

Free tier: 3 articles. https://seospark.net

Best,
{NAME_SIGNATURE}"""
    },
    "default": {
        "subject": "Quick question about your online presence",
        "body": lambda name: f"""Hi {name},

I noticed your business online and wanted to share something that might help.

Most small businesses skip blogging — not because it doesn't work, but because they think it takes too long. We built SEO Spark: it writes publish-ready, SEO-optimized articles in 60 seconds, with built-in keyword strategy and real-time scoring.

3 free articles, no credit card: https://seospark.net

Best,
{NAME_SIGNATURE}"""
    },
}

NAME_SIGNATURE = "SEO Spark Team"

# ===== MAIN =====
def send_one(email, name, category):
    """Send one email via Resend API"""
    tmpl = TEMPLATES.get(category, TEMPLATES["default"])

    payload = {
        "from": f"{FROM_NAME} <{FROM_EMAIL}>",
        "to": [email],
        "subject": tmpl["subject"],
        "html": f"<p>{tmpl['body'](name).replace(chr(10), '<br>')}</p>",
    }

    for attempt in range(3):
        try:
            resp = requests.post(
                "https://api.resend.com/emails",
                headers={
                    "Authorization": f"Bearer {RESEND_API_KEY}",
                    "Content-Type": "application/json",
                },
                json=payload,
                timeout=30,
            )
            if resp.status_code == 200:
                print(f"  OK [{attempt+1}] {email}")
                return True
            else:
                print(f"  FAIL: {email} - {resp.text[:100]}")
                return False
        except Exception as e:
            if attempt < 2:
                print(f"  Retry {attempt+1} for {email}...")
                time.sleep(5)
            else:
                print(f"  SKIP: {email} - {e}")
                return False
    return False


def main():
    if RESEND_API_KEY == "YOUR_KEY_HERE":
        print("ERROR: Set RESEND_API_KEY environment variable first!")
        return

    # Read email list
    emails = []
    with open("邮箱汇总.csv", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            cat = row.get("分类", "其他")
            email_addr = row.get("邮箱", "")
            if email_addr and "@" in email_addr:
                emails.append((email_addr, cat))

    print(f"Loaded {len(emails)} emails. Starting in 5 seconds...")
    time.sleep(5)

    # Skip already-sent emails (set SKIP=22 before running)
    skip = int(os.getenv("SKIP", "0"))

    sent = 0
    failed = 0
    for i, (email, cat) in enumerate(emails, 1):
        if i <= skip:
            continue
        # Extract "name" from email or use "there"
        name = email.split("@")[0].replace(".", " ").title()

        print(f"[{i}/{len(emails)}] {email} ({cat})")

        if send_one(email, name, cat):
            sent += 1
        else:
            failed += 1

        # Rate limit: 3 seconds between emails
        if i < len(emails):
            time.sleep(3)

    print(f"\n{'='*50}")
    print(f"Done! Sent: {sent}, Failed: {failed}, Total: {len(emails)}")


if __name__ == "__main__":
    main()
