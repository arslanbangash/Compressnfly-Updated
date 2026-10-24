import { Link } from "react-router-dom";
import { FileImage, FileText, Ruler, BadgeCheck, RefreshCw } from "lucide-react";
import { GROUP_LABELS, groupOf, toolPages, type ToolGroup, type ToolPageConfig } from "@/tools/toolPages";

const iconFor = (t: ToolPageConfig) => {
  const g = groupOf(t);
  if (g === "image") return RefreshCw;
  if (t.path.includes("pdf")) return FileText;
  if (t.path.includes("job-application") || t.path.includes("passport")) return BadgeCheck;
  if (t.path.includes("kb") || t.path.includes("mb")) return Ruler;
  return FileImage;
};

const ORDER: ToolGroup[] = ["compress", "image", "pdf"];

/** Every tool page, grouped by category — shown on the homepage. */
const ToolsGrid = () => (
  <section id="tools" className="container mx-auto px-4 py-12 max-w-5xl">
    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">All tools</h2>
    <p className="text-muted-foreground text-center mb-8">
      Compress to an exact size, convert between formats, or work with PDFs — all free and in your browser.
    </p>
    {ORDER.map((group) => {
      const items = toolPages.filter((t) => groupOf(t) === group);
      if (!items.length) return null;
      return (
        <div key={group} className="mb-10 last:mb-0">
          <h3 className="text-lg font-semibold text-foreground mb-4">{GROUP_LABELS[group]}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((t) => {
              const Icon = iconFor(t);
              return (
                <Link
                  key={t.path}
                  to={t.path}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary hover:shadow-md transition-all"
                >
                  <Icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="block font-semibold text-card-foreground">{t.name}</span>
                    <span className="block text-sm text-muted-foreground">{t.blurb}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      );
    })}
  </section>
);

export default ToolsGrid;
