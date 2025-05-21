import { useState } from 'react';
import LabeledInput from './LabeledInput';

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

        if (isNaN(salary) || isNaN(raise) || isNaN(yos)) {
            alert("Please fill in all required numeric fields.");
            return;
        }

        // Calculate projected salaries
        const salaries = [];
        let current = salary;
        for (let i = 0; i < 15; i++) {
            salaries.push(current);
            current *= 1 + raise / 100;
        }

        const avgTop3 = salaries.sort((a, b) => b - a).slice(0, 3).reduce((sum, val) => sum + val, 0) / 3;
        const multiplier = (yos + 15) / 30;
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
                <LabeledInput label="Initial Salary:" value={initialSalary} onChange={(e) => setInitialSalary(e.target.value)} />
                <LabeledInput label="% Raises Per Year:" value={raisePercent} onChange={(e) => setRaisePercent(e.target.value)} />
                <LabeledInput label="% Pension (ignored for now):" value={pensionPercent} onChange={(e) => setPensionPercent(e.target.value)} />
                <LabeledInput label="Years of Service at Start:" value={yearsOfService} onChange={(e) => setYearsOfService(e.target.value)} />
                <LabeledInput label="Annual Expenses:" value={annualExpenses} onChange={(e) => setAnnualExpenses(e.target.value)} />
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
