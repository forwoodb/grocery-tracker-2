import AuthForm from "@/app/components/AuthForm";
import { auth } from "@/app/lib/auth";
import connectDb from "@/app/lib/db";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  await connectDb();

  const registerUserAction = async (prevState: unknown, formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await auth.api.signUpEmail({
        body: {
          name,
          email,
          password,
        },
      });

      redirect("/dashboard/store");
    } catch (error: unknown) {
      const err = error as Error;
      // throw new Error(err.message);
      // console.log(err.message);
      return { message: err.message };
    }
  };
  return (
    <>
      <h1>Register Page</h1>
      <AuthForm mode={"register"} userAction={registerUserAction} />
    </>
  );
};

export default RegisterPage;
