import { useEffect, useMemo, useState } from "react";
import { fetchFests } from "../api/axios";
import type { FestItem } from "../types/types";
import SearchInput from "../utils/SearchInput";
import FestCard from "../components/FestCard";

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
          <div className="flex flex-col justify-center items-center">
            <SearchInput setData={setSearch} placeholder="Search Fest" />
            <div className="m-10 grid grid-cols-3 gap-10">
              {filterData.map((item: FestItem) => (
                <FestCard item={item} key={item._id} />
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
}
