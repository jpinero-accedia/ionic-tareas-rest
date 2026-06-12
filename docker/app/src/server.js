import express from 'express';
import TASKS   from './tasks.js';

const app = express();

app.use(express.json());


app.get('/tasks', (req,res) => {
    return res.json(TASKS.getAll());
} );


app.post('/tasks', (req,res) => {
    const task = TASKS.addTask(req.body);

    return res.json(task);
});


app.param("taskId", (req,res,next,taskId) => {
    const retobj = {
        id: taskId,
        taskId: Number(taskId),
        task: undefined,
        status: 200,
        errMsg: 'OK',
    };

    if (isNaN(retobj.taskId)) {
        retobj.errMsg = `The id '${retobj.id}' is not a valid number.`;
        retobj.status = 404;
    }
    else {
        const taskobj = TASKS.getTask(retobj.taskId);

        if (taskobj.found) {
            retobj.task = taskobj.data;
        }
        else {
            retobj.errMsg = `Can't obtain the task with id='${retobj.id}'.`;
            retobj.status = 404;
        }
    }

    req.taskobj = retobj;

    next();
});


app.get('/tasks/:taskId', (req,res) => {
    let ret;

    if ( req.taskobj.status == 200 ) {
       ret = res.json(req.taskobj.task); 
    }
    else {
        ret = res.status(req.taskobj.status).json({
            id: req.taskobj.id,
            errMsg: req.taskobj.errMsg,
        });
    }

    return ret;
} );


app.delete('/tasks/:taskId', (req,res) => {
    if ( req.taskobj.status == 200 ) {
        if (! TASKS.deleteTask(req.taskobj.taskId) ) {
            req.taskobj.status = 500;
            req.taskobj.errMsg = `Unexpected error trying to delete the task with id='${req.taskobj.id}'.`;
        }
    }

    return res.status(req.taskobj.status).json({
        id: req.taskobj.id,
        errMsg: req.taskobj.errMsg,
    });
});


app.put('/tasks/:taskId', (req,res) => {
    if ( req.taskobj.status == 200 ) {
        if (! TASKS.modifyTask(req.taskobj.taskId,req.body,false) ) {
            req.taskobj.status = 500;
            req.taskobj.errMsg = `Unexpected error trying to replace the task with id='${req.taskobj.id}'.`;
        }
    }

    return res.status(req.taskobj.status).json({
        id: req.taskobj.id,
        errMsg: req.taskobj.errMsg,
    });
});


app.patch('/tasks/:taskId', (req,res) => {
    if ( req.taskobj.status == 200 ) {
        if (! TASKS.modifyTask(req.taskobj.taskId,req.body,true) ) {
            req.taskobj.status = 500;
            req.taskobj.errMsg = `Unexpected error trying to patch the task with id='${req.taskobj.id}'.`;
        }
    }

    return res.status(req.taskobj.status).json({
        id: req.taskobj.id,
        errMsg: req.taskobj.errMsg,
    });
});


app.listen(3000,'0.0.0.0', () => {
    console.log("REST API started in port 3000 (internal).");
} );

//