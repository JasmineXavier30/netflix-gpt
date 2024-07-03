import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.userReducer)

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/")
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <div className="absolute bg-gradient-to-b from-black px-8 py-4 w-screen z-10 flex justify-between">
            <div className="">
                <img src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="Netflix Logo" className="w-56" />
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