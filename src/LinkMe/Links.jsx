import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";

import axiosInstance from "../axios";
import { links } from "../atoms";


const Links = () => {
    const [allLinks, setAllLinks] = useRecoilState(links);
    const [profile, setProfile] = useState({})
    const params = useParams()

    useEffect(() => {
        
        axiosInstance.get("links/get_links/" + params.list_id).then((res) => {
            const data = res.data;
            let tempList = []

            for (let key in data) {
                tempList.push({
                    "title": data[key]['title'],
                    "url": data[key]['url']
                })
            }
            setAllLinks(tempList)
        });

        axiosInstance.get("links/get_links/" + params.list_id).then((res) => {
            const data = res.data;
            let tempList = []

            for (let key in data) {
                tempList.push({
                    "title": data[key]['title'],
                    "url": data[key]['url']
                })
            }
            setAllLinks(tempList)
        });
    }, []);

    return ( 
        <div className=" mx-auto w-full sm:w-2/3 md:w-1/2 lg:w-5/12 xl:w-4/12 px-4 py-5 border-b rounded-t sm:px-6 my-8">
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {
                        allLinks.length > 0 ? allLinks.map(link => (
                            <li>
                                <a className="block hover:bg-gray-50 dark:hover:bg-gray-900">
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <p className="text-md text-gray-700 dark:text-white md:truncate">
                                                {link.title}
                                            </p>
                                            <div className="ml-2 flex-shrink-0 flex">
                                                <a href={link.url} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    Go To
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        )) : (
                            <h3>Nothing to Display</h3>
                        )
                    }
                </ul>
            </div>
        </div>
    );
}
 
export default Links;