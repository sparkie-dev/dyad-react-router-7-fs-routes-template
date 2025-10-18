# React Router v7 + shadcn/ui Template for Dyad

A modern, production-ready web application template built with **React Router v7** (Framework Mode), **shadcn/ui**, **Tailwind CSS**, and **Prisma ORM**. This template is optimized for the [Dyad](https://github.com/dyad-sh/dyad) AI-powered development environment.

## ✨ Key Features

- 🚀 **React Router v7 Framework Mode** with file-based routing and SSR
- 🎨 **shadcn/ui** component library with Radix UI primitives
- 💨 **Tailwind CSS v4** for utility-first styling
- 🗄️ **Prisma ORM** for type-safe database access
- 📝 **TypeScript** for end-to-end type safety
- 🔥 **Vite** for lightning-fast development
- ✅ **React Hook Form + Zod** for form validation
- 🎯 **Dyad Component Tagging** for AI-assisted development

## 🆚 React Router v7 vs v6

This template uses **React Router v7**, which has significant differences from v6:

### Major Changes in v7

- **Package Consolidation**: `react-router-dom` is merged into `react-router`
  - Use `import { Link } from "react-router"` (universal)
  - Use `import { HydratedRouter } from "react-router/dom"` (DOM-specific, with forward slash)
- **Framework Mode**: Built-in SSR, file-based routing, and route modules
- **File-Based Routing**: Powered by `@react-router/fs-routes`
- **Route Module API**: Each route exports `Component`, `loader`, and `action` functions
- **Automatic Type Generation**: Type-safe route parameters and loader data

## 🏗️ Project Structure

```text
src/
├── routes/              # File-based routes (React Router v7)
│   ├── _index.tsx      # Home page (/)
│   └── about.tsx       # About page (/about)
├── server/             # Server-side data functions (Prisma queries)
├── components/         # Shared UI components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── prisma/             # Prisma schema and migrations
├── entry.server.tsx    # Server-side entry point (SSR)
├── entry.client.tsx    # Client-side entry point (hydration)
├── root.tsx            # Root layout component
└── routes.ts           # Route configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: use the version specified in `.nvmrc` if present)
- pnpm 9+ (managed via Corepack)

### Installation

<!-- markdownlint-disable MD029 -->
1. **Install dependencies:**

  ```bash
  corepack enable pnpm
  pnpm install
  ```

2. **Set up the database:**

  ```bash
  # Generate Prisma client
  npx prisma generate

  # Run migrations (if applicable)
  npx prisma migrate dev
  ```

3. **Start the development server:**
<!-- markdownlint-enable MD029 -->

  ```bash
  pnpm dev
  ```

  Your app will be available at `http://localhost:5173`

## 📖 Development Guide

### Creating Routes

This template uses **file-based routing** with React Router v7. Routes are automatically generated from files in `src/routes/`.

#### Route File Naming Conventions

- `_index.tsx` → `/` (index route)
- `about.tsx` → `/about`
- `blog._index.tsx` → `/blog` (index)
- `blog.$postId.tsx` → `/blog/:postId` (dynamic segment)
- `blog.$postId.edit.tsx` → `/blog/:postId/edit`

#### Route Module Structure

Each route file exports up to three functions:

```tsx
// src/routes/blog.$postId.tsx
import type { Route } from "./+types/blog.$postId";
import { useLoaderData } from "react-router";

// 1. Fetch data before rendering (runs on server)
export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPost(params.postId);
  return { post };
}

// 2. Handle form submissions and mutations (runs on server)
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  await updatePost(formData);
  return { success: true };
}

// 3. Render the UI
export function Component() {
  const { post } = useLoaderData<typeof loader>();
  return <article>{post.title}</article>;
}
```

### Working with Data

#### Server Functions

All database interactions should be in `src/server/` directory:

```typescript
// src/server/posts.server.ts
import { prisma } from "../prisma/client";

export async function getPost(id: string) {
  return await prisma.post.findUnique({ where: { id } });
}
```

#### Loaders and Actions

Route modules import and call server functions:

```tsx
// src/routes/blog.$postId.tsx
import { getPost } from "../server/posts.server";

export async function loader({ params }: Route.LoaderArgs) {
  return { post: await getPost(params.postId) };
}
```

### Forms and Data Mutations

#### Full-Page Navigation

Use `<Form>` for actions that require navigation:

```tsx
import { Form } from "react-router";

export function Component() {
  return (
    <Form method="post">
      <input name="title" />
      <button type="submit">Create Post</button>
    </Form>
  );
}
```

#### In-Page Mutations

Use `useFetcher()` for mutations without navigation:

```tsx
import { useFetcher } from "react-router";

export function Component() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post">
      <input name="title" />
      <button type="submit">Update</button>
    </fetcher.Form>
  );
}
```

### Styling with Tailwind CSS

This template uses **Tailwind CSS v4** with the new `@tailwindcss/postcss` plugin:

```tsx
// Use Tailwind utility classes
<button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
  Click me
</button>
```

### shadcn/ui Components

Pre-installed components are in `src/components/ui/`. Add more with:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
```

Usage:

```tsx
import { Button } from "@/components/ui/button";

<Button variant="default">Click me</Button>
```

## 🏭 Building for Production

### Build the Application

```bash
pnpm build
```

This creates optimized production files in `build/` directory.

### Preview Production Build

```bash
pnpm preview
```

## 📦 Tech Stack

| Technology | Purpose |
|------------|---------|
| [React 19](https://react.dev/) | UI framework |
| [React Router v7](https://reactrouter.com/) | Routing with SSR (Framework Mode) |
| [@react-router/fs-routes](https://reactrouter.com/) | File-based routing |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite](https://vitejs.dev/) | Build tool and dev server |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS |
| [shadcn/ui](https://ui.shadcn.com/) | Component library |
| [Radix UI](https://www.radix-ui.com/) | Accessible component primitives |
| [Prisma](https://www.prisma.io/) | ORM for database access |
| [React Hook Form](https://react-hook-form.com/) | Form state management |
| [Zod](https://zod.dev/) | Schema validation |
| [Lucide React](https://lucide.dev/) | Icon library |

## 🤖 Dyad Integration

This template is optimized for the [Dyad](https://github.com/dyad-sh/dyad) AI development environment:

- **Component Tagging**: Uses `@dyad-sh/react-vite-component-tagger` to enable Dyad's "Select UI to Edit" feature
- **AI Rules**: See `AI_RULES.md` for development guidelines that help AI assistants work with this codebase
- **Convention-based**: Follows clear patterns that make it easier for AI to understand and modify code

## 📄 Configuration Files

- `react-router.config.ts` - React Router v7 configuration (SSR, prerendering)
- `vite.config.ts` - Vite build configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `components.json` - shadcn/ui configuration
- `prisma.config.ts` - Prisma configuration

## 🚨 Important Notes

### Server-Side Rendering Constraints

- **No Browser APIs in Loaders**: Don't use `window`, `localStorage`, or `document` in `loader` functions or `src/server/` code
- **Await Promises**: Always `await` async operations in loaders to prevent crashes

### React Router v7 Import Patterns

✅ **Correct:**

```tsx
import { Link, useLoaderData } from "react-router";
import { HydratedRouter } from "react-router/dom";
```

❌ **Incorrect (v6 pattern):**

```tsx
import { Link, useLoaderData } from "react-router-dom"; // Don't use this!
```

## 📚 Learn More

- [React Router v7 Documentation](https://reactrouter.com/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Dyad Documentation](https://github.com/dyad-sh/dyad)

## 📝 License

This template is open source and available under the [MIT License](LICENSE).
