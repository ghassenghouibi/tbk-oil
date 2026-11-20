/* Eyebrow + title + optional lead, the heading pattern every section uses. */
export default function SectionHeading({ eyebrow, title, lead, className, children }) {
  return (
    <div className={className ? `section-heading ${className}` : 'section-heading'}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </div>
  );
}
