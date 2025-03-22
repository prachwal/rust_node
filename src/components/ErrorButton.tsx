import React, { FC, useState } from "react";

const ErrorButton: FC = () => {
  const [triggerError, setTriggerError] = useState(false);

  if (triggerError) {
    throw new Error("This is a test error!");
  }

  return (
    <button type="button" onClick={() => setTriggerError(true)}>
      Trigger Error
    </button>
  );
};

export default ErrorButton;
