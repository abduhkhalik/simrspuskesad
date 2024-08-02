import React, { useContext } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import HestiWiraSakti from "../assets/logohesti.png";
import { NavLink } from "react-router-dom";
import { Context } from "../context/Context";
import { DialogDaftar } from "./Dialog";

export function DefaultNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const { dispatch } = useContext(Context);
  const { user } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="black"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <NavLink to={"/"} className="flex items-center">
          Dashboard
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="black"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <NavLink to={"/"} className="flex items-center">
          Statistik Integrasi
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="black"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <NavLink to={"/"} className="flex items-center">
          Rumah Sakit
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="black"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        {user.peran === "super_admin" ? <DialogDaftar /> : ""}
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto fixed z-[9999] max-w-full rounded-none px-4 lg:px-8">
      <div className="container mx-auto flex items-center justify-between text-black-900">
        <div className="flex items-center gap-2">
          <img src={HestiWiraSakti} className="h-10 w-full" />
          <Typography
            variant="lead"
            color="black"
            className="mr-4 py-1.5 font-medium"
          >
            Puskesad
          </Typography>
        </div>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-1">
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
            onClick={handleLogout}
          >
            <span>Log Out</span>
          </Button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6 text-black"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex items-center gap-x-1">
            <Button
              fullWidth
              variant="gradient"
              onClick={handleLogout}
              size="sm"
              className=""
            >
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}
