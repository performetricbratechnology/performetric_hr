import type React from "react";

export type CurrentStepTypes = "login" | "verify-2fa" | "success";



export type LoginTypes = {
  LoginWithEmailAndPassword: (event: React.FormEvent) => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};


export type VerifyTwoFactorTypes = {
  VerifyTwoFactorCode: (event: React.FormEvent) => void;
  BackToLogin:() => void;
};
