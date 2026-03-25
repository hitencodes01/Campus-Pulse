import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<{}>({});
  useEffect(() => {
    const controller = new AbortController();
    const fetchProfile = async () => {
      try {
        const res = api.get(`/auth/${user?._id}/profile`, {
          signal: controller.signal,
        });
        if (!(await res).data.ok) throw new Error("User Not Found");
        setProfile((await res).data.user);
        console.log(profile);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div>
      <img src="" alt="" />
      <label htmlFor="name">Name</label>
      <input type="text" id="name" readOnly />
      <label htmlFor="email">Email</label>
      <input type="text" id="email" readOnly />
      <label htmlFor="course">Course</label>
      <input type="text" id="course" readOnly />
      <label htmlFor="college">College</label>
      <input type="text" id="college" readOnly />
    </div>
  );
}
