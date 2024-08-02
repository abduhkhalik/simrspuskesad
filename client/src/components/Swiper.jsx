import React, { useCallback, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../style.css";
import { Navigation, A11y } from "swiper/modules";
import { SwiperButton } from "./Button";
import { Modules } from "./Modules";
import { dataModules } from "../static/data";
import { Button, Input, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export function SwiperMenu() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(dataModules);
  const [noResult, setNoResult] = useState(false);

  const handleSearch = () => {
    const filtered = dataModules.filter(
      (module) =>
        module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.satuan.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
    setNoResult(filtered.length === 0);
  };
  return (
    <section>
      <Typography className="text-2xl mb-3 lg:text-4xl font-semibold" color="black">
        Dashboard Seluruh Rumah Sakit Kesehatan TNI AD
      </Typography>

      <Typography variant="lead" color="black">
        Temukan Rumah Sakit
      </Typography>

      <div className="flex justify-between items-center">
        <div className="w-96">
          <div className="flex items-center gap-2">
            <Input
              label="Cari"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={handleSearch}>Cari</Button>
          </div>
        </div>
      </div>

      {noResult ? (
        <Typography variant="lead" color="black">
          MAAF, DATA RUMAH SAKIT YANG ANDA CARI BELUM ADA
        </Typography>
      ) : (
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          modules={[Navigation, A11y]}
          className="mySwiper py-5"
        >
          {filteredData.map((data, i) => (
            <SwiperSlide key={i}>
              <Modules data={data} />
            </SwiperSlide>
          ))}
          <SwiperButton />
        </Swiper>
      )}
    </section>
  );
}
