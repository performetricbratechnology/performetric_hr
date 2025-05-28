export type CurrentStepTypes = "login" | "verify-2fa" | "success";

export type LoginTypes = {
  LoginWithEmailAndPassword: (event: React.FormEvent) => void;
};

export type VerifyTwoFactorTypes = {
  VerifyTwoFactorCode: (event: React.FormEvent) => void;
  BackToLogin: () => void;
};
