/* Round icon-only button (carousel arrows…). `label` is required: it is the accessible name. */
export default function IconButton({ label, className, children, ...props }) {
  return (
    <button type="button" className={className ? `icon-btn ${className}` : 'icon-btn'} aria-label={label} {...props}>
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
