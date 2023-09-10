"use client";

import { useState, type FC, type MouseEventHandler } from "react";

type Props = {
  type: "text" | "password";
  placeholder?: string;
  onClick?: MouseEventHandler<HTMLInputElement>;
};

const TextField: FC<Props> = ({ type, placeholder, onClick }) => {
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onClick={onClick}
        className="peer w-full px-[32px] py-[4px] text-primary placeholder-primary-light outline-none focus:text-primary-dark focus:placeholder-transparent"
      />
      <span
        className={`absolute left-[32px] top-[-5px] text-[10px] duration-100  peer-focus:text-primary-dark
        ${value.length > 0 ? "text-primary focus:text-primary-dark" : "text-transparent"}
        `}
      >
        {placeholder}
      </span>
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-primary duration-100 peer-focus:bg-primary-dark" />
      <div className="absolute bottom-0 left-0 h-[10px] w-[1px] bg-primary duration-100 peer-focus:bg-primary-dark" />
      <div className="absolute bottom-0 right-0 h-[10px] w-[1px] bg-primary duration-100 peer-focus:bg-primary-dark" />
    </div>
  );
};

export default TextField;