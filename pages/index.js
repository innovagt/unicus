import Link from "next/link";
import Script from "next/script";
import Project from "../components/common/Project";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import "animate.css";
import axios from "axios";
import configLanguajeWeb from "../config/language";

import { useEffect, useState } from "react";
import { API_URL } from "../config/urls";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../components/common/wowComponent"),
  { ssr: false }
);

const Home = ({ projects, configWeb }) => {
  let router = useRouter();

  const localeAttributes =
    configWeb.data.attributes.localizations.data[0]?.attributes.locale ==
      router.locale
      ? configWeb.data.attributes.localizations.data[0].attributes
      : configWeb.data.attributes;

  const {
    descHome,
    facebook,
    instagram,
    phone,
    subtitleHome,
    titleHome,
    video_director,
    youtube,
  } = localeAttributes;
  const data_projects = projects.data;
  let count = 0;

  const [allProjects, setProjects] = useState([]);

  const gridSelectionHome = (indice) => {
    if (indice > 2) return "col-md-4";
    return "col-md-6";
  };

  // const [useScript, setUseScript] = useState(false);

  useEffect(() => {
    setProjects(data_projects);
    if (typeof window !== "undefined") {
      window.init()
      window.animate()
    }
  }, []);

  return (
    <>
      <Head>
        <title>Unicus</title>
      </Head>
      <DynamicComponentWithNoSSR />
      <section className="showcase animate__animated animate__fadeIn">
        <div className="overlay">
          <div className="text-showcase">
            <div className="animate__animated animate__fadeInUp">
              <ReactMarkdown>{titleHome}</ReactMarkdown>
            </div>
            <Link href="/projects">
              <a className="animate__animated animate__fadeInUp">
                {configLanguajeWeb.buttonProjects[`${router.locale}`]}
              </a>
            </Link>
          </div>
          <div className="social-nav">
            <a
              href={`tel:${phone}`}
              className="animate__animated animate__fadeInRight"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/img/wt.svg" alt="" />{" "}
            </a>
            <a
              href={facebook}
              className="animate__animated animate__fadeInRight"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/img/f.svg" alt="" />{" "}
            </a>
            <a
              href={instagram}
              className="animate__animated animate__fadeInRight"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/img/i.svg" alt="" />{" "}
            </a>
            <a
              href={youtube}
              className="animate__animated animate__fadeInRight"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/img/yt.svg" alt="" />
            </a>
          </div>
        </div>
        <video
          className="object-fit onplay"
          data-width="640"
          data-height="360"
          playsInline
          preload
          loop
          muted
          autoPlay
        >
          <source
            src={
              !video_director
                ? "https://player.vimeo.com/external/198905291.hd.mp4?s=43fc8816fb9ba83fe4e9cbea704645b5b909ea53&amp;profile_id=175"
                : video_director
            }
            type="video/mp4"
          />
        </video>
      </section>
      <section className="about">
        <div id="BoxArticle"></div>
        <div className="about-text">
          <div className="container-in">
            <h2 className="wow fadeInUp">{subtitleHome}</h2>
            <div className="wow fadeInUp">
              <ReactMarkdown>{descHome}</ReactMarkdown>
            </div>
            <Link href="/weare">
              <a className="wow fadeInUp">
                {configLanguajeWeb.buttonWeAre[`${router.locale}`]}
              </a>
            </Link>
          </div>
        </div>
      </section>
      <section className="work-grid">
        <div className="row">
          {allProjects.map((project) => {
            count++;
            count = count > 5 ? 1 : count;
            let grid = gridSelectionHome(count);
            return (
              <Project
                key={project.id}
                project={project}
                grid={grid}
                animate={" wow fadeInUp"}
                locale={router.locale}
              />
            );
          })}
        </div>
        <div
          className="container-in"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link href="/projects">
            <a className="btn-unicus wow fadeInUp">
              {configLanguajeWeb.buttonProjects[`${router.locale}`]}
            </a>
          </Link>
        </div>
      </section>
    </>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const { data: projects } = await axios.get(
      `${API_URL}/api/projects?sort=position:ASC&fields[0]=title&fields[1]=date_event&fields[1]=locale&populate=cover&populate=localizations&filters[outstanding][$eq]=true`
    );

    const { data: configWeb } = await axios.get(
      `${API_URL}/api/configuration?populate=%2a`
    );

    return {
      props: {
        projects,
        configWeb,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export default Home;
