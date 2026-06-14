import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/professionals")({
  head: () => ({ meta: [{ title: "Professionnels · Integral Value" }] }),
  component: () => <Outlet />,
});
