export function fibonacci(n: f64): f64 {
    let a: f64 = 0,
        b: f64 = 1,
        f: f64 = 1,
        i: f64;

    for (i = 2; i <= n; i++) {
        f = a + b;
        a = b;
        b = f;
    }

    return f as f64;
}