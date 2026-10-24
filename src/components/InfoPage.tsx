import type { ReactNode } from "react";
import Header from "@/components/Header";

interface InfoPageProps {
  title: string;
  updated?: string;
  children: ReactNode;
}

/** Simple text-page layout used by About, Contact, Privacy and Terms. */
const InfoPage = ({ title, updated, children }: InfoPageProps) => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-foreground mb-2">{title}</h1>
      {updated && <p className="text-sm text-muted-foreground mb-8">Last updated: {updated}</p>}
      <div className="prose md:prose-lg max-w-none dark:prose-invert">{children}</div>
    </main>
  </div>
);

export default InfoPage;
