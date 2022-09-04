import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

const ChangePassword = () => {
    const navigate = useNavigate();
    const [passError, setPassError] = useState(false);
    const [confirmPassError, setConfirmPassError] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const formData = {
            old_password: data.get("oldpassword").trim(),
            new_password1: data.get("newpassword1").trim(),
            new_password2: data.get("newpassword2").trim(),
        };

        if (formData.new_password1 !== formData.new_password2) {
            setConfirmPassError(true);
            return;
        }

        axiosInstance
            .put(`auth/auth/change-password/`, {
                old_password: formData.old_password,
                new_password: formData.new_password1,
            })
            .then((res) => {
                navigate("/");
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    console.log("Incorrect Credentials");
                }
                setPassError(true);
            });
    
    };


    return (
        <div className="flex justify-center my-4">
            <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                    Change Password
                </div>
                <div className="mt-8">
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="flex flex-col mb-6">
                            <div className="flex relative ">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="15" height="15"><path fillRule="evenodd" d="M14.5 1A4.5 4.5 0 0010 5.5V9H3a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1.5V5.5a3 3 0 116 0v2.75a.75.75 0 001.5 0V5.5A4.5 4.5 0 0014.5 1z" clipRule="evenodd" /></svg>

                                </span>
                                <input type="password" id="oldpassword" className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="oldpassword" placeholder="Current Password"/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-2">
                            <div className="flex relative">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="15" height="15"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" /></svg>
                                </span>
                                <input type="password" id="newpassword1" className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="newpassword1" placeholder="Enter New Password"/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <div className="flex relative">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="15" height="15"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" /></svg>
                                </span>
                                <input type="password" id="newpassword2" className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="newpassword2" placeholder="Confirm New Password"/>
                            </div>
                        </div>
                        <div className="flex w-full">
                            <button type="submit" className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Change
                            </button>
                        </div>
                        {
                            passError && 
                            (
                                <div className="my-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <strong className="font-bold">Current Password is Incorrect!</strong>
                                </div>
                            )
                        }
                        {
                            confirmPassError && 
                            (
                                <div className="my-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <strong className="font-bold">Passwords do not match</strong>
                                </div>
                            )
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default ChangePassword;