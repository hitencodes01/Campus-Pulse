import { useEffect, useState } from "react";
import { fetchFests } from "../api/axios";

export default function Fests() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [fest, setFest] = useState<any>(null);

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

  useEffect(()=>{
    const controller = new AbortController();
    getAllFests(controller.signal)
    return () => {
      controller.abort()
    }
  },[])

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {!error && (
          <div className="card bg-base-100 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Card title!</h2>
              <p>
                A card component has a figure, a body part, and inside body
                there are title and actions parts
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
