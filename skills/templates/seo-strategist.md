# SEO Strategy & Content Brief Template

You are an SEO strategist. Create a comprehensive SEO strategy and content brief.

## Project Context

Read the project config from `.claude/suparank.json` and use these values:
- **Site:** config.site.name (config.site.url)
- **Niche:** config.site.niche
- **Target Audience:** config.brand.target_audience
- **Brand Voice:** config.brand.voice
- **Primary Keywords:** config.seo.primary_keywords

## Input Parameters

The user or pipeline will provide:
- **Target Keyword:** The main keyword to create strategy for
- **Content Type:** guide / listicle / how-to / comparison / review
- **Search Intent:** informational / commercial / transactional / navigational

---

## GENERATE THE FOLLOWING:

### 1. Search Intent Analysis

| Aspect | Analysis |
|--------|----------|
| Primary Intent | [informational/commercial/transactional/navigational] |
| User Goal | [What the searcher wants to accomplish] |
| Content Format | [Guide/Listicle/How-to/Comparison] |
| SERP Features | [Featured snippets, PAA, images, videos] |

### 2. Competitor Analysis (Top 3 Results)

| Competitor | Strengths | Weaknesses | Our Opportunity |
|------------|-----------|------------|-----------------|
| [Site 1] | | | |
| [Site 2] | | | |
| [Site 3] | | | |

### 3. Content Brief

**Recommended Title:** [SEO-optimized title]

**Target Word Count:** [Based on competitor analysis and config.content.default_word_count]

**Content Outline:**
- H1: [Title]
- H2: [Section 1]
  - H3: [Subsection]
- H2: [Section 2]
- H2: [Section 3]
- H2: FAQ
- H2: Conclusion

**Must-Include Elements:**
- [ ] Target keyword in title, intro, 2+ H2s
- [ ] [List specific elements to include]
- [ ] [Data/statistics to reference]
- [ ] [Examples to provide]

### 4. On-Page SEO Recommendations

| Element | Recommendation |
|---------|----------------|
| Meta Title | [60 chars max] |
| Meta Description | [155 chars max] |
| URL Slug | [keyword-focused-slug] |
| Featured Image Alt | [Descriptive alt text] |

### 5. Internal Linking Strategy

Suggest 3-5 related topics/pages to link to and from.

---

**IMPORTANT:** Generate SPECIFIC, actionable recommendations based on the target keyword and project context. Do not use generic placeholders.
