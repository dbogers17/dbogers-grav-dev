# Quark 2 (Custom) — child theme

This is a **child theme** of [Quark 2](https://github.com/getgrav/grav-theme-quark2), Grav's official default theme. Every custom change to dbogers.nl's design lives here, instead of directly inside `user/themes/quark2/`.

## ⚠️ This directory IS a live git repository, auto-synced with GitHub every minute

Run `git remote -v` here and you'll see it: this folder's working tree is directly wired to [`github.com/dbogers17/dbogers-nl-theme`](https://github.com/dbogers17/dbogers-nl-theme) (private repo). A systemd timer (`grav-theme-sync.timer`, defined in the `homelab-gitops` repo under `grav-theme-sync/`) runs every minute and:

1. `git pull`s any changes made on GitHub into this live directory (and clears the Grav cache if anything changed).
2. Commits and pushes any local changes back out to GitHub.

**This is two-way sync, not one-way.** If you (human or AI) edit a file in this folder directly on the server, that edit will itself get auto-committed and pushed to GitHub within a minute — there is no "editing here is safer/separate from GitHub" distinction. Either editing directly here, or editing via GitHub and letting it pull down, works and ends up in the same place. What matters is: **never edit files inside `user/themes/quark2/` directly** (see below) — that's the one thing this whole setup exists to prevent, and neither this repo nor its sync touches that folder.

If you have no access to the `homelab-gitops` repo and only see this folder: that's fine, you don't need it to work with this theme. It only matters if you need to change *how the sync itself* runs (interval, direction, etc).

## Why this exists

On July 31 / August 1, 2026, a GPM update of Quark2 (1.1.6 → 1.1.7) overwrote a set of files that had been edited directly inside `user/themes/quark2/`: `custom.css`, `site.js`, `quark2.php`, `quark2.yaml`, and several Twig templates. GPM updates replace the entire plugin/theme folder; there is no "keep my changes" mechanism for files inside a theme package, not even for files the theme author themselves describes as "safe to edit" (like `custom.css`). That was a very easy trap to fall into during an update, and is the reason this child theme exists.

**Rule of thumb from now on: nothing gets edited directly inside `user/themes/quark2/` ever again.** Everything that differs from stock Quark2 lives in this folder (`user/themes/quark2-custom/`), which is not part of the Quark2 package and is therefore never touched by a GPM update.

## How it works (technical)

- **`quark2-custom.yaml`** registers a Grav *stream*: every `theme://` reference (templates, CSS, images) is looked up here first, and only falls back to `user/themes/quark2/` if it doesn't exist here. That's the core of the whole mechanism — a file only needs to exist here if it actually differs from the stock version.
- **`quark2-custom.php`** defines the PHP class `Quark2Custom extends Quark2`. Without this file, Grav would load no PHP functionality at all for the "quark2-custom" theme (no Twig functions, no event hooks) — including the functionality *stock* Quark2 itself provides. This file therefore explicitly `require`s `user/themes/quark2/quark2.php` and builds on top of it.
- **`blueprints.yaml`** is the config form you see under **Admin → Themes → Quark 2 (Custom)**. A copy of Quark2's own form (theme color, header, footer, blog, icons).
- The active theme is set in `user/config/system.yaml` → `pages.theme: quark2-custom`.

`user/themes/quark2/` stays installed and keeps showing update notifications as normal — it's just no longer the *active* theme, but the source quark2-custom inherits from.

## What's overridden here, and why

| File | What it does | Why it's overridden |
|---|---|---|
| `css/custom.css` | All custom styling: ambient background (blobs/canvas), hero stats, module cards, experience tabs, portfolio sections, dark-mode variants, `isolation: isolate` on `body` (see below), font override (Space Grotesk instead of Cal Sans, see below), accent color | Existed before the child theme, ~85KB of custom work |
| `js/site.js` | Custom interaction: detail modal (clickable project/experience cards that open an overlay) | Own script, not a stock file |
| `quark2-custom.php` | Twig functions `q2_tech_feed` / `q2_tech_feeds` / filter `q2_time_ago` — the RSS feed widget ("Live from the field" / "7 Microsoft blogs followed") | Own PHP logic, added via `parent::onTwigInitialized()` so stock functionality (color-mix functions) stays intact |
| `templates/partials/base.html.twig` | Ambient background markup, enqueueing of custom JS (particles/terminal/reveal/typewriter/easter-eggs/secret-lab), detail-modal markup, language-switcher slot | Own structure layered on top of the stock base layout |
| `templates/modular.html.twig` | Homepage module routing: special handling for the "who I am" section (about-me plugin) and the tech-feed section | Own module logic |
| `templates/partials/footer.html.twig` | Simple copyright line instead of Grav/Trilby Media credits | Own text |
| `templates/partials/logo.html.twig` | Shows "Danny Bogers" as a wordmark instead of the Grav logo when no custom logo file has been uploaded | Own fallback |
| `quark2-custom.yaml` | Config defaults (accent color `#2563eb`, header/footer settings) | See "Config defaults" below |

**Deliberately NOT overridden:** `templates/partials/navigation.html.twig`. The old, directly-edited-in-quark2 version was a hardcoded list of 4 pages and had gone stale (missing newer pages). The stock dynamic menu builder (`macros.nav_loop`) now automatically shows all visible pages — see "Page visibility" below for how that's steered.

## Config defaults that differ from stock

`quark2-custom.yaml` holds, just like `quark2.yaml`, the default values you see and can change under **Admin → Themes → Quark 2 (Custom)**. One value deliberately differs from what stock Quark2 now ships as its default:

- **`accent-color: '#2563eb'`** (blue) — stock Quark2's own default is `#8428DF` (purple). Blue is the color the rest of the site (`custom.css`) is already tuned to sitewide; someone had at some point edited this directly in `quark2/quark2.yaml`, and that change is carried over here so it's update-proof.

Changing this via the Admin UI saves automatically to `user/config/themes/quark2-custom.yaml` (same as with any other Grav theme) — that doesn't overwrite this file, and is itself never at risk from a Quark2 update either.

## Known stock regressions compensated for here

Two things in Quark2 1.1.7 itself (so **not** in this child theme, but in `user/themes/quark2/css/theme.css`) changed in a way that broke this site, and are reverted in `custom.css`:

1. **`body { isolation: isolate; }` was removed.** Without this rule, a `position: absolute; z-index: -1` element (the ambient background) paints invisibly behind the entire page instead of staying just beneath its content. Restored in `custom.css`.
2. **The display font became Cal Sans instead of Space Grotesk** (plus matching letter-spacing tweaks on h1/h2/h3). This site is tuned for Space Grotesk. Restored via a `--pico-font-family-display` override plus the original letter-spacing values in `custom.css`.

Both are documented with a comment block right where they live in `custom.css` — search for "Quark2 1.1.7" to see what and why.

## Page visibility (not in the theme, but relevant)

Separate from the theme files, something in `user/pages/` is tied to this whole story:

- The 8 modular pieces of the homepage (`user/pages/01.home/01.hero` through `08.contact`) have `visible: false` — these are *sections of one page*, not separate site pages, and shouldn't show up as a submenu under "Home".
- `user/pages/06.secret-lab` has `visible: false` — deliberately a hidden easter-egg section, not a menu item.
- `user/pages/02.typography` has `visible: false` — Grav's default demo page, doesn't belong on a real site.

This has nothing to do with Quark2 updates (pages live outside the theme), but it does matter for how the menu behaves now that the dynamic menu builder is used instead of the old hardcoded list.

## Workflow: how to process a future Quark2 update

Just ask — "process the new Quark2 update" is enough, as long as this README stays accurate. The process to follow:

1. `bin/grav gpm update quark2` (via Admin or CLI) — this only touches `user/themes/quark2/`, never this folder.
2. For each file in the table above: compare the new stock version of that file against the previous stock version (not against the file here in the child theme) to see what changed *in Quark2 itself*.
3. Purely cosmetic/stock changes (bugfixes, new CSS variables, font updates, etc.) unrelated to our customizations: inherited automatically, since the files here only override what's explicitly listed in the table — everything else just flows through via the stream fallback.
4. Changes in files that *are* overridden here: the stock change is reviewed on its own and, where relevant, manually applied to the overridden file here (as was done with the `header.onpage_menu` fix in `modular.html.twig`, or the `isolation: isolate` and font fixes in `custom.css`).
5. `quark2_synced_with_version` below gets bumped to the new Quark2 version number, and this table/README updated if needed.
6. Clear cache, check the site.

**Important:** as long as this file stays accurate, a Quark2 update can never silently break something again — worst case, a future session misses a small stock improvement in one of the overridden files, but nothing can vanish unnoticed the way it did before.

## Version

- `blueprints.yaml` → `version:` of this child theme itself (semver of the child theme's own content, not of Quark2).
- `quark2_synced_with_version: 1.1.7` (see `quark2-custom.yaml`) — the Quark2 version number the table above was last checked against. This is the number that tells you "everything above is accurate up to and including this Quark2 version."
