import {
  ClipboardList,
  CookingPot,
  NotebookPen,
  Scale,
  Sparkles,
} from "lucide-react";
import type { SiteSettings } from "@/lib/schemas";

const icons = {
  clipboard: ClipboardList,
  scales: Scale,
  pot: CookingPot,
  notebook: NotebookPen,
  sparkles: Sparkles,
} as const;

export function ValueProps({
  items,
}: {
  items: SiteSettings["valueProps"];
}) {
  return (
    <section className="bg-bg-cream text-text-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:grid-cols-2 sm:px-6 md:grid-cols-3 lg:grid-cols-5 lg:px-8">
        {items.map((item) => {
          const Icon = icons[item.icon as keyof typeof icons] ?? Sparkles;
          return (
            <div key={item.title} className="text-center sm:text-left">
              <Icon className="mx-auto mb-3 size-7 text-[#8a6a3d] sm:mx-0" strokeWidth={1.5} />
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#4a3a2e]">
                {item.blurb}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
