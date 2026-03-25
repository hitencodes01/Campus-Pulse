import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate()
  const { user, isAuthenticated, loading } = useAuth();
  useEffect(()=>{
    if(!loading && isAuthenticated && user){
      if(user.role.includes('student')){
        navigate('/student')
      }
      else if(user.role.includes('clubhead')){
        navigate('/clubhead')
      }
      else if(user.role.includes('admin')){
        navigate('/admin')
      }
    }
  },[loading, isAuthenticated, user, navigate])
  if(loading) return <div>Loading...</div>
  return <div>Home</div>;
}
