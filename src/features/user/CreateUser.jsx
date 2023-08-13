import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "./userSlice";
import Greeting from "../../ui/Greeting";
import Button from "../../ui/Button";

function CreateUser() {
  const [username, setUsername] = useState("");
  const isLogged = useSelector((state) => state.user.username !== null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(
    function () {
      if (isLogged) navigate("/menu");
    },
    [isLogged, navigate],
  );

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createUser(username));
    navigate("/menu");
  }

  return (
    <>
      <Greeting />
      <form
        onSubmit={handleSubmit}
        className="space-y-5 text-center md:text-lg"
      >
        <p>👋 Welcome! Please start by telling us your name:</p>

        <input
          className="input w-56 md:w-72"
          type="text"
          placeholder="Your full name"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {username !== "" && (
          <div>
            <Button className="mb-5">Start ordering</Button>
          </div>
        )}
      </form>
    </>
  );
}

export default CreateUser;
