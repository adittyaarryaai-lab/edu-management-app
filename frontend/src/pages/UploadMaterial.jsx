import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { uploadMaterial } from "../api/materialApi";

const UploadMaterial = () => {
  const [form, setForm] = useState({
    className: "",
    subject: "",
    title: "",
    fileUrl: ""
  });

  const submit = async () => {
    try {
      await uploadMaterial(form);
      alert("Material uploaded");

      // ✅ RESET FORM
      setForm({
        className: "",
        subject: "",
        title: "",
        fileUrl: ""
      });
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <MainLayout>
      <h2>Upload Study Material</h2>

      {Object.keys(form).map(key => (
        <input
          key={key}
          placeholder={key}
          value={form[key]}   // 🔥 THIS IS THE FIX
          onChange={e =>
            setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}

      <button onClick={submit}>Upload</button>
    </MainLayout>
  );
};

export default UploadMaterial;
