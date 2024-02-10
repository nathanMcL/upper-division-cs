import React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className={`button`} onClick={onClick}>
      {children}
    </button>
  );
};
