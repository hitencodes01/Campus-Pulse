import { useNavigate } from "react-router-dom";
import type { FestItem } from "../types/types";
import { useAuth } from "../context/AuthContext";

interface Prop {
  item: FestItem;
}

export default function FestCard({ item }: Prop) {
  const {user} = useAuth();
  const navigate = useNavigate();
  return (
    <div className="card bg-base-100 w-96  shadow-lg shadow-blue-400">
      <div className="card-body ">
        <h2 className="card-title">{item.name}</h2>
        <p>{item.description}</p>
        <p>
          {new Date(item.startDate).getDate()} to{" "}
          {new Date(item.endDate).getDate()}
          {new Date(item.startDate).toLocaleString("default", {
            month: "short",
          })}
        </p>
        <p>{item.status}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/fests/${item._id}`)}
          >
            View
          </button>
          <button className="btn btn-primary" onClick={()=>{
            if(user){
              navigate(`/fest/${item._id}/register`)
            }
            else{
              navigate(`/login`)
            }
          }}>Register</button>
        </div>
      </div>
    </div>
  );
}
