class Task {
    constructor () {
        this.id = '';
        this.title = '';
        this.is_done = false;
    }

    createTask (data) {
        const emptyTask = new Task();
        const mixedData = { ...emptyTask, ...data };

        for (const key in data) {
            if ( ! (key in emptyTask) ) {
                delete mixedData[key];
            }
        }

        return mixedData;
    }
}

class TaskStore {
    constructor () {
        this.data=[];
        this.nextIndex=1;
    }

    getAll () {
        return this.data;
    }

    addTask (data) {
        const task = Task.prototype.createTask(data);
        task.id=this.nextIndex++;
        this.data.push(task);

        return task.id;
    }

    getTask (id) {
        const ret={
            found: false,
            data: {},
        };
        
        const index = this.data.findIndex( t => t.id === id );

        if (index > -1 ) {
            ret.data=this.data[index];
            ret.found=true;
        }

        return ret;
    }

    deleteTask (id) {
        let deleted=false;

        const index = this.data.findIndex( t => t.id === id );

        if (index > -1 ) {
            this.data.splice(index,1);
            deleted=true;
        }

        return deleted;
    }
}

const TASKS = new TaskStore();

TASKS.addTask({
    title: 'Mi 1a TASK',
    description: "Una task",
});

TASKS.addTask({
    title: 'Mi 2a TASK',
    description: "Una task alternativa que ya aparezca hecha",
    is_done: true,
});

export default TASKS;
