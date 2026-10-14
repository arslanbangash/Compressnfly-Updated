// Used only at build time by scripts/prerender.mjs to turn each route into static HTML.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import App from "./App";

export { pages, SITE_URL } from "./seo/meta";

export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  );
  const h = helmetContext.helmet!;
  const head = [h.title.toString(), h.meta.toString(), h.link.toString(), h.script.toString()].join("\n    ");
  return { html, head };
}
