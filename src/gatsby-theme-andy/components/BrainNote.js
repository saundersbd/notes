import React from "react";
import { Link } from "gatsby";
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";
import { MDXProvider } from "@mdx-js/react";
import { LinkToStacked } from "react-stacked-pages-hook";

import components from "./MdxComponents";
import useWindowWidth from "../../utils/useWindowWidth";

const NOTE_WIDTH = 624;

const BrainNote = ({ note }) => {
  const [width] = useWindowWidth();
  let references = [];
  let referenceBlock;
  if (note.inboundReferenceNotes != null) {
    const RefLink = width < 768 ? Link : LinkToStacked;
    references = note.inboundReferenceNotes.map((reference) => (
      <RefLink
        className="reference-block"
        to={reference.slug === "about" ? `about` : `/${reference.slug}`} // hack
        key={reference.slug}
      >
        <div className="reference-inner-block">
          <h5 className="reference-heading">{reference.title}</h5>
          <p className="reference-description">{reference.childMdx.excerpt}</p>
        </div>
      </RefLink>
    ));

    if (references.length > 0) {
      referenceBlock = (
        <div className="backlinks">
          <div className="refs-box">
            <h3>Referred in</h3>
            <div className="reference-list">{references}</div>
          </div>
        </div>
      );
    }
  }

  const popups = {};
  if (note.outboundReferenceNotes) {
    note.outboundReferenceNotes
      .filter((reference) => !!reference.childMdx.excerpt)
      .forEach((ln, i) => {
        popups[ln.slug] = (
          <div id={ln.slug} className="tooltip">
            <h5 className="reference-heading">{ln.title}</h5>
            <p className="reference-description">{ln.childMdx.excerpt}</p>
          </div>
        );
      });
  }

  const AnchorTagWithPopups = (props) => (
    <components.a {...props} popups={popups} noPopups={width < 768} />
  );

  return (
    <MDXProvider components={{ ...components, a: AnchorTagWithPopups }}>
      <div className="note-body">
        <h1>{note.title}</h1>
        <MDXRenderer>{note.childMdx.body}</MDXRenderer>
      </div>

      {referenceBlock}
    </MDXProvider>
  );
};

export default BrainNote;
