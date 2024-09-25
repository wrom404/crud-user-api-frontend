import { useNavigate } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";

const Navbar = () => {
  const nav = useNavigate();

  const redirectToHomePage = () => {
    nav("/");
  };

  const redirectToCreatePage = () => {
    nav("/create");
  };

  return (
    <div className="fixed w-full flex justify-between py-2 px-16 h-16 bg-slate-950">
      <div
        className="text-3xl text-slate-200 font-sans font-semibold cursor-pointer"
        onClick={redirectToHomePage}
      >
        Logo
      </div>
      <div className="text-slate-200 text-5xl cursor-pointer hover:text-blue-500" onClick={redirectToCreatePage}>
        <CiSquarePlus />
      </div>
    </div>
  );
};

export default Navbar;
