import React, { FC, useState } from "react";

interface ProcessInputProps {
  onFetch: (pid: string) => void;
}

const ProcessInput: FC<ProcessInputProps> = ({ onFetch }) => {
  const [pid, setPid] = useState<string>("");

  const handleFetch = () => {
    if (!pid.trim()) {
      alert("Please enter a valid PID.");
      return;
    }
    onFetch(pid);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter PID"
        value={pid}
        onChange={(e) => setPid(e.target.value)}
      />
      <button onClick={handleFetch}>Fetch Details</button>
    </div>
  );
};

export default ProcessInput;
