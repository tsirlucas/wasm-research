const memory = new WebAssembly.Memory({ initial: 256, maximum: 256 });
const importObj = {
    env: {
        abortStackOverflow: () => {
            throw new Error('overflow');
        },
        table: new WebAssembly.Table({ initial: 0, maximum: 0, element: 'anyfunc' }),
        tableBase: 0,
        memory: memory,
        memoryBase: 1024,
        STACKTOP: 0,
        STACK_MAX: memory.buffer.byteLength,
        _printf: console.log
    }
};

function runTest(value) {
    const myWorker = new Worker('Fib.js');

    myWorker.postMessage(value);

    myWorker.onmessage = function (e) {
        console.log('JS worker result:', e.data);
        console.timeEnd('JS worker timer: ');
    };

    fetch('wasm_output/jsFib.wasm').then((response) => response.arrayBuffer())
        .then((bytes) => WebAssembly.instantiate(bytes, importObj))
        .then((wa) => {
            console.log('Wasm result:', wa.instance.exports._fibonacci(value));
            console.timeEnd('Wasm timer: ');
        });
}

console.time('Wasm timer: ');
console.time('JS worker timer: ');

// Big diff on 40000000 +
// C has problems with int overflow
// As well as js

runTest(40);