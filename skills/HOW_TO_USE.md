# How to Use Suparank

Quick start examples for common tasks.

## First Time Setup

```
/suparank/setup
```

Follow the interactive wizard to configure your project.

## Create a Single Article

```
/suparank
Write a blog post about AI-powered content marketing
```

This runs the full pipeline:
1. Researches keywords for "AI-powered content marketing"
2. Creates SEO strategy and content outline
3. Writes a complete article (meeting your word count target)
4. Runs quality check and GEO optimization
5. Publishes to your configured CMS (as draft)

## Create Multiple Articles

```
/suparank
Create 5 articles about SEO best practices
```

The pipeline will ask you to choose a mode:

### Sequential Mode (default, recommended)
- Writes articles one at a time in a single agent
- Uses less LLM context/tokens
- Safer and more predictable
- Pipeline: Research all → Write one by one → Optimize → Publish

### Parallel Mode (faster, uses more resources)
- Spawns separate agents, each writing their own article with independent research
- Much faster for large batches
- Uses N times more LLM context (one context window per agent)
- You choose how many agents to spawn
- Pipeline: Shared research → Agents write in parallel → Collect → Optimize → Publish

**You will always be asked before parallel agents are spawned.** The pipeline never auto-selects parallel mode because it consumes LLM limits rapidly.

## Research Only (No Writing)

```
/suparank/research
Find keywords for "email marketing automation"
```

Get keyword research, SEO strategy, topical maps, or content calendars without writing anything.

## Write Without Research

```
/suparank/create
Write an article about "10 Best Email Marketing Tools" targeting the keyword "best email marketing tools"
```

Skip the research phase and write directly when you already know your topic and keywords.

## Optimize Existing Content

```
/suparank/optimize
Quality check my latest article
```

Review saved articles for SEO, grammar, brand voice, and AI search optimization.

## Publish Saved Content

```
/suparank/publish
Publish my article to WordPress
```

Publish previously saved articles to WordPress or Ghost.

## Manage Your Articles

```
/suparank/session
Show my saved articles
```

List, load, or remove articles from your session.

## Common Workflows

### Blog Post from Scratch
```
/suparank
Write a comprehensive guide about [topic]
```

### Keyword Research Sprint
```
/suparank/research
Full research for [niche topic]
```

### Content Audit
```
/suparank/optimize
Review and optimize all my saved articles
```

### Batch Publish
```
/suparank/publish
Publish all saved articles to WordPress as drafts
```

## Tips

- **Word count is enforced**: Articles must meet your configured minimum
- **Draft by default**: Publishing always creates drafts unless you say "publish live"
- **Content is saved locally**: Everything goes to `.claude/suparank-content/`
- **Session tracks progress**: Multi-article workflows are resumable
- **Config is per-project**: Different projects can have different settings
- **Credentials are global**: WordPress/Ghost/fal.ai keys are shared across projects
