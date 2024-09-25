import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/users");

        if (!res.ok) {
          throw new Error("Can't fetch data");
        }

        const data = await res.json();
        setUsers(data.data);
      } catch (error) {
        console.log(`Error: ${error.message}`);
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen  py-16 flex justify-center items-center bg-slate-950 pt-20">
      <div className="">
        <h2 className="text-slate-200 text-4xl mb-6">Users</h2>
        <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {users && users.length > 0 ? (
            users.map((user, i) => (
              <UserCard
                key={i}
                id={user._id}
                name={user.name}
                age={user.age}
                image={user.image}
                setUsers={setUsers}
                users={users}
              />
            ))
          ) : (
            <p className="text-red-500">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
