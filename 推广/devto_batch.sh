#!/bin/bash
# Dev.to batch posting - 1 article every 5 min
# Usage: bash devto_batch.sh

API_KEY="p9vTDjFwZ1J8FbPi8Do8pttP"
ARTICLES_DIR="devto_articles"
mkdir -p "$ARTICLES_DIR"

# Article 2: ChatGPT vs SEO Tools
cat > "$ARTICLES_DIR/02-chatgpt-vs-seo.json" << 'JSON'
{"article":{"title":"ChatGPT vs SEO Writing Tools - What Actually Ranks","published":true,"tags":["ai","seo","chatgpt"],"canonical_url":"https://seospark.net/blog/ai-seo-tools-comparison-2026","body_markdown":"I tested ChatGPT against SEO-specific AI writers on the same keyword.\n\nSame keyword: email marketing tips. Same length.\n\nChatGPT scored 38/100. No keyword in headings. No meta description. Generic AI fluff.\n\nSEO-focused writer scored 82/100. Keyword everywhere. Auto meta tags. Real stats. Human tone.\n\nThe difference: ChatGPT was built to write anything. SEO tools are built to get you found on Google.\n\nI built [SEO Spark](https://seospark.net) - AI blog posts that rank in 60 seconds. Free tier: 3 articles."}}
JSON

# Article 3: What is EEAT
cat > "$ARTICLES_DIR/03-eeat-explained.json" << 'JSON'
{"article":{"title":"What Is EEAT in SEO - A Simple Guide for Small Business Owners","published":true,"tags":["seo","smallbusiness","beginners"],"canonical_url":"https://seospark.net/blog/what-is-eeat-seo","body_markdown":"EEAT stands for Experience, Expertise, Authoritativeness, and Trustworthiness. It is how Google evaluates your content.\n\n**Experience** - Have you actually done this? Share real stories, real numbers, real results.\n\n**Expertise** - Do you know your field? Mention specific tools and frameworks.\n\n**Authoritativeness** - Do others recognize you? Get backlinks from reputable sites.\n\n**Trustworthiness** - Are you honest? Cite sources. Admit failures. Be transparent.\n\nEvery article you publish should demonstrate all four signals.\n\nI built [SEO Spark](https://seospark.net) to automatically structure articles around EEAT. Keyword strategy + scoring built in. 3 free articles."}}
JSON

# Article 4: Small Business SEO Content Guide
cat > "$ARTICLES_DIR/04-seo-content-small-business.json" << 'JSON'
{"article":{"title":"How to Write SEO Content for Your Small Business Without Hiring a Writer","published":true,"tags":["seo","smallbusiness","writing"],"canonical_url":"https://seospark.net/blog/how-to-write-seo-content-small-business","body_markdown":"Most small business owners know they need a blog. But who has 3 hours per article?\n\nHere is the system:\n\n1. Start with what your customers search - not what you want to say\n2. Structure around the keyword - title, H1, H2, first 100 words\n3. Demonstrate EEAT - real experience, specific examples\n4. Write like a human - varied sentences, real opinions\n5. Score yourself before publishing\n\nAI makes this fast. I built [SEO Spark](https://seospark.net) to do it in 60 seconds.\n\nFree tier: 3 articles, no credit card."}}
JSON

# Article 5: Best Free SEO Tools
cat > "$ARTICLES_DIR/05-free-seo-tools.json" << 'JSON'
{"article":{"title":"7 Free SEO Tools for Small Business That Actually Work in 2026","published":true,"tags":["seo","tools","smallbusiness","productivity"],"canonical_url":"https://seospark.net/blog/free-seo-tools-small-business","body_markdown":"You do not need a $100/month SEO software stack. Here are 7 free tools that work:\n\n1. **Google Search Console** - Free keyword data\n2. **Google Keyword Planner** - Free keyword research\n3. **AnswerThePublic** - Free search intent discovery\n4. **Yoast SEO** - Free WordPress optimization\n5. **PageSpeed Insights** - Free site speed testing\n6. **SEO Spark Free SEO Checker** - Free website SEO audit at seospark.net/free-seo-checker\n7. **SEO Spark AI Blog Writer** - Free blog writing with built-in SEO\n\nThe first 5 are Google tools. The last 2 are tools I built to fill the gap between research and publishing.\n\nTry the [free SEO checker](https://seospark.net/free-seo-checker) or [free AI blog writer](https://seospark.net) - 3 articles, no credit card."}}
JSON

echo "Prepared 4 articles in $ARTICLES_DIR"
echo "Posting one every 5 minutes..."
ls "$ARTICLES_DIR"/*.json
