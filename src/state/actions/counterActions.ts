export type CounterAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "incrementAsync"; payload: number };
