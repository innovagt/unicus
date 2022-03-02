import Link from "next/link"
import { fadeIn } from 'react-animations'
import styled, { keyframes } from 'styled-components';
import Image from 'next/image'
import dynamic from "next/dynamic";
import 'animate.css'

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const myLoaderBlur = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 10}`
}

const ImageWrap = styled.div`
  img{
    padding: 0 8px !important;
  }

  img:hover{
    transform: scale(1.02);
    opacity: 1 !important;
  }

`

const DynamicComponentWithNoSSR = dynamic(
  () => import("../../components/common/wowComponent"),
  { ssr: false }
)


const Project = ({ project, grid = "col-md-4", animate = ' animate__animated animate__fadeInUp' }) => {
  // console.log(project)
  const { id, attributes } = project
  return (
    <>
      <DynamicComponentWithNoSSR />
      <ImageWrap className={grid + animate} >
        <div className="title-project">
          <h4>{attributes.title}</h4>
        </div>
        <Link href={`/projects/${id}`}>
          <a>
            <Image src={attributes.cover.data.attributes.url} loader={myLoader} layout="fill" alt="" blurDataURL={myLoaderBlur} placeholder="blur" />
          </a>
        </Link>
      </ImageWrap>
    </>
  )
}

export default Project