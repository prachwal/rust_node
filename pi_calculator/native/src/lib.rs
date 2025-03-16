use neon::prelude::*;
mod common; // dodany import modułu common

fn calculate_pi_neon(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let iterations = cx.argument::<JsNumber>(0)?.value(&mut cx) as i32;
    let pi = common::calculate_pi(iterations); // korzysta z funkcji z common
    Ok(cx.number(pi))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("calculatePi", calculate_pi_neon)?;
    Ok(())
}
