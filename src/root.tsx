import { Outlet } from "react-router";

export function Component() {
  return (
    <div>
      <h1>Root Layout</h1>
      <Outlet />
    </div>
  );
}
