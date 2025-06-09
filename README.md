
# 🧩 Voice Connection Blocker Plugin — Install Walkthrough

This guide walks you through installing [Vencord](https://github.com/Vendicated/Vencord) from source and adding this plugin.

---

## 📖 Official Vencord Documentation

To understand how Vencord works, refer to their official install guide:  
👉 [https://docs.vencord.dev/installing/](https://docs.vencord.dev/installing/)

---

## 🛠️ Requirements

Make sure you have the following installed:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) (v18 or newer)
- [pnpm](https://pnpm.io/installation)

---

## 📦 Cloning Vencord

Clone the Vencord repo and enter its folder:

```bash
git clone https://github.com/Vendicated/Vencord
cd Vencord
```

**Explanation:**
- `git clone` downloads the Vencord codebase to your machine.
- `cd Vencord` moves into the cloned project folder.

---

## 📥 Installing Dependencies

Install all required packages using:

```bash
pnpm install --frozen-lockfile
```

This ensures everything matches the exact versions Vencord expects.

---

## 🧩 Adding the Plugin

Create this directory structure in the Vencord repo:

```text
src/userplugins/blockVoice/index.ts
```

Place your `index.ts` plugin file into that folder.

> You may need to manually create the `userplugins` and `blockVoice` folders if they don't already exist.

---

## 🧪 Injecting Vencord into Discord

To load the patched version of Vencord into Discord, run:

```bash
pnpm inject
```

This applies the Vencord patches and loads them into your installed Discord client.

> ⚠️ You must close and reopen Discord if it's running.

---

## ✅ You're Done!

You can now load Vencord (with your plugin) using the loader or however you launch your customized Vencord setup.

---
