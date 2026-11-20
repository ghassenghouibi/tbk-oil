import { forwardRef } from 'react';
import Field from './Field.jsx';

const Input = forwardRef(function Input({ id, label, hint, error, full, className, ...props }, ref) {
  return (
    <Field id={id} label={label} hint={hint} error={error} full={full}>
      {a11y => <input ref={ref} className={className ? `control ${className}` : 'control'} {...a11y} {...props} />}
    </Field>
  );
});

export default Input;
