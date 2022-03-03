import { Particle } from 'jparticles'

export default function Particles() {
  // new Particle('#BoxArticle', {
  //     proximity: 90,
  //     range: 100,
  //     color: [0, 147, 188],
  //     maxSpeed: 1,
  //     minSpeed: 0,
  //     resize: true,
  //   })

  new Particle('#BoxArticle', {
    color: '#25bfff',
    lineShape: 'spider',
    range: 1000,
    proximity: 100,
    shape: "circle",
    maxSpeed: 1,
    minSpeed: 0,
    resize: true
    // Turn on parallax effect
  })
  //   new Particle('#anim', {
  //   color: '#25bfff',
  //   lineShape: 'cube',
  //   range: 2000,
  //   proximity: 100,
  //   // Turn on parallax effect
  //   parallax: true,
  // })
  return null
}