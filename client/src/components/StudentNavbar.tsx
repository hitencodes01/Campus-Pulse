import { Link, } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { User } from "lucide-react";

export default function StudentNavbar() {
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm shadow-blue-400">
        <div className="flex-1">
          <Link
            to={"/student"}
            className="text-primary font-bold btn btn-ghost text-xl"
          >
            Campus Pulse
          </Link>
        </div>
        <div className="flex flex-row gap-5">
          <ThemeSwitcher />

          <Link className="btn btn-square btn-ghost" to={"/student/profile"}>
            <User />
          </Link>
        </div>
      </div>
    </div>
  );
}
