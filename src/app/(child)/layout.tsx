import AppShell from "@/components/layout/app-shell";

export default function ChildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
