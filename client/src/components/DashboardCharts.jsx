import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
const [statusData, setStatusData] = useState([]);
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashboardCharts() {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {

    fetchChartData();
     fetchStatusChart();

  }, []);

  const fetchChartData = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/admin/applications-company"
      );

      setChartData(res.data);

    } catch (err) {

      console.log(err);

    }

  };
  const fetchStatusChart = async () => {

  try {

    const res = await axios.get(
      "http://localhost:5000/api/admin/status-chart"
    );

    setStatusData(res.data);

  } catch (err) {

    console.log(err);

  }

};

  const data = {

    labels: chartData.map(item => item.company_name),

    datasets: [

      {

        label: "Applications",

        data: chartData.map(item => item.total)

      }

    ]

  };
const pieData = {

  labels: statusData.map(item => item.status),

  datasets: [

    {

      data: statusData.map(item => item.total)

    }

  ]

};
  return (

    <div className="bg-white mt-8 p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-4">
        Applications by Company
      </h2>

     <div className="grid md:grid-cols-2 gap-8">

  <div>
    <Bar data={data} />
  </div>

  <div>
    <Pie data={pieData} />
  </div>

</div>

    </div>

  );

}

export default DashboardCharts;