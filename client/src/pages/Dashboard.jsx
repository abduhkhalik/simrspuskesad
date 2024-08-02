import React from "react";
import { GalleryWithCarousel } from "../components/Carousel";
import { SwiperMenu } from "../components/Swiper";
import { ChartKesdam, } from "../components/Charts";

function Dashboard() {
  return (
    <section>
      <div className="container">
        <GalleryWithCarousel />
        <SwiperMenu />
        <ChartKesdam/>
      </div>
    </section>
  );
}

export default Dashboard;
