import { useSwiper } from "swiper/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";

export const SwiperButton = () => {
  const swiper = useSwiper();
  return (
    <div className="flex justify-end items-center mt-3 gap-5">
      <Button
        variant="filled"
        className="rounded-md"
        onClick={() => swiper.slidePrev()}
      >
        <ArrowLeftIcon height={25} width={25} />
      </Button>
      <Button
        variant="gradient"
        className="rounded-md"
        onClick={() => swiper.slideNext()}
      >
        <ArrowRightIcon height={25} width={25} />
      </Button>
    </div>
  );
};
