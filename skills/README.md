# Suparank - AI-Powered SEO Content Toolkit

Suparank is a set of Claude Code skills that help you research keywords, write SEO-optimized blog posts, and publish them to your CMS - all from your terminal.

## Installation

Suparank skills are installed at `~/.claude/skills/suparank/`. If you're reading this, you're already set up!

To verify installation:
```bash
ls ~/.claude/skills/suparank/
```

You should see:
```
SKILL.md          # Master router
README.md         # This file
HOW_TO_USE.md     # Quick start guide
setup/            # Configuration wizard
pipeline/         # Full content pipeline
research/         # Keyword & SEO research
create/           # Content writing
optimize/         # Quality & GEO optimization
publish/          # WordPress, Ghost, webhooks
session/          # Article management
templates/        # 10 prompt templates
```

## Quick Start

### 1. Configure Your Project

In any project directory:
```
/suparank/setup
```

This creates `.claude/suparank.json` with your site info, brand voice, keywords, and content preferences.

### 2. Create Content

```
/suparank
```
or
```
Write a blog post about AI content marketing
```

This runs the full pipeline: Research → Write → Optimize → Publish.

### 3. That's It!

Your articles are saved in `.claude/suparank-content/` and optionally published to WordPress or Ghost.

## Available Skills

| Skill | Command | What It Does |
|-------|---------|-------------|
| **Suparank** | `/suparank` | Smart router - detects your intent |
| **Setup** | `/suparank/setup` | Configure project & credentials |
| **Pipeline** | `/suparank/pipeline` | Full 4-phase content pipeline (sequential or parallel agents) |
| **Research** | `/suparank/research` | Keywords, SEO strategy, topical maps |
| **Create** | `/suparank/create` | Write SEO-optimized articles |
| **Optimize** | `/suparank/optimize` | Quality check, GEO, schema, links |
| **Publish** | `/suparank/publish` | WordPress, Ghost, images, webhooks |
| **Session** | `/suparank/session` | Manage saved articles |

## Configuration Files

| File | Location | Purpose | Git? |
|------|----------|---------|------|
| Project config | `.claude/suparank.json` | Site, brand, SEO settings | Yes |
| Credentials | `~/.claude/suparank-credentials.json` | CMS passwords, API keys | No |
| Session | `.claude/suparank-session.json` | Current workflow state | No |
| Content | `.claude/suparank-content/` | Saved articles | No |

Add to your `.gitignore`:
```
.claude/suparank-session.json
.claude/suparank-content/
```

## Project Config Schema

`.claude/suparank.json`:
```json
{
  "site": {
    "name": "My Blog",
    "url": "https://myblog.com",
    "description": "A blog about...",
    "niche": "AI tools"
  },
  "brand": {
    "voice": "Professional yet approachable",
    "target_audience": "Marketing managers aged 25-45",
    "differentiators": ["Practical tutorials"]
  },
  "seo": {
    "primary_keywords": ["AI content tools"],
    "geo_focus": "United States"
  },
  "content": {
    "default_word_count": 2500,
    "reading_level": 8,
    "include_images": true
  },
  "visual_style": {
    "colors": ["#6366F1"],
    "image_aesthetic": "Clean minimalist illustrations"
  }
}
```

## Publishing Setup

### WordPress (Standard REST API)
Requires only a username and application password:
1. Go to WordPress → Users → Your Profile → Application Passwords
2. Create a new application password
3. Add to credentials during `/suparank/setup`

### Ghost (Admin API)
Requires a Ghost Admin API key:
1. Go to Ghost → Settings → Integrations → Add Custom Integration
2. Copy the Admin API Key (format: `id:secret`)
3. Add to credentials during `/suparank/setup`

### Image Generation (fal.ai)
Requires a fal.ai API key:
1. Sign up at https://fal.ai
2. Get your API key from https://fal.ai/dashboard/keys
3. Add to credentials during `/suparank/setup`

## Templates

Suparank includes 10 expert prompt templates:

| Template | Purpose |
|----------|---------|
| keyword-researcher | Keyword discovery & analysis |
| seo-strategist | SEO strategy & content briefs |
| topical-map-planner | Content cluster architecture |
| content-calendar-manager | Editorial calendar planning |
| content-writer | Full article writing |
| image-prompt-designer | AI image prompt creation |
| internal-link-builder | Internal linking strategy |
| schema-architect | JSON-LD structured data |
| geo-optimizer | AI search engine optimization |
| editorial-quality-checker | Pre-publish quality review |

## Parallel Multi-Article Mode

When creating multiple articles, the pipeline offers two modes:

| Mode | How It Works | LLM Usage | Best For |
|------|-------------|-----------|----------|
| **Sequential** | One agent writes all articles, one at a time | Normal (1x) | Most cases, limited API usage |
| **Parallel** | N agents each research and write their own article simultaneously | Heavy (Nx) | Large batches when speed matters |

**Parallel mode always requires your explicit approval.** The pipeline will:
1. Ask if you want sequential or parallel
2. If parallel, ask how many agents to spawn
3. Warn you about LLM context/token consumption
4. Only proceed after your confirmation

This ensures you stay in control of resource usage.

## Migrating from MCP Version

If you previously used Suparank as an MCP tool (`npx suparank`), your existing credentials at `~/.suparank/credentials.json` are automatically detected as a fallback. Run `/suparank/setup` to migrate them to the new location (`~/.claude/suparank-credentials.json`).

Your project configurations need to be recreated with `/suparank/setup` since they were previously stored in the cloud database.

## Error Recovery

The pipeline saves progress after every phase. If something fails:

| Situation | What to Do |
|-----------|-----------|
| Pipeline interrupted | Run `/suparank/pipeline` again - it offers to resume |
| Publishing failed | Articles are saved locally; run `/suparank/publish` to retry |
| Image generation failed | Run `/suparank/publish` with "generate images" to retry |
| Wrong credentials | Run `/suparank/setup` to update credentials |
| Config needs changes | Run `/suparank/setup` to update (preserves existing values) |

Content is always saved to `.claude/suparank-content/` before any API calls, so you never lose work.

## Uninstall

```bash
rm -rf ~/.claude/skills/suparank
```

This removes the skills only. Your project configs and saved content remain intact.

## Support

- GitHub: https://github.com/Suparank
- Issues: https://github.com/Suparank/Suparank-MCP/issues
