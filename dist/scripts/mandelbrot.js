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


  function drawFractal(util, drawPixel, canvasWidth, canvasHeight) {
    const MAX_ITERATIONS = 100;  
    const { complexW, complexH, complexLeftEdge, complexBottomEdge } = {
      complexW: 2,
      complexH: 2,
      complexLeftEdge: -1.5,
      complexBottomEdge: -1
    };
    const pixels = util.pixels(canvasWidth)(canvasHeight);

    function colorMandelbrotPixel(pixelIndex) {
      const { x, y } = pixels[pixelIndex];
      const cReal = util.computeRealPartFromX(canvasWidth)(complexW)(complexLeftEdge)(x);
      const cImag = util.computeImaginaryPartFromY(canvasHeight)(complexH)(complexBottomEdge)(y);

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
      
      const color = util.mapEscapeValueToColor(MAX_ITERATIONS)(iterations);

      drawPixel(x, y, color);
      if (pixelIndex < pixels.length) {
        setImmediate(() => colorMandelbrotPixel(pixelIndex + 1));
      } else {
        console.log('Done');
      }
    }

    setImmediate(() => colorMandelbrotPixel(0));
  }

  main();
}());