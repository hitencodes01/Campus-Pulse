import { useEffect, useMemo, useState } from "react";
import { fetchEvents } from "../api/axios";
import type { EventItem } from "../types/types";
import SearchInput from "../utils/SearchInput";
import EventCard from "../components/EventCard";

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
      !error && (
        <div className="flex flex-col justify-center items-center">
          <SearchInput setData={setData} placeholder="Search Events" />
          <div className="m-10 grid grid-col-3 gap-10">
            {filterData.map((item: EventItem) => (
              <EventCard item={item} />
            ))}
          </div>
        </div>
      )
    );
  }
}
