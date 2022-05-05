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
        
        axiosInstance.get("auth/api/profile?username=" + params.username).then((res) => {
            const data = res.data[0];
            setProfile(data);
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
        <div className="container mx-auto w-10/12 sm:w-2/3 md:w-1/2 lg:w-5/12 xl:w-4/12 px-4 py-5 border-b rounded-t sm:px-6 my-4">
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                <div className="text-center px-4 py-5 sm:px-6 w-full border dark:bg-gray-800 bg-white shadow mb-2 rounded-md">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        {profile.title}
                    </h3>
                    <p className="text-sm text-gray-700">
                        {profile.headline}
                    </p>
                </div>
                <ul className="divide-y divide-gray-200">
                    {
                        allLinks.length > 0 ? allLinks.map(link => (
                            <li>
                                <a className="block hover:bg-gray-50 dark:hover:bg-gray-900" href={link.url} target="_blank">
                                    <div className="px-4 py-4 sm:px-6 text-center">
                                        <p className="text-md text-gray-700 dark:text-white md:truncate">
                                            {link.title}
                                        </p>
                                    </div>
                                </a>
                            </li>
                        )) : (
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex justify-center">
                                    <p className="text-md text-gray-700 dark:text-white md:truncate">
                                        No Links Found
                                    </p>
                                </div>
                            </div>
                        )
                    }
                </ul>
            </div>
        </div>
    );
}
 
export default Links;