import { Link } from "react-router-dom";
import { FileImage, FileText, Ruler, BadgeCheck } from "lucide-react";
import { toolPages } from "@/tools/toolPages";

const iconFor = (path: string) => {
  if (path.includes("pdf")) return FileText;
  if (path.includes("job-application") || path.includes("passport")) return BadgeCheck;
  if (path.includes("kb")) return Ruler;
  return FileImage;
};

/** Grid of every tool page — shown on the homepage. */
const ToolsGrid = () => (
  <section id="tools" className="container mx-auto px-4 py-12 max-w-5xl">
    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">Popular tools</h2>
    <p className="text-muted-foreground text-center mb-8">
      Need a specific size or format? Jump straight to the right tool.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {toolPages.map((t) => {
        const Icon = iconFor(t.path);
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
  </section>
);

export default ToolsGrid;
