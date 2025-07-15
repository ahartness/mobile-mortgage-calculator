import { useState } from 'react'
import './App.css'

function App() {
    const [homePrice, setHomePrice] = useState(400000);
    const [downPayment, setDownPayment] = useState(20);
    const [downPaymentType, setDownPaymentType] = useState<'cash' | 'percent'>('percent');
    const [loanTerm, setLoadTerm] = useState(30);
    const [interestRate, setInterestRate] = useState(6.3);
    const [pmi, setPMI] = useState(0.17);
    const [county, setCounty] = useState<'Meck' | 'Union' | 'Lancaster' | 'York'>('Meck');

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
        // Mecklenburg County, NC has a tax rate of 1.05%
        // Union County, NC has a tax rate of 0.73%
        // Lancaster County, SC has a tax rate of 0.47%
        // York County, SC has a tax rate of 0.64%

        switch (county) {
            case 'Meck':
                return (homePrice * (1.05 / 100)) / 12;
            case 'Union':
                return (homePrice * (.73 / 100)) / 12; 
            case 'Lancaster':
                return (homePrice * (.47 / 100)) / 12;
            case 'York':
                return (homePrice * (.64 / 100)) / 12;
            default:
                return 0;
        }
    }

    const getMonthlyInsurance = () => {
        // Placeholder for future implementation
        // Mecklenburg = 1605/year
        // Union = 1074/year
        // Lancaster = 1094/year
        // York = 1500/year

        switch (county) {
            case 'Meck':
                return 1605 / 12;
            case 'Union':
                return 1074 / 12;
            case 'Lancaster':
                return 1094 / 12;
            case 'York':
                return 1500 / 12;
            default:
                return 0;
        }
    }

    const getMonthlyPMI = () => {
        // Placeholder for future implementation
        return (getLoanAmount() * (pmi / 100)) / 12;
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
                <div className="input-group">
                    <label>PMI (%)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={pmi}
                        onChange={(e) => setPMI(Number(e.target.value))}
                    />
                </div>  
                <div className="input-group">
                    <label>County</label>
                    <select
                        value={county}
                        onChange={(e) => setCounty(e.target.value as 'Meck' | 'Union' | 'Lancaster' | 'York')}
                    >
                        <option value="Meck">Mecklenburg</option>
                        <option value="Union">Union</option>
                        <option value="Lancaster">Lancaster</option>
                        <option value="York">York</option>
                    </select>
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
                <h2>Principal + Interest: ${getMonthlyPayment().toFixed(2)}</h2>
                <p>Loan Amount: ${getLoanAmount().toFixed(2)}</p>
            </div>
            <div>
                <h3>Additional Costs (to be implemented)</h3>
                <p>Monthly Taxes: ${getMonthlyTaxes().toFixed(2)}</p>
                <p>Yearly Taxes: ${(getMonthlyTaxes().toFixed(2) * 12).toFixed(2)}</p>
                <p>Monthly Insurance: ${getMonthlyInsurance().toFixed(2)}</p>
                <p>Monthly PMI: ${getMonthlyPMI().toFixed(2)}</p>
            </div>
            <div>
                <h3>Total Monthly Payment: ${(getMonthlyPayment() + getMonthlyTaxes() + getMonthlyInsurance() + getMonthlyPMI()).toFixed(2)}</h3>
            </div>
        </div>
    )
}

export default App
