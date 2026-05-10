import AuthForm from "@/app/components/AuthForm";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const signInAction = async (
    // prevState: string | void | null,
    prevState: unknown,
    formData: FormData,
  ) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(email, password);

    try {
      await auth.api.signInEmail({
        body: {
          email,
          password,
        },
      });

      redirect("/dashboard/store");
    } catch (error) {
      const err = error as Error;
      // throw new Error(err.message);
      return { message: err.message };
    }
  };
  return (
    <div>
      <h1>Login Page</h1>
      <AuthForm mode={"login"} userAction={signInAction} />
    </div>
  );
};

export default LoginPage;
