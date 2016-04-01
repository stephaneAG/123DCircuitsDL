// lookin ahead from the shoulders of giants ;p ..
// to save files
var saveAsScript = document.createElement('script');
saveAsScript.src = 'https://cdn.rawgit.com/eligrey/FileSaver.js/master/FileSaver.js';
document.body.appendChild(saveAsScript);
// to test the above:
/*
// text
var blob = new Blob(["Hello World, tef !"], {type: 'text/plain;charset=utf-8'}); // blob that
saveAs(blob, 'fuckYeah.tef');
// not working ..
var blob = new Blob([viewsLinks[0][2]], {type: 'text/plain;charset=utf-8'});
saveAs(blob, 'drawing.svg');
// .. but the following does -> 'hurray' !!! ^^
var doctype = '<?xml version="1.0" standalone="no"?>' + '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
var source = (new XMLSerializer()).serializeToString( viewsLinks[0][2] ); // serialize SVG XML to str
var blob = new Blob([ doctype + source], { type: 'image/svg+xml;charset=utf-8' }); // blob that
saveAs(blob, 'drawing.svg');
/*
var blob = new Blob([viewsLinks[0][2]], {type: 'text/plain;charset=utf-8'});
saveAs(blob, 'drawing.svg');
*/

// to save zip files
var saveZipScript = document.createElement('script');
saveZipScript.src = 'https://cdn.rawgit.com/Stuk/jszip/master/dist/jszip.min.js';
document.body.appendChild(saveZipScript);
// to test the above:
/*
var zip = new JSZip();
zip.file('fuckYeah.tef', "Hello World, tef !\n");
zip.folder('othertxt').file('fuckYeah.tef', "Hello World, tef !\n");
var content = zip.generate({type: 'blob'});
saveAs(content, 'soSweet.zip');
// AND WIP TEST:
var zip = new JSZip();
zip.file('fuckYeah.tef', "Hello World, tef !\n");
var doctype = '<?xml version="1.0" standalone="no"?>' + '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
var source = (new XMLSerializer()).serializeToString( viewsLinks[0][2] ); // serialize SVG XML to str
zip.folder('drawings').file('drawing.svg', doctype + source); // unsupported format ?!
var content = zip.generate({type: 'blob'});
saveAs(content, 'soSweet.zip');
*/

// get the circuit/project name
var circuitTitle = document.querySelector('.js-circuit-menu-title').textContent || document.querySelector('.vertical-spacing--title').textContent.substr(0, document.querySelector('.vertical-spacing--title').textContent.indexOf('|')-3);

// get svg icons, name/type & data
var menus = document.querySelectorAll('div.sitemenu__right__item--editor')
var links = menus[1].querySelectorAll('a');
var viewsLinks = []; // holds 'em all
[].forEach.call(links, function(link) {
  if (link.href.substr(link.href.indexOf('#')+1) !== 'bom'  ) { // we don't want no dum' ;p
    viewsLinks.push([
      //link.href.substr(1), // the name/type of the view
      link.href.substr(link.href.indexOf('#')+1), // the name/type of the view
      link.querySelector('svg'), // the icon for the type of the view
      //document.querySelector(link.href + 'Tab').querySelector('svg'), // the SVG for the view
      document.querySelector(link.href.substr(link.href.indexOf('#')) + 'Tab').querySelector('svg'), // the SVG for the view
      'svg' // the extension for the future file blob
    ]);
  }
});

// get bom(s) icons & data
var bomLink = document.querySelector('a[href="#bom"]');
bomLink.click(); // prevent the below stuff to be 'null'
var htmlTable = document.querySelector('table.bom__table'); // R: null if we don't first click on the bom link ..

// it seems my naïve handling doesnt suffice any more ..
var csvContent = htmlTable.innerText.replace(/\s{8}/g, '\t').replace(/\s{3,}/g, '\n').replace(/\t{1,}/g, ',');
csvContent.replace(/,\n/g, ',""\n');
if ( csvContent.endsWith(',') ) csvContent += '""\n';

viewsLinks.push(
  [
    //bomLink.href.substr(1), // the name/type of the view
    bomLink.href.substr(bomLink.href.indexOf('#')+1), // the name/type of the view
    bomLink.querySelector('svg'), // the icon for the type of the view
    //'<h3>' + circuitTitle + '</h3>' + htmlTable, // the content for the view
    (new XMLSerializer()).serializeToString( htmlTable ), // wip testing, title to be added
    'html' // the extension for the future file blob
  ],
  [
    //bomLink.href.substr(1), // the name/type of the view
    bomLink.href.substr(bomLink.href.indexOf('#')+1), // the name/type of the view
    bomLink.querySelector('svg'), // the icon for the type of the view
    //circuitTitle + ' - Bill Of Materials\n' + htmlTable.innerText.split('\t').join(','), // the content for the view
    circuitTitle + ' - Bill Of Materials\n' + csvContent, // the content for the view
    'csv' // the extension for the future file blob
  ]
);

// build up the popup <ul> & <li>'s
// ul
var popupUl = document.createElement('ul');
// li's
viewsLinks.forEach(function(viewLink){
  // R: viewLink = [0]-> name/type | [1]-> SVG icon  | [2]-> content  | [3]-> .ext 
  // create <li>
  var li = document.createElement('li')
  li.className = 'circuit-view';
  //li.setAttribute('data-viewType', 'theViewType'); // TODO: change to actual type from viewLink
  li.setAttribute('data-viewType', viewLink[0]);
  li.setAttribute('data-viewExt', viewLink[3]);
  li.style.display = 'block';
  // create to-be-zipped checkbox
  var checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  //checkBox.id = 'theType'; // TODO: change to actual type from viewLink
  checkBox.id = viewLink[0];
  checkBox.style.float = 'left';
  checkBox.style.marginTop = '2.5px';
  checkBox.style.marginRight = '10px';
  checkBox.onchange = function(){
  if(this.checked) checkToZip( this.parentElement.getAttribute('data-viewType') + '_' + this.parentElement.getAttribute('data-viewExt') );
  else uncheckToZip( this.parentElement.getAttribute('data-viewType') + '_' + this.parentElement.getAttribute('data-viewExt') );
}
  var iconDiv = document.createElement('div')
  iconDiv.className = 'sitemenu__view_switch sitemenu__svg_block_btn'; // necessary classes ( as original container )
  // TODO: append viewLink SVG icon as child of the iconDiv
  iconDiv.appendChild( viewLink[1]);
  var dlLink = document.createElement('a');
  //dlLink.textContent = 'thisSpecificView'; // TODO: change to actual type from viewLink
  dlLink.textContent = viewLink[0];
  // add items to <li>
  li.appendChild(checkBox);
  li.appendChild(iconDiv);
  li.appendChild(dlLink);
  popupUl.appendChild(li);
})

// build the popup div elements
// title
var popupTitle = document.createElement('h2');
popupTitle.textContent = circuitTitle;
// dl zip link
var dlZipLink = document.createElement('a');
dlZipLink.textContent = 'DL ZIP OF EM ALL';

// build up popup div
var popupDiv = document.createElement('div');
popupDiv.id = 'dlPopup';
// TODO: add 'close' button that'd get rid of it [ & reset stuff if necessary ? .. ]
popupDiv.appendChild(popupTitle);
popupDiv.appendChild(popupUl);
popupDiv.appendChild(dlZipLink);

// quick styling
popupDiv.style.zIndex = 1000;
popupDiv.style.position = 'absolute';
popupDiv.style.backgroundColor = 'white';
//popupDiv.style.top = '10px'; // or center ?
//popupDiv.style.left = '10px'; // or center ?
// more integrated 
// Nb: for even more style & puff ,just add a wrapper to it that'd transition it's height from 0 to 100% or 0 to auto ;p
popupDiv.style.right = '0px';
popupDiv.style.top = '49px';
//popupDiv.style.width = '200px';
popupDiv.style.width = '193px';
popupDiv.style.paddingTop = '5.5px';
popupDiv.style.paddingLeft = '5.5px';

// append to page
document.body.appendChild(popupDiv);

// helper fcn(s) for boxes check/uncheck
window.toZip = []; // 'll hold th enames/types of the views to be added to the generated zip file

// add the view type to the ones to be packed inside the .zip file
function checkToZip(viewType){
  window.toZip.push(viewType);
  console.log('viewTypes to be zipped: ' + window.toZip);
  // TODO: update 'data-checked' on parent for the SVG-icons-as-checkboxes-blue-and-black-colored stuff
}
// remove the view type to the ones to be packed inside the .zip file
function uncheckToZip(viewType){
  for(var i=0; i < window.toZip.length; i++){
    if( window.toZip[i] === viewType ) {
      window.toZip.splice(i, 1);
      break;
    }
  }
  console.log('viewTypes to be zipped: ' + window.toZip);
  // TODO: update 'data-checked' on parent for the SVG-icons-as-checkboxes-blue-and-black-colored stuff
}

//var chk = document.querySelector('input[type="checkbox"][value="Ass"]')
//chk.onchange = function(){ console.log( this.checked ) }

// general purpose helper
function getViewFromType(viewType){
  for(var i=0; i < viewsLinks.length; i++){
    if( viewsLinks[i][0] + '_' + viewsLinks[i][3] === viewType ) { // ex: schematics_svg, bom_html, bom_csv, ..
      return viewsLinks[i]; // R: viewLink = [0]-> name/type | [1]-> SVG icon  | [2]-> content  | [3]-> .ext
      break;
    }
  }
}

// helper fcn(s) for saving file/blob ( .whatever )
function saveViewAs(viewType){
  // R: viewLink = [0]-> name/type | [1]-> SVG icon  | [2]-> content  | [3]-> .ext 
  // get viewsLink whose name === the one passed as param
  var view = getViewFromType(viewType);
  // blob its content & saveAs( type + ext )
  if ( view[3] === 'csv' ) {
    var blob = new Blob([ view[2] ], {type: 'text/plain;charset=utf-8'}); // blob that
    saveAs(blob, view[0] + '.' + view[3]);
  }
  else if ( view[3] === 'html' ){
    var blob = new Blob([ view[2] ], {type: 'text/html;charset=utf-8'}); // blob that
    saveAs(blob, view[0] + '.' + view[3]);
  }
  else if ( view[3] === 'svg' ){
    var doctype = '<?xml version="1.0" standalone="no"?>' + '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
    var source = (new XMLSerializer()).serializeToString( view[2] ); // serialize SVG XML to str
    var blob = new Blob([ doctype + source], { type: 'image/svg+xml;charset=utf-8' }); // blob that
    saveAs(blob, view[0] + '.' + view[3]);
  }
}

// helper fcn(s) for saving .zip
dlZipLink.onclick = function(){
  console.log('get the items names from toZip array & zim \'em all ! ')
  // TODO: 
  var zip = new JSZip(); // create a .zip file
  // for all items present in 'window.toZip' array, create a file, add blob from content to it,
  for(var i=0; i < window.toZip.length; i++){
    var view = getViewFromType(window.toZip[i]);
    // blob its content & create a zip.file(..)
    if ( view[3] === 'csv' ) {
      zip.file(view[0] + '.' + view[3], view[2] + '\n'); // file that
    }
    else if ( view[3] === 'html' ){
      zip.file(view[0] + '.' + view[3], view[2]); // file that
    }
    else if ( view[3] === 'svg' ){
      var doctype = '<?xml version="1.0" standalone="no"?>' + '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
      var source = (new XMLSerializer()).serializeToString( view[2] ); // serialize SVG XML to str
      zip.file(view[0] + '.' + view[3], doctype + source); // file that
    }
  }
  // and finally, saveAs all that stuff as a .zip
  var zipContent = zip.generate({type: 'blob'});
  saveAs(zipContent, circuitTitle.replace(/ /g, '_') + '.zip'); // ex: circuit_title.zip
}
