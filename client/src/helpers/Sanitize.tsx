import React from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

interface SanitizeProps {
  html: string;
}

const Sanitize: React.FC<SanitizeProps> = ({ html }) => {
  const clean = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });

  return <div className="sanitized-html">{parse(clean)}</div>;
};
export default Sanitize;
