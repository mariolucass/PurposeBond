import { LoginForm } from "./formLogin";

const LoginPage = () => {
  return (
    <div className="w-1/4 shadow-xl min-h-1/2 p-6 border-4">
      <h1 className="text-4xl">Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
