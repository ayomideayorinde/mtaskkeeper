import { LuPlus } from "react-icons/lu"
import { TaskLists } from "./TaskLists"
import { AddTasks } from "./AddTasks"

export function Tasks() {
    return (
        <div className="Tasks w-full flex flex-col p-4 lg:px-36 gap-2 mt-3">
            <div className="flex justify-between items-start">
                <div>
                    <p className='text-2xl lg:text-2xl font-bold'>My Tasks</p>
                    <p className='lg:text-md'>Here are your tasks for today!</p>
                </div>
                <div>
                    <button
                        className="bg-gradient-to-br from-blue-700 via-blue-500 to-blue-700 text-white py-3 px-4 rounded flex items-center justify-center"
                    >
                        <LuPlus className="mr-2" size={25} />
                        Add Task
                    </button>
                </div>
            </div>
            <TaskLists />
        </div>
    )
}