  var SEPARATION = 40, AMOUNTX = 130, AMOUNTY = 35;

  var container, stats;
  var camera, scene, renderer;
  var particles, particle, count = 0;
  let mouseX = 0, mouseY = 0;
  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  function init() {

    container = document.getElementById('BoxArticle');
    if (container) {
      container.className += container.className ? ' waves' : 'waves';
    }
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 300; // Good var to change
    // camera.position.y = 150; //Cambia lo lejos que puedes ver, las partículas hacia el horizonte.
    // camera.position.z = 200; //Así es como se ven cerca o lejanos las partículas.

    // camera.rotation.x = 0.35;

    scene = new THREE.Scene();

    particles = new Array();

    var PI2 = Math.PI * 2;
    var geometry = new THREE.Geometry();
    var material = new THREE.SpriteCanvasMaterial({

      color: 0x335E95, //changes color of particles
      program: function (context) {

        context.beginPath();
        context.arc(0, 0, 0.1, 0, PI2, true);
        context.fill();

      }

    });

    var i = 0;

    for (var ix = 0; ix < AMOUNTX; ix++) {

      for (var iy = 0; iy < AMOUNTY; iy++) {

        particle = particles[i++] = new THREE.Sprite(material);
        particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
        particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
        scene.add(particle);
        if (i > 0) {
          geometry.vertices.push(particle.position);
        }
      }

    }

    renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1);
    container.innerHTML = ''
    container.appendChild(renderer.domElement);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    window.addEventListener('resize', onWindowResize, false);
  }

  function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

  }

  function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }

  function onDocumentTouchStart(event) {
    if (event.touches.length === 1) {
      event.preventDefault();
      mouseX = event.touches[0].pageX - windowHalfX;
      mouseY = event.touches[0].pageY - windowHalfY;
    }
  }

  function onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
      event.preventDefault();
      mouseX = event.touches[0].pageX - windowHalfX;
      mouseY = event.touches[0].pageY - windowHalfY;
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {

    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (- mouseY - camera.position.y) * .05;
    camera.lookAt(scene.position);
    var i = 0;
    for (var ix = 0; ix < AMOUNTX; ix++) {
      for (var iy = 0; iy < AMOUNTY; iy++) {
        particle = particles[i++];
        particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
        particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 1) + 1) * 4 + (Math.sin((iy + count) * 0.5) + 1) * 4;
      }
    }

    renderer.render(scene, camera);

    // Esto aumenta o disminuye la velocidad.
    count += 0.1;

  }

