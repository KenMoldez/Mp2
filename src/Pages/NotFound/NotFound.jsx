import { useEffect } from "react";
import "./NotFound.css";

import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/");
  }, 1000);

  return (
    <div className="page_not_found">
      <p>404</p>
      <p>Page Not Found</p>
    </div>
  );
}

export default NotFound;
