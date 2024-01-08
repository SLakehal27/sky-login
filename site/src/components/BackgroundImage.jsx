import { useLocation } from "react-router-dom";

export default function BackgroundImage() {
  const location = useLocation();
  if (location.pathname !== "/dashboard") {
    return (
      <div className="sky h-screen bg-no-repeat w-8/12 absolute right-0"></div>
    );
  }
  return null;
}
