import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout/Layout'
import ImageProject from '../../components/common/ImageProject'
import Project from '../../components/common/Project'

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
      const { data: projects } = await axios.get(`http://localhost:1337/api/projects/${p}?populate[recommended][populate]=cover`)
      setRecommended(projects.data.attributes?.recommended.data)
    }
    projectsReccomended(id)
  }, [])

  return (
    <Layout nav={false} title={attributes.title}>
      <section className="work-grid">
        <div className="row">
          {
            galleryProject.map(({ id, attributes }) => {
              count++
              count = count > 7 ? 1 : count
              let grid = gridSelectionProject(count)
              return (
                 <ImageProject key={id} url={attributes.url} grid={grid}  />
              )
            })
          }
        </div>
      </section>
      {
        recommended.length > 0 && (
          <>
            <section className="container-in">
              <div className='text-center'>
                <h2 className='title-text'>Proyectos Recomendados</h2>
              </div>
            </section>
            <section className="work-grid">
              <div className="row">
                {
                  recommended.map(project => 
                    <Project key={project.id} project={project} />
                  )
                }
              </div>
            </section>
          </>
        )
      }
    </Layout>
  )
}

export const getServerSideProps = async context => {
   try {
     const { data: project } = await axios.get(`http://localhost:1337/api/projects/${context.query.id}?populate=%2a`)
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