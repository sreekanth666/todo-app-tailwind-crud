import { commonAPI } from "./commonAPI"
import { serverURL } from "./serverURL"

// Add task
export const createTask = async(body) => {
    return commonAPI("POST", `${serverURL}/todoList`, body)
}

// Get task
export const getTask = async() => {
    return commonAPI("GET", `${serverURL}/todoList`, "")
}

// Delete task
export const deleteTask = async(id) => {
    return commonAPI("DELETE", `${serverURL}/todoList/${id}`, {})
}

// Update task
export const updateTask = async(body, id) => {
    return commonAPI("PUT", `${serverURL}/todoList/${id}`, body)
}

// Empty all task
export const deleteAllTask = async(ids) => {
    for (const id of ids) {
        await commonAPI("DELETE", `${serverURL}/todoList/${id}`, {});
    }
}

