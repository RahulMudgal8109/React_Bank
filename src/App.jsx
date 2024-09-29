import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "./chart/pichart";
Chart.register(CategoryScale);

function App() {
  const [homeValue, setHomeValue] = useState(3000);
  const [downPayment, setDownPayment] = useState((homeValue * 20) / 100);
  const [loanAmount, setLoanAmount] = useState(homeValue - downPayment);
  const [tenure, setTenure] = useState(5);
  const [rates, setRates] = useState(5);
  const [payment, setPayment] = useState(0);
  const [interest, setInterest] = useState(0);

  let data = {
    labels: ["Principle", "Interest"],
    datasets: [
      {
        label: "Ration of Principle and Interest ",
        data: [homeValue, interest],
        backgroundColor: ["#FCE1E6", "#B2DBFA"],
        borderColor: "rgb(73,165,232)",
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    let newDownPayment = Math.trunc((homeValue * 20) / 100);
    setDownPayment(newDownPayment);
    setLoanAmount(homeValue - newDownPayment);
  }, [homeValue]);
  useEffect(() => {
    setLoanAmount(homeValue - downPayment);
  }, [downPayment]);
  useEffect(() => {
    setDownPayment(homeValue - loanAmount);
  }, [loanAmount]);

  useEffect(() => {
    let ans1 = loanAmount * (rates / 100 / 12);
    let ans2 = 1 + rates / 100 / 12;
    let ans3 = 1 - Math.pow(ans2, -(12 * tenure));
    let final = ans1 / ans3;
    setPayment(final.toFixed(2));

    let totalInterest = (final * (tenure * 12) - loanAmount).toFixed(3);
    setInterest(totalInterest);

    // obj.setPayment(final)
  }, [homeValue, downPayment, loanAmount, rates, tenure]);

  return (
    <>
      <div class="container">
        <div class="left">
          <p>Home Value</p>
          <h2>${homeValue}</h2>
          <input
            type="range"
            min="0"
            max="10000"
            className="range"
            step="100"
            value={homeValue}
            onChange={(e) => {
              setHomeValue(e.target.value);
            }}
          />
          <div className="rates">
            <p className="min">1000</p>
            <p className="max">10000</p>
          </div>
          <p>Down Payment</p>
          <h2>${downPayment}</h2>
          <input
            type="range"
            min="0"
            max={homeValue}
            className="range"
            step="100"
            value={downPayment}
            onChange={(e) => {
              setDownPayment(e.target.value);
            }}
          />
          <div className="rates">
            <p className="min">0</p>
            <p className="max">{homeValue}</p>
          </div>
          <p>Loan Amount</p>
          <h2>${loanAmount}</h2>
          <input
            type="range"
            min="0"
            max={homeValue}
            className="range"
            step="100"
            value={loanAmount}
            onChange={(e) => {
              setLoanAmount(e.target.value);
            }}
          />
          <div className="rates">
            <p className="min">1000</p>
            <p className="max">10000</p>
          </div>
          <p>Intrest Rate</p>
          <h2>%{rates}</h2>
          <input
            type="range"
            min="0"
            max="18"
            className="range"
            value={rates}
            onChange={(e) => {
              setRates(e.target.value);
            }}
          />
          <div className="rates">
            <p className="min">2%</p>
            <p className="max">18%</p>
          </div>
          <select onChange={(e) => setTenure(Number(e.target.value))}>
            <option value="5">5 years</option>
            <option value="10">10 years</option>
            <option value="15">15years</option>
            <option value="20">20years</option>
            <option value="25">25years</option>
          </select>
        </div>
        <div class="right">
          <PieChart chartData={data} monthlypayment={payment} />
        </div>
      </div>
    </>
  );
}

export default App;
