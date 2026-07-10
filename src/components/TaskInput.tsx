import { useState } from "react";

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
        <div>
            <input 
                type="text"
                placeholder="Escriba una nueva tarea"
                value={text}
                onChange={(event) => setText(event.target.value)}
            />

            <button onClick={handleSubmit}>
                Agregar
            </button>
        </div>
    );
}

export default TaskInput;