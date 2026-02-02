import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getStudentFees } from "../api/feeApi";

const MyFees = () => {
  const [fee, setFee] = useState(null);

  useEffect(() => {
    getStudentFees(localStorage.getItem("userId"))
      .then(res => setFee(res.data));
  }, []);

  if (!fee) return <MainLayout>Loading...</MainLayout>;

  return (
    <MainLayout>
      <h2>My Fees</h2>

      <p>Total Fee: ₹{fee.totalFee}</p>
      <p>Paid: ₹{fee.paidAmount}</p>
      <p>Due: ₹{fee.totalFee - fee.paidAmount}</p>

      <h4>Transactions</h4>
      {fee.transactions.map((t, i) => (
        <div key={i}>
          ₹{t.amount} via {t.mode} (
          {new Date(t.date).toLocaleDateString()})
        </div>
      ))}
    </MainLayout>
  );
};

export default MyFees;
