import TaskCard from "./TaskCard";

function TaskList(){
    const tasks = [
        "1",
        "2",
        "3"
    ];
    
    return (
        <ul>
            {tasks.map((task, index) => (
                <TaskCard key={index} text={task}></TaskCard>
            ))}
        </ul>
    );
}

export default TaskList;