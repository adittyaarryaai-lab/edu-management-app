import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getParentDashboard } from "../api/parentApi";

const ParentDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getParentDashboard().then(res => setData(res.data));
  }, []);

  if (!data) {
    return <MainLayout>Loading...</MainLayout>;
  }

  return (
    <MainLayout>
      <h2>Child Overview</h2>

      <h4>Attendance</h4>
      <p>
        {data.attendance.present}/{data.attendance.total} (
        {data.attendance.percentage}%)
      </p>

      <h4>Exams</h4>
      {data.exams.map((e, i) => (
        <div key={i}>
          {e.examId?.name}
        </div>
      ))}

      <h4>Fees</h4>
      <p>Total: ₹{data.fees?.totalFee}</p>
      <p>Paid: ₹{data.fees?.paidAmount}</p>
      <p>
        Due: ₹{data.fees
          ? data.fees.totalFee - data.fees.paidAmount
          : 0}
      </p>
    </MainLayout>
  );
};

export default ParentDashboard;
