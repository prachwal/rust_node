pub fn calculate_pi(iterations: i32) -> f64 {
    let mut pi = 0.0;
    let mut sign = 1.0;
    for i in 0..iterations {
        pi += sign * 4.0 / (2.0 * i as f64 + 1.0);
        sign = -sign;
    }
    pi
}
