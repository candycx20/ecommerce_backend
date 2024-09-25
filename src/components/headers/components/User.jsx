import { Link } from "react-router-dom";

export default function User() {
  return (
    <Link to="/login_register#register-tab">
      <svg
        className="d-block"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <use href="#icon_user" />
      </svg>
    </Link>
  );
}
