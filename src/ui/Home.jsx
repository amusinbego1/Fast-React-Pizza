import { Link } from "react-router-dom";
import Greeting from "./Greeting";
import Button from "./Button";

function Home() {
  return (
    <div>
      <Greeting />
      <div className="flex w-full justify-center">
        <Link to="/user/new">
          <Button className="mx-auto">Start ordering</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
