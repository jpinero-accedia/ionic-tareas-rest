import express from 'express';
import TASKS   from './tasks.js';

const app = express();

app.use(express.json());

app.get('/tasks', (req,res) => {
    return res.json(TASKS.getAll());
} );

app.get('/tasks/:taskId', (req,res) => {
    let ret;
    let isOk = true;
    let status;

    const errobj={
        id: req.params.taskId,
        error: ''
    };

    const id = Number(errobj.id);

    if (isNaN(id)) {
        errobj.error = `The id '${errobj.id}' is not a valid number.`;
        isOk = false;
    }
    else {
        ret = TASKS.getTask(id);
        
        if (ret.found) {
            ret = ret.data;
        }
        else {
            errobj.error = `There is no task with id='${errobj.id}'.`;
            isOk = false;
        }
    }

    if (isOk) {
        status = 200;
    }
    else {
        status = 404;
        ret = errobj;
    }

    return res.status(status).json(ret);
} );


app.listen(3000,'0.0.0.0', () => {
    console.log("REST API started in port 3000 (internal).");
} );

