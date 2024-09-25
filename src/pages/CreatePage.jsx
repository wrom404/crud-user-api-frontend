import { useState } from "react";

const CreatePage = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { name, age, image };

    try {
      const res = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        throw new Error("Can't create user");
      }

      const result = await res.json();
      const newUser = result.data;
      console.log(`User successfully created: ${JSON.stringify(newUser)}`);
      setName("");
      setAge("");
      setImage("");
    } catch (error) {
      console.log(`Error: ${error.message}`);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-950">
      <div className=" w-[600px] p-4 pt-6 md:p-6 lg:p-12 border-2 border-slate-800">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-slate-200">
            Create User
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
              value={name}
              onChange={(event) => setName(event.target.value)}
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
              value={age}
              onChange={(event) => setAge(event.target.value)}
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
              value={image}
              onChange={(event) => setImage(event.target.value)}
            />
          </div>
          <button
            className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
