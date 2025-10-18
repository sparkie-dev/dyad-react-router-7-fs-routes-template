# AI Development Rules

This document outlines the key architectural patterns and conventions for this project. Please adhere to these rules to ensure consistency and maintainability.

## 0. Onboarding Checklist (Mandatory First Steps)

Before taking any action, you **must** complete the following steps at the beginning of every new chat session:

1. **Analyze Project Structure**: Use the available tools to list the entire file and directory structure of the project. State that you have done this.
2. **Review Configuration Files**: Read the contents of all configuration files (search for any files with config or ending in .json). State that you have done this.
3. **Read Full File Content**: When reading a file, you **must** read the entire file to ensure you have the full context. Do not read partial file contents.
4. **Mandatory Research First**: For any package, library, or API that is relevant to the user's request, you **must** use the available documentation-lookup tools (e.g., `context7`) to find its current API and best practices. This is not optional. This must be done at least once for each package within a single chat session before you write any code that uses it. Do not rely on baked-in knowledge. Always verify first.
5. **Summarize Onboarding**: After completing the above, provide a brief summary of the key rules from this document to confirm you have understood them.

## Core Technologies

- **Framework**: React 19+ with TypeScript.
- **Routing**: React Router v7.
- **Styling**: Tailwind CSS with shadcn/ui components.
- **Icons**: `lucide-react`.

## 1. Routing (React Router v7)

This project uses **React Router v7** from `remix-run/react-router` with a modern, **file-based routing system**. This is fundamentally different from React Router v6 and previous versions.

### Key React Router v7 Differences

- **Package Consolidation**: In React Router v7, `react-router-dom` has been **merged into** the main `react-router` package.
  - **Never use** `react-router-dom` as a separate package dependency.
  - Import all routing functionality from either `react-router` (for core/universal features) or `react-router/dom` (with a **forward slash**, for DOM-specific features).
  - Example: `import { HydratedRouter } from "react-router/dom";` NOT `from "react-router-dom";`

- **Framework Mode**: This project uses React Router v7's **Framework Mode**, which provides:
  - Built-in SSR (Server-Side Rendering) support
  - File-based routing via `@react-router/fs-routes`
  - Route modules with `loader` and `action` functions
  - Type-safe route definitions with automatic type generation

- **File-Based Routing**:
  - Uses `@react-router/fs-routes` package from the official React Router ecosystem
  - Routes are automatically generated from files in `src/routes/` directory
  - **Do NOT use** `aljaff94/react-router-fs-routes` - it's a different, incompatible package

- **Documentation Source**:
  - Always reference `/remix-run/react-router` for React Router v7 documentation
  - **Never use** `/website/reactrouter` as it documents older versions

### Route Module Structure

- **Route Directory**: All route modules **must** be placed in the `src/routes/` directory. The `src/pages/` directory is not used.

- **Route Module Pattern**: Each route file follows the **Route Module API**, exporting functions for UI, data loading, and data mutations:

  - **UI Component**: Export a `Component` function (or use default export) for the route's UI.

  ```tsx
  // Named export (recommended)
  export function Component() {
    return <div>My Route</div>;
  }

  // Or default export
  export default function MyRoute() {
    return <div>My Route</div>;
  }
  ```

  - **Data Loading**: Export an `async loader` function to fetch data before the component renders. This runs on the server during SSR and on navigation.

  ```tsx
  import type { Route } from "./+types/my-route";

  export async function loader({ params }: Route.LoaderArgs) {
    const data = await fetchData(params.id);
    return { data };
  }
  ```

  - **Data Mutations**: Export an `async action` function to handle form submissions (creates, updates, deletes). Actions always run on the server.

  ```tsx
  import type { Route } from "./+types/my-route";

  export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    await saveData(formData);
    return { success: true };
  }
  ```

  - **Type Safety**: React Router v7 automatically generates route-specific types in virtual `+types` modules. Import the `Route` namespace for type-safe `LoaderArgs`, `ActionArgs`, and `ComponentProps`.

### React Router v7 Imports

- **Core routing (universal)**: Import from `react-router`

  ```tsx
  import { Outlet, Link, useNavigate, useLoaderData, Form } from "react-router";
  ```

- **DOM-specific features**: Import from `react-router/dom` (with forward slash)

  ```tsx
  import { HydratedRouter } from "react-router/dom";
  ```

- **Development tools**: Import from `@react-router/dev`

  ```tsx
  import { type RouteConfig } from "@react-router/dev/routes";
  ```

- **Node.js server**: Import from `@react-router/node`

  ```tsx
  import { createRequestHandler } from "@react-router/node";
  ```

## 2. Data Flow

- **Loaders & Actions**: `loader` and `action` functions in the `src/routes` files should handle data fetching and mutations as needed for your application logic.
- **Accessing Data in Components**: Use the `useLoaderData()` hook in your `Component` to access the data returned from its `loader`.
- **Submitting Data**:
- For full-page navigations (e.g., creating a new item), use the `<Form>` component from `react-router`.
- For in-page data mutations that don't require navigation (e.g., updating an item on a detail page), use the `useFetcher()` hook.

## 3. Component & UI Conventions

- **UI Library**: **Always** use pre-built components from the `shadcn/ui` library where possible. All necessary components are already installed.
- **Component Structure**:
  - **Shared Components**: Reusable components used across multiple routes should be placed in `src/components`.
  - **Route-Specific Components**: Components used by only a single route should be co-located in that route's file (e.g., a `BrandListItem` component inside `src/routes/brands.tsx`).
- **Styling**: Use Tailwind CSS classes for all styling.

## 4. Form Handling

- **Recommended Library**: Use **React Hook Form** for all form state management and validation.

## 5. Server-Side Rendering (SSR)

This project uses SSR with **React Router v7's Framework Mode**, which provides built-in SSR support.

### Entry Points

- **Server (`src/entry.server.tsx`)**: The server entry point **must** export a `handleRequest` function (or default export) that uses `renderToPipeableStream` from `react-dom/server` and `<ServerRouter>` from `react-router`.

  ```tsx
  // src/entry.server.tsx
  import { renderToPipeableStream } from "react-dom/server";
  import { ServerRouter } from "react-router";
  // ... other imports

  export default function handleRequest(...) {
    // ... logic to create stream
    const { pipe } = renderToPipeableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      // ... options
    );
    // ... logic to return response

  ```tsx
  // src/entry.client.tsx
  import { hydrateRoot } from "react-dom/client";
  import { HydratedRouter } from "react-router/dom"; // forward slash!

  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>
  );
  ```

### Server-Side Constraints

- **No Browser APIs**: Code in the `src/server/` directory or any `loader` function **must not** access browser-only APIs like `localStorage`, `window`, or `document`. This will cause the app to crash during server-side rendering. Use server-state management (like a database or session) instead.
- **Await Promises**: All asynchronous operations in `loader` functions (e.g., database calls) **must** be `await`ed. Failure to do so will pass an unresolved promise to the component, causing a crash.

## 6. AI Communication Style

- **Explain Before Acting**: Before executing any command, making a file change, or calling a tool, you **must** first state what you are about to do and why. This provides transparency and allows for course correction.
