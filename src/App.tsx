import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import Footer from "./components/Footer";

type Task = {
    id: number;
    text: string;
    completed: boolean;
};

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch("http://localhost:3000/tasks");
            const data = await response.json();
            setTasks(data);
        }

        fetchTasks();
    }, []);


    const addTask = async(text: string) => {
        const response = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text
            })
        });

        const newTask = await response.json();
        
        setTasks([...tasks, newTask]);
    };

    const deleteTask = async(id: number) => {
        await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE"
        });
        
        const response = await fetch("http://localhost:3000/tasks");
        const updateTasks = await response.json();

        setTasks(updateTasks);
    }

    const toggleTask = async(id: number) => {
        const task = tasks.find((task) => task.id === id);

        if (!task) {
            return ;
        }
        
        await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                completed: !task.completed
            })
        });

        const response = await fetch("http://localhost:3000/tasks");
        const updateTasks = await response.json();

        setTasks(updateTasks);
    }

    const pendingTasks = tasks.filter((task) => task.completed).length;
    const completedTasks = tasks.length - pendingTasks;

    return (
        <div className="app-container">
            <Header />
            <TaskInput onAddTask={addTask} />
            <TaskList 
                tasks={tasks}
                onDeleteTask={deleteTask}
                onToggleTask={toggleTask}
            />
            <Footer
                total={tasks.length}
                completed={completedTasks}
                pending={pendingTasks}
            />
        </div>
    );
}

export default App;