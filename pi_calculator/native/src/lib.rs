use neon::prelude::*;
use std::f64;

fn calculate_pi(iterations: i32) -> f64 {
    let mut pi = 0.0;
    let mut sign = 1.0;

    for i in 0..iterations {
        pi += sign * 4.0 / (2.0 * i as f64 + 1.0);
        sign = -sign;
    }

    pi
}

fn calculate_pi_neon(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let iterations = cx.argument::<JsNumber>(0)?.value(&mut cx) as i32;
    let pi = calculate_pi(iterations);
    Ok(cx.number(pi))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("calculatePi", calculate_pi_neon)?;
    Ok(())
}
