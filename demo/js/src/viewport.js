var $  = require('jquery');

module.exports = function(container) {

  var camera, renderer, light;
  var that = this;
  that.container = container;

  function onWindowResize() {
    var width = $(container).width();
    var height = $(container).height();
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function init() {

    camera = new THREE.PerspectiveCamera(70, 1.0, 0.1, 10000 );
    that.camera = camera;
    camera.position.z = 40;
    camera.position.x = 40;
    camera.position.y = 40;
    camera.up = new THREE.Vector3(0,0,1);
    camera.lookAt(new THREE.Vector3(0,0,0));

    that.scene = new THREE.Scene();
    that.scene.add( new THREE.AmbientLight(0x101010) );

    light = new THREE.PointLight( 0xffffff, 1.5 );
    light.position.set(0, 0, 2000);
    that.scene.add( light );

    var xMaterial = new THREE.LineBasicMaterial({color: 0x00ff00, opacity: 0.5});
    var yMaterial = new THREE.LineBasicMaterial({color: 0x0000ff, opacity: 0.5});
    var zMaterial = new THREE.LineBasicMaterial({color: 0xff0000, opacity: 0.5});

    var xGeom = new THREE.Geometry();
    xGeom.vertices.push(new THREE.Vector3(0, 0, 0));
    xGeom.vertices.push(new THREE.Vector3(100, 0, 0));
    var yGeom = new THREE.Geometry();
    yGeom.vertices.push(new THREE.Vector3(0,0, 0));
    yGeom.vertices.push(new THREE.Vector3(0, 100, 0));
    var zGeom = new THREE.Geometry();
    zGeom.vertices.push(new THREE.Vector3(0, 0, 0));
    zGeom.vertices.push(new THREE.Vector3(0, 0, 100));

    that.scene.add(new THREE.Line(xGeom, xMaterial));
    that.scene.add(new THREE.Line(yGeom, yMaterial));
    that.scene.add(new THREE.Line(zGeom, zMaterial));
    that.exampleObj = new THREE.Object3D();
    that.scene.add(that.exampleObj);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.sortObjects = false;
    renderer.setClearColor(0xffffff, 1);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
    onWindowResize();
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    light.position = camera.position;
    renderer.render(that.scene, camera);
  }

  this.addLine = function(points, i) {

    var geom = new THREE.Geometry();
    geom.vertices = points.map(function(p) {
      return new THREE.Vector3(0, p[0], -p[1]);
    });

    var material = new THREE.LineBasicMaterial({color: 0x000000});
    var line = new THREE.Line(geom, material);
    line.position.y = (i % 10)*20;
    line.position.z = Math.floor(i/10) * 25;

    this.scene.add(line);
  };

  init();
  animate();


};