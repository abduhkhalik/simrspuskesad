import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import axios from "axios";

export function DialogDaftar() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_LOCAL}`,
  });

  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);
    try {
      const res = await instance.post("/register", {
        username,
        password,
      });
      setIsLoading(false);
      res.data && window.location.reload();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        onClick={handleOpen}
        className="font-medium text-sm"
        variant="text"
      >
        Buat User
      </Button>
      <form>
        <Dialog
          open={open}
          handler={handleOpen}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader>Tambah Akun</DialogHeader>
          <DialogBody>
            <div className="flex flex-col justify-center items-center">
              <Input
                type="text"
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={handleSubmit}
              type="submit"
            >
              <span>Submit</span>
            </Button>
          </DialogFooter>
          {error && <p className="text-center text-red-500">{error}</p>}
          {isLoading && (
            <Typography
              variant="lead"
              color="blue-gray"
              className="text-center animate-bounce"
            >
              Loading......
            </Typography>
          )}
        </Dialog>
      </form>
    </>
  );
}
