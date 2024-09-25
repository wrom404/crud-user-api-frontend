import { useState } from "react";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

const UserCard = ({ name, age, image, id, setUsers, users }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ name, age, image, id });
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      const data = await result.json();

      if (!data.success) {
        throw new Error(`Error: ${result.message}`);
      }

      // update the ui immediately, without needing a refresh
      const updatedUsers = users.map((user) =>
        user._id === id ? data.data : user
      );
      setUsers(updatedUsers);
      setIsOpen(false);
      console.log(data.data);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const result = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: "DELETE",
      });

      const data = await result.json();

      if (!data.success) {
        throw new Error(`Error: ${data.message}`);
      }

      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  };

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="flex flex-col w-64 py-4 px-6 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700">
      <div className="w-full flex items-center justify-center my-6">
        <div className="w-32">
          <img
            className="w-full bg-contain rounded-full"
            src={`${image}`}
            alt="pic"
          />
        </div>
      </div>
      <div className="text-lg font-semibold text-slate-200">{name}</div>
      <div className="text-slate-200 text-base">{age} years old</div>
      <div className="flex justify-end gap-2 my-2">
        <span
          className="text-green-600 hover:text-green-700 text-2xl"
          onClick={() => setIsOpen(true)}
        >
          <MdOutlineEdit />
        </span>
        <span
          className="text-red-600 hover:text-red-700 text-2xl"
          onClick={handleDeleteUser}
        >
          <MdDeleteOutline />
        </span>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
          <div>
            <div className=" w-[600px] p-4 pt-6 md:p-6 lg:p-12 border-2 border-slate-800 bg-black bg-opacity-100">
              <form onSubmit={handleUpdate}>
                <h2 className="text-2xl font-bold mb-4 text-slate-200">
                  Update User
                </h2>
                <span>{error && error}</span>
                <div className="mb-4">
                  <label
                    className="block text-slate-200 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline bg-transparent border-slate-300"
                    id="name"
                    type="text"
                    value={updatedUser.name}
                    onChange={(event) =>
                      setUpdatedUser({
                        ...updatedUser,
                        name: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-slate-200 text-sm font-bold mb-2"
                    htmlFor="age"
                  >
                    Age
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline bg-transparent border-slate-300"
                    id="age"
                    type="number"
                    value={updatedUser.age}
                    onChange={(event) =>
                      setUpdatedUser({
                        ...updatedUser,
                        age: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-slate-200 text-sm font-bold mb-2"
                    htmlFor="image"
                  >
                    Image (link address)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline bg-transparent border-slate-300"
                    id="image"
                    type="text"
                    value={updatedUser.image}
                    onChange={(event) =>
                      setUpdatedUser({
                        ...updatedUser,
                        image: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Update
                  </button>
                  <button
                    className="bg-transparent border border-slate-200 text-white font-bold py-2 px-4 rounded hover:border-slate-800"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
