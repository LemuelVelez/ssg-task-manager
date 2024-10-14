import React, { FC, ReactNode } from "react";

interface CardProps {
  children: ReactNode; // Adding children prop to the interface
  className?: string; // Optional className prop
}

const Card: FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`shadow-lg rounded-lg p-4 ${className}`}>{children}</div>
  );
};

export default Card;
