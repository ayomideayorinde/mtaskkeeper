import { LuPlus } from "react-icons/lu"
import { TaskLists } from "./TaskLists"
import { AddTasks } from "./AddTasks"
import { EditTask } from "./EditTask"
import { useEffect, useState } from "react"
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

export function Tasks({ currentUser, isLoggedIn }) {
    const [addTask, setAddTask] = useState(false)
    const [editTask, setEditTask] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState(null)
    const [taskCount, setTaskCount] = useState(0)
    // Get the count of tasks for the current user

    useEffect(() => {
        const fetchTaskCount = async () => {
            if (!currentUser?.uid) return;

            const q = query(
                collection(db, "todos"),
                where("uId", "==", currentUser.uid)
            );
            const unsubscribe = onSnapshot(q, (snapshot) => {
                setTaskCount(snapshot.size);
            });
            return unsubscribe;
        };
        fetchTaskCount();
    }, [currentUser]);

    return (
        <div className="Tasks w-full flex flex-col p-4 lg:px-36 gap-2 mt-3">
            {addTask && <AddTasks setAddTask={setAddTask} isLoggedIn={isLoggedIn} currentUser={currentUser} />}
            {editTask && <EditTask setEditTask={setEditTask} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} isLoggedIn={isLoggedIn} currentUser={currentUser} />}
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
            <TaskLists currentUser={currentUser} editTask={editTask} setEditTask={setEditTask} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
        </div>
    )
}