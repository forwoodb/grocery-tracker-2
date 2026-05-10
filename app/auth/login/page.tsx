import AuthForm from "@/app/components/AuthForm";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const signInAction = async (formData: FormData) => {
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
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Login Page</h1>
      <AuthForm mode={"login"} formAction={signInAction} />
    </div>
  );
};

export default LoginPage;
