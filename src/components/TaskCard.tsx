import { Trash2, CheckCircle2 } from 'lucide-react';
import './TaskCard.css';

type Task = {
    id: number;
    text: string;
    completed: boolean;
}

type TaskCardProps = {
    task: Task;
    onDeleteTask: (id: number) => void; 
    onToggleTask: (id: number) => void;
}

function TaskCard(props: TaskCardProps){
    return (
        <div className={props.task.completed ? "task-card completed" : "task-card"}>
            <div className="task-content">
                <CheckCircle2 
                    size={20}
                    color={props.task.completed ? "#22c55e" : "#e2e8f0"}
                    onClick={() => props.onToggleTask(props.task.id)}
                    style={{cursor: 'pointer'}}
                />
                <span>{props.task.text}</span>
            </div>

            <button onClick={() => props.onDeleteTask(props.task.id)} className="delete-btn">
                <Trash2 size={18} />
            </button>
        </div>
    );
}

export default TaskCard;