import { useRef, useState } from "react";
import Header from "./Header";
import { validateSignInFormData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMG, USER_PHOTO } from "../utils/constants";

const Login = () => {
    const dispatch = useDispatch();
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
    const handleSubmit = e => {
        //validate form data
        e.preventDefault();
        const error = validateSignInFormData(email.current.value, password.current.value);
        setErrorMsg(error);
        if (error) return;

        if (isSignInForm) { // sign in auth
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then(userCredential => {
                    const user = userCredential.user;
                })
                .catch(e => {
                    setErrorMsg(`${e.code}:${e.message}`);
                });

        } else { // sign up auth
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then(userCredential => {
                    const user = userCredential.user;
                    console.log(user);
                    updateProfile(auth.currentUser, {
                        displayName: name.current.value,
                        photoURL: USER_PHOTO
                    })
                        .then(() => {
                            const { uid, email, displayName, photoURL } = auth.currentUser;
                            dispatch(addUser({ uid, email, displayName, photoURL }));
                        })
                })
                .catch(e => {
                    setErrorMsg(`${e.code}:${e.message}`);
                })
        }
    }

    return (
        <div className="">
            <Header />
            <div className="absolute">
                <img src={BG_IMG} alt="Background" className=" w-screen h-screen" />
            </div>
            <form className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded bg-opacity-80">
                <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {
                    !isSignInForm &&
                    <input ref={name} type="text" placeholder="Full Name" className="p-2 my-4 w-full rounded bg-gray-700" />
                }
                <input ref={email} type="text" placeholder="Email Address" className="p-2 my-4 w-full rounded bg-gray-700" />
                <input ref={password} type="password" placeholder="Password" className="p-2 my-4 w-full rounded bg-gray-700" />
                <p className="text-red-800 font-bold">{errorMsg}</p>
                <button type="submit" className="p-2 my-4 bg-red-800 w-full rounded font-bold hover:bg-opacity-80" onClick={handleSubmit}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className="p-2 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already a member? Sign In Now"}</p>
            </form>
        </div>
    )
}
export default Login;