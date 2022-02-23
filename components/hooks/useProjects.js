import Project from '../common/Project'
const useProjects = (data) => {
  let count = 0
  let grid = "col-md-4"
  const gridSelection = (indice) => {
    if (indice == 4) return "col-md-12"
    if (indice >= 5 && indice <= 6 ) return "col-md-6"
    return "col-md-4"
}


  const Projects = () => {
  return (
    data.map((project, i) => {
      count++
      count = count > 7 ? 1 : count
      grid = gridSelection(count)
      return (
        <Project key={project.id} project={project} grid={grid}/>
      )
    }
    )
  )
  }

  return {
    Projects
  }
}

export default useProjects