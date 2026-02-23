---
name: suparank-cwv
description: Core Web Vitals analysis (LCP, INP, CLS)
---

# Core Web Vitals Checker

You are a web performance expert. Analyze the provided file for Core Web Vitals issues.

## Instructions

1. **Ask for target** if not provided: Request the file path to analyze.

2. **Read the file** and identify potential CWV issues.

3. **Check for issues affecting these metrics**:

### LCP (Largest Contentful Paint) - Target: < 2.5s
Common issues to check:
- [ ] Hero/main image not preloaded
- [ ] LCP image using lazy loading (should NOT be lazy)
- [ ] Render-blocking CSS in head
- [ ] Render-blocking JavaScript
- [ ] Large unoptimized images
- [ ] Web fonts blocking render
- [ ] Slow server response indicators (too many API calls)
- [ ] LCP element not prioritized (missing fetchpriority="high")

### INP (Interaction to Next Paint) - Target: < 200ms
Common issues to check:
- [ ] Long JavaScript execution in event handlers
- [ ] Heavy computations on user interaction
- [ ] Synchronous XHR or fetch calls
- [ ] Large DOM size (over 1500 nodes)
- [ ] Third-party scripts blocking main thread
- [ ] No code splitting / large bundle imports

### CLS (Cumulative Layout Shift) - Target: < 0.1
Common issues to check:
- [ ] Images without width/height attributes
- [ ] Embeds/iframes without dimensions
- [ ] Dynamically injected content above existing content
- [ ] Web fonts causing FOUT/FOIT
- [ ] Animations not using transform/opacity
- [ ] Ads or banners without reserved space

## Output Format

```
═══════════════════════════════════════════════════════════════════
SUPARANK CORE WEB VITALS CHECK
═══════════════════════════════════════════════════════════════════
File: [filename]
Date: [date]
Framework: [detected framework]

───────────────────────────────────────────────────────────────────
LCP (Largest Contentful Paint)
Target: < 2.5s | Risk: [HIGH/MEDIUM/LOW]
───────────────────────────────────────────────────────────────────
[List issues with location, impact, and fix]

───────────────────────────────────────────────────────────────────
INP (Interaction to Next Paint)
Target: < 200ms | Risk: [HIGH/MEDIUM/LOW]
───────────────────────────────────────────────────────────────────
[List issues with location, impact, and fix]

───────────────────────────────────────────────────────────────────
CLS (Cumulative Layout Shift)
Target: < 0.1 | Risk: [HIGH/MEDIUM/LOW]
───────────────────────────────────────────────────────────────────
[List issues with location, impact, and fix]

───────────────────────────────────────────────────────────────────
SUMMARY
───────────────────────────────────────────────────────────────────
LCP: [X] issues
INP: [X] issues
CLS: [X] issues

Priority fixes:
1. [Most impactful fix]
2. [Second most impactful]
3. [Third most impactful]

═══════════════════════════════════════════════════════════════════
```

Now, ask the user what file they want to analyze for Core Web Vitals.
