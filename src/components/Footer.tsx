import { Link } from "react-router-dom";
import { GROUP_LABELS, groupOf, toolPages } from "@/tools/toolPages";

const links = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Use" },
];

const Footer = () => (
  <footer className="border-t border-border/40 mt-12">
    <div className="container mx-auto px-6 pt-8 grid gap-6 sm:grid-cols-3">
      {(["compress", "image", "pdf"] as const).map((group) => (
        <div key={group}>
          <p className="text-sm font-semibold text-foreground mb-3">{GROUP_LABELS[group]}</p>
          <nav aria-label={GROUP_LABELS[group]} className="flex flex-col gap-1.5">
            {toolPages.filter((t) => groupOf(t) === group).map((t) => (
              <Link key={t.path} to={t.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t.name}
              </Link>
            ))}
          </nav>
        </div>
      ))}
    </div>
    <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <p className="text-sm text-muted-foreground text-center">
        © {new Date().getFullYear()} Compressnfly. Files are compressed in your browser and never uploaded.
      </p>
    </div>
  </footer>
);

export default Footer;
