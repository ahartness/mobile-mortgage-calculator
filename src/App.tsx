import { useState } from 'react'
import './App.css'

function App() {
    const [homePrice, setHomePrice] = useState(400000);
    const [downPayment, setDownPayment] = useState(20);
    const [downPaymentType, setDownPaymentType] = useState<'cash' | 'percent'>('percent');
    const [loanTerm, setLoadTerm] = useState(30);
    const [interestRate, setInterestRate] = useState(6.3);

    const getLoanAmount = () => {
        if (downPaymentType === 'cash') {
            return homePrice - downPayment;
        } else {
            return homePrice - (homePrice * (downPayment / 100));
        }
    }

    const getMonthlyPayment = () => {
        const loanAmount = getLoanAmount();
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;

        if (interestRate === 0) {
            return loanAmount / numberOfPayments;
        }

        const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
        return monthlyPayment;
    }

    const getMonthlyTaxes = () => {
        // Placeholder for future implementation
        return 0;
    }

    const getMonthlyInsurance = () => {
        // Placeholder for future implementation
        return 0;
    }

    const getMonthlyPMI = () => {
        // Placeholder for future implementation
        return 0;
    }

    return (
        <div className="App">
            <h1>Mortgage Calculator</h1>
            <div className="calculator">
                <div className="input-group">
                    <label>Home Price ($)</label>
                    <input
                        type="number"
                        value={homePrice}
                        onChange={(e) => setHomePrice(Number(e.target.value))}
                    />
                </div>
                <div className="input-group">
                    <label>Down Payment</label>
                    <input
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                    />
                    <select
                        value={downPaymentType}
                        onChange={(e) => setDownPaymentType(e.target.value as 'cash' | 'percent')}
                    >
                        <option value="percent">Percent</option>
                        <option value="cash">Cash</option>
                    </select>
                </div>
                <div className="input-group">
                    <label>Loan Term (years)</label>
                    <input
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoadTerm(Number(e.target.value))}
                    />
                </div>
                <div className="input-group">
                    <label>Interest Rate (%)</label>
                    <input
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                    />
                </div>
            </div>
            <div className="actions">
                <button onClick={() => {
                    setHomePrice(400000);
                    setDownPayment(20);
                    setDownPaymentType('percent');
                    setLoadTerm(30);
                    setInterestRate(6.3);
                }}>
                    Reset
                </button>
            </div>
            <div className="result">
                <h2>Monthly Payment: ${getMonthlyPayment().toFixed(2)}</h2>
                <p>Loan Amount: ${getLoanAmount().toFixed(2)}</p>
            </div>
            <div>
                <h3>Additional Costs (to be implemented)</h3>
                <p>Monthly Taxes: ${getMonthlyTaxes().toFixed(2)}</p>
                <p>Monthly Insurance: ${getMonthlyInsurance().toFixed(2)}</p>
                <p>Monthly PMI: ${getMonthlyPMI().toFixed(2)}</p>
            </div>
        </div>
    )
}

export default App
