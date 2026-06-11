const emptyTask = { id:'', title:'', is_done:false};
const data={ title:'TITULO', num:33};

const mixedData = { ...emptyTask, ...data};

let key;

for (key in data) {
    console.log(`Comprobando el campo ${key}`);
    if (! (key in emptyTask) ) {
        console.log(`Borramos la clave ${key}`);
        delete mixedData[key];
    }
}

console.log(`MixedData final: ${mixedData}`);
console.log(mixedData); //
