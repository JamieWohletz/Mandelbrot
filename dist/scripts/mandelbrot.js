(function() {

  function viewportDimensions() {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return { w, h };
  }

  function drawPixelOnCanvas(canvas) {
    const context = canvas.getContext('2d');
    return function renderPixel(x, y, color) {
      context.fillStyle = color;
      context.fillRect(x, y, 1, 1);
    };
  }

  function main() {
    const canvas = document.getElementById('mandelbrot');
    // const { w, h } = viewportDimensions();
    const { w, h } = { w: 500, h: 500 };
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    const drawPixel = drawPixelOnCanvas(canvas);
    drawFractal(Util, drawPixel, w, h);
  }

  function drawFractal(util, drawPixel, width, height) {
    const MAX_ITERATIONS = 100;  
    const { w, h } = viewportDimensions();
    const { complexW, complexH, complexLeftEdge, complexBottomEdge } = {
      complexW: 10,
      complexH: 10,
      complexLeftEdge: -2,
      complexTopEdge: -2
    };
    const pixels = util.pixels(width)(height);

    for (let i = 0; i < pixels.length; i++) {
      const { x, y } = pixels[i];
      const cReal = util.computeRealPartFromX(w)(complexW)(complexLeftEdge)(x);
      const cImag = util.computeImaginaryPartFromY(h)(complexH)(complexBottomEdge)(y);

      let zReal = 0;
      let zImag = 0;

      let iterations = 0;

      while ((zReal*zReal + zImag*zImag <= 2*2) && (iterations < MAX_ITERATIONS)) {
        const nextZReal = zReal*zReal - zImag*zImag + cReal;
        const nextZImag = 2*zReal*zImag + cImag;

        zReal = nextZReal;
        zImag = nextZImag;

        iterations += 1;
      }
      
      const tint = util.mapEscapeValueToColor(MAX_ITERATIONS)(iterations);
      const color = `rgb(${tint}, ${tint}, ${tint})`;

      drawPixel(x, y, color);
    }
  }

  main();
}());