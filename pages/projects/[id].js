import axios from "axios";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import ImageProject from "../../components/common/ImageProject";
import Project from "../../components/common/Project";
import Fancybox from "../../components/common/fancybox.js";
import { pageProject } from "../../config/language";
import { API_URL } from "../../config/urls";
import "animate.css";
import { useRouter } from "next/router";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../../components/common/wowComponent"),
  { ssr: false }
);

const ProjectDetail = ({ project, recommendedP, countryP }) => {
  let count = 0;
  const router = useRouter();
  const { id, attributes } = project.data;
  const { description } = attributes;
  const { data: galleryProject } = attributes.gallery;
  const recommended = recommendedP.data.attributes?.recommended.data;
  const country = countryP.data.attributes?.country.data;

  const gridSelectionProject = (indice) => {
    if (indice >= 5 && indice <= 6) return "col-md-6";
    if (indice == 7) return "col-md-12";
    return "col-md-3";
  };

  let titleProject =
    attributes.locale == router.locale ||
      !attributes.localizations.data[0]?.attributes.title
      ? attributes.title
      : attributes.localizations.data[0].attributes.title;

  return (
    <>
      <Head>
        <title>{titleProject} | Unicus</title>
      </Head>
      <DynamicComponentWithNoSSR />
      <section className="showcase showcase-p">
        <video
          className="object-fit onplay animate__animated animate__fadeIn"
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
              attributes.video_vimeo
                ? attributes.video_vimeo
                : "https://player.vimeo.com/progressive_redirect/playback/583963426/rendition/1080p/file.mp4?loc=external&signature=e28a7a585fc8549caccd7882dbb511677b34391f9795e29aeea1eb9793e2d2a6"
            }
            type="video/mp4"
          />
        </video>
      </section>
      <section className="detail-project">
        <div className="container-in">
          <div className="title-one">
            <div className="row">
              <div className="col-md-9 wow fadeInLeft">
                <h4>{titleProject}</h4>
              </div>
              <div className="col-md-3 wow fadeInRight">
                <p>
                  {pageProject.country[`${router.locale}`]}:{" "}
                  {
                    country == null ? '------' : (
                      country.attributes.locale == router.locale ||
                        !country.attributes.localizations.data[0]?.attributes.name
                        ? country.attributes.name
                        : country.attributes.localizations.data[0].attributes.name
                    )}
                </p>
                <p>{pageProject.dateEvent[`${router.locale}`]}: {attributes.date_event}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="description">
        <div className="container-in">
          <div className="row">
            <div className="col-md-6 wow fadeInUp">
              <h3>
                {attributes.locale == router.locale ||
                  !attributes.localizations.data[0]?.attributes.subtitle
                  ? attributes.subtitle
                  : attributes.localizations.data[0].attributes.subtitle}
              </h3>
            </div>
            <div className="col-md-6 wow fadeInUp">
              <ReactMarkdown>
                {attributes.locale == router.locale ||
                  !attributes.localizations.data[0]?.attributes.description
                  ? attributes.description
                  : attributes.localizations.data[0].attributes.description}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </section>
      <section className="work-grid">
        <div className="row">
          <Fancybox options={{ infinite: false }}>
            {galleryProject.map(({ id, attributes }) => {
              count++;
              count = count > 7 ? 1 : count;
              let grid = gridSelectionProject(count);
              return (
                <ImageProject
                  key={id}
                  url={attributes.url}
                  grid={grid}
                  animate={" wow fadeInUp"}
                />
              );
            })}
          </Fancybox>
        </div>
      </section>
      {recommended.length > 0 && (
        <>
          <section className="work-grid recomended">
            <div className="row">
              <div className="text-center wow fadeInUp">
                <h3>{pageProject.projectRecommended[`${router.locale}`]}</h3>
              </div>
              {recommended.map((project) => (
                <Project
                  key={project.id}
                  project={project}
                  animate={" wow fadeInUp"}
                  locale={router.locale}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const { data: project } = await axios.get(
      `${API_URL}/api/projects/${context.query.id}?populate=%2a`
    );
    const { data: recommendedP } = await axios.get(
      `${API_URL}/api/projects/${context.query.id}?populate[recommended][populate]=cover&populate[recommended][populate]=localizations&populate[country][populate]=localizations`
    );
    const { data: countryP } = await axios.get(
      `${API_URL}/api/projects/${context.query.id}?populate[country][populate]=localizations`
    );
    return {
      props: {
        project,
        countryP,
        recommendedP,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export default ProjectDetail;
