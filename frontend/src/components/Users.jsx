import { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const value = setInterval(() => {
      if (filter) {
        axios
          .get("http://localhost:4000/api/v1/user/bulk?filter=" + filter)
          .then((res) => setUsers(res.data.user))
          .catch((err) => console.error(err));
      }
    }, 300);
    // clear interval
    return () => {
      clearInterval(value);
    };
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-500"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </>
  );
};

const User = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button
          onClick={useCallback(
            (e) => navigate("/send?id=" + user._id + "&name=" + user.firstName),
            [navigate]
          )}
          label={"Send Money"}
        />
      </div>
    </div>
  );
};
