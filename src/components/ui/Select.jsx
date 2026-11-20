import { forwardRef } from 'react';
import Field from './Field.jsx';

/* `options` accepts plain strings or { value, label } objects. */
const Select = forwardRef(function Select({ id, label, hint, error, full, options, className, ...props }, ref) {
  return (
    <Field id={id} label={label} hint={hint} error={error} full={full}>
      {a11y => (
        <div className="select">
          <select ref={ref} className={className ? `control ${className}` : 'control'} {...a11y} {...props}>
            {options.map(o => {
              const { value, label: text } = typeof o === 'string' ? { value: o, label: o } : o;
              return <option key={value} value={value}>{text}</option>;
            })}
          </select>
        </div>
      )}
    </Field>
  );
});

export default Select;
