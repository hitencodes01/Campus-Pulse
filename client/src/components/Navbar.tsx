import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-xs shadow-blue-400">
      <div className="navbar-start">
        <Link to={"/"} className="text-primary font-bold btn btn-ghost text-xl">
          Campus Pulse
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li>
            <Link className="btn btn-ghost" to={"/events"}>
              Events
            </Link>
          </li>
          <li>
            <Link className="btn btn-ghost" to={"/fests"}>
              Fests
            </Link>
          </li>
          <li>
            <Link className="btn btn-ghost" to={""}>
              Clubs
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <ThemeSwitcher />
            </li>
            <li>
              <Link
                className="shadow-xs btn btn-outline btn-info shadow-blue-400"
                to={"/login"}
              >
                Log In
              </Link>
            </li>
            <li>
              <Link
                className="shadow-xs btn btn-outline btn-info shadow-blue-400"
                to={"/register"}
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
