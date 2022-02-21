import Image from "next/image";
import Layout from "../components/layout/Layout"

 const Home = () => {
  return (
    <Layout>
      <section className="showcase">
        <div className="overlay">
          <div className="text-showcase">
            <h1>
              Lorem ipsum <br />
              dolor
              <span>sit amet</span>
            </h1>
            <a href="#">Ver proyectos</a>
          </div>
          <div className="social-nav">
            {/* <a href="#" target="_blank"><Image  width={25} height={25} src="/img/wt.svg" alt="" /> </a>
            <a href="#" target="_blank"><Image  width={25} height={25} src="/img/f.svg" alt="" /> </a>
            <a href="#" target="_blank"><Image  width={25} height={25} src="/img/i.svg" alt="" /> </a>
            <a href="#" target="_blank"><Image  width={25} height={25} src="/img/yt.svg" alt="" /></a> */}
            <a href="#" target="_blank"><img src="/img/wt.svg" alt="" /> </a>
            <a href="#" target="_blank"><img src="/img/f.svg" alt="" /> </a>
            <a href="#" target="_blank"><img src="/img/i.svg" alt="" /> </a>
            <a href="#" target="_blank"><img src="/img/yt.svg" alt="" /></a>
          </div>
        </div>
        <video
          className="object-fit onplay"
          data-width="640"
          data-height="360"
          playsInline=""
          preload=""
          loop=""
          muted=""
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
            <h2>THIS IS UNICUS</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla sodales bibendum. Integer
              volutpat magna hendrerit Lorem ipsum dolor si dignissim.</p>
            <a href="#">WE ARE</a>
          </div>
        </div>
      </section>
      <section className="work-grid">
        <div className="row">
          <div className="col-md-6">
            <div className="title-project">
              <h4>Name Project</h4>
            </div>
            <a routerLink="/project-detail">
              <img src="https://via.placeholder.com/960x656" alt="" />
            </a>
          </div>
          <div className="col-md-6">
            <div className="title-project">
              <h4>Name Project</h4>
            </div>
            <a href="#">
              <img src="https://via.placeholder.com/960x656" alt="" />
            </a>
          </div>
          <div className="col-md-4">
            <div className="title-project">
              <h4>Name Project</h4>
            </div>
            <a href="#">
              <img src="https://via.placeholder.com/960x656" alt="" />

            </a>
          </div>
          <div className="col-md-4">
            <div className="title-project">
              <h4>Name Project</h4>
            </div>
            <a href="#">
              <img src="https://via.placeholder.com/960x656" alt="" />

            </a>
          </div>
          <div className="col-md-4">
            <div className="title-project">
              <h4>Name Project</h4>
            </div>
            <a href="#">
              <img src="https://via.placeholder.com/960x656" alt="" />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Home