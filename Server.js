const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/save-ip", (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const log = `${new Date().toISOString()} - ${ip}\n`;

    fs.appendFile("ips.txt", log, (err) => {
        if (err) {
            console.error("Error al guardar IP:", err);
            return res.status(500).send("Error del servidor");
        }
        console.log("IP guardada:", ip);
        res.send({ message: "IP guardada", ip });
    });
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
