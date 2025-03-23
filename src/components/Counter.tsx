// Counter.tsx
import React, { useContext } from "react";
import { AppContext } from "./AppContext";

export const Counter: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div>
      <p>Licznik: {state.count}</p>
      <p>{state.loading ? "Ładowanie..." : "Gotowe"}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Zwiększ</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Zmniejsz</button>
      <button onClick={() => dispatch({ type: "reset" })}>Resetuj</button>
      <button
        onClick={() => dispatch({ type: "incrementAsync", payload: 5 })}
        disabled={state.loading}
      >
        Zwiększ asynchronicznie o 5
      </button>
    </div>
  );
};