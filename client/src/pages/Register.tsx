import React, { useReducer } from "react";
import { register } from "../api/axios";
import { useAuth } from "../context/AuthContext";

type State = { name: string; email: string; password: string; role: string };

type Actions = {
  field: keyof State;
  value: string;
};
function reducer(state: State, actions: Actions): State {
  return {
    ...state,
    [actions.field]: actions.value,
  };
}

export default function Register() {
  const {login} = useAuth()
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await register(state);
      console.log(response.data);
      if(response.data.success){
        login(response.data.user)
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
    <div>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          className="input input-neutral"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ field: "name", value: e.target.value })
          }
        />
        <input
          type="text"
          className="input input-neutral"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ field: "email", value: e.target.value })
          }
        />
        <input
          type="text"
          className="input input-neutral"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ field: "password", value: e.target.value })
          }
        />
        <div className="dropdown dropdown-left">
          <div tabIndex={0} role="button" className="btn m-1">
            Role
          </div>
          <ul
            tabIndex={-1}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <button
              className="btn"
              onClick={() => dispatch({ field: "role", value: "student" })}
            >
              Student{"   "}
            </button>
            <button
              className="btn"
              onClick={() => dispatch({ field: "role", value: "clubhead" })}
            >
              Club Head{" "}
            </button>
            <button
              className="btn"
              onClick={() => dispatch({ field: "role", value: "admin" })}
            >
              Admin{" "}
            </button>
          </ul>
        </div>
        <button type="submit" className="btn  btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}
