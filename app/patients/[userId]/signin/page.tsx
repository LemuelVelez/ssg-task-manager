import { loginWithOAuth } from "@/lib/auth"; // Adjust the path accordingly

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => loginWithOAuth("google")}>
        Login with Google
      </button>
      <button onClick={() => loginWithOAuth("facebook")}>
        Login with Facebook
      </button>
    </div>
  );
};

export default Login;
