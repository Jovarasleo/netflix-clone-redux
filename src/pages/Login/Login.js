import Button from "../../components/button";
import LoginForm from "../../components/login-form";
function Login() {
  return (
    <>
      <LoginForm />
      <Button to="/" className={"button"}>
        Go Home
      </Button>
    </>
  );
}
export default Login;
