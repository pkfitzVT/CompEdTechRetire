function ComparisonSummary({ pension, drawdown }) {
    const difference = (parseFloat(drawdown) - parseFloat(pension)).toFixed(2);

    return (
        <div style={{ marginTop: '2rem', padding: '1rem', borderTop: '2px solid #666', backgroundColor: '#fef9e7' }}>
            <h3>Retirement Income Comparison</h3>
            <ul>
                <li><strong>Annual Pension:</strong> ${pension}</li>
                <li><strong>Annual Drawdown (No Pension):</strong> ${drawdown}</li>
                <li>
                    <strong>Difference:</strong>{' '}
                    <span style={{ color: difference >= 0 ? 'green' : 'red' }}>
            ${difference}
          </span>
                </li>
            </ul>
        </div>
    );
}

export default ComparisonSummary;
