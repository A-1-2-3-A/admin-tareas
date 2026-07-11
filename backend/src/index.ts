const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

const prisma = new PrismaClient();

app.use(cors());
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

app.post("/login", async(req: any, res: any) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(401).json({
            message: "Email and password are required"
        });
    }

    const user = await prisma.user.findUnique({
        where : { email: email }
    });

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    const passwordIsInvalid = await bcrypt.compare(password, user.password)

    if (!passwordIsInvalid) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        "secret_key",
        { expiresIn: "1h" }
    );

    res.json({
        message: "Login successful",
        token: token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    })
});

// Antiguo /profile, ahora funciona como protector de rutas seguras
const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, "secret_key");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
};

app.post("/register", async(req: any, res: any) => {
    const { name, email, password } = req.body || {}

    if (!name || !email || !password) {
        return res.status(401).json({
            message: "Name, email and password are required"
        });
    }

    const existingUser = await prisma.user.findUnique({
        where: { email: email }
    });

    if (existingUser) {
        return res.status(401).json({
            message: "User alredy exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        }
    })

    res.status(201).json({
        message: "User registered successfully",
        user: {
            name: name,
            email: email,
            password: hashedPassword
        }
    });
});

app.get("/tasks", authenticateToken, async (req: any, res: any) => {
    const tasksFromDatabase = await prisma.task.findMany();
    res.json(tasksFromDatabase);
});

app.post("/tasks", authenticateToken, async (req: any, res: any) => {
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

app.put("/tasks/:id", authenticateToken, async (req: any, res: any) => {
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

app.delete("/tasks/:id", authenticateToken, async (req: any, res: any) => {
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
    console.log(`Servidor corriendo en el puerto ${PORT} ...`);
});