import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { EventItem } from "../types/types";

interface Prop {
  item: EventItem;
}

export default function EventCard({ item }: Prop) {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <div className="card bg-base-100 w-96 shadow-lg shadow-blue-400">
      <div className="card-body">
        <h3>Fest : {item.fest.name}</h3>
        <p>{item.fest.description}</p>
        <h2 className="card-title">{item.title}</h2>
        <p>{item.description}</p>
        <p>{new Date(item.date).getDate()}</p>
        <p>Capacity : {item.capacity}</p>
        <div>
          Organizing Clubs :{" "}
          {item.organizingClubs.map((club) => (
            <div key={club._id}>
              <h1>{club.name}</h1>
            </div>
          ))}
        </div>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => {
              if (user) {
                navigate(`/event/${item._id}/register`);
              } else {
                navigate(`/login`);
              }
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
