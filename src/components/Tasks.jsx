import { LuPlus } from "react-icons/lu"
import { TaskLists } from "./TaskLists"
import { AddTasks } from "./AddTasks"
import { useEffect, useState } from "react"
import { collection, query, where, getCountFromServer } from "firebase/firestore";
import { db } from "../config/firebase";

export function Tasks({ currentUser }) {
    const [addTask, setAddTask] = useState(false)
    const [taskCount, setTaskCount] = useState(0)
    // Get the count of tasks for the current user
    const fetchTaskCount = async () => {
        if (!currentUser?.uid) return;

        const q = query(
            collection(db, "todos"),
            where("uId", "==", currentUser.uid)
        );
        const snapshot = await getCountFromServer(q);
        setTaskCount(snapshot.data().count);
    };

    useEffect(() => {
        fetchTaskCount();
    }, [currentUser]);

    return (
        <div className="Tasks w-full flex flex-col p-4 lg:px-36 gap-2 mt-3">
            {addTask && <AddTasks setAddTask={setAddTask} />}
            <div className="flex justify-between items-start">
                <div>
                    <p className='text-2xl lg:text-2xl font-bold'>My Tasks</p>
                    {/* count number of tasks in currentUser check very well to be sure it's correct */}
                    <p className='lg:text-md'>You have {taskCount} tasks</p>
                </div>
                <div>
                    <button
                        className="bg-gradient-to-br from-blue-700 via-blue-500 to-blue-700 text-white py-3 px-4 rounded flex items-center justify-center"
                        onClick={()=>setAddTask(!addTask)}
                    >
                        <LuPlus className="mr-2" size={25} />
                        Add Task
                    </button>
                </div>
            </div>
            <TaskLists currentUser={currentUser} />
        </div>
    )
}