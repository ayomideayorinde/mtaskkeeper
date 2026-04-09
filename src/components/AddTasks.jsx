
export function AddTasks({setAddTask}) {
    return (
        <div className="AddTasks flex justify-center items-center bg-black/70 fixed w-full h-full inset-0 lg:p-36 p-4">
            <div className=" bg-white rounded space-y-4 w-full lg:w-1/2 py-2 px-6 text-black shadow border shadow-black/50 relative">
                <button 
                    className="absolute right-4 top-2 hover:text-red-600"
                    onClick={()=>setAddTask(false)}
                >
                    X
                </button>
                <h1 className="text-lg mb-4">
                    Add New Task
                </h1>
                <form action="" className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <label htmlFor="todotitle">Title</label>
                        <input className="p-2 rounded border-2 outline-none focus:ring-2 focus:ring-blue-500 border-gray-200" type="text" name="todotitle" id="todotitle" placeholder="Enter task title..." />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="tododescription">Description</label>
                        <textarea className="p-2 rounded border-2 outline-none focus:ring-2 focus:ring-blue-500 border-gray-200" type="text" name="tododescription" id="tododescription" placeholder="Enter task description..." />
                    </div>
                    <div className="flex justify-end gap-3 mb-4">
                        <button 
                            className="border border-gray-300 py-1 px-4 rounded"
                            onClick={()=>setAddTask(false)}
                        >Cancel</button>
                        <button className="bg-gradient-to-br from-blue-700 via-blue-500 to-blue-700 text-white py-1 px-4 rounded">Save Task</button>
                    </div>
                </form>
            </div>
        </div>
    )
}