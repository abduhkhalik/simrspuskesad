import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import { Context } from "../context/Context";
import Logo from "../assets/logohesti.png"
import axios from "axios";

function Login() {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_LOCAL}`,
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await instance.post("/login", {
        username: username,
        password: password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setError("Invalid username or password");
    }
  };
  return (
    <div className="container">
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit}>
          <Card className="w-96">
            <CardHeader
              variant="gradient"
              color="gray"
              className="mb-4 grid h-28 place-items-center"
            >
              <img src={Logo} className="w-20" alt="img"/>
              <Typography variant="h5" color="white" className="text-center">
                PUSKESAD SIMRS MONITORING
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input
                label="Username"
                type="text"
                size="lg"
                icon={<UserIcon />}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                size="lg"
                icon={<LockClosedIcon />}
                onChange={(e) => setPassword(e.target.value)}
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                Masuk
              </Button>
            </CardFooter>
            {error && (
              <Typography
                variant="paragraph"
                color="red"
                className="text-center"
              >
                {error}
              </Typography>
            )}
            {isFetching && (
              <Typography
                variant="lead"
                color="blue-gray"
                className="text-center animate-bounce"
              >
                Loading......
              </Typography>
            )}
          </Card>
        </form>
      </div>
    </div>
  );
}

export default Login;
