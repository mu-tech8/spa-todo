import React, { useEffect, useState } from "react";
import { TaskInput } from "./components/TaskInput";
import { TaskList } from "./components/TaskList";
export const TaskPage: React.VFC = () => {
    /**
    const [tasks, setTasks] = useState<Task[]>([]);
    const getTasks = async () => {
        const { data } = await axios.get<Task[]>("api/tasks");
        setTasks(data);
    };

    useEffect(() => {
        getTasks();
    });
    */

    return (
        <>
            <TaskInput />
            <TaskList />
        </>
    );
};
