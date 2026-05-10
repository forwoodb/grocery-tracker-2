"use client";

import Link from "next/link";
import { useActionState } from "react";

interface AuthFormProps {
  mode: string;
  userAction: (
    prevState: unknown,
    formData: FormData,
  ) => Promise<void | { message: string }>;
}

const AuthForm = ({ mode, userAction }: AuthFormProps) => {
  const [state, formAction] = useActionState(userAction, null);
  console.log(state);

  return (
    <>
      <div className="form-wrapper flex flex-col items-center">
        <form action={formAction}>
          {state?.message && <p>{state.message}</p>}
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">
              {mode === "login" ? "Login" : "Register"}
            </legend>

            {mode === "register" && (
              <>
                <label className="label">Name</label>
                <input
                  type="name"
                  name="name"
                  className="input"
                  placeholder="Name"
                />
              </>
            )}

            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />

            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
            />

            <button className="btn btn-neutral mt-4">
              {mode === "login" ? "Login" : "Register"}
            </button>
          </fieldset>
        </form>
        <p>
          {mode === "login" ? "Don't" : "Already"} have an account?{" "}
          {mode === "login" ? (
            <Link href={"/auth/register"}>Register</Link>
          ) : (
            <Link href={"/auth/login"}>Log In</Link>
          )}
        </p>
      </div>
    </>
  );
};

export default AuthForm;
