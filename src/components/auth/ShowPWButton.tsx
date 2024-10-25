import React from "react";
import { Eye, EyeOff } from "lucide-react";

type ShowPWButtonProps = {
  showPW: boolean;
  setShowPW: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ShowPWButton({ showPW, setShowPW }: ShowPWButtonProps) {
  const pwProps = {
    onClick: () => setShowPW((prev) => !prev),
    className: "absolute top-8 right-2",
  };
  return <>{showPW ? <EyeOff {...pwProps} /> : <Eye {...pwProps} />}</>;
}
