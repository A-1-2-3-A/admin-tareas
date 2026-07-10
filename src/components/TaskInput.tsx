import { useState } from "react";
import { Plus } from "lucide-react";
import './TaskInput.css';

type TaskImputProps = {
    onAddTask: (text: string) => void;
}

function TaskInput(props: TaskImputProps){
    const [text, setText] = useState("");

    const handleSubmit = () => {
        if (text.trim() === "") {
            return;
        }

        props.onAddTask(text);
        setText("");
    };

    return (
        <div className="input-container">
            <input 
                type="text"
                placeholder="Escriba una nueva tarea"
                value={text}
                onChange={(event) => setText(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && handleSubmit()}
            />

            <button onClick={handleSubmit} className="add-btn">
                <Plus size={20} />
            </button>
        </div>
    );
}

export default TaskInput;