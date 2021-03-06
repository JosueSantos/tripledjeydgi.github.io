const elementsArray = [];

elementsArray.corpele = window.sessionStorage.getItem("corpele");
elementsArray.corcabelo = window.sessionStorage.getItem("corcabelo");
elementsArray.corsobrancelha = window.sessionStorage.getItem("corsobrancelha");
elementsArray.corolho = window.sessionStorage.getItem("corolho");

elementsArray.corpo = window.sessionStorage.getItem('corpo');
elementsArray.cabelo = window.sessionStorage.getItem('cabelo');
elementsArray.sobrancelha = window.sessionStorage.getItem('sobrancelha');
elementsArray.olho = window.sessionStorage.getItem('olho');
elementsArray.nariz = window.sessionStorage.getItem('nariz');
elementsArray.boca = window.sessionStorage.getItem('boca');

let html = '<defs><style>';
if ('corpele' in elementsArray && elementsArray.corpele != 'false' && elementsArray.corpele != null) {
  if (elementsArray.corpele.includes('#')){
    html += '.pele-class { fill:' + elementsArray.corpele + ';}';
  }
}else{
  html += '.pele-class {fill:white;}';
}

if ('corcabelo' in elementsArray && elementsArray.corcabelo != 'false' && elementsArray.corcabelo != null) {
  if (elementsArray.corcabelo.includes('#')){
    html += '.cabelo-class-1 { fill:' + elementsArray.corcabelo + ';}';
  }
}else{
  html += '.cabelo-class-1 {fill:#000;}';
}

if ('corsobrancelha' in elementsArray && elementsArray.corsobrancelha != 'false' && elementsArray.corsobrancelha != null) {
  if (elementsArray.corsobrancelha.includes('#')){
    html += '.sobrancelha-class-1 { fill:' + elementsArray.corsobrancelha + ';}';
  }
}else{
  html += '.sobrancelha-class-1 {fill:#000;}';
}

if ('corolho' in elementsArray && elementsArray.corolho != 'false' && elementsArray.corolho != null) {
  if (elementsArray.corolho.includes('#')){
    html += '.olho-class-3 { fill:' + elementsArray.corolho + ';}';
  }
}else{
  html += '.olho-class-3 {fill:#000;}';
}

html += 
  ".olho-class-1{fill:#000;}" +
  ".olho-class-2{fill:#fff;}" +

  '.nariz-class-1,.nariz-class-2{fill:#000;}' +
  '.boca-class-1 {fill:#000;}' +
  '.boca-class-2 {fill:none;}' +

  '</style></defs>' + dataCraftArray.block.print.blockIn;
  
if ('corpo' in elementsArray && elementsArray.corpo != 'false' && elementsArray.corpo != null) {
  html +=
    dataCraftArray.element[elementsArray.corpo].dataPrint;
}

html += dataCraftArray.block.print.blockOut;

if ('cabelo' in elementsArray && elementsArray.cabelo != 'false' && elementsArray.cabelo != null) {
  html +=
    dataCraftArray.block.print.cabelo +
    dataCraftArray.element[elementsArray.cabelo].dataPrint +
    dataCraftArray.block.print.blockOut;
}

if ('sobrancelha' in elementsArray && elementsArray.sobrancelha != 'false' && elementsArray.sobrancelha != null) {
  html +=
    dataCraftArray.block.print.sobrancelha +
    dataCraftArray.element[elementsArray.sobrancelha].data +
    dataCraftArray.block.print.blockOut;
}

if ('olho' in elementsArray && elementsArray.olho != 'false' && elementsArray.olho != null) {
  html +=
    dataCraftArray.block.print.olho +
    dataCraftArray.element[elementsArray.olho].data +
    dataCraftArray.block.print.blockOut;
}

if ('nariz' in elementsArray && elementsArray.nariz != 'false' && elementsArray.nariz != null) {
  html +=
    dataCraftArray.block.print.nariz +
    dataCraftArray.element[elementsArray.nariz].data +
    dataCraftArray.block.print.blockOut;
}

if ('boca' in elementsArray && elementsArray.boca != 'false' && elementsArray.boca != null) {
  html +=
    dataCraftArray.block.print.boca +
    dataCraftArray.element[elementsArray.boca].data +
    dataCraftArray.block.print.blockOut;
}

var data = '<svg xmlns="http://www.w3.org/2000/svg" id="svg-craft3" viewBox="0 0 300 220">' + html + '</svg>';
const img_svg = document.getElementById("svg-craft");
img_svg.src = 'data:image/svg+xml;utf8,'+encodeURIComponent(data);

function download_img(el) {
  const canva = document.createElement("canvas");
  canva.width = 1200;
  canva.height = 800;
  const context_canva = canva.getContext("2d");

  context_canva.drawImage(
    img_svg,
    0,
    0,
    canva.width,
    canva.height
  );

  var image = canva.toDataURL("image/jpg");
  el.href = image;
}
