// src/components/PensionCalculator.jsx
import { useState } from 'react';

function PensionCalculator() {
    const [initialSalary, setInitialSalary] = useState('');
    const [raisePercent, setRaisePercent] = useState('');
    const [pensionPercent, setPensionPercent] = useState('');
    const [yearsOfService, setYearsOfService] = useState('');
    const [annualExpenses, setAnnualExpenses] = useState('');

    const [result, setResult] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const salary = parseFloat(initialSalary);
        const raise = parseFloat(raisePercent);
        const yos = parseFloat(yearsOfService);

        // Project salaries for 15 years
        let salaries = [];
        let current = salary;
        for (let i = 0; i < 15; i++) {
            salaries.push(current);
            current *= 1 + raise / 100;
        }

        // Average top 3 years
        const top3 = salaries.sort((a, b) => b - a).slice(0, 3);
        const avgTop3 = top3.reduce((sum, s) => sum + s, 0) / 3;

        // Pension multiplier
        const multiplier = (yos + 15) / 30;

        // Final pension
        const pension = avgTop3 * multiplier;

        setResult({
            avgTop3: avgTop3.toFixed(2),
            multiplier: multiplier.toFixed(3),
            pension: pension.toFixed(2)
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Initial Salary:
                    <input type="number" value={initialSalary} onChange={(e) => setInitialSalary(e.target.value)} />
                </label>
                <br />
                <label>
                    % Raises Per Year:
                    <input type="number" value={raisePercent} onChange={(e) => setRaisePercent(e.target.value)} />
                </label>
                <br />
                <label>
                    % Pension (ignored for now):
                    <input type="number" value={pensionPercent} onChange={(e) => setPensionPercent(e.target.value)} />
                </label>
                <br />
                <label>
                    Years of Service at Start:
                    <input type="number" value={yearsOfService} onChange={(e) => setYearsOfService(e.target.value)} />
                </label>
                <br />
                <label>
                    Annual Expenses:
                    <input type="number" value={annualExpenses} onChange={(e) => setAnnualExpenses(e.target.value)} />
                </label>
                <br />
                <button type="submit">Calculate Pension</button>
            </form>

            {result && (
                <div>
                    <h4>Results:</h4>
                    <p>Average Top 3 Years: ${result.avgTop3}</p>
                    <p>Multiplier: {result.multiplier}</p>
                    <p><strong>Annual Pension: ${result.pension}</strong></p>
                </div>
            )}
        </div>
    );
}

export default PensionCalculator;
