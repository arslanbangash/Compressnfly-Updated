import { Link } from "react-router-dom";

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
