import { LuPen, LuTrash2, LuCheck, LuX } from "react-icons/lu"
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc, where, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect } from "react";
import { useState } from "react";

export function TaskLists({ currentUser, editTask, setEditTask, setTaskToEdit }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (!currentUser?.uid) return;
        const unsubscribe = onSnapshot(
            query(
                collection(db, 'todos'),
                where('uId','==',currentUser.uid),
                orderBy('createdAt', 'desc')
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
                        <tr key={task.docId} className={`hover:bg-gray-50 ${task.status ? 'bg-green-50' : 'bg-yellow-50'}`}>
                            
                            <td className={`px-4 py-3 ${task.status ? 'line-through decoration-double' : ''}`}>{task.title}</td>
                            <td className={`px-4 py-3 ${task.status ? 'line-through decoration-double' : ''}`}>{!task.description ? 'No description' : task.description}</td>
                            <td className="px-4 py-3 text-center">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${task.status ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {task.status ? 'Completed' : 'Pending'}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex justify-end items-center gap-5">
                                    <div>
                                        {task.status ? (
                                            <LuX className="text-yellow-500 cursor-pointer hover:scale-110 transition"
                                            onClick={() => {
                                                updateDoc(doc(db, "todos", task.docId), { status: false });
                                            }}
                                            />
                                        ) : (
                                            <LuCheck className="text-green-500 cursor-pointer hover:scale-110 transition"
                                            onClick={() => {
                                                updateDoc(doc(db, "todos", task.docId), { status: true });
                                            }}
                                            />

                                        )}
                                    </div>                                    
                                    <LuPen className="text-blue-500 cursor-pointer hover:scale-110 transition"
                                    onClick={() => {
                                        setEditTask(!editTask);
                                        setTaskToEdit(task);
                                    }}
                                    />
                                    <LuTrash2 className="text-red-500 cursor-pointer hover:scale-110 transition" 
                                    onClick={() => {
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