import express from "express";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import os from "os";

const app = express();
const PORT = 8080;
const BLOB_DIR = "/var/blobs";
const EXPRESS_RAW_LIMIT = "10mb";

app.use(express.raw({ type: "*/*", limit: EXPRESS_RAW_LIMIT }));

// Create
app.post("/blobs", async (req, res) => {
    const id = crypto.randomUUID();
    const filePath = path.join(BLOB_DIR, id);
    await fs.writeFile(filePath, req.body);
    res.status(201).json({ id });
});

// Read
app.get("/blobs/:id", async (req, res) => {
    const filePath = path.join(BLOB_DIR, req.params.id);
    try {
        const data = await fs.readFile(filePath);
        res.type("application/octet-stream").send(data);
    } catch {
        res.sendStatus(404);
    }
});

// Update
app.put("/blobs/:id", async (req, res) => {
    const filePath = path.join(BLOB_DIR, req.params.id);
    try {
        await fs.access(filePath);
        await fs.writeFile(filePath, req.body);
        res.sendStatus(204);
    } catch {
        res.sendStatus(404);
    }
});

// Delete
app.delete("/blobs/:id", async (req, res) => {
    const filePath = path.join(BLOB_DIR, req.params.id);
    try {
        await fs.unlink(filePath);
        res.sendStatus(204);
    } catch {
        res.sendStatus(404);
    }
});

app.listen(PORT, () => {
	console.log(`User: ${os.userInfo().username}`);
    console.log(`Listening on ${PORT}`);
    console.log(`Storing blobs in ${BLOB_DIR}`);
});
