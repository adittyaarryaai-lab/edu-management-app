import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  getNotifications,
  markAsRead
} from "../api/notificationApi";

const Notifications = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getNotifications().then(res => setList(res.data));
  }, []);

  const read = async (id) => {
    await markAsRead(id);
    setList(list.map(n =>
      n._id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <MainLayout>
      <h2>Notifications</h2>

      {list.map(n => (
        <div
          key={n._id}
          style={{
            background: n.read ? "#eee" : "#dff",
            padding: 10,
            marginBottom: 8,
            cursor: "pointer"
          }}
          onClick={() => read(n._id)}
        >
          <strong>{n.title}</strong>
          <p>{n.message}</p>
        </div>
      ))}
    </MainLayout>
  );
};

export default Notifications;
