import { authService } from "fbase";
import { useState } from "react";

const AuthForm = () => {
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
        window.localStorage.setItem("emailForSignIn", email);
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }

      authService.currentUser = data;
    } catch (error) {
      setError(error.message);
    }
  };

  const signInToken = async (event) => {
    event.preventDefault();
    let data;
    try {
      await getTokenByEmail();

      data = await authService.signInWithCustomToken(token);

      authService.currentUser = data;
    } catch (error) {
      setError(error.message);
    }
  };

  const getTokenByEmail = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
      // mode: "no-cors",
    };
    const response = await fetch("http://localhost:8080/login", requestOptions);
    const data = await response.json();
    setToken(data.token);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
      </form>
      <div>{error}</div>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <form onSubmit={signInToken}>
        <input
          name="email"
          type="text"
          required
          value={email}
          onChange={onChange}
        />
        <input type="submit" value="Sign in with Token" />
      </form>
    </>
  );
};

export default AuthForm;
