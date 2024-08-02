import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import React from "react";
// import { NavLink } from "react-router-dom";

export function Modules({ data }) {
  return (
    <Card className="mt-6 h-72 w-96">
      <CardHeader color="black" className="relative h-56">
        <img src={data.img} alt="card-image" />
      </CardHeader>
      <CardBody>
        {/* <NavLink to={`Dashboard/${encodeURIComponent(data.title)}`}> */}
        <a href={data.link} target="_blank">
          <Typography variant="h6" color="black" className="mb-2 text-start uppercase">
            {data.title}
          </Typography>
        </a>
        {/* </NavLink> */}
      </CardBody>
    </Card>
  );
}
