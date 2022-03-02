import Link from "next/link";
import Project from "../components/common/Project";
import Head from "next/head";
import dynamic from "next/dynamic";
import "animate.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config/urls";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../components/common/wowComponent"),
  { ssr: false }
);

const Home = ({ projects }) => {
  const data_projects = projects.data;
  let count = 0;

  const [allProjects, setProjects] = useState([]);

  const gridSelectionHome = (indice) => {
    if (indice > 2) return "col-md-4";
    return "col-md-6";
  };

  useEffect(() => {
    setProjects(data_projects);
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
            <h1 className="animate__animated animate__fadeInUp">
              Lorem ipsum <br />
              dolor
              <span>sit amet</span>
            </h1>
            <Link href="/projects">
              <a className="animate__animated animate__fadeInUp">
                Ver proyectos
              </a>
            </Link>
          </div>
          <div className="social-nav">
            {/* <a href="#" target="_blank"><Image  width={25} height={25} src="/img/wt.svg" alt="" /> </a>
            <a href="#" target="_blank"><Image  width={25} height={25} src="/img/f.svg" alt="" /> </a>
            <a href="#" target="_blank"><Image  width={25} height={25} src="/img/i.svg" alt="" /> </a>
            <a href="#" target="_blank"><Image  width={25} height={25} src="/img/yt.svg" alt="" /></a> */}
            <a
              href="#"
              className="animate__animated animate__fadeInRight"
              target="_blank"
            >
              <img src="/img/wt.svg" alt="" />{" "}
            </a>
            <a
              href="#"
              className="animate__animated animate__fadeInRight"
              target="_blank"
            >
              <img src="/img/f.svg" alt="" />{" "}
            </a>
            <a
              href="#"
              className="animate__animated animate__fadeInRight"
              target="_blank"
            >
              <img src="/img/i.svg" alt="" />{" "}
            </a>
            <a
              href="#"
              className="animate__animated animate__fadeInRight"
              target="_blank"
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
            src="https://player.vimeo.com/external/198905291.hd.mp4?s=43fc8816fb9ba83fe4e9cbea704645b5b909ea53&amp;profile_id=175"
            type="video/mp4"
          />
        </video>
      </section>
      <section className="about" id="BoxArticle">
        <div className="about-text">
          <div className="container-in">
            <h2 className="wow fadeInUp">THIS IS UNICUS</h2>
            <p className="wow fadeInUp">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              fringilla sodales bibendum. Integer volutpat magna hendrerit Lorem
              ipsum dolor si dignissim.
            </p>
            <Link href="/weare">
              <a className="wow fadeInUp">WE ARE</a>
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
            console.log(grid);
            return (
              <Project
                key={project.id}
                project={project}
                grid={grid}
                animate={" wow fadeInUp"}
              />
            );
          })}
        </div>
        <div className="container-in" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Link href="/projects">
            <a className="btn-unicus wow fadeInUp">Ver más proyectos</a>
          </Link>
        </div>
      </section>

    </>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const { data: projects } = await axios.get(
      `${API_URL}/api/projects?sort=date_event:DESC&pagination[start]=0&pagination[limit]=5&fields[0]=title&populate=cover`
    );

    // console.log(projects);
    return {
      props: {
        projects,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export default Home;
