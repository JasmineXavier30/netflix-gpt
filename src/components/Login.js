import { useRef, useState } from "react";
import Header from "./Header";
import { validateSignInFormData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
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
                    console.log(user);
                    navigate("/browse")
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
                        photoURL: "https://avatars.githubusercontent.com/u/80594667?v=4"
                    })
                        .then(() => {
                            navigate("/browse")
                        })
                })
                .catch(e => {
                    setErrorMsg(`${e.code}:${e.message}`);
                })
        }
    }

    return (
        <div>
            <Header />
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="Background" />
            </div>
            <form className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded bg-opacity-80">
                <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {
                    !isSignInForm &&
                    <input ref={name} type="text" placeholder="Full Name" className="p-2 my-4 w-full rounded bg-gray-700" />
                }
                <input ref={email} type="text" placeholder="Email Address" className="p-2 my-4 w-full rounded bg-gray-700" />
                <input ref={password} type="password" placeholder="Password" className="p-2 my-4 w-full rounded bg-gray-700" />
                <p className="text-red-600 font-bold">{errorMsg}</p>
                <button type="submit" className="p-2 my-4 bg-red-600 w-full rounded font-bold" onClick={handleSubmit}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className="p-2 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already a member? Sign In Now"}</p>
            </form>
        </div>
    )
}
export default Login;