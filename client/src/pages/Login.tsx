import { useReducer } from "react";
import type { LoginActions, LoginState } from "../types/types";
import UserEmail from "../utils/UserEmail";
import UserPassword from "../utils/UserPassword";
import UserRoles from "../utils/UserRoles";
import { loginUser } from "../api/axios";
import { useAuth } from "../context/AuthContext";

function reducer(state: LoginState, actions: LoginActions): LoginState {
  return {
    ...state,
    [actions.field]: actions.value,
  };
}

export default function Login() {
  const {login} = useAuth()
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    role: null,
  });
  const handleLogin = async () => {
    try {
      const response = await loginUser(state);
      if(response.data.success){
        console.log(response.data.message)
        login(response.data.user)
      }
    } catch (error) {
      
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-12">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl shadow-blue-400 border border-base-300">
        <div className="card-body gap-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black tracking-tight text-primary">
              Campus Pulse
            </h2>
            <p className="text-base-content/60 text-sm font-medium">
              Login your account to join the movement
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="space-y-4">
              <div className="form-control w-full">
                <label className="label-text font-bold mb-1 opacity-70">
                  Email Address
                </label>
                <UserEmail inputHandler={dispatch} />
              </div>

              <div className="form-control w-full">
                <label className="label-text font-bold mb-1 opacity-70">
                  Security Password
                </label>
                <UserPassword inputHandler={dispatch} />
              </div>
            </div>

            <div className="divider text-xs uppercase opacity-40">Identity</div>
            <UserRoles inputHandler={dispatch} formData={state} />

            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn btn-primary btn-block shadow-lg hover:scale-[1.02] transition-transform active:scale-95"
              >
                Login
              </button>
            </div>

            <p className="text-center text-sm opacity-70">
              New to Campus Pulse?
              <a
                href="/register"
                className="link link-primary ml-1 font-semibold"
              >
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
