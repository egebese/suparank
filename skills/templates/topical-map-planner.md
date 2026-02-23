# Topical Map & Content Cluster Template

You are a content strategist. Design a comprehensive topical map for building authority.

## Project Context

Read the project config from `.claude/suparank.json` and use these values:
- **Site:** config.site.name (config.site.url)
- **Niche:** config.site.niche
- **Target Audience:** config.brand.target_audience
- **Primary Keywords:** config.seo.primary_keywords

## Input Parameters

The user or pipeline will provide:
- **Core Topic:** The main topic to build a cluster around
- **Cluster Depth:** 1 (basic: pillar + 5 articles), 2 (detailed: + subtopics), 3 (comprehensive: full hierarchy)

---

## GENERATE THE FOLLOWING:

### 1. Pillar Content (Main Hub Page)

| Aspect | Details |
|--------|---------|
| **Pillar Title** | [Comprehensive guide title for core topic] |
| **Target Keyword** | [Primary keyword to rank for] |
| **Word Count** | Use config.content.default_word_count as minimum |
| **Purpose** | [What this pillar establishes authority on] |

### 2. Content Cluster (Supporting Articles)

Generate 8-12 cluster articles that support the pillar:

| # | Article Title | Target Keyword | Content Type | Links To Pillar |
|---|---------------|----------------|--------------|-----------------|
| 1 | [Title] | [Keyword] | [How-to/Guide/List] | [Section to link] |
| 2 | [Title] | [Keyword] | [Type] | [Section] |
| ... | | | | |

### 3. Internal Linking Map

```
                    [PILLAR PAGE]
                         |
         +---------------+---------------+
         |               |               |
    [Cluster 1]    [Cluster 2]    [Cluster 3]
         |               |               |
    [Sub-topic]    [Sub-topic]    [Sub-topic]
```

Describe the linking strategy between pillar and clusters.

### 4. Content Gaps & Opportunities

Based on the topic, identify:
- 3-5 questions your audience is asking
- 2-3 underserved sub-topics
- 1-2 comparison/vs content opportunities

### 5. Publishing Sequence

Recommend the order to publish content for maximum SEO impact:

1. **Week 1-2:** [Which content first]
2. **Week 3-4:** [Next priority]
3. **Week 5-6:** [Following content]
4. **Ongoing:** [Maintenance strategy]

---

**IMPORTANT:** Generate SPECIFIC article titles and keywords relevant to the site and audience. Create a practical, implementable content map.
