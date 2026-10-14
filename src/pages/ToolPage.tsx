import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import CompressionTool from "@/components/CompressionTool";
import { toolPagesByPath, type ToolPageConfig } from "@/tools/toolPages";

const ToolPage = ({ config }: { config: ToolPageConfig }) => {
  const related = config.related.map((p) => toolPagesByPath[p]).filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="container mx-auto px-4 pt-10 max-w-4xl text-center">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">›</span>
          <span>{config.name}</span>
        </nav>
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{config.h1}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{config.intro}</p>
        <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-primary" />
          Free · No sign-up · Files never leave your device
        </p>
      </section>

      <CompressionTool {...config.tool} />

      <article className="container mx-auto px-4 pb-8 max-w-3xl">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {config.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
              {section.list && (
                <ul>
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <h2>Frequently asked questions</h2>
          {config.faqs.map((faq) => (
            <div key={faq.q}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}

          {config.source && (
            <p className="text-sm">
              Source:{" "}
              <a href={config.source.url} target="_blank" rel="noopener noreferrer">
                {config.source.label}
              </a>
            </p>
          )}
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-foreground mb-4">Related tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {related.map((t) => (
                <Link
                  key={t.path}
                  to={t.path}
                  className="rounded-lg border border-border bg-card p-4 hover:border-primary transition-colors"
                >
                  <span className="block font-semibold text-card-foreground">{t.name}</span>
                  <span className="block text-sm text-muted-foreground">{t.blurb}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default ToolPage;
