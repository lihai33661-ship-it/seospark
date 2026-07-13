// Email sequences for cold outreach
// 5-email sequence targeting small business owners

export type EmailStep = {
  subject: string;
  body: string;
  delayDays: number; // days after previous email
};

export type Sequence = {
  name: string;
  description: string;
  steps: EmailStep[];
};

// Sequence 1: SEO outreach for local businesses (lawyers, plumbers, dentists)
export const localBusinessSEO: Sequence = {
  name: "local-business-seo",
  description: "Cold outreach to local businesses that need SEO content",
  steps: [
    {
      subject: "Quick question about your website traffic",
      delayDays: 0,
      body: `Hi {{name}},

I was looking at {{business_name}}'s website and noticed you have a blog section — but it doesn't seem to be getting much traffic from Google.

Most small business blogs have this problem. The content is there, but Google isn't sending visitors.

I built a tool that fixes this. It writes SEO-optimized blog posts automatically — one click, 60 seconds, done.

Would you be open to a quick 5-minute call to show you what it could do for {{business_name}}?

Best,
Hai Li
Founder, SEO Spark`,
    },
    {
      subject: "Your blog's Google traffic problem",
      delayDays: 3,
      body: `Hi {{name}},

Following up on my last email. I know you're busy running {{business_name}}.

The short version: most small business blogs write content that Google ignores. They write about themselves ("Our commitment to quality") instead of answering customer questions.

I built SEO Spark to solve this. It researches what your customers actually search for, then writes a properly structured blog post in 60 seconds.

Would you try it free? 3 articles, no credit card. You'll see the difference in how the content reads.

https://seospark.net

Best,
Hai Li`,
    },
    {
      subject: "{{business_name}}'s competitors are blogging",
      delayDays: 5,
      body: `Hi {{name}},

One more thing I noticed: at least 3 of your competitors in {{city}} are publishing blog posts weekly. They're building Google traffic while {{business_name}}'s blog stays quiet.

Every week you don't publish, they pull further ahead.

SEO Spark makes it easy to catch up. Pick a keyword, get a blog post back in 60 seconds. Publish once a week, and in 3 months you'll see real traffic.

Here's a real example: a roofing company in Texas published weekly for 8 months using our approach. They went from 0 to 2,000+ monthly visitors.

Try it free: https://seospark.net

Best,
Hai Li`,
    },
    {
      subject: "Quick question",
      delayDays: 7,
      body: `Hi {{name}},

Just checking in — did you get a chance to try SEO Spark?

If you're worried about AI content quality, I understand. Most AI writing sounds robotic. SEO Spark is different — it's built specifically for small business SEO, not generic content generation.

3 free articles. No credit card. See for yourself.

https://seospark.net

Best,
Hai Li`,
    },
    {
      subject: "Last call — still interested in more Google traffic?",
      delayDays: 7,
      body: `Hi {{name}},

I haven't heard back from you, so I'll keep this brief.

SEO Spark helps small businesses like {{business_name}} get found on Google without spending $500/post on freelance writers or hours writing content yourself.

If Google traffic isn't a priority for {{business_name}} right now, I understand. If it is, the free tier is still available:

https://seospark.net

I won't follow up again after this. Wishing you the best.

Hai Li
Founder, SEO Spark`,
    },
  ],
};

// Sequence 2: Product Hunt / Indie Hacker outreach
export const indieHackerOutreach: Sequence = {
  name: "indie-hacker-partnership",
  description: "Outreach to fellow indie hackers for cross-promotion",
  steps: [
    {
      subject: "Love what you're building — partnership idea",
      delayDays: 0,
      body: `Hi {{name}},

I saw {{product}} on Product Hunt / Indie Hackers and love what you're building.

I'm the founder of SEO Spark (https://seospark.net) — an AI blog writer that helps SaaS companies get Google traffic. We launched recently and are looking for cross-promotion partners.

Quick idea: I write an SEO-optimized blog post for {{product}}'s blog, you mention SEO Spark in your newsletter or social. Win-win — both of us get traffic.

Would you be open to this?

Best,
Hai Li`,
    },
    {
      subject: "Quick follow-up on cross-promotion",
      delayDays: 4,
      body: `Hi {{name}},

Following up on my cross-promotion idea.

The way I see it: {{product}} needs content to rank. SEO Spark needs exposure to grow. A simple blog swap helps both.

No pressure, but if you're interested, let me know and I'll send over a draft this week.

Best,
Hai Li`,
    },
    {
      subject: "Re: partnership — one more thought",
      delayDays: 7,
      body: `Hi {{name}},

Last note on this — even if cross-promotion isn't the right fit, I'd love to feature {{product}} in an upcoming SEO Spark blog post about tools for indie hackers. Free backlink, no strings attached.

Let me know if that works.

Best,
Hai Li`,
    },
  ],
};

export const sequences: Record<string, Sequence> = {
  "local-business-seo": localBusinessSEO,
  "indie-hacker-partnership": indieHackerOutreach,
};

export function fillTemplate(template: string, vars: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
  return result;
}
