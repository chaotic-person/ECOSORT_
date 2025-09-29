import { cn } from "@/lib/utils";
import { Recycle } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <Recycle className="h-8 w-8 text-primary" />
      <h1 className="text-2xl font-bold text-primary font-headline">
        EcoSort
      </h1>
    </div>
  );
}
