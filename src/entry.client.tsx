import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

window.addEventListener("DOMContentLoaded", () => {
  hydrateRoot(
    document.getElementById("root")!,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>
  );
});