"use strict";
/*
   Nếu muốn Random, hãy sử dụng:
    let array = new Uint32Array(10);
    window.crypto.getRandomValues(array);
*/
function css(element, property) {
   return window.getComputedStyle(element, null).getPropertyValue(property);
}
function get_tex_size(txt, font) {
   let canvas = get_tex_size.cachedCanvas;
   if (canvas == null) {
      get_tex_size.cachedCanvas = document.createElement('canvas');
      canvas = get_tex_size.cachedCanvas;
   }
   let context = canvas.getContext("2d");
   context.font = font;
   var tsize = {
      width: context.measureText(txt).width,
      height: parseFloat(context.font),
   };
   tsize.height += tsize.height * 0.2; // HTML5 Canvas sucks
   context.setTransform(1, 0, 0, 1, 0, 0);
   return tsize;
};
var PickedEdge = {
   Width: 0, Height: 1,
}
function TestSize(textSize, wrapperSize) {
   let rs;
   let deltaX = textSize.width - wrapperSize.width;
   let deltaY = textSize.height - wrapperSize.height;
   let scaleX = textSize.width / wrapperSize.width;
   let scaleY = textSize.height / wrapperSize.height;
   if (deltaX < 0 && deltaY < 0) {
      if (scaleX < scaleY) rs = PickedEdge.Width;
      else rs = PickedEdge.Height;
   }
   else if (deltaX >= 0 && deltaY < 0) {
      rs = PickedEdge.Width;
   }
   else if (deltaX < 0 && deltaY >= 0) {
      rs = PickedEdge.Height;
   }
   else if (deltaX >= 0 && deltaY >= 0) {
      if (scaleX > scaleY) rs = PickedEdge.Width;
      else rs = PickedEdge.Height;
   }
   else rs = PickedEdge.Height;
   return rs;
}
let displayedNumber = $('#displayed-number');
let disNumber = document.getElementById('displayed-number');
let wrapperElement = $('#displayed-number-div');
let SizeLabelFont = function () {
   let wrapper = wrapperElement;
   let wrapperSize = {
      width: wrapper.width() - 20,
      height: wrapper.height() - 20,
   };
   if (wrapperSize.height <= 45) return;
   if (wrapperSize.width <= 90) return;
   let text = displayedNumber.text();
   let fontName = css(disNumber, 'font-family');
   let font = `1000px ${fontName}`
   let textSize = get_tex_size(displayedNumber.text(), font);
   let size = 1;
   let scale;
   if (TestSize(textSize, wrapperSize) == PickedEdge.Width)
      scale = wrapperSize.width / textSize.width;
   else
      scale = wrapperSize.height / textSize.height;
   size = 1000 * scale;
   if (size < 1) size = 1;
   displayedNumber.css({ fontSize: size, height: wrapper.height(), });
};
wrapperElement.resize(SizeLabelFont);