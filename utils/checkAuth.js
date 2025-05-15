import Cookies from "js-cookie";

export function checkAuth(allowedRoles) {
  const role = Cookies.get("role");
  return allowedRoles.includes(role);
}
