import { useEffect, useState } from "react";
import axios from "axios";

import { Bar, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function DashboardCharts() {

  const [chartData, setChartData] = useState([]);
  const [statusData, setStatusData] = useState([]);

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

        data: chartData.map(item => item.total),

        backgroundColor: "#2563eb"

      }

    ]

  };

  const pieData = {

    labels: statusData.map(item => item.status),

    datasets: [

      {

        data: statusData.map(item => item.total),

        backgroundColor: [
          "#f59e0b",
          "#22c55e",
          "#ef4444"
        ]

      }

    ]

  };

  return (

    <div className="bg-white mt-8 p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-6">
        Placement Analytics
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