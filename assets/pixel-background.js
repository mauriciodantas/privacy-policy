/**
 * Animated pixel field — a vanilla port of the portfolio's <PixelBackground />.
 * Pixels fade in toward a random target opacity, then respawn elsewhere.
 */
(function () {
  var canvas = document.getElementById('pixel-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var COLORS = [
    'rgba(0, 255, 65,',   // accent-green
    'rgba(0, 240, 255,',  // accent-blue
    'rgba(188, 19, 254,', // accent-purple
  ];

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pixels = [];
  var width = 0;
  var height = 0;

  function spawn(p) {
    var pixel = p || {};
    pixel.x = Math.floor(Math.random() * (width / 4)) * 4;
    pixel.y = Math.floor(Math.random() * (height / 4)) * 4;
    pixel.opacityTarget = Math.random() * 0.18 + 0.02;
    pixel.opacitySpeed = Math.random() * 0.003 + 0.001;
    if (p === undefined) {
      pixel.size = [2, 4, 4, 4, 6][Math.floor(Math.random() * 5)];
      pixel.opacity = Math.random() * 0.15;
      pixel.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    } else {
      pixel.opacity = 0;
    }
    return pixel;
  }

  // The canvas is `position: fixed`, so it only ever needs to cover the
  // viewport — sizing it to the document height made every content-height
  // change resize (and therefore clear) the canvas.
  function resize() {
    var nextWidth = window.innerWidth;
    var nextHeight = window.innerHeight;
    if (nextWidth === width && nextHeight === height) return;

    width = nextWidth;
    height = nextHeight;

    var dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var count = Math.floor((width * height) / 18000);
    var previous = pixels;
    pixels = [];
    for (var i = 0; i < count; i++) {
      // Keep the pixels that already exist so a resize doesn't restart the
      // whole field; only clamp them back inside the new bounds.
      var existing = previous[i];
      if (existing) {
        existing.x = Math.min(existing.x, Math.max(0, width - existing.size));
        existing.y = Math.min(existing.y, Math.max(0, height - existing.size));
        pixels.push(existing);
      } else {
        pixels.push(spawn());
      }
    }
  }

  function paint() {
    ctx.clearRect(0, 0, width, height);
    for (var i = 0; i < pixels.length; i++) {
      var p = pixels[i];
      ctx.fillStyle = p.color + p.opacity + ')';
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }
  }

  function draw() {
    for (var i = 0; i < pixels.length; i++) {
      var p = pixels[i];
      // Drift opacity toward target (blink effect)
      if (p.opacity < p.opacityTarget) {
        p.opacity = Math.min(p.opacity + p.opacitySpeed, p.opacityTarget);
      } else {
        p.opacity -= p.opacitySpeed;
        if (p.opacity <= 0) {
          // Reset to a new position once fully invisible
          spawn(p);
        }
      }
    }
    paint();
    window.requestAnimationFrame(draw);
  }

  resize();

  if (reduceMotion) {
    paint();
  } else {
    draw();
  }

  window.addEventListener('resize', resize);
})();
