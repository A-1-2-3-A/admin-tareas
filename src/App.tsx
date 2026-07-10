import { useState } from "react";
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
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, text: "1", completed: false },
        { id: 2, text: "2", completed: false },
        { id: 3, text: "3", completed: false }
    ]);

    const addTask = (text: string) => {
        const newTask: Task = {
            id: Date.now(),
            text: text,
            completed: false
        };

        setTasks([...tasks, newTask]);
    };

    const deleteTask = (id: number) => {
        const updateTasks = tasks.filter((task) => task.id !== id);
        setTasks(updateTasks);
    }

    const toggleTask = (id: number) => {
        const updateTasks = tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    completed: !task.completed
                };
            }
            return task;
        });

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