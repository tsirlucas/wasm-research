function fibonacci(n) {
    let a = 0, b = 1, f = 1, i;

    for (i = 2; i <= n; i++) {
        f = a + b;
        a = b;
        b = f;
    }
    return f;
}

onmessage = function (message) {
    postMessage(fibonacci(message.data));
};