import { Fragment } from "react";
import { LoginForm } from "./formLogin";

const LoginPage = () => {
  return (
    <Fragment>
      <LoginForm />

      <div className="w-full shadow-sm h-32">
        <div></div>
      </div>
    </Fragment>
  );
};

export default LoginPage;
