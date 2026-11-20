/* Segmented radio choice ("Particulier / Professionnel"). `options` are strings or { value, label }. */
export default function RadioGroup({ name, label, options, value, onChange, full = true }) {
  return (
    <fieldset className={full ? 'field full' : 'field'}>
      <legend className="field-label">{label}</legend>
      <div className="seg">
        {options.map(o => {
          const { value: v, label: text } = typeof o === 'string' ? { value: o, label: o } : o;
          return (
            <label key={v}>
              <input type="radio" name={name} value={v} checked={value === v} onChange={() => onChange(v)} />
              <span>{text}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
