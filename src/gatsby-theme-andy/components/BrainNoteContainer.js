import React from "react";
import { Link } from "gatsby";
import {
  useStackedPagesProvider,
  LinkToStacked,
} from "react-stacked-pages-hook";
import { Helmet } from "react-helmet";

import BrainNote from "./BrainNote";

import "../../style.css";

const NOTE_WIDTH = 624; // w-xl

// A wrapper component to render the content of a page when stacked
const StackedPageWrapper = ({
  PageIndexProvider,
  children,
  slug,
  title,
  overlay,
  obstructed,
  i,
}) => (
  <PageIndexProvider value={i}>
    <div
      className={`note-container ${overlay ? "shadow-lg" : ""} ${
        obstructed ? "note-container-obstructed" : ""
      }`}
      style={{ left: 40 * i, right: -584, width: NOTE_WIDTH }}
    >
      <div className={`note-content`}>{children}</div>
      <LinkToStacked to={slug} className="obstructed-label">
        {title || slug}
      </LinkToStacked>
    </div>
  </PageIndexProvider>
);

const BrainNotesContainer = ({ slug, note, location, siteMetadata }) => {
  // process data from gatsby pageQuery API
  const processPageQuery = React.useCallback((x) => x.json.data.brainNote, []);
  const [
    stackedPages,
    stackedPageStates,
    navigateToStackedPage,
    ContextProvider,
    PageIndexProvider,
    scrollContainer,
  ] = useStackedPagesProvider({
    firstPageSlug: slug,
    location,
    processPageQuery,
    pageWidth: NOTE_WIDTH,
  });

  return (
    <div className="layout">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brian's Notes</title>
      </Helmet>
      <header className="notes-header">
        <Link to="/" className="logo">
          Brian's Notes
        </Link>
        <a href="https://briansaunders.me" className="home-link">
          Home
        </a>
      </header>

      <div className="outer-container" ref={scrollContainer}>
        <div
          className="note-columns-container"
          style={{ width: NOTE_WIDTH * (stackedPages.length + 1) }}
        >
          <ContextProvider value={{ stackedPages, navigateToStackedPage }}>
            {/* Render the first page */}
            <StackedPageWrapper
              PageIndexProvider={PageIndexProvider}
              i={0}
              slug={slug}
              title={note.title}
              overlay={
                stackedPageStates[slug] && stackedPageStates[slug].overlay
              }
              obstructed={
                stackedPageStates[slug] && stackedPageStates[slug].obstructed
              }
            >
              <BrainNote note={note} />
            </StackedPageWrapper>

            {/* Render the stacked pages */}
            {stackedPages.map((page, i) => (
              <StackedPageWrapper
                PageIndexProvider={PageIndexProvider}
                i={i + 1}
                key={page.slug}
                slug={page.slug}
                title={page.data.title}
                overlay={
                  stackedPageStates[page.slug] &&
                  stackedPageStates[page.slug].overlay
                }
                obstructed={
                  stackedPageStates[page.slug] &&
                  stackedPageStates[page.slug].obstructed
                }
              >
                <BrainNote note={page.data} />
              </StackedPageWrapper>
            ))}
          </ContextProvider>
        </div>
      </div>
    </div>
  );
};

export default BrainNotesContainer;
