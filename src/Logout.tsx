import { api } from "./utils/api";
import { useNavigate } from "react-router-dom";

import { IoLogOutOutline } from "react-icons/io5";


export const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    api<undefined>({
      url: "/api/auth/logout",
      body: {},
      method: "POST",
    })
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        alert(error);
      });
  };


  return (
    <button 
        className="p-3 rounded-full items-center align-middle hover:bg-gray-100"
        onClick={handleLogout}
    >
        <IoLogOutOutline size={30} color="#334155"  />
    </button>
  )
};
export default Logout;
