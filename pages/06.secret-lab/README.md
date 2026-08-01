# ⚠️ This folder is deployed from GitHub — don't edit it directly here

The Grav pages in this folder (the hidden "Secret Lab" portal + one page per game) are **one-way synced from GitHub, every minute**, by a systemd timer (`grav-secret-lab-sync.timer`, defined in the `homelab-gitops` repo under `grav-secret-lab-sync/`, script pulls into `~/repos/dbogers-nl-secret-lab` and `rsync --delete`s it in here).

**GitHub is authoritative.** Concretely:

- Source of truth: [`github.com/dbogers17/dbogers-nl-secret-lab`](https://github.com/dbogers17/dbogers-nl-secret-lab) (private repo), root of that repo (not the `games/` subfolder — that part deploys to `user/themes/quark2/games/` instead).
- Any edit made **directly in this folder on the server will be silently overwritten** on the next sync tick (`rsync --delete` — it doesn't merge, it makes this folder match GitHub exactly).
- To change anything here: edit and push to the GitHub repo instead. It'll appear here within a minute, and the Grav cache gets cleared automatically.

This is different from the sibling `user/themes/quark2-custom/` folder, which syncs **two-way** — don't assume the same rule applies there.

If you have no access to the `homelab-gitops` repo or the GitHub repo above: you can still read/understand this content here, just know that any edit made here directly won't stick.
