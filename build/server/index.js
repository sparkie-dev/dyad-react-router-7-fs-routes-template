import { jsx, jsxs } from "react/jsx-runtime";
import { renderToPipeableStream } from "react-dom/server";
import { ServerRouter, Outlet } from "react-router";
function handleRequest(request, responseStatusCode, responseHeaders, routerContext) {
  var pipe = renderToPipeableStream(jsx(ServerRouter, { context: routerContext, url: request.url }), {
    bootstrapScripts: ["/src/entry.client.tsx"],
    onShellReady: function() {
      responseHeaders.set("content-type", "text/html");
      pipe(response);
    }
  }).pipe;
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function Component$2() {
  return jsxs("div", {
    children: [jsx("h1", {
      children: "Root Layout"
    }), jsx(Outlet, {})]
  });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Component: Component$2
}, Symbol.toStringTag, { value: "Module" }));
const MadeWithSparkie = () => {
  return /* @__PURE__ */ jsx("div", { className: "p-4 text-center", children: /* @__PURE__ */ jsx(
    "a",
    {
      href: "https://www.sparkie.dev/",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
      children: "Made with Sparkie App Studio"
    }
  ) });
};
async function loader() {
  return {};
}
function Component$1() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen flex items-center justify-center bg-gray-100",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "text-center",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl font-bold mb-4",
        children: "Welcome to Your Blank App"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-xl text-gray-600",
        children: "Start building your amazing project here!"
      })]
    }), /* @__PURE__ */ jsx(MadeWithSparkie, {})]
  });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Component: Component$1,
  loader
}, Symbol.toStringTag, { value: "Module" }));
function Component() {
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-2xl font-bold",
      children: "404 - Page Not Found"
    }), /* @__PURE__ */ jsx("p", {
      children: "The page you are looking for does not exist."
    })]
  });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Component
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CZQbHhTJ.js", "imports": ["/assets/root-D_zvdyIk.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/root-D_zvdyIk.js", "imports": ["/assets/root-D_zvdyIk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_index-DhvMH2mk.js", "imports": ["/assets/root-D_zvdyIk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/$": { "id": "routes/$", "parentId": "root", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_-DhvMH2mk.js", "imports": ["/assets/root-D_zvdyIk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-77351bcd.js", "version": "77351bcd", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/$": {
    id: "routes/$",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
