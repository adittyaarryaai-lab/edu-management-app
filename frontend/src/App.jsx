import { useEffect, useState } from "react";
import api from "./api/axios";

function App() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.get("/health")
      .then((res) => {
        setStatus(res.data.message);
      })
      .catch(() => {
        setStatus("Backend not connected");
      });
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>EduFlowAI</h1>
      <p>{status}</p>
    </div>
  );
}

export default App;
