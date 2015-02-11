function eventToPosition(event) {
  event.offsetX = (event.offsetX === undefined) ? event.layerX : event.offsetX;
  event.offsetY = (event.offsetY === undefined) ? event.layerY : event.offsetY;

  return {
    x: event.offsetX,
    y: event.offsetY,
  };
}

module.exports = function(viewports) {

  var minDistance = 3;
  var maxDistance = 10000;
  var position = { azimuth: Math.PI/4, elevation: Math.PI*3/8, distance: 20 };
  var target = { azimuth: Math.PI/4, elevation: Math.PI*3/8, distance: 20, scenePosition: new THREE.Vector3()};
  var lastMousePosition, mouseDownPosition, targetOnDown, state;
  var damping = 0.25;
  var that = this;

  this.mousedown = function(event) {
    mouseDownPosition = eventToPosition(event);
    targetOnDown = {
      azimuth:  target.azimuth,
      elevation: target.elevation,
    };
  };

  this.mouseup = function() {
    state = undefined;
    mouseDownPosition = undefined;
  };

  this.mousemove = function(event) {
    if (mouseDownPosition && lastMousePosition) {
      var eventPosition = eventToPosition(event);
      var dMouseFromDown = {
        x: eventPosition.x - mouseDownPosition.x,
        y: eventPosition.y - mouseDownPosition.y,
      };

      if (state === undefined) {
        state = 'rotating';
      }

      if (state === 'rotating') {
        var zoomDamp = 0.001 * Math.sqrt(position.distance);
        target.azimuth = targetOnDown.azimuth - dMouseFromDown.x * zoomDamp;
        target.elevation = targetOnDown.elevation - dMouseFromDown.y * zoomDamp;
        target.elevation = target.elevation > Math.PI ? Math.PI : target.elevation;
        target.elevation = target.elevation < 0 ? 0 : target.elevation;
        that.updateCamera();
      }

    }
    lastMousePosition = eventToPosition(event);
  };

  this.mousewheel = function(event) {
    var factor = 0.005;
    event.preventDefault();
    event.stopPropagation();
    if (event.wheelDelta) {
      target.distance -= event.wheelDelta * Math.sqrt(position.distance)*factor;
    }
    // For Firefox
    if (event.detail) {
      target.distance -= -event.detail*60 * Math.sqrt(position.distance)*factor;
    }
  };

  function animate() {
    requestAnimationFrame(animate);
    that.updateCamera();
  }

  this.updateCamera = function() {
    position.azimuth += (target.azimuth - position.azimuth) * damping;
    position.elevation += (target.elevation - position.elevation) * damping;

    var dDistance = (target.distance - position.distance) * damping;
    var newDistance = position.distance + dDistance;
    if (newDistance > maxDistance) {
      target.distance = maxDistance;
      position.distance = maxDistance;
    } else if (newDistance < minDistance) {
      target.distance = minDistance;
      position.distance = minDistance;
    } else {
      position.distance = newDistance;
    }

    viewports.forEach(function(viewport) {
      viewport.camera.position.x = position.distance * Math.sin(position.elevation) * Math.cos(position.azimuth);
      viewport.camera.position.y = position.distance * Math.sin(position.elevation) * Math.sin(position.azimuth);
      viewport.camera.position.z = position.distance * Math.cos(position.elevation);
      viewport.camera.up = new THREE.Vector3(0,0,1);
      viewport.camera.lookAt(new THREE.Vector3(0,0,0));
    });

  };

  viewports.forEach(function(viewport) {
    viewport.container.addEventListener('mousemove', that.mousemove, false);
    viewport.container.addEventListener('mousedown', that.mousedown, false);
    viewport.container.addEventListener('mouseup', that.mouseup, false);
    viewport.container.addEventListener('mouseout', that.mouseup, false);
    viewport.container.addEventListener('mousewheel', that.mousewheel, false);
    viewport.container.addEventListener('DOMMouseScroll', that.mousewheel, false);
  });

  animate();

};



