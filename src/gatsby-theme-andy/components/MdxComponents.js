import React from "react";
import Tippy from "@tippyjs/react";
import { LinkToStacked } from "react-stacked-pages-hook";
import { Link } from "gatsby";

// Animation styles are imported in `src/styles.css`

// TODO cmd+click open page in new tab

const AnchorTag = ({ href, popups = {}, noPopups = false, ...restProps }) => {
  if (!href) href = restProps.to;
  if (!href.match(/^http/))
    return noPopups ? (
      <Link {...restProps} to={href} />
    ) : (
      <Tippy
        content={popups[href.replace(/^\//, "")]}
        placement="right"
        animation="shift-away"
        arrow
      >
        <LinkToStacked {...restProps} to={href} />
      </Tippy>
    );
  return noPopups ? (
    <a {...restProps} href={href} />
  ) : (
    <a {...restProps} href={href} className="external-link" />
  );
};

export default {
  a: AnchorTag,
};
