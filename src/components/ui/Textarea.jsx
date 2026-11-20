import { forwardRef } from 'react';
import Field from './Field.jsx';

const Textarea = forwardRef(function Textarea({ id, label, hint, error, full = true, className, ...props }, ref) {
  return (
    <Field id={id} label={label} hint={hint} error={error} full={full}>
      {a11y => <textarea ref={ref} className={className ? `control ${className}` : 'control'} {...a11y} {...props} />}
    </Field>
  );
});

export default Textarea;
