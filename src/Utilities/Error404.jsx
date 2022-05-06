const Error404 = () => {
    return (
        <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700 my-8">
            <div className="max-w-md">
                <div className="text-5xl font-dark font-bold">404</div>
                <p className="text-2xl md:text-3xl font-light leading-normal">Sorry we couldn't find this page. </p>
            </div>
        </div>
    );
}
 
export default Error404;