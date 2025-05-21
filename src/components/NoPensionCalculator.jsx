import { useState } from 'react';
import LabeledInput from './LabeledInput';

function NoPensionCalculator({ onResult }) {
    const [annualExpenses, setAnnualExpenses] = useState('');
    const [growthRate, setGrowthRate] = useState('');
    const [inflationRate, setInflationRate] = useState('');
    const [raiseRate, setRaiseRate] = useState('');
    const [initialSalary, setInitialSalary] = useState('');
    const [results, setResults] = useState(null);


    const handleSubmit = (e) => {
        e.preventDefault();

        const expensesInitial = parseFloat(annualExpenses);
        const growth = parseFloat(growthRate);
        const inflation = parseFloat(inflationRate);
        const raise = parseFloat(raiseRate);
        const startingSalary = parseFloat(initialSalary);

        if ([expensesInitial, growth, inflation, raise, startingSalary].some(isNaN)) {
            alert("Please enter valid numbers in all fields.");
            return;
        }

        let salary = startingSalary;
        let expenses = expensesInitial;
        let total401k = 0;
        let taxableInvestment = 0;
        const history = [];

        for (let year = 1; year <= 15; year++) {
            const salaryThisYear = salary;
            const expensesThisYear = expenses;
            const max401k = Math.min(30000, salaryThisYear);
            let contribution401k = max401k;

            let remaining = salaryThisYear - contribution401k;
            let tax = remaining * 0.2;
            let afterTax = remaining - tax;
            let leftover = afterTax - expensesThisYear;

            // 🛠️ Reduce 401k if deficit exists
            if (leftover < 0) {
                let step = 100;
                let attempts = 0;
                do {
                    contribution401k -= step;
                    if (contribution401k < 0) {
                        contribution401k = 0;
                        break;
                    }
                    remaining = salaryThisYear - contribution401k;
                    tax = remaining * 0.2;
                    afterTax = remaining - tax;
                    leftover = afterTax - expensesThisYear;
                    attempts++;
                } while (leftover < 0 && attempts < 100);
            }

            // ✅ Apply growth and add contributions
            total401k *= 1 + growth / 100;
            taxableInvestment *= 1 + growth / 100;

            total401k += contribution401k;
            if (leftover > 0) taxableInvestment += leftover;

            // Store for table (optional)
            history.push({
                year,
                salary: salaryThisYear.toFixed(2),
                contribution401k: contribution401k.toFixed(2),
                tax: tax.toFixed(2),
                afterTax: afterTax.toFixed(2),
                expenses: expensesThisYear.toFixed(2),
                leftover: leftover.toFixed(2),
                total401k: total401k.toFixed(2),
                taxableInvestment: taxableInvestment.toFixed(2)
            });

            // 🔄 Prepare for next year
            salary *= 1 + raise / 100;
            expenses *= 1 + inflation / 100;
        }



        const totalNestEgg = total401k + taxableInvestment;

        // 7. Compute annuitized drawdown (15 years, 4% growth)
        const drawdownGrowth = 1.04;
        const annuityFactor = Array.from({ length: 15 }, (_, i) => drawdownGrowth ** (14 - i)).reduce((a, b) => a + b, 0);
        const annualDraw = totalNestEgg / annuityFactor;

        setResults({
            total401k,
            taxableInvestment,
            totalNestEgg,
            annualDraw,
            history
        });

        // Send to App for comparison
        onResult({
            annualDraw: annualDraw.toFixed(2),
            totalNestEgg: totalNestEgg.toFixed(2)
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <LabeledInput label="Initial Salary:" value={initialSalary} onChange={(e) => setInitialSalary(e.target.value)} />
                <LabeledInput label="Annual Expenses:" value={annualExpenses} onChange={(e) => setAnnualExpenses(e.target.value)} />
                <LabeledInput label="Growth % (while working):" value={growthRate} onChange={(e) => setGrowthRate(e.target.value)} />
                <LabeledInput label="Inflation % (not used yet):" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} />
                <LabeledInput label="Raise % per year:" value={raiseRate} onChange={(e) => setRaiseRate(e.target.value)} />

                <button type="submit">Simulate Retirement Plan</button>
            </form>

            {results && (
                <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#eef' }}>
                    <h4>Retirement Simulation Summary</h4>
                    <p>Total 401k at retirement: ${results.total401k.toFixed(2)}</p>
                    <p>Total taxable investments: ${results.taxableInvestment.toFixed(2)}</p>
                    <p><strong>Total Retirement Nest Egg: ${results.totalNestEgg.toFixed(2)}</strong></p>
                    <p><strong>Estimated Annual Drawdown: ${results.annualDraw.toFixed(2)}</strong></p>
                </div>
            )}
        </div>
    );
}

export default NoPensionCalculator;
