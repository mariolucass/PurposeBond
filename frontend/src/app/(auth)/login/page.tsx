import { LoginForm } from "@/components/login/formLogin";
import Link from "next/link";

const LoginPage = () => (
  <section className="w-1/2 h-full flex flex-col gap-4 shadow-sm mx-auto r">
    <div className="h-component4x w-full border-2 flex flex-col gap-4 p-4 rounded-sm">
      <h1 className="text-2xl text-center">PurposeBond</h1>
      <LoginForm />
    </div>

    <div className="w-full h-component border-2 p-4 flex justify-center items-center rounded-sm">
      <span className="self-center">
        Don't have an account?{" "}
        <Link href="/signup" className="font-bold">
          Sign up
        </Link>
      </span>
    </div>
  </section>
);

export default LoginPage;
