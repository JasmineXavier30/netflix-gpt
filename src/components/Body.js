import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { auth } from "../utils/firebase";

const Body = () => {
    const dispatch = useDispatch();
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        }
    ]);

    useEffect(() => {
        // called when user sign up, sign in and sign out
        onAuthStateChanged(auth, user => {
            if (user) {
                // user sign in
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid, email, displayName, photoURL })); // dispatch action to add user obj {}

            } else {
                //sign out
                dispatch(removeUser());
            }
        })
    }, []);

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}
export default Body;