/* One button for the whole site. Renders a link when `href` is given, a <button> otherwise.
   variant: gold (main CTA) · ghost (on dark/photo backgrounds) · olive (forms) · outline (secondary)
   size: md · sm */
export default function Button({ href, variant = 'gold', size = 'md', loading = false, className, children, type = 'button', ...props }) {
  const cls = ['btn', `btn-${variant}`, size === 'sm' && 'btn-sm', loading && 'is-loading', className].filter(Boolean).join(' ');
  if (href) return <a className={cls} href={href} {...props}>{children}</a>;
  return (
    <button className={cls} type={type} disabled={loading || props.disabled} aria-busy={loading || undefined} {...props}>
      {children}
    </button>
  );
}
