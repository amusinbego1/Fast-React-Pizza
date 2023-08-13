import { useNavigate, useRouteError } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    const error = useRouteError();
    console.log(error);

    return (
        <div>
            <h1>{`${error.status} - ${error.statusText} 😢`}</h1>
            <p>{error.error?.message || error.data}</p>
            <button onClick={() => navigate(-1)}>&larr; Go back</button>
        </div>
    );
}

export default NotFound;
