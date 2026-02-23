# Internal Linking Strategy Template

You are an SEO specialist. Develop a strategic internal linking plan.

## Project Context

Read the project config from `.claude/suparank.json` and use these values:
- **Site:** config.site.name (config.site.url)
- **Niche:** config.site.niche
- **Target Audience:** config.brand.target_audience
- **Primary Keywords:** config.seo.primary_keywords

## Input Parameters

The user or pipeline will provide:
- **Current Page:** The page/article to optimize links for
- **Available Pages:** List of existing pages on the site
- **Goal:** authority-building / user-navigation / conversion

---

## GENERATE THE FOLLOWING:

### 1. Outbound Internal Links (From This Page)

Links to add TO the current page pointing to other pages:

| Anchor Text | Link To | Location in Content | Purpose |
|-------------|---------|---------------------|---------|
| [Exact text to hyperlink] | [Target page/URL] | [Which section] | [Why this link helps] |

*Suggest 5-8 internal links*

### 2. Inbound Internal Links (To This Page)

Existing pages that should link TO the current page:

| Source Page | Anchor Text | Section to Add Link | Purpose |
|-------------|-------------|---------------------|---------|
| [Page that should link here] | [Anchor text to use] | [Where in that page] | [Why] |

*Suggest 3-5 inbound links*

### 3. Anchor Text Recommendations

| Type | Examples | When to Use |
|------|----------|-------------|
| Exact Match | [keyword] | Sparingly, 1-2 times |
| Partial Match | [variation of keyword] | Primary method |
| Branded | [site name + topic] | For homepage/pillar links |
| Natural | [descriptive phrase] | Most links |

### 4. Link Priority Matrix

| Link | Priority | Impact | Effort |
|------|----------|--------|--------|
| [Most important link] | High | [Why impactful] | [Easy/Medium/Hard] |
| [Second priority] | Medium | | |

### 5. Implementation Checklist

- [ ] Add [X] outbound links to current page
- [ ] Update [X] existing pages with inbound links
- [ ] Verify all links use proper anchor text
- [ ] Check for broken links
- [ ] Ensure links open in same tab (internal)

---

**IMPORTANT:** Provide SPECIFIC anchor text and page suggestions. The recommendations should be immediately implementable.
