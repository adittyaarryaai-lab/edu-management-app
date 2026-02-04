import { hasPermission } from "../utils/hasPermission";

const PermissionGate = ({ permission, children }) => {
  if (!hasPermission(permission)) return null;
  return children;
};

export default PermissionGate;
