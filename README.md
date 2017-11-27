Steps to run your code

Firt install emsdk and activate it:

```
git clone https://github.com/juj/emsdk.git

cd emsdk

./emsdk install sdk-1.37.12-64bit

./emsdk activate --global sdk-1.37.12-64bit

source ./emsdk_env.sh

```
Then you can compile the c code

```
rm -rf wasm_output && mkdir wasm_output && emcc Fib.c -s ONLY_MY_CODE=1 -s WASM=1 -s EXPORTED_FUNCTIONS="['_fibonacci']"  -o wasm_output/jsFib.js
```

Then run webpack dev server and open console

```npm run dev```