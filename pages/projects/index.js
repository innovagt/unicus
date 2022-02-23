import { useState } from 'react'
import axios from 'axios'
import Layout from '../../components/layout/Layout'
// import Project from '../../components/common/Project'
import useProjects from '../../components/hooks/useProjects'
const Projects = ({ projects }) => {
  const {data} = projects
  const { Projects } = useProjects(data)

  // const [event, setEvents] = useState(data)
  return (
    <Layout nav={false}>
      <section className="filters">
        <div className="container-in">
          <a href="#" className="option-general active">TODOS </a>
          <a href="#" className="option-general">PAÍS</a>
          <a href="#" className="option-general">TIPO DE EVENTO</a>
        </div>
        {/* <div className="filters-menu">
          <div className="container-in">
            <div className="row">
              <div className="col-md-3">
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
              </div>
              <div className="col-md-3">
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
              </div>
              <div className="col-md-3">
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
              </div>
              <div className="col-md-3">
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
                <a href="#">Option 1</a>
              </div>
            </div>
          </div>
        </div> */}
      </section>
      <section className="work-grid">
        <div className="row">
          <Projects />
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps = async context => {
  try {
    // const {data: projects } = await axios.get('http://localhost:1337/api/projects?populate=%2a')
    const { data: projects } = await axios.get('http://localhost:1337/api/projects?fields[0]=title&populate=cover')
    console.log(projects)
    return {
      props: {
        projects
      }
    }
  } catch (error) {
    console.log(error)
  }
}


export default Projects