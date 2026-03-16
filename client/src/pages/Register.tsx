import React, { useReducer } from "react";
import { register } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import UserInput from "../utils/UserInput";
import type { RegisterActions, RegisterState } from "../types/types";
import UserEmail from "../utils/UserEmail";
import UserPassword from "../utils/UserPassword";

function reducer(
  state: RegisterState,
  actions: RegisterActions,
): RegisterState {
  return {
    ...state,
    [actions.field]: actions.value,
  };
}

export default function Register() {
  const { login } = useAuth();
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await register(state);
      console.log(response.data);
      if (response.data.success) {
        login(response.data.user);
      }
      alert(response.data.message);
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
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
              Create your account to join the movement
            </p>
          </div>

          <form onSubmit={handleRegister} className="flex-col flex justify-center gap-5">
            <div className="space-y-4">
              <div className="form-control w-full">
                <label className="label-text font-bold mb-1 opacity-70">
                  Username
                </label>
                <UserInput inputHandler={dispatch} />
              </div>

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

            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn btn-primary btn-block shadow-lg hover:scale-[1.02] transition-transform active:scale-95"
              >
                Register
              </button>
            </div>

            <p className="text-center text-sm opacity-70">
              Already have an account?
              <a href="/login" className="link link-primary ml-1 font-semibold">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
