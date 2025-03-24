import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";

const StateLogger: React.FC = () => {
  const { state, subscribe } = useContext(AppContext);
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setLog((prevLog) => [...prevLog, JSON.stringify(state)]);
    });

    return () => {
      unsubscribe();
    };
  }, [subscribe, state]); // Dodano `state` do zależności, aby reagować na zmiany

  // Funkcja do czyszczenia logu
  const clearLog = () => {
    setLog([]); // Resetuje log do pustej tablicy
  };

  return (
    <div>
      <h3>State Log:</h3>
      <button type="button" onClick={clearLog}>Clear Log</button> {/* Przycisk do czyszczenia logów */}
      <ul>
        {log.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default StateLogger;