import Link from "next/link";
interface AuthFormProps {
  mode: string;
}

const AuthForm = ({ mode }: AuthFormProps) => {
  return (
    <>
      <div className="form-wrapper flex flex-col items-center">
        <form action="">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">
              {mode === "login" ? "Login" : "Register"}
            </legend>

            {mode === "register" && (
              <>
                <label className="label">Name</label>
                <input type="name" className="input" placeholder="Name" />
              </>
            )}

            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Email" />

            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Password" />

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
