import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getMaterials } from "../api/materialApi";

const StudyMaterials = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getMaterials({
      className: localStorage.getItem("className"),
      subject: "Maths"
    }).then(res => setList(res.data));
  }, []);

  return (
    <MainLayout>
      <h2>Study Materials</h2>

      {list.map(m => (
        <div key={m._id}>
          <h4>{m.title}</h4>

          {m.fileUrl && (
            <a href={m.fileUrl} target="_blank" rel="noreferrer">
              Open Material
            </a>
          )}

          {m.linkUrl && (
            <a href={m.linkUrl} target="_blank" rel="noreferrer">
              External Link
            </a>
          )}
        </div>
      ))}
    </MainLayout>
  );
};

export default StudyMaterials;
