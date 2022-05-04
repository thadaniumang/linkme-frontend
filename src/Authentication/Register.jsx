import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { user } from "../atoms";
import axiosInstance from "../axios";

const Register = () => {
    const loggedInUser = useRecoilValue(user);

    const navigate = useNavigate();

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passError, setPassError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [headlineError, setHeadlineError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();


        setNameError(false);
        setEmailError(false);
        setPassError(false);
        setUsernameError(false);
        setHeadlineError(false);

        const data = new FormData(event.currentTarget);
        console.log(data)

        const formData = {
            username: data.get("username").trim(),
            email: data.get("email").trim(),
            password: data.get("password").trim(),
            profile: {
                title: data.get("name").trim(),
                headline: data.get("headline").trim(),
            }
        }

        console.log(formData)

        let submit = true;

        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (formData.email === "" || !emailRegex.test(formData.email)) {
            setEmailError(true);
            submit = false;
            console.log(formData.email);
        }

        if (formData.username === "" || formData.username.length < 3 || formData.username.length > 20 || /\d/.test(formData.username)) {
            setUsernameError(true);
            submit = false;
            console.log(formData.username);
        }

        if (formData.profile.title === "" || formData.profile.title.length < 3 || formData.profile.title.length > 19 || /\d/.test(formData.profile.title)) {
            setNameError(true);
            submit = false;
            console.log(formData.profile.title);
        }

        if (formData.password === "" || formData.password.length < 8) {
            setPassError(true);
            submit = false;
            console.log(formData.password);
        }

        if (submit) {
            console.log(formData);
            axiosInstance
                .post(`auth/auth/register`, formData)
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    return <Navigate to="/login" replace />;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="mx-auto my-8 px-2 sm:px-32 md:px-48 lg:px-64 xl:px-96">
            <div className="flex flex-col px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
                    Create a new account
                </div>
                <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
                    Already have an account?
                    <Link to="/login" className="ml-2 text-sm text-blue-500 underline hover:text-blue-700">
                        Sign in
                    </Link>
                </span>
                <div className="p-6 mt-8">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mb-2">
                            <div className="relative ">
                                <input type="text" id="username" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="username" placeholder="User Name"/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-2">
                            <div className="relative ">
                                <input type="text" id="name" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="name" placeholder="Name"/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-2">
                            <div className=" relative ">
                                <input type="email" id="email" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="email" placeholder="Email"/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-2">
                            <div className=" relative ">
                                <input type="password" id="password" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="password" placeholder="Password"/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-2">
                            <div className=" relative ">
                                <input type="text" id="headline" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="headline" placeholder="Headline"/>
                            </div>
                        </div>
                        <div className="flex w-full my-4">
                            <button type="submit" className="py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Register;