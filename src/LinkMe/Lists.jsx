import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link, useNavigate } from "react-router-dom";

import axiosInstance from "../axios";
import { lists, user } from "../atoms";

const Lists = () => {

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

    return (                
        <div className="container mx-auto w-full md:w-2/3 lg:w-7/12 xl:w-6/12 my-4">
            <div className="flex justify-between px-4 py-5 sm:px-6 w-full border dark:bg-gray-800 bg-white shadow mb-2 rounded-md">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Your Lists
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="flex mb-2">
                        <input type="text" id="title" className="rounded mr-3 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="title" placeholder="Title" />
                        <button type="submit" className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
                            New List
                        </button>
                    </div>
                </form>
            </div>
            <ul>
                { 
                    linkslist ? (
                        linkslist.map(list_head => (
                            <li className="border-gray-400 mb-2" key={list_head.id}>
                                <Link to={"/" + userData.user.username + "/" + list_head.id} className="inline-block w-full">
                                    <div className="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
                                        <div className="flex-1 pl-1 md:mr-16">
                                            <div className="font-medium dark:text-white">
                                                {list_head.title}
                                            </div>
                                        </div>
                                        <button className="w-24 text-right flex justify-end">
                                            <svg width="12" fill="currentColor" height="12" className="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                                </path>
                                            </svg>
                                        </button>
                                    </div>
                                </Link>
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
        </div>

    );
}
 
export default Lists;