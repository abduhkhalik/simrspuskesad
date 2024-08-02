import { Carousel } from "@material-tailwind/react";
import first from "../assets/1.jpg";
import secound from "../assets/2.jpg";
import third from "../assets/3.jpg";

export function GalleryWithCarousel() {
  return (
    <Carousel
      onDurationChange={5}
      loop={true}
      autoplay={true}
      className="rounded-xl"
    >
      <img
        src={first}
        alt="image 1"
        className="lg:h-[500px]  w-full object-fill object-center"
      />
      <img
        src={secound}
        alt="image 2"
        className="lg:h-[500px]  w-full object-fill object-center"
      />
      <img
        src={third}
        alt="image 3"
        className="lg:h-[500px]  w-full object-fill object-center"
      />
    </Carousel>
  );
}
