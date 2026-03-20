import { useEffect, useState } from "react";
import type { FestItem } from "../types/types";
import { useParams } from "react-router-dom";
import { fetchFest } from "../api/axios";

export default function FestDetails() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [fest, setFest] = useState<FestItem | {}>({});
  const { id } = useParams();
  const getFest = async (signal: any) => {
    try {
      const res = await fetchFest(id, signal);
      if (res.data.success) {
        console.log(await res.data.fest);
        setFest(await res.data.fest);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    getFest(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return !error && <div>FestDetails</div>;
}
