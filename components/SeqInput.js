"use client";

import { useState, useRef } from "react";

export default function SeqInput({value,setValue}) {
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      setValue((prev) => prev.slice(0, -1));
      return;
    }

    if (/^\d$/.test(e.key)) {
      e.preventDefault();
      if (value.length < 15) {
        setValue((prev) => prev + e.key);
      }
    }
  };

  const display = (value + "X".repeat(15)).slice(0, 15);

  return (
    <div className="max-w-md mx-auto mt-10">
      <label htmlFor="maskedInput" className="block mb-2 text-sm font-medium text-gray-700">
        Enter Sequence
      </label>

      <input
        id="maskedInput"
        ref={inputRef}
        value={display}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.preventDefault()}
        onFocus={() => {
          setTimeout(() => {
            const len = value.length;
            inputRef.current?.setSelectionRange(len, len);
          }, 0);
        }}
        className="w-full font-mono text-xl tracking-widest text-center px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 caret-transparent"
        maxLength={15}
        inputMode="numeric"
        readOnly
      />

      <p className="text-sm text-gray-500 mt-1">
        Type value to replace the <code>X</code>s. Max 15 value.
      </p>
    </div>
  );
}
