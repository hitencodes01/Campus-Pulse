import type { EventItem } from "../types/types";

interface Prop {
  item: EventItem;
}

export default function EventCard({ item }: Prop) {
  return (
    <div
      key={item._id}
      className="card bg-base-100 w-96 shadow-lg shadow-blue-400"
    >
      <div className="card-body">
        <h3>Fest : {item.fest.name}</h3>
        <p>{item.fest.description}</p>
        <h2 className="card-title">{item.title}</h2>
        <p>{item.description}</p>
        <p>{new Date(item.date).getDate()}</p>
        <p>Capacity : {item.capacity}</p>
        <p>
          Organizing Clubs :{" "}
          {item.organizingClubs.map((club) => (
            <div key={club._id}>
              <h1>{club.name}</h1>
            </div>
          ))}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Register</button>
        </div>
      </div>
    </div>
  );
}
