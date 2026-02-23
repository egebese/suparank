# Suparank

AI-powered SEO content creation toolkit for [Claude Code](https://claude.ai/code).

Research keywords, write SEO-optimized blog posts, and publish to WordPress/Ghost — all from your terminal.

## What is Suparank?

Suparank is a set of **Claude Code skills** that turn Claude into a full SEO content pipeline:

1. **Research** — Keyword research, SEO strategy, topical maps, content calendars
2. **Create** — Write publication-ready articles with word count enforcement and brand voice
3. **Optimize** — Quality check, GEO optimization, schema markup, internal linking
4. **Publish** — Push to WordPress, Ghost, or generate images via fal.ai

## Install

```bash
npx skills add egebese/suparank --global --all
```

Or manually with git:

```bash
mkdir -p ~/.claude/skills
git clone https://github.com/egebese/suparank.git ~/.claude/skills/suparank
```

## Quick Start

### 1. Configure your project

```
/suparank/setup
```

### 2. Create content

```
Write a blog post about AI content marketing
```

### 3. That's it

Your article is researched, written, optimized, and saved locally. Optionally published to your CMS as a draft.

## Available Skills

| Skill | Command | What It Does |
|-------|---------|-------------|
| **Suparank** | `/suparank` | Smart router — detects your intent |
| **Setup** | `/suparank/setup` | Configure project and credentials |
| **Pipeline** | `/suparank/pipeline` | Full 4-phase content pipeline (sequential or parallel) |
| **Research** | `/suparank/research` | Keywords, SEO strategy, topical maps |
| **Create** | `/suparank/create` | Write SEO-optimized articles |
| **Optimize** | `/suparank/optimize` | Quality check, GEO, schema, links |
| **Publish** | `/suparank/publish` | WordPress, Ghost, images, webhooks |
| **Session** | `/suparank/session` | Manage saved articles |

## Multi-Article Mode

When creating multiple articles, choose between:

- **Sequential** — One agent writes all articles, one at a time (recommended)
- **Parallel** — Spawn N agents that each research and write independently (faster, uses more LLM context)

You're always asked before parallel agents are spawned.

## Configuration

| File | Location | Purpose |
|------|----------|---------|
| Project config | `.claude/suparank.json` | Site, brand, SEO settings (per project) |
| Credentials | `~/.claude/suparank-credentials.json` | CMS passwords, API keys (global, not committed) |

## Recommended: seo-mcp for Real Data

For production-quality research with **real Ahrefs data**, install the [seo-mcp](https://github.com/cnych/seo-mcp) MCP server:

```bash
npx -y @anthropic-ai/claude-code mcp add seo-mcp -- npx -y @anthropic-ai/mcp-remote https://seo-mcp.cnych.workers.dev/sse
```

This gives the research phase access to real keyword search volumes, difficulty scores, competitor traffic analysis, and backlink profiles. Without it, research uses LLM-estimated data.

## Publishing

- **WordPress** — Standard REST API with application passwords
- **Ghost** — Admin API with JWT authentication
- **Images** — fal.ai for AI-generated hero images
- **Webhooks** — Slack, Make, n8n, Zapier

## Repository Structure

```
suparank/
└── skills/              # Claude Code skill files
    ├── SKILL.md         # Master router
    ├── README.md        # Installation guide
    ├── HOW_TO_USE.md    # Quick start examples
    ├── setup/           # Configuration wizard
    ├── pipeline/        # Full content pipeline
    ├── research/        # Keyword & SEO research
    ├── create/          # Content writing
    ├── optimize/        # Quality & GEO optimization
    ├── publish/         # CMS publishing
    ├── session/         # Article management
    └── templates/       # 10 expert prompt templates
```

## Uninstall

```bash
rm -rf ~/.claude/skills/suparank
```

Your project configs and saved content remain intact.

## Links

- Issues: [GitHub Issues](https://github.com/egebese/suparank/issues)

## License

MIT
