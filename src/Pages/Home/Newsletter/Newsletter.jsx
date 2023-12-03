
const Newsletter = () => {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 p-8 sm:p-12 my-5 rounded-lg mx-5">
            <div className="w-full max-w-4xl rounded-md border-2 border-gray-100 bg-white p-14">
                <div className="flex flex-col items-center">
                    <span className="-rotate-1 rounded-lg bg-yellow-100 py-px px-2 text-sm text-yellow-800">117+ people joined this week</span>
                    <h3 className="mt-2 max-w-2xl text-center text-2xl font-bold leading-tight sm:text-3xl md:text-4xl md:leading-tight">Want exciting offers and update on courses? Then join this newsletter</h3>
                    <form action="" className="mx-auto mt-4 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:gap-0">
                        <input type="email" name="email" id="email" className="grow rounded border-2 border-gray-300 py-3 px-3 focus:border-emerald-500 focus:outline-none sm:rounded-l-md sm:rounded-r-none sm:border-r-0" placeholder="Email Address" />
                        <button type="submit" className="rounded px-5 py-4 font-bold bg-gradient-to-r from-cyan-300/80 to-blue-500/80 hover:bg-gradient-to-r hover:from-cyan-500/80 hover:to-blue-700/80 text-white sm:rounded-l-none sm:rounded-r-md">Get First Email</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;