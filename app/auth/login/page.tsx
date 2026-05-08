import AuthForm from "@/app/components/AuthForm";

const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <AuthForm mode={"login"} />
    </div>
  );
};

export default LoginPage;
