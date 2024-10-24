export interface PasswordFieldProps {
  showPassword: boolean;
  toggleVisibility: () => void;
  password: string;
  setPassword: (value: string) => void;
}
