import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);
  const [search, setSearch] = useState("");

  return (
    <header className="flex w-full items-center justify-between bg-yellow-500 px-3 py-2 uppercase md:px-4 md:py-3 md:text-lg">
      <Link to="/">
        <p className="tracking-wide hover:text-black">Fast-React-Pizza Co.</p>
      </Link>
      <span className="flex items-center justify-center space-x-3">
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="mr-2 uppercase text-yellow-700 hover:text-blue-700 hover:underline"
        >
          &larr; Back
        </button>
        <form
          className="flex items-center"
          onSubmit={(event) => {
            event.preventDefault();
            if (search) navigate(`/order/${search}`);
          }}
        >
          <button className="rounder-left-full inline-block  h-8 rounded-l-full bg-yellow-100 py-1 pl-2 md:h-10 md:py-2">
            <img src="./search.png" className="w-5" alt="Search Button" />
          </button>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search Orders #"
            className="focus:ring-r w-20 rounded-r-full bg-yellow-100 px-3 py-1 text-base text-stone-600 transition-all duration-150 placeholder:text-stone-400 focus:w-32 focus:outline-none sm:w-36 md:w-52 md:py-2 md:focus:w-64"
          />
        </form>
        <p className="font-semibold">{username?.split(" ")[0]}</p>
      </span>
    </header>
  );
}

export default Header;
