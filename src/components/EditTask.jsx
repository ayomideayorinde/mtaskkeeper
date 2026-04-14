import { useState } from "react"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "../config/firebase"

export function EditTask({setEditTask, taskToEdit, setTaskToEdit, isLoggedIn, currentUser}) {
    const [title, setTitle] = useState(taskToEdit?.title || "")
    const [description, setDescription] = useState(taskToEdit?.description || "")
    const [titleerror, setTitleError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setTitleError("")

        if (!title.trim()){
            setTitleError("Title can't be empty")
            setTimeout(() => {
                setTitleError("")
            }, 3000)
            return
        }

        const updatedTask = {
            title: title,
            description: description,
            uId: currentUser.uid
        }

        if (isLoggedIn) {
            try {
                await updateDoc(doc(db, "todos", taskToEdit.docId), updatedTask)
                setTitle("");
                setDescription("");
                setEditTask(false);
                setTaskToEdit(null);
            } catch (error) {
                setTitleError(`Failed to update task: ${error.message}`)
                setTimeout(() => {
                    setTitleError("")
                }, 3000)
            }
        }
    }

    return (
        <div className="AddTasks flex justify-center items-center bg-black/70 fixed w-full h-full inset-0 lg:p-36 p-4">
            <div className=" bg-white rounded space-y-4 w-full lg:w-1/2 py-2 px-6 text-black shadow border shadow-black/50 relative">
                <button 
                    className="absolute right-4 top-2 hover:text-red-600"
                    onClick={()=>setEditTask(false)}
                >
                    X
                </button>
                <h1 className="text-lg mb-4">
                    Edit Task
                </h1>
                <form action="" onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <label htmlFor="todotitle">Title <span className="text-red-500">*</span></label>
                        <input 
                            className="p-2 rounded border-2 outline-none focus:ring-2 focus:ring-blue-500 border-gray-200" 
                            type="text" 
                            name="todotitle" 
                            id="todotitle" 
                            placeholder="Enter task title..." 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <p className="text-red-500 text-sm">{titleerror}</p>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="tododescription">Description</label>
                        <textarea 
                            className="p-2 rounded border-2 outline-none focus:ring-2 focus:ring-blue-500 border-gray-200" 
                            type="text" 
                            name="tododescription" 
                            id="tododescription" 
                            placeholder="Enter task description..." 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end gap-3 mb-4">
                        <button 
                            className="border border-gray-300 py-1 px-4 rounded"
                            onClick={()=>setEditTask(false)}
                        >Cancel</button>
                        <button className="bg-gradient-to-br from-blue-700 via-blue-500 to-blue-700 text-white py-1 px-4 rounded">Update Task</button>
                    </div>
                </form>
            </div>
        </div>
    )
}