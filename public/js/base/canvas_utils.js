import VendorPrefixes from "./vendor_prefixes";

const CanvasUtils = {

  // Creates and returns a high a canvas

  canvas : function (w, h) {
    var canvas = document.createElement("canvas");

    canvas.width = w;
    canvas.height = h;

    return canvas;
  },

  // Creates and returns a high DPI canvas based on a device specific pixel ratio

  hiDpiCanvas : function (w, h, ratio) {
    ratio = ratio || this.pixelRatio;
    var canvas = document.createElement("canvas");

    CanvasUtils.updateCanvasSize(canvas, w, h, ratio);

    return canvas;
  },

  updateCanvasSize : function (canvas, w, h, ratio) {
    ratio = ratio || 1;

    canvas.width = w * ratio;
    canvas.height = h * ratio;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
  },

  // Returns the device's pixel ratio

  pixelRatio : (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.backingStorePixelRatio;

    for(var x = 0; x < VendorPrefixes.length && !bsr; ++x) {
      bsr = ctx[VendorPrefixes[x]+"BackingStorePixelRatio"];
    }

    bsr = bsr || 1;

    return (dpr / bsr);
  })()

};


export default CanvasUtils;