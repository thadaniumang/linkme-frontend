import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../axios";
import { lists } from "../atoms";


const CreateLink = () => {

    const [linkslist, setLinksList] = useRecoilState(lists);
    const navigate = useNavigate();

    const [titleError, setTitleError] = useState(false);
    const [linkError, setLinkError] = useState(false);

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
            list_id: data.get("list_id").trim(),
            title: data.get("title").trim(),
            link: data.get("link").trim()
        };

        setLinkError(false);
        setTitleError(false);

        let submit = true;

        const linkRegex = /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/gi

        if (formData.title.length < 3 || formData.title.length > 50) {
            setTitleError(true);
            submit = false;
        }

        if (!linkRegex.test(formData.link)) {
            setLinkError(true);
            submit = false;
        }

        if (submit) {
            axiosInstance
                .post(`links/create_link`, formData)
                .then((res) => {
                    navigate("/");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    
    };

    return (
        <div className="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden my-4">
            <div className="px-4 py-8 sm:px-10">
                <div className="relative mt-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300">
                        </div>
                    </div>
                    <div className="relative flex justify-center text-sm leading-5">
                        <span className="px-2 text-gray-500 bg-white">
                            Link Details
                        </span>
                    </div>
                </div>
                <div className="mt-6">
                    <form onSubmit={handleSubmit} className="w-full space-y-6">
                        <div className="w-full">
                            <div className=" relative ">
                                <select id="list_id" name="list_id" className="form-select rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" aria-label="Default select example">
                                    {
                                        linkslist.map(linklist => (
                                            <option value={linklist.id}>{linklist.title}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className=" relative ">
                                <input type="text" id="title" name="title" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Title" />
                                {
                                    titleError && 
                                    (
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                            Title should be atleast 3 characters and at most 50 characters long
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                        <div className="w-full">
                            <div className=" relative ">
                                <input type="text" id="link" name="link" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="URL"/>
                                {
                                    linkError && 
                                    (
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                            Please enter valid URL
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                        <div>
                            <span className="block w-full rounded-md shadow-sm">
                                <button type="submit" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Create New Link
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default CreateLink;