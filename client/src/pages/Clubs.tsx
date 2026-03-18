import { useEffect, useMemo, useState } from "react";
import type { ClubItem } from "../types/types";
import { fetchClubs } from "../api/axios";
import ClubCard from "../components/ClubCard";
import SearchInput from "../utils/SearchInput";

export default function Clubs() {
  const [clubs, setClubs] = useState<ClubItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<string | "">("");

  const getAllClubs = async (signal: any) => {
    try {
      const res = await fetchClubs(signal);
      if (await res.data.success) {
        setClubs(res.data.clubs);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getAllClubs(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  const filterData = useMemo(() => {
    return clubs.filter((item) =>
      item.name.toLowerCase().includes(data.toLowerCase()),
    );
  }, [clubs, data]);

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    !error && (
      <div className="flex flex-col justify-center items-center">
        <SearchInput setData={setData} placeholder="Search Clubs" />
        <div className="m-10 grid grid-cols-3 gap-10">
          {filterData.map((item: ClubItem) => (
            <ClubCard club={item} />
          ))}
        </div>
      </div>
    )
  );
}
