const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const PORT = 3000;

const prisma = new PrismaClient();

app.use(express.json());

type Task = {
    id: number;
    text: string;
    completed: boolean;
}

const tasks: Task[] = [
    { id: 1, text: "Estudiar Node.js", completed: false },
    { id: 2, text: "Crear servidor express", completed: true },
    { id: 3, text: "Probar rutas del backend", completed: false },
];

app.get("/", (req: any, res: any) => {
    res.send("Servidor funcionando");
});

app.get("/tasks", async (req: any, res: any) => {
    const tasksFromDatabase = await prisma.task.findMany();
    res.json(tasksFromDatabase);
});

app.post("/tasks", async (req: any, res: any) => {
    const { text } = req.body;

    if (!text || text.trim() === "") {
        return res.status(400).json({
            message: "Task text is required"
        });
    }

    const newTask = await prisma.task.create({
        data: {
            text: text,
            completed: false
        }
    });

    res.status(201).json(newTask);
});

app.put("/tasks/:id", async (req: any, res: any) => {
    const id = Number(req.params.id);
    const { text, completed } = req.body;

    const task = await prisma.task.findUnique({
        where: { id }
    });

    if (!task) {
        return res.status(404).json({
            message: "Tarea no encontrada"
        });
    }

    const updatedTask = await prisma.task.update({
        where: { id },
        data: {
            text,
            completed
        }
    });

    res.json(updatedTask);
});

app.delete("/tasks/:id", async (req: any, res: any) => {
    const id = Number(req.params.id);

    const task = await prisma.task.findUnique({
        where: { id }
    });

    if (!task) {
        return res.status(404).json({
            message: "Tarea no encontrada"
        });
    }

    await prisma.task.delete({
        where: { id }
    })

    res.status(200).json({
        message: "Tarea eliminada correctamente"
    });
});

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto 3000 ...');
});