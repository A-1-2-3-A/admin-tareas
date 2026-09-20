const app = require("./app");

const PORT = process.env.PORT || 3000;

throw new Error("fallo simulado");

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT} ...`);
});