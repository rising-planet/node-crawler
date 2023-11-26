export class GsEventList {
  index = -1;
  imgSrc = "";
  onOffLine = "";
  title = "";
  href = "";
  detailImages = [];

  constructor({ index, imgSrc, onOffLine, title, href }) {
    if (index) this.index = parseInt(index);
    if (imgSrc) this.imgSrc = imgSrc;
    if (onOffLine) this.onOffLine = onOffLine;
    if (title) this.title = title;
    if (href) this.href = href;
  }

  setDetailImages(images = []) {
    this.detailImages = images;
  }
}
