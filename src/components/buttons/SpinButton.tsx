import React from "react";

interface SpinButtonProps {
  onClick: () => void;
}

const SpinButton: React.FC<SpinButtonProps> = ({ onClick }) => {
  return (
    <button id="spinButton" onClick={onClick}>
      Spin
    </button>
  );
};

export default SpinButton;
