import type { ReactNode } from "react";

export const href = (path = "") => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="site-frame">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <header className="topbar">
        <a className="brand" href={href()}>
          <span className="brand-mark" aria-hidden="true">
            PI
          </span>
          <span>
            <strong>Pathology Informatics</strong>
            <small>Interactive curriculum</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href={href("#topics")}>Topics</a>
          <a href={href("#coverage")}>Coverage</a>
          <a href={href("#about")}>About</a>
        </nav>
      </header>
      {children}
      <footer>
        <span>
          <strong>Independent educational project</strong> · aligned to PIER Essentials R5
        </span>
        <span>
          Version {__COMMIT__} · Updated {__BUILD_DATE__}
        </span>
        <a href={href()}>Curriculum home ↑</a>
      </footer>
    </div>
  );
}
