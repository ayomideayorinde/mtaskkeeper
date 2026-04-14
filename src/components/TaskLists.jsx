import { LuPen, LuTrash2 } from "react-icons/lu"
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useEffect } from "react";
import { useState } from "react";

export function TaskLists({ currentUser }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (!currentUser?.uid) return;
        const unsubscribe = onSnapshot(
            query(
                collection(db, 'todos'),
                where('uId','==',currentUser.uid)
            ),
            (snapshot)=>{
                const data = snapshot.docs.map((doc)=>({
                    docId: doc.id,
                    ...doc.data()
            }))
            setTasks(data)
        })
        return ()=>unsubscribe()
    }, [currentUser]);


    return (
        <div className="TaskLists mt-5 bg-white rounded-lg p-4 shadow-md border border-blue-200 w-full overflow-x-auto">
            <h1 className="text-2xl font-medium mb-4">All Tasks</h1>
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 text-white">
                    <tr className="text-left text-sm text-white">
                    <th className="px-4 py-3 w-1/4">Task Title</th>
                    <th className="px-4 py-3 w-1/2">Task Description</th>
                    <th className="px-4 py-3 w-1/6 text-center">Status</th>
                    <th className="px-4 py-3 w-1/6 text-right">Actions</th>
                    </tr>
                </thead>

                <tbody className="text-sm text-gray-700 divide-y">
                    {tasks.map((task) => (
                        <tr key={task.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">{task.title}</td>
                            <td className="px-4 py-3">{task.description}</td>
                            <td className="px-4 py-3 text-center">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${task.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {task.completed ? 'Completed' : 'Pending'}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex justify-end items-center gap-3">
                                    <LuPen className="text-blue-500 cursor-pointer hover:scale-110 transition"
                                    onClick={() => {
                                        // Handle edit task logic
                                        const newStatus = !task.completed;
                                        updateDoc(doc(db, "todos", task.id), { completed: newStatus });
                                    }}
                                    />
                                    <LuTrash2 className="text-red-500 cursor-pointer hover:scale-110 transition" 
                                    onClick={() => {
                                        // Handle delete task logic
                                        deleteDoc(doc(db, "todos", task.docId));
                                    }}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}