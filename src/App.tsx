import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

type Task = {
    id: number;
    text: string;
    completed: boolean;
};

function App() {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [view, setView] = useState<"login" | "register">('login');
    const [tasks, setTasks] = useState<Task[]>([]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    useEffect(() => {
        if (!token) {
            return;
        }

        const fetchTasks = async () => {
            const response = await fetch("http://localhost:3000/tasks", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            setTasks(Array.isArray(data) ? data : []);
        }

        fetchTasks();
    }, [token]);


    const addTask = async (text: string) => {
        const response = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                text: text
            })
        });

        const newTask = await response.json();

        setTasks([...tasks, newTask]);
    };

    const deleteTask = async (id: number) => {
        await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const response = await fetch("http://localhost:3000/tasks", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const updateTasks = await response.json();

        setTasks(updateTasks);
    }

    const toggleTask = async (id: number) => {
        const task = tasks.find((task) => task.id === id);

        if (!task) {
            return;
        }

        await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                completed: !task.completed
            })
        });

        const response = await fetch("http://localhost:3000/tasks", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const updateTasks = await response.json();

        setTasks(updateTasks);
    }

    const pendingTasks = (tasks || []).filter((task) => task.completed).length;
    const completedTasks = tasks.length - pendingTasks;

    if (!token) {
        return view === "login"
            ? <LoginForm onLogin={(token) => setToken(token)} onViewRegister={() => setView("register")} />
            : <RegisterForm onRegister={() => setView("login")} />
    }

    return (
        <div className="app-container">
            <Header onLogout={handleLogout} />
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
    
}

export default App;