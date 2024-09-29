
import { Pie } from "react-chartjs-2";

function PieChart(props) {
    let obj = props
  return (
    <div className="chart-container">
      <h2>Monthly Payment: $ {obj.monthlypayment}</h2>
      <Pie
        data={obj.chartData}
        options={{
          events : ['mousemove'],
          plugins: {
            title: {
              display: false,
              text: "Users Gained between 2016-2020"
            }
          }
        }}
      />
    </div>
  );
}
export default PieChart;