import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link, useNavigate } from "react-router-dom";

import axiosInstance from "../axios";
import { lists, user } from "../atoms";


const Lists = () => {

    const [loggedInUser, setLoggedInUser] = useRecoilState(user);
    const [linkslist, setLinksList] = useRecoilState(lists);
    const userData = useRecoilValue(user);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get("links/get_lists").then((res) => {
            const data = res.data;
            let tempList = []

            for (let key in data) {
                tempList.push({
                    "title": data[key]['title'],
                    "id": data[key]['id']
                })
            }
            setLinksList(tempList)
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const formData = {
            title: data.get("title").trim(),
        };

        axiosInstance
            .post(`links/create_list`, {
                title: formData.title,
            })
            .then((res) => {
                navigate(0);
            })
            .catch((err) => {
                console.log(err);
            });
    
    };

    const handleLogout = event => {
        setLoggedInUser(null);
        localStorage.clear();
        axiosInstance.defaults.headers["Authorization"] = "";

        axiosInstance
            .post(`auth/auth/logout`)
            .then((res) => {
                navigate('/login');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleDelete = (list_id, list_title) => {
        if (loggedInUser && confirm("Are you sure you want to Delete '" + list_title + "'. You cannot reverse this action!") == true) {
            axiosInstance
                .delete("links/delete_list/" + list_id)
                .then((res) => {
                    navigate(0);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (                
        <div className="container mx-auto w-10/12 md:w-2/3 lg:w-7/12 xl:w-6/12 my-4">
            <div className="flex justify-center px-4 py-5 sm:px-6 w-full border dark:bg-gray-800 bg-white shadow mb-2 rounded-md">
                <form onSubmit={handleSubmit}>
                    <div className="md:flex mb-2">
                        <input type="text" id="title" className="rounded w-7/12 mr-3 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="title" placeholder="New List Title" />
                        <button type="submit" className="w-4/12 py-2 px-4 flex-1 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
                            Add
                        </button>
                    </div>
                </form>
            </div>
            <ul>
                { 
                    linkslist ? (
                        linkslist.map(list_head => (
                            <li className="flex justify-between border-gray-400 mb-2" key={list_head.id}>
                                <Link to={"/" + userData.user.username + "/" + list_head.id} className="inline-block w-full">
                                    <div className="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
                                        <div className="flex-1 pl-1 md:mr-16">
                                            <div className="font-medium dark:text-white">
                                                {list_head.title}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <button onClick={() => handleDelete(list_head.id, list_head.title)} className="block text-red-600 bg-white border-2 hover:border-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="popup-modal">   Delete
                                </button>
                            </li>
                        ))
                    ) : (
                        <h2>Nothing to Display</h2>
                    )
                }
               
                <Link to="/create" className="inline-block py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Create New Link
                </Link>
            </ul>
             <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300">
                    </div>
                </div>
                <div className="relative flex justify-center text-sm leading-5">
                    <button onClick={handleLogout} className="px-2 text-gray-500 bg-white border-b-2 border-opacity-0 hover:border-opacity-100 border-purple-600">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default Lists;