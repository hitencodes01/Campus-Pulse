import type { ClubItem } from "../types/types";

export default function ClubCard({ club }: { club: ClubItem }) {
  return (
    <div
      key={club._id}
      className="card bg-base-100 w-96 shadow-lg shadow-blue-400"
    >
      <div className="card-body">
        <h3>Club : {club.name}</h3>
        <p>{club.description}</p>
        <h2 className="card-title">{club.category}</h2>
        <p>Club Heads</p>
        {club.clubHeads.map((item) => (
          <div key={item._id}><h3>Name : {item.name}</h3></div>
        ))}
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Join</button>
        </div>
      </div>
    </div>
  );
}
