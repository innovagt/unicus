import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import "animate.css";
import Project from "../../components/common/Project";
import classNames from "classnames";
import { API_URL } from "../../config/urls";
import configLanguajeWeb from "../../config/language"
import { useRouter } from "next/router";

const Projects = ({ projects, countries, type_events }) => {
  const data_projects = projects.data;
  const data_countries = countries.data;
  const data_typeEvents = type_events.data;

  let count = 0;

  const [allProjects, setProjects] = useState([]);
  const [allCountries, setAllcountries] = useState([]);
  const [allTypeEvents, setAllTypeEvents] = useState([]);
  const [dpFilterCountry, setDpFilterCountry] = useState("none");
  const [dpFilterType, setDpFilterType] = useState("none");
  const [filters, setFilters] = useState([]);
  const [filtradas, setFiltradas] = useState([]);

  const gridSelectionAll = (indice) => {
    if (indice == 4) return "col-md-12";
    if (indice >= 5 && indice <= 6) return "col-md-6";
    return "col-md-4";
  };

  const router = useRouter()

  useEffect(() => {
    if (filters.length == 0) {
      setProjects(data_projects);
      setAllcountries(data_countries);
      setAllTypeEvents(data_typeEvents);
      setFiltradas(data_projects);
    } else {
      if (filters[0]["typeFil"] == "TypeEvent") {
        const fil = allProjects.filter((project) => {
          if (!(project?.attributes?.type_events?.data)) return;
          const t = project.attributes.type_events.data;
          const filterType = [];
          if (t.length > 0) {
            filterType = t.filter((t) => +t.id == +filters[0]["id"]);
          }
          return filterType.length ? project : "";
        });
        setFiltradas(fil);
      }
      if (filters[0]["typeFil"] == "Country") {
        const fil = allProjects.filter((project) => {
          if (!(project?.attributes?.country?.data)) return;
          const country = project.attributes.country.data;
          const res = +country.id == +filters[0]["id"];
          return res ? project : "";
        });
        setFiltradas(fil);
      }
    }
  }, [allProjects, data_countries, data_projects, data_typeEvents, filters, router.locale]);

  const handleDisplayFilter = (state, display, none) => {
    state == "block" ? display("none") : display("block");
    none("none");
  };

  const handlerFilter = (e, typeFil) => {
    const idFilter = e.target.id;
    const filterName = e.target.innerText;

    setDpFilterCountry("none");
    setDpFilterType("none");
    if (filters.length == 0) {
      setFilters([
        {
          typeFil,
          id: idFilter,
          option: filterName,
        },
      ]);
      return;
    }

    filters[0]["typeFil"] == typeFil && filters[0]["id"] == idFilter
      ? setFilters([])
      : setFilters([{ typeFil, id: idFilter, option: filterName }]);

  };

  return (
    <>
      <Head>
        <title>{configLanguajeWeb.navProjects[`${router.locale}`]} | Unicus </title>
      </Head>
      <section className="filters" style={{ position: "relative" }}>
        <div className="container-in">
          <a
            className={classNames(
              "option-general",
              {
                active: filters.length == 0,
              },
              "animate__animated animate__fadeInDown"
            )}
            onClick={() => {
              setFilters([]);
              setDpFilterCountry("none");
              setDpFilterType("none");
            }}
          >
            {configLanguajeWeb.filterAll[`${router.locale}`]}
          </a>
          <a
            className={classNames(
              "option-general",
              {
                active:
                  filters.length > 0
                    ? filters[0]["typeFil"] == "Country"
                    : false,
              },
              "animate__animated animate__fadeInDown"
            )}
            onClick={() =>
              handleDisplayFilter(
                dpFilterCountry,
                setDpFilterCountry,
                setDpFilterType
              )
            }
          >
            {filters[0]?.typeFil == "Country" ? filters[0]?.option : configLanguajeWeb.filterCountry[`${router.locale}`]}
          </a>
          <a
            className={classNames(
              "option-general",
              {
                active:
                  filters.length > 0
                    ? filters[0]["typeFil"] == "TypeEvent"
                    : false,
              },
              "animate__animated animate__fadeInDown"
            )}
            onClick={() =>
              handleDisplayFilter(
                dpFilterType,
                setDpFilterType,
                setDpFilterCountry
              )
            }
          >
            {filters[0]?.typeFil == "TypeEvent"
              ? filters[0]?.option
              : configLanguajeWeb.filterTypeEvent[`${router.locale}`]}
          </a>
        </div>
        <div className="container-menu-filter">
          <div
            className="filters-menu"
            style={{
              display: dpFilterCountry,
            }}
          >
            <div className="container-in">
              <div className="row">
                {allCountries.map(({ id, attributes }) => {
                  return (
                    <div className="col-md-3" key={id}>
                      <a id={id} onClick={(e) => handlerFilter(e, "Country")}>
                        {attributes.locale == router.locale ||
                          !attributes.localizations.data[0]?.attributes
                          ? attributes.name
                          : attributes.localizations.data[0].attributes.name}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="filters-menu" style={{ display: dpFilterType }}>
            <div className="container-in">
              <div className="row">
                {allTypeEvents.map(({ id, attributes }) => {
                  return (
                    <div className="col-md-3" key={id}>
                      <a id={id} onClick={(e) => handlerFilter(e, "TypeEvent")}>
                        {attributes.locale == router.locale ||
                          !attributes.localizations.data[0]?.attributes.name
                          ? attributes.name
                          : attributes.localizations.data[0].attributes.name}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="work-grid">
        <div className="row">
          {
            filtradas.length > 0 ?
              (filtradas.map((project) => {
                count++;
                count = count > 7 ? 1 : count;
                let grid = gridSelectionAll(count);
                return <Project key={project.id} project={project} grid={grid} locale={router.locale} />;
              })) : (<h1 className="projectNull wow fadeIn">{configLanguajeWeb.nothingProjects[`${router.locale}`]}</h1>)
          }
        </div>
      </section>
    </>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const { data: projects } = await axios.get(
      `${API_URL}/api/projects?sort=position:ASC&fields[0]=title&fields[1]=locale&populate=cover&populate[0]=country&populate[1]=type_events&populate=localizations`
    );
    const { data: countries } = await axios.get(
      `${API_URL}/api/countries?fields[0]=name&fields[1]=locale&populate=localizations`
    );
    const { data: type_events } = await axios.get(
      `${API_URL}/api/type-events?fields[0]=name&fields[1]=locale&populate=localizations`
    );

    return {
      props: {
        projects,
        countries,
        type_events,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export default Projects;
