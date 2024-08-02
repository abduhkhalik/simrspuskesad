import { Typography } from "@material-tailwind/react";

export function BannerRs({data}) {
  const day = new Date().toLocaleDateString("id-ID")
  return (
    <figure className="relative h-96 w-full">
      <img
        className="h-full w-full rounded-xl object-cover object-center"
        src={data.img}
        alt={data.title}
      />
      <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
        <div>
          <Typography variant="h5" color="blue-gray">
            {data.title}
          </Typography>
          <Typography variant="paragraph" color="gray" className="mt-2 font-normal">
            Data Kunjungan Rumah Sakit Tanggal {day}
          </Typography>
        </div>
      </figcaption>
    </figure>
  );
}
