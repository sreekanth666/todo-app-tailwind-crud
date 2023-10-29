import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTask, deleteAllTask, deleteTask, getTask, updateTask } from '../Services/allAPI';
import './todo.css'

function Todo() {
    // Track id
    const [taskID, setTaskID] = useState([])

    // Update variable
    const [isUpdate, setIsUpdate] = useState()

    // Create and upload task
    const [task, setTask] = useState("")
    const uploadTask = async(e) => {
        e.preventDefault()
        if (task == "") {
            toast.warning("Please enter the task")
        } else {
            const body = {
                "task": task
            }
            const response = await createTask(body)
            setIsUpdate(response)
            if (response.status >= 200 && response.status < 300) {
                toast.success("Task added")
                setTask("")
            } else {
                toast.error(`An error occurred`)
            }
        }
    }

    // Get and display tasks
    const [allTasks, setAllTasks] = useState([])
    const fetchTask = async() => {
        const response = await getTask()
        setAllTasks(response.data);
    }
    useEffect(() => {
        fetchTask()
    }, [isUpdate])

    useEffect(() => {
        const ids = allTasks?.map(item => item.id)
        setTaskID(ids)
    }, [allTasks])

    // Delete task
    const handleDelete = async(id) => {
        const response = await deleteTask(id)
        setIsUpdate(response)
        if (response.status >= 200 && response.status < 300) {
            toast.success("Task deleted")
        } else {
            toast.error("An error occurred")
        }
    }

    // Update task
    const [editingId, setEditingId] = useState()
    const handleUpdate = (id, task) => {
        setEditingId(id)
        setUpdatedTask(task)
        console.log(task);
    }
    const [updatedTask, setUpdatedTask] = useState()
    const handleUpdateTask = async(id) => {
        const body ={
            "task": updatedTask
        }
        const response = await updateTask(body, editingId)
        if (response.status >= 200 && response.status < 300) {
            toast.success("Task updated")
            setEditingId("")
            setIsUpdate(response)
        } else {
            toast.error(`An error occurred`)
        }
    }

    // Delete all task
    const handleDeleteAllTask = async() => {
        await deleteAllTask(taskID)
        setIsUpdate("All deleted")
    }
    return (
        <>
            <ToastContainer 
                position='bottom-right'
                autoClose={2000}
                theme="colored"
            />
            <div style={{height:'100vh'}} className='flex flex-col items-center pt-5 pb-5 ms-2 me-2'>
                <div className='w-auto'>
                    <h1 className='text-4xl text-left mb-5 font-extrabold'>To-Do List 📝</h1>
                    <div className='rounded-md p-3 w-auto todo-space'>
                        <div className='mb-6 text-center flex'>
                            <input type="text" className='p-3 bg-slate-100 rounded-md w-full me-2' name="task" id="task" placeholder='Enter task' onChange={(e) => setTask(e.target.value)} value={task} />
                            <button className='bg-blue-500 ps-4 pe-4 pt-3 pb-3 ms-2 rounded-full w-1/4 hover:bg-blue-600 text-white font-semibold' onClick={(e) => uploadTask(e)}><i className="fa-solid fa-plus"></i></button>
                        </div>

                                {
                                    allTasks?.length > 0 ?
                                        <table className='table-auto w-full max-w-lg border-spacing-y-1 border-separate'>
                                            <thead>
                                                <tr className="bg-white">
                                                    <th className='text-left p-3 rounded-l-md' colSpan={2}>Task</th>
                                                    <th className='p-3 rounded-r-md' colSpan={2}>
                                                        {
                                                            allTasks?.length > 1 ?
                                                                <i className="fa-solid fa-trash text-red-600" onClick={handleDeleteAllTask}></i>
                                                            :   ""
                                                        }
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                allTasks?.map((item, index) => (
                                                    <tr className='border-b bg-white'>
                                                        {
                                                                editingId === item.id ?
                                                                    <td className='p-3 bg-red-200 rounded-l-lg w-10 text-center'>
                                                                        {index+1}
                                                                    </td>
                                                                :   <td className='p-3 bg-orange-100 rounded-l-lg w-10 text-center'>
                                                                        {index+1}
                                                                    </td>
                                                            }
                                                        <td className='p-3'>
                                                            {
                                                                editingId === item.id ?
                                                                <p>
                                                                    <input type="text" value={updatedTask || item.task} name="updated-task"  className='w-full text-red-600 focus:outline-none' onChange={(e) => setUpdatedTask(e.target.value)} />
                                                                </p>
                                                                : item.task
                                                            }
                                                        </td>
                                                        {
                                                                editingId === item.id ?
                                                                    <td className='text-center text-green-600 w-10'>
                                                                        <i className="fa-solid fa-floppy-disk" onClick={() => handleUpdateTask(item.id)}></i>
                                                                    </td>
                                                                :   <td className='text-center text-green-600 w-10'>
                                                                        <i className="fa-solid fa-pen-to-square" onClick={() => handleUpdate(item.id, item.task)}></i>
                                                                    </td>
                                                            }
                                                        <td className='text-center text-red-600 rounded-r-md w-10'>
                                                            <i className="fa-solid fa-circle-minus" onClick={() => handleDelete(item.id)}></i>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            </tbody>
                                        </table>
                                    :
                                    <p className='text-center'>Nothing to display</p>
                                }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo

