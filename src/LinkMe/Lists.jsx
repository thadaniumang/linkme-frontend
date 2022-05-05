import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link } from "react-router-dom";

import axiosInstance from "../axios";
import { lists, user } from "../atoms";

const Lists = () => {

    const [linkslist, setLinksList] = useRecoilState(lists);
    const userData = useRecoilValue(user);

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

    return (                
        <div className="container mx-auto w-full sm:w-2/3 md:w-1/2 lg:w-5/12 xl:w-4/12 my-8">
            <div className="px-4 py-5 sm:px-6 w-full border dark:bg-gray-800 bg-white shadow mb-2 rounded-md">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Your Lists
                </h3>
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
               
            </ul>
        </div>

    );
}
 
export default Lists;