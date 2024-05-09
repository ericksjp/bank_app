"use client";

import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { useState } from "react";

export default function CustomInput({
  control,
  name,
  label,
  invalid,
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (control._getWatch(name).length === 0) setIsFocused(false);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item !mt-4 relative">
          <FormLabel
            className={`ml-[9px] !text-gray-500 !font-normal !w-fit absolute top-2 !text-base px-1 transition ease-in-out
              ${isFocused && "-translate-y-5 scale-90 bg-white z-20 duration-300"} `}
          >
            {label}
          </FormLabel>
          <FormControl>
            <Input
              className={`input-form ${invalid ? "input-error" : ""}`}
              type={name === "password" ? "password" : "text"}
              {...field}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </FormControl>
          <FormMessage className="form-message ml-1" />
        </div>
      )}
    />
  );
}
