const Links = () => {
    return ( 
        <div class="px-4 py-5 border-b rounded-t sm:px-6">
            <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                <ul class="divide-y divide-gray-200">
                    <li>
                        <a class="block hover:bg-gray-50 dark:hover:bg-gray-900">
                            <div class="px-4 py-4 sm:px-6">
                                <div class="flex items-center justify-between">
                                    <p class="text-md text-gray-700 dark:text-white md:truncate">
                                        Title 1
                                    </p>
                                    <div class="ml-2 flex-shrink-0 flex">
                                        <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Go To SVG
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
 
export default Links;