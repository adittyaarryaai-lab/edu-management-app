import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getReport } from "../api/marksApi";

const ReportCard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      getReport(userId).then(res => setData(res.data));
    }
  }, []);

  return (
    <MainLayout>
      <h2>Report Card</h2>

      {data.map((r, i) => (
        <div key={i}>
          <h4>{r.exam}</h4>
          <p>Total: {r.total}/{r.maxTotal}</p>
          <p>Percentage: {r.percentage}%</p>
          <p>Grade: {r.grade}</p>
        </div>
      ))}
    </MainLayout>
  );
};

export default ReportCard;
