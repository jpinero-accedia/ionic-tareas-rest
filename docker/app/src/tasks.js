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

    #getArrayIndex (id) {
        return this.data.findIndex( t => t.id === id );
    }

    getAll () {
        return this.data;
    }

    getTask (id) {
        const ret={
            found: false,
            data: {},
        };
        
        const index = this.#getArrayIndex(id);

        if (index > -1 ) {
            ret.data=this.data[index];
            ret.found=true;
        }

        return ret;
    }

    addTask (data) {
        const task = Task.prototype.createTask(data);
        task.id=this.nextIndex++;
        this.data.push(task);

        return task;
    }

    deleteTask (id) {
        let deleted=false;

        const index = this.#getArrayIndex(id);

        if (index > -1 ) {
            this.data.splice(index,1);
            deleted=true;
        }

        return deleted;
    }

    modifyTask (id,data,isPartial) {
        let updated = false;
        let task;

        const index = this.#getArrayIndex(id);

        if (index > -1) {
            if (isPartial) {
                task = this.data[index];
            }
            else {
                task = {};
            }

            this.data[index] = Task.prototype.createTask({...task, ...data, id});
            updated = true;
        }

        return updated;
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
