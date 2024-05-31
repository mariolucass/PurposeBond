import { Fragment } from "react";
import { RegisterForm } from "./formRegister";

const SignUpPage = () => {
  return (
    <Fragment>
      <RegisterForm />

      <div className="w-full shadow-sm h-32">
        <div></div>
      </div>
    </Fragment>
  );
};

export default SignUpPage;
