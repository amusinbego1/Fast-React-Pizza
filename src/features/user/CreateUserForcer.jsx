import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function CreateUserForcer() {
    const isLogged = useSelector((state) => state.user.username !== null);
    if (isLogged) return;
    return (
        <div>
            <Navigate to="/user/new" replace={true} />
        </div>
    );
}

export default CreateUserForcer;
