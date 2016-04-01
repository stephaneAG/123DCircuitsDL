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
    '<h3>' + circuitTitle + '</h3>' + htmlTable, // the content for the view
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

// build up the popup <li>'s
viewsLinks.forEach(function(viewLink){
  // R: viewLink = [0]-> name/type | [1]-> SVG icon  | [2]-> content  | [1]-> .ext 
  // create <li>
  var li = document.createElement('li')
  li.className = 'circuit-view';
  //li.setAttribute('data-viewType', 'theViewType'); // TODO: change to actual type from viewLink
  li.setAttribute('data-viewType', viewLink[0]);
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
  if(this.checked) checkToZip( this.parentElement.getAttribute('data-viewType') );
  else uncheckToZip( this.parentElement.getAttribute('data-viewType') );
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
})

// build the popup div elements
// title
var popupTitle = document.createElement('h2');
popupTitle.textContent = circuitTitle;
// ul
var popupUl = document.createElement('ul');
popupUl.appendChild(li);
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
}

//var chk = document.querySelector('input[type="checkbox"][value="Ass"]')
//chk.onchange = function(){ console.log( this.checked ) }

// helper fcn(s) for saving file/blob ( .whatever )
function saveViewAs(viewType){
  // R: viewLink = [0]-> name/type | [1]-> SVG icon  | [2]-> content  | [1]-> .ext 
  // get viewsLink whose name === the one passed as param
  // blob its content & saveAs( type + ext )
}

// helper fcn(s) for saving .zip
dlZipLink.onclick = function(){
  console.log('get the items names from toZip array & zim \'em all ! ')
  // TODO: 
  // for all items present in 'window.toZip' array, create azip.file, add blob of from content to it,
  // finally, saveAs the .zip
}
