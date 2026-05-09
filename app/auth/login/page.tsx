import AuthForm from "@/app/components/AuthForm";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const singInAction = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    redirect("/dashboard/store");
  };
  return (
    <div>
      <h1>Login Page</h1>
      <AuthForm mode={"login"} formAction={singInAction} />
    </div>
  );
};

export default LoginPage;
