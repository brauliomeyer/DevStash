import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

export function TopBar() {
  return (
    <header className="flex items-center gap-4 border-b px-4 py-3">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input type="search" placeholder="Search…" className="pl-8" />
      </div>
      <Button className="ml-auto">
        <Plus data-icon="inline-start" />
        New Item
      </Button>
    </header>
  );
}
