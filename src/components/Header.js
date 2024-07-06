import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO, SUPPORTED_LANGS } from "../utils/constants";
import { toggleGPTSearchView, showDefaultGptOption } from "../utils/gptSlice";
import { changeLanguage, showDefaultLang } from "../utils/configSlice";

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.userReducer);
    const dispatch = useDispatch();
    const showGPTSearch = useSelector(store => store.gptReducer.showGPTSearch);

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
                dispatch(showDefaultLang());
                dispatch(showDefaultGptOption());
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

    const handleGPTSearch = () => {
        // toggle GPT Search button
        dispatch(toggleGPTSearchView())
    }

    const handleLangSelect = (e) => {
        dispatch(changeLanguage(e.target.value))
    }

    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
            <div className="">
                <img src={NETFLIX_LOGO} alt="Netflix Logo" className="w-44" />
            </div>
            {user &&
                <div className="flex">
                    {showGPTSearch &&
                        <div className="mx-4 mt-2">
                            <select className=" text-white bg-gray-500 font-bold rounded p-3 hover:bg-opacity-80" onChange={handleLangSelect}>
                                {
                                    SUPPORTED_LANGS.map(x => <option value={x.id}>{x.name}</option>)
                                }
                            </select>
                        </div>
                    }
                    <div className="mx-4 mt-2">
                        <button className="bg-purple-800 text-white font-bold rounded p-3 hover:bg-opacity-80" onClick={handleGPTSearch}>{showGPTSearch ? "Home" : "GPT Search"}</button>
                    </div>
                    <img src={user.photoURL} alt="User Icon" className="w-12 h-12 rounded m-2" />
                    <div className="mx-4 mt-2">
                        <button className="text-white bg-red-700 font-bold p-3 rounded hover:bg-opacity-80" onClick={handleSignOut}>Sign Out</button>
                    </div>
                </div>
            }
        </div>
    )
}
export default Header;