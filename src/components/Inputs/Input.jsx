import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";

function Input({ label, value, onChange, placeholder, type }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="">
      <label className="text-[13px] text-slate-800">
        {label}
      </label>
      <div className="input-box">
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={(e) => onChange(e)}
        />
        {type === "password" && (
          <>
            {showPassword ? (
              <EyeOffIcon className="cursor-pointer" onClick={handleShowPassword} />
            ) : (
              <EyeIcon className="cursor-pointer" onClick={handleShowPassword} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Input;
