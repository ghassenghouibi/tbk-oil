/* Shared wrapper for every form control: label, control, hint and error message.
   Wires the ids so screen readers announce the hint and the error with the control. */
export default function Field({ id, label, hint, error, full = false, children }) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return (
    <div className={full ? 'field full' : 'field'}>
      <label className="field-label" htmlFor={id}>{label}</label>
      {children({ id, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined })}
      {hint && !error && <small className="field-hint" id={`${id}-hint`}>{hint}</small>}
      {error && <small className="field-error" id={`${id}-error`}>{error}</small>}
    </div>
  );
}
