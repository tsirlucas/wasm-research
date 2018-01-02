import * as types from 'wasm-utils/lib/types';

const memory = new WebAssembly.Memory({ initial: 256, maximum: 256 });
const importObj = {
    env: {
        abortStackOverflow: () => {
            throw new Error('overflow');
        },
        _llvm_stackrestore: () => {
            throw new Error('_llvm_stackrestore');
        },
        _llvm_stacksave: () => {
            throw new Error('_llvm_stacksave');
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

const wasmExports = fetch('wasm_output/list.wasm').then((response) => response.arrayBuffer())
    .then((bytes) => WebAssembly.instantiate(bytes, importObj))
    .then((wa) => wa.instance.exports);


const createMapFromList = function (objectList) {
    return objectList.reduce(function (curr, next, i) {
        return curr[i] = next;
    }, {});
};


const arrObj = [{ a: 1, b: 2, c: 3 }, { a: 3, b: 2, c: 1 }];
const map = createMapFromList(arrObj);

wasmExports.then((exports) => {

    const ptr = exports._createList(arrObj.length);

    console.log(ptr);

    const listStruct = types.define(
        ...arrObj.map(() => {
            return {
                a: types.i32,
                b: types.i32,
                c: types.i32,
            }
        })
    );

    console.log(listStruct.size); // 12

    const listDataview = new DataView(memory.buffer, ptr, listStruct.size);

    const myList = listStruct(listDataview);

    console.log(myList);
});