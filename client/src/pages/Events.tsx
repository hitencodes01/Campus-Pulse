import { useEffect, useMemo, useState } from "react";
import { fetchEvents } from "../api/axios";
import type { EventItem } from "../types/types";
import SearchInput from "../utils/SearchInput";

export default function Events() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [events, setEvents] = useState<any>([]);

  const getAllEvents = async (signal: any) => {
    try {
      const res = await fetchEvents(signal);
      if (res.data.success) {
        setEvents(res.data.events);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getAllEvents(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  const [data, setData] = useState<string | "">("");
  const filterData = useMemo(() => {
    return events.filter((item: EventItem) =>
      item.title.toLowerCase().includes(data?.toLowerCase()),
    );
  }, [events, data]);

  if (loading) {
    return <div>Loading....</div>;
  } else {
    return (
      <div>
        {!error && (
          <div className="flex flex-col justify-center items-center">
            <SearchInput setData={setData} />
            <ul>
              {filterData.map((item: EventItem) => (
                <div key={item._id} className="card bg-base-100 w-96 shadow-lg shadow-blue-400">
                  <div className="card-body">
                    <h3>Fest : {item.fest.name}</h3>
                    <p>{item.fest.description}</p>
                    <h2 className="card-title">{item.title}</h2>
                    <p>{item.description}</p>
                    {/* <p>{item.date.getDate()}</p> */}
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
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
