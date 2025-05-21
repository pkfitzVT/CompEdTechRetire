// src/components/LabeledInput.jsx
function LabeledInput({ label, value, onChange, type = "number" }) {
    return (
        <label style={{ display: 'block', marginBottom: '1rem' }}>
            {label}
            <input
                type={type}
                value={value}
                onChange={onChange}
                style={{ marginLeft: '0.5rem', width: '100%' }}
            />
        </label>
    );
}

export default LabeledInput;
