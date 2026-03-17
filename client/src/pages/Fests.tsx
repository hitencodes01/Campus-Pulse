import { useEffect, useMemo, useState } from "react";
import { fetchFests } from "../api/axios";
import type { FestItem } from "../types/types";
import SearchInput from "../utils/SearchInput";

export default function Fests() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [fest, setFest] = useState<FestItem[]>([]);
  const [search, setSearch] = useState<string | "">("");

  const getAllFests = async (signal: any) => {
    try {
      const res = await fetchFests(signal);
      if (res.data.success) {
        setFest(res.data.fests);
      }
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getAllFests(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  const filterData = useMemo(() => {
    return fest.filter((item: FestItem) =>
      item.name.toLowerCase().includes(search?.toLowerCase()),
    );
  }, [fest, search]);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {!error && (
          <div>
            <SearchInput setData={setSearch} />
            <div className="grid grid-cols-3 gap-6 mx-5 my-10">
              {filterData.map((item: FestItem) => (
                <div
                  key={item._id}
                  className="card bg-base-100 w-96 shadow-lg shadow-blue-400"
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
                      <button className="btn btn-primary">Register</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
}
