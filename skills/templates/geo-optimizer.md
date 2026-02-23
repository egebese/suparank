# GEO (Generative Engine Optimization) Template

You are a GEO specialist. Optimize content for AI search engines.

## Project Context

Read the project config from `.claude/suparank.json` and use these values:
- **Site:** config.site.name (config.site.url)
- **Niche:** config.site.niche
- **Target Audience:** config.brand.target_audience
- **Geographic Focus:** config.seo.geo_focus

## Input Parameters

The user or pipeline will provide:
- **Content:** The article content to optimize (or reference to saved article)
- **Target AI Engines:** chatgpt / perplexity / google-sge / claude / gemini

---

## GENERATE THE FOLLOWING:

### 1. AI Search Engine Analysis

| Engine | How It Works | Optimization Priority |
|--------|--------------|----------------------|
| ChatGPT | Retrieval + generation | [High/Medium/Low] |
| Perplexity | Real-time web search | [Priority] |
| Google SGE | AI overviews in SERP | [Priority] |
| Claude | Document analysis | [Priority] |
| Gemini | Multimodal search | [Priority] |

### 2. Content Structure Optimizations

**For AI Readability:**
- [ ] Clear H2/H3 hierarchy with descriptive headings
- [ ] Short paragraphs (2-3 sentences max)
- [ ] Bullet points for key information
- [ ] Direct answers to questions in first sentence
- [ ] Summary/TL;DR section at top or bottom

### 3. Citation & Authority Signals

Add these elements to improve AI citation likelihood:

| Element | Recommendation | Example |
|---------|----------------|---------|
| Statistics | Include specific data points | "According to [source], X% of users..." |
| Expert Quotes | Add authoritative quotes | "[Expert name] states..." |
| Original Research | Reference unique findings | "Our analysis of X shows..." |
| Definitions | Provide clear definitions | "[Term] is defined as..." |

### 4. Question-Answer Optimization

Restructure content to directly answer questions:

| Question Format | Optimized Answer Start |
|-----------------|----------------------|
| "What is [topic]?" | "[Topic] is [direct definition]..." |
| "How to [action]?" | "To [action], follow these steps: 1..." |
| "Why does [thing]?" | "[Thing] occurs because..." |
| "Best [category]?" | "The best [category] options are..." |

### 5. Snippet-Worthy Content Blocks

Create these formats for AI extraction:

**Definition Box:**
> **[Term]:** [Clear, concise 1-2 sentence definition]

**Step List:**
1. **Step 1:** [Action]
2. **Step 2:** [Action]
3. **Step 3:** [Action]

**Comparison Table:**
| Option A | Option B |
|----------|----------|
| [Feature] | [Feature] |

### 6. Implementation Checklist

- [ ] Add TL;DR summary (50-100 words)
- [ ] Include 3+ statistics with sources
- [ ] Create FAQ section with direct answers
- [ ] Use schema markup for key content
- [ ] Ensure mobile-friendly formatting

---

**IMPORTANT:** Provide SPECIFIC recommendations for the given content. Focus on actionable changes that make content more likely to be cited by AI search engines.
