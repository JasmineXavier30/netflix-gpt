import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO } from "../utils/constants";

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.userReducer);
    const dispatch = useDispatch();

    useEffect(() => { // called once during component mounting
        // called when user sign up, sign in and sign out
        const unSubscribe = onAuthStateChanged(auth, user => { // returns unSubscribe fn for cleaning
            if (user) {
                // user sign in
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid, email, displayName, photoURL })); // dispatch action to add user obj {}
                navigate("/browse");
            } else {
                //sign out
                dispatch(removeUser());
                navigate("/");
            }
        });
        // called when comp unmounts
        return () => unSubscribe(); // cleaning event listener
    }, []);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
            })
            .catch(e => {
                console.log(e);
                navigate("/error"); //TO DO
            })
    }

    return (
        <div className="absolute bg-gradient-to-b from-black px-8 py-4 w-screen z-10 flex justify-between">
            <div className="">
                <img src={NETFLIX_LOGO} alt="Netflix Logo" className="w-56" />
            </div>
            {user &&
                <div className="flex">
                    <img src={user.photoURL} alt="User Icon" className="w-12 h-12 rounded m-2" />
                    <button className="hover:text-red-600 text-white font-bold mb-8 mx-4" onClick={handleSignOut}>Sign Out</button>
                </div>
            }
        </div>
    )
}
export default Header;