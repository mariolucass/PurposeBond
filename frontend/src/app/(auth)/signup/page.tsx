import Link from "next/link";
import { RegisterForm } from "./formRegister";

const SignUpPage = () => {
  return (
    <section className="w-1/2 h-full flex flex-col gap-4 shadow-sm mx-auto r">
      <div className="w-full border-2 flex flex-col gap-4 p-4 rounded-sm">
        <h1 className="text-2xl text-center">PurposeBond</h1>
        <RegisterForm />
      </div>

      <div className="w-full border-2 h-28 p-4 flex justify-center items-center rounded-sm">
        <span className="self-center">
          Already have an account?{" "}
          <Link href="/login" className="font-bold">
            Login
          </Link>
        </span>
      </div>
    </section>
  );
};

export default SignUpPage;
