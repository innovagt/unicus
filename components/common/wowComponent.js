import WOW from 'wowjs'

export default function WowComponent() {
  return new WOW.WOW({
    boxClass: 'wow', // default
    animateClass: 'animated', // default
    offset: 0, // default
    mobile: true, // default
    live: false, // default
  }).init()
}