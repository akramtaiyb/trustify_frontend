import React, { useState } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import ApplicationLogo from "../components/ApplicationLogo";
import Link from "../components/Link";
import Footer from "../templates/Footer";
import { useAuth } from "../../context/AuthContext";
import LoaderSpinner from "../components/LoaderSpinner";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email: email, password: password });
    } catch (err) {
      console.log(err);
      setError("Failed to log in");
    }
  };

  const { isLoading } = useAuth();

  return (
    <div>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <ApplicationLogo />
        <Card className="rounded-2xl">
          <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-4">
            <div className="text-xl font-bold">Login</div>
            <Link
              className="text-blue-500 underline italic text-xs font-normal hover:text-blue-500"
              text="Don't have an account? Sign up here."
              href="/signup"
            />
            <div>
              <Label>Email</Label>
              <TextInput
                name="email"
                type="email"
                autoComplete="current-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Password</Label>
              <TextInput
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <Button
              className="flex flex-row items-center justify-center"
              type="submit"
              color="dark"
            >
              {isLoading ? <LoaderSpinner className="w-10 px-2" /> : null}
              <span>Sign In</span>
            </Button>
          </form>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
