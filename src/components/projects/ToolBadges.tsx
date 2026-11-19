import { tools, type ToolId } from "@/data/tools";
import { cn } from "@/lib/utils";

/** Row of tool logos (Figma, Next.js…) from the tools registry. */
export default function ToolBadges({ ids, className }: { ids: readonly ToolId[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2 h-6 sm:h-7 lg:h-8", className)}>
      {ids.map((id) => {
        const tool = tools[id];
        const invert = "invertDark" in tool && tool.invertDark;
        return (
          <li key={id} className="h-full">
            {/* eslint-disable-next-line @next/next/no-img-element -- tiny SVG logos, no optimization needed */}
            <img
              src={tool.src}
              alt={tool.name}
              title={tool.name}
              className={cn("h-full w-auto object-contain", invert ? "dark:invert" : "dark:brightness-200 dark:contrast-100")}
            />
          </li>
        );
      })}
    </ul>
  );
}
