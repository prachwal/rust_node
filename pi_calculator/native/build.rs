extern crate neon_build;
use std::panic;

fn setup_panic_hook() {
    panic::set_hook(Box::new(|panic_info: &panic::PanicHookInfo| {
        let message = panic_info.to_string();
        eprintln!("Panic: {}", message); // Wypisuje do stderr w Node.js
    }));
}

fn main() {
    setup_panic_hook(); // Call the function here
    neon_build::setup(); // must be called in build.rs

    // add project-specific build logic here...
}
