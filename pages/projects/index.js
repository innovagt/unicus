import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import Project from "../../components/common/Project";
import classNames from "classnames";
import { API_URL } from "../../config/urls";

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

  useEffect(() => {
    if (filters.length == 0) {
      console.log("filtrando todos");
      setProjects(data_projects);
      setAllcountries(data_countries);
      setAllTypeEvents(data_typeEvents);
      setFiltradas(data_projects);
    } else {
      if (filters[0]["typeFil"] == "TypeEvent") {
        console.log("Filtrando por Tipo de evento");
        const fil = allProjects.filter((project) => {
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
        console.log("Filtrando por pais");
        console.log(filters);
        const fil = allProjects.filter((project) => {
          const country = project.attributes.country.data;
          console.log(country);
          const res = +country.id == +filters[0]["id"];
          return res ? project : "";
        });
        console.log(fil);
        setFiltradas(fil);
      }
    }
  }, [filters]);

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
        <title>Projects | Unicus </title>
      </Head>
      <section className="filters" style={{ position: "relative" }}>
        <div className="container-in">
          <a
            className={classNames("option-general", {
              active: filters.length == 0,
            })}
            onClick={() => setFilters([])}
          >
            TODOS{" "}
          </a>
          <a
            href="#"
            className={classNames("option-general", {
              active:
                filters.length > 0 ? filters[0]["typeFil"] == "Country" : false,
            })}
            onClick={() =>
              handleDisplayFilter(
                dpFilterCountry,
                setDpFilterCountry,
                setDpFilterType
              )
            }
          >
            {filters[0]?.typeFil == "Country" ? filters[0]?.option : "País"}
          </a>
          <a
            href="#"
            className={classNames("option-general", {
              active:
                filters.length > 0
                  ? filters[0]["typeFil"] == "TypeEvent"
                  : false,
            })}
            onClick={() =>
              handleDisplayFilter(
                dpFilterType,
                setDpFilterType,
                setDpFilterCountry
              )
            }
          >
            {filters[0]?.typeFil == "TypeEvent" ? filters[0]?.option : "TIPO DE EVENTO"}
          </a>
        </div>
        <div className="filters-menu" style={{ display: dpFilterCountry }}>
          <div className="container-in">
            <div className="row">
              {allCountries.map(({ id, attributes }) => {
                return (
                  <div className="col-md-3" key={id}>
                    <a id={id} onClick={(e) => handlerFilter(e, "Country")}>
                      {attributes.name}
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
                      {attributes.name}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="work-grid">
        <div className="row">
          {filtradas.map((project) => {
            count++;
            count = count > 7 ? 1 : count;
            let grid = gridSelectionAll(count);
            console.log(grid);
            return <Project key={project.id} project={project} grid={grid} />;
          })}
        </div>
      </section>
    </>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const { data: projects } = await axios.get(
      `${API_URL}/api/projects?fields[0]=title&populate=cover&populate[0]=country&populate[1]=type_events`
    );
    const { data: countries } = await axios.get(
      `${API_URL}/api/countries?fields[0]=name`
    );
    const { data: type_events } = await axios.get(
      `${API_URL}/api/type-events?fields[0]=name`
    );

    console.log(projects);
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
