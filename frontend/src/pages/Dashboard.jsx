import { getRole, logout } from "../auth/auth";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Role: {getRole()}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
