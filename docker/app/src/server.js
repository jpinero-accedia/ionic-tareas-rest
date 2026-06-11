import express from 'express';
import TASKS   from './tasks.js';

const app = express();

app.use(express.json());

app.get('/tasks', (req,res) => {
    return res.json(TASKS.getAll());
} );

app.get('/tasks/:taskId', (req,res) => {
    const id = Number(req.params.taskId);
    const ret = TASKS.getTask(id);

    if (!ret.found) {
        return res.status(404);
    }

    return res.json(ret.data);
} );


app.listen(3000,'0.0.0.0', () => {
    console.log("REST API started in port 3000 (internal).");
} );

