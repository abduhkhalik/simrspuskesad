import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dataModules } from "../static/data";
import axios from "axios";
import {
  Button,
  Card,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Option,
  Select,
  Spinner,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { ChartRalan, ChartRanap } from "../components/Charts";
import { BannerRs } from "../components/Banners";
import {
  ArchiveBoxIcon,
  ChartBarIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";

function DashboardRs() {
  const { title } = useParams();
  const [dataRalan, setDataRalan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const module = dataModules.find((mod) => mod.title === title);
  const apiUrl = module ? module.apiId : null;
  const instance = axios.create({
    baseURL: apiUrl,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await instance.get("/ralan");
        setDataRalan(res.data);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const dataTab = [
    {
      label: "Rawat Jalan",
      value: "ralan",
      icon: ChartBarIcon,
      content: (
        <>
          <ChartRalan data={dataRalan} />
        </>
      ),
    },
    {
      label: "Rawat Inap",
      value: "ranap",
      icon: PresentationChartLineIcon,
      content: <ChartRanap />,
    },
    {
      label: "Farmasi",
      value: "farmasi",
      icon: ArchiveBoxIcon,
      content: <ChartRanap />,
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="max-w-full w-full">
          <BannerRs data={module} />
          <Tabs
            value="ralan"
            className="flex flex-wrap relative justify-between"
            orientation="vertical"
          >
            <div className="md:w-1/4 md:sticky md:top-21 md:invisible md:hidden block visible w-full">
              <Card className="px-4 py-2">
                <TabsHeader>
                  <Menu>
                    <MenuHandler>
                      <Button variant="">Menu</Button>
                    </MenuHandler>
                    <MenuList>
                      {dataTab.map(({ label, value }) => (
                        <Tab key={value} value={value}>
                          <MenuItem>{label}</MenuItem>
                        </Tab>
                      ))}
                    </MenuList>
                  </Menu>
                </TabsHeader>
              </Card>
            </div>
            <div className="md:w-1/4 md:sticky md:top-21 md:visible md:block hidden invisible w-full">
              <Card className="px-4 py-2">
                <TabsHeader>
                  {dataTab.map(({ label, value, icon }) => (
                    <Tab key={value} value={value}>
                      <div className="flex items-center gap-2">
                        {React.createElement(icon, { className: "w-5 h-5" })}
                        {label}
                      </div>
                    </Tab>
                  ))}
                </TabsHeader>
              </Card>
            </div>
            <div className="md:w-[74%] w-full">
              <div className="px-4 py-2">
                <TabsBody
                  animate={{
                    initial: { y: 250 },
                    mount: { y: 0 },
                    unmount: { y: 250 },
                  }}
                >
                  {isLoading ? (
                    <div className="flex flex-col mt-5 justify-center items-center">
                      <Spinner className="h-16 w-16 text-gray-900/50" />
                      <Typography
                        variant="paragraph"
                        color="black"
                        className="animate-pulse font-semibold mt-3"
                      >
                        Sedang Memuat Data ...
                      </Typography>
                    </div>
                  ) : (
                    <>
                      {dataTab.map(({ value, content }) => (
                        <TabPanel key={value} value={value} className="py-0">
                          {content}
                        </TabPanel>
                      ))}
                    </>
                  )}
                </TabsBody>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

export default DashboardRs;
