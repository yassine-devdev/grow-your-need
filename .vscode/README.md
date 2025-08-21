## VS Code multiverse + Project setup

This workspace contains a small "multiverse" of VS Code settings and quick tasks to apply them.

## Files

- `settings.multiverse.json` - declarative profiles (default, strict, experimental, ai, biome).
- `settings.json` - workspace settings. Use the switcher script or Tasks to apply a profile into this file.
- `switch-profile.js` - Node script: run `node .vscode/switch-profile.js <profile>` to apply.
- `tasks.json` - quick tasks to apply profiles from the Command Palette (Tasks: Run Task).
- `extensions.json` - recommended extensions for this Next.js + TypeScript project.

## Applying profiles

1. Install recommended extensions when prompted by VS Code (or see the list in `extensions.json`).
2. From a PowerShell terminal in the repo run:

```powershell
# apply the default profile
node .vscode/switch-profile.js default

# apply the AI-optimized profile
node .vscode/switch-profile.js ai

# apply the Biome-first profile
node .vscode/switch-profile.js biome
```

3. Or in VS Code: Command Palette -> Tasks: Run Task -> choose "Apply Settings Profile: ..."

The switcher merges profile keys into your existing `settings.json` so any personal workspace settings you already added are kept.

---

## Project bootstrap: Next.js 15 + React 19 + Tailwind + shadcn UI + Framer + tRPC + Zustand + TypeScript + Jest + MySQL (Prisma)

Follow these PowerShell-friendly steps to create or extend a project using the technologies above.

### 1) Create project (optional)

```powershell
pnpm create next-app@latest my-app --ts --experimental-app
cd my-app
```

### 2) Ensure specific versions (Next 15, React 19)

```powershell
pnpm add next@15.5.0 react@19.1.0 react-dom@19.1.0
```

### 3) Tailwind CSS

```powershell
pnpm add -D tailwindcss@latest postcss autoprefixer
npx tailwindcss init -p
```

Edit `tailwind.config.js` to include your `src`/`app` paths.

### 4) shadcn/ui

```powershell
pnpm dlx shadcn@latest add ui
```

### 5) Framer Motion

```powershell
pnpm add framer-motion
```

### 6) tRPC

```powershell
pnpm add @trpc/server @trpc/client @trpc/react-query @trpc/next zod
```

### 7) Zustand

```powershell
pnpm add zustand
```

### 8) TypeScript

Ensure `tsconfig.json` is present and adjust `strict` settings as you prefer.

### 9) Jest + Testing Library

```powershell
pnpm add -D jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom
npx ts-jest config:init
```

### 10) MySQL + Prisma

```powershell
pnpm add -D prisma
pnpm add @prisma/client
npx prisma init
# edit .env to set DATABASE_URL for MySQL
# after schema changes: npx prisma migrate dev --name init
```

### 11) Lint & format

```powershell
pnpm add -D eslint eslint-config-next prettier eslint-plugin-react-hooks
pnpm add -D biome
```

### 12) Recommended VS Code extensions

- Prettier (`esbenp.prettier-vscode`)
- ESLint (`dbaeumer.vscode-eslint`)
- Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`)
- Biome (`biomejs.biome`)
- GitLens (`eamodio.gitlens`)
- Copilot / Codeium (`github.copilot`, `codeium.codeium`)
- PowerShell (`ms-vscode.powershell`)

### 13) Optional: auto-install recommended extensions

I can add a script that runs `code --install-extension` for each recommendation; you'll need to run it locally.

---

If you want me to also:

- convert the switcher to CommonJS (done) to avoid Node ESM warnings, or
- add an extension installer script that you run locally, or
- add Husky + lint-staged pre-commit hooks,

tell me which and I will implement it.
