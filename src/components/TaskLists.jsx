import { LuPen, LuTrash2 } from "react-icons/lu"

export function TaskLists() {
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
                    {/* Row 1 */}
                    <tr className="hover:bg-gray-50 transition">
                    <td className="px-4 py-4 font-medium">Task 1</td>
                    <td className="px-4 py-4 text-gray-500">
                        Description for Task 1
                    </td>
                    <td className="px-4 py-4 text-center">
                        <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-3 py-1 rounded-full">
                        Pending
                        </span>
                    </td>
                    <td className="px-4 py-4">
                        <div className="flex justify-end items-center gap-3">
                        <LuPen className="text-blue-500 cursor-pointer hover:scale-110 transition" />
                        <LuTrash2 className="text-red-500 cursor-pointer hover:scale-110 transition" />
                        </div>
                    </td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="hover:bg-gray-50 transition">
                    <td className="px-4 py-4 font-medium">Task 2</td>
                    <td className="px-4 py-4 text-gray-500">
                        Description for Task 2
                    </td>
                    <td className="px-4 py-4 text-center">
                        <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                        Completed
                        </span>
                    </td>
                    <td className="px-4 py-4">
                        <div className="flex justify-end items-center gap-3">
                        <LuPen className="text-blue-500 cursor-pointer hover:scale-110 transition" />
                        <LuTrash2 className="text-red-500 cursor-pointer hover:scale-110 transition" />
                        </div>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}