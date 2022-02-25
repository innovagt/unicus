import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout/Layout'
import ImageProject from '../../components/common/ImageProject'
import Project from '../../components/common/Project'
import { API_URL } from '../../config/urls'

const ProjectDetail = ({ project }) => {
  let count = 0
  const { id, attributes } = project.data
  const { data: galleryProject } = attributes.gallery
  const [recommended, setRecommended] = useState([])

  const gridSelectionProject = (indice) => {
    if (indice >= 5 && indice <= 6) return "col-md-6"
    if (indice == 7) return "col-md-12"
    return "col-md-3"
  }

  useEffect(() => {
    const projectsReccomended = async (p) => {
      const { data: projects } = await axios.get(`${API_URL}/api/projects/${p}?populate[recommended][populate]=cover`)
      setRecommended(projects.data.attributes?.recommended.data)
    }
    projectsReccomended(id)
  }, [])

  return (
    <Layout nav={false} title={attributes.title}>
      <section className="showcase">
        <video className="object-fit onplay" data-width="640" data-height="360" playsinline="" preload="" loop="" muted=""
          autoPlay>
          <source
            src="https://player.vimeo.com/external/198905291.hd.mp4?s=43fc8816fb9ba83fe4e9cbea704645b5b909ea53&amp;profile_id=175"
            type="video/mp4" />
        </video>
      </section>
      <section className="detail-project">
        <div className="container-in">
          <div className="title-one">
            <div className="row">
              <div className="col-md-9">
                <h4>{attributes.title}</h4>
              </div>
              <div className="col-md-3">
                <p>País: {attributes.country.data.attributes.name} </p>
                <p>Fecha de evento: {attributes.date_event}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="description">
        <div className="container-in">
          <div className="row">
            <div className="col-md-6">
              <h3>{attributes.subtitle}</h3>
            </div>
            <div className="col-md-6">
              {attributes.description}
            </div>
          </div>
        </div>
      </section>
      <section className="work-grid">
        <div className="row">
          {galleryProject.map(({ id, attributes }) => {
            count++;
            count = count > 7 ? 1 : count;
            let grid = gridSelectionProject(count);
            return <ImageProject key={id} url={attributes.url} grid={grid} />;
          })}
        </div>
      </section>
      {recommended.length > 0 && (
        <>
          <section className="work-grid recomended">
            <div className="row">
              <div className="text-center">
                <h3>
                  Proyectos Recomendados
                </h3>
              </div>
              {recommended.map((project) => (
                <Project key={project.id} project={project} />
              ))}
            </div>
          </section>
        </>
      )}
    </Layout>
  );
}

export const getServerSideProps = async context => {
   try {
     const { data: project } = await axios.get(`${API_URL}/api/projects/${context.query.id}?populate=%2a`)
     return {
       props: {
         project
       }
     }
   } catch (error) {
     console.log(error)
   }
}

export default ProjectDetail