import type { FestItem } from "../types/types";

interface Prop {
  item: FestItem;
}

export default function FestCard({ item }: Prop) {
  return (
    <div
      key={item._id}
      className="card bg-base-100 w-96  shadow-lg shadow-blue-400"
    >
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
          <button className="btn btn-primary">View</button>
          <button className="btn btn-primary">Register</button>
        </div>
      </div>
    </div>
  );
}
