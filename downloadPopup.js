// get resources from the website to be used as icons :)
//var typeIcons = [ 'schematic', 'pcb', 'bom'];

// get the circuit/project name ( 'll be used to name the files inside the zip  / DL-ed separately )
// Nb: the || is to be able to get stuff out when either in edit mode ( logged in ) or view mode
// R: logic is circuitTitle.substr(0, circuitTitle.indexOf('|')-3) for the altTitle
var circuitTitle = document.querySelector('.js-circuit-menu-title').textContent || document.querySelector('.vertical-spacing--title').textContent.substr(0, document.querySelector('.vertical-spacing--title').textContent.indexOf('|')-3);
// get SVG corresponding to typeIcons
var menus = document.querySelectorAll('div.sitemenu__right__item--editor')
var links = menus[1].querySelectorAll('a');
var svgIcons = {};
var svgIconsArr = [];
var viewsLinks = []; // holds 'em all
[].forEach.call(links, function(link) {
  svgIcon[ link.href.substr(1) ] = link.querySelector('svg');
  svgIconsArr.push( [link.href.substr(1), link.querySelector('svg')] )
  viewsLinks.push([
    link.href.substr(1), // the name/type of the view
    link.querySelector('svg'), // the icon for the type of the view
    document.querySelector(link.href + 'Tab').querySelector('svg'), // the SVG for the view
    'svg' // the extension for the future file blob
  ]);
});

// seeing the above ,why not build an array with also the views SVGs ? ( as SVGs or as blobs ? -> as SVG in a 1st time 
)
// now we could create <li>'s with checkbox, icon, link using items in 'viewsLinks' array
// after doing so, we just have to add 2 more <li>'s, for the BOM ( .csv & .html versions ) ..
// HAHA: let's add those as well to the viewLinks array ;p
var bomLink = document.querySelector('a[href="#bom"]');

var htmlTable = document.querySelector('table.bom__table');
viewsLinks.push(
  [
    bomLink.substr(1), // the name/type of the view
    bomLink.querySelector('svg'), // the icon for the type of the view
    '<h3>' + circuitTitle + '</h3>' + htmlTable, // the content for the view
    'html' // the extension for the future file blob
  ],
  [
    bomLink.substr(1), // the name/type of the view
    bomLink.querySelector('svg'), // the icon for the type of the view
    circuitTitle + ' - Bill Of Materials\n' + htmlTable.innerText.split(''\t').join('','), // the content for the view
    'csv' // the extension for the future file blob
  ],
);

// .. and a last one for the "download zip" button ;D

// clicking the links 'll 'saveAs' a blob from the corresponding stuff, except for:
// - the .csv bom where it 'll click the original button to download the .csv
// Nb: I'd have to digg how they get the CSV out of the html table to be able to add it as a blob/ to the zip ?
//     .. or just digg which fcns & stuff the team use ? .. or tmp hack the 'saveAs' API to instead get a blob ? ..
//     I just know about https://123d.circuits.io/circuits/export_bom.csv, that maybe they use Raphael, and
// <form action="/circuits/export_bom.csv" method="post" target="_blank" class=\'js-bom-download-csv-form\'>
//     <input name="authenticity_token" type="hidden" value="<%= model.meta(\'form_authenticity_token\') %>" />
//     <input type=\'hidden\' name=\'data\' class=\'js-bom-download-csv-form-data\'>
// </form>
// so ?
var getCsvForm = document.querySelector('form[action="/circuits/export_bom.csv"]')
// then ?
// b(".js-bom-download-csv").click(function(){d.RW()});
// a.av.prototype.RW=function(){this.FA||(b(".js-bom-download-csv-form-data").val(JSON.stringify(this.Cz)),b(".js-bom-download-csv-form").submit())};
// should I read .. ?
var formData = document.querySelector('.js-bom-download-csv-form-data');
var htmlTable = document.querySelector('table.bom__table');
formData.value = JSON.stringify( htmlTable.textContent.split('\t').join(',') );
// Nb2: WHATEVER ! -> Isn't a .csv something like the following ? ( no need for a POST for that .. )
'{project_name}- Bill Of Materials\n' + htmlTable.innerText.split("\t").join(",")
// - the .zip download where we blob everything we can & zip that before proceedingto 'saveAs' user prompt

// get the name of the circuit
// get all the embed SVGs as well as the bom html table & a ref to the bom .csv
// from all the SVGs found, crawl parentElements ( 3 times ) to get the name of what the SVG represents ( '<name>Tab' )
// pack those in an array as [[name -> SVG],]
// prepare popup with few <li> elements:
// -- [ ] -> check box
// -- icon corresponding to name of <li> item
// R: a[href="schematic"] > div.sitemenu__view_switch sitemenu__svg_block_btn > svg icon
// -- link to saveAs() for specific <li> item
// -- link to saveAs() all the checked stuff as a .zip file








// ---------------------------- quick unik test ------------------------------------
var li = document.createElement('li')
li.className = 'circuit-view';
var checkBox = document.createElement('input')
checkBox.type = 'checkbox';
checkBox.id = 'theType'

var iconDiv = document.createElement('div')
iconDiv.className = 'icon <original-necessary-stuff>'
"icon <original-necessary-stuff>"
var dlLink = document.createElement('a')
li.setAttribute('data-viewType', 'theViewType');
li.appendChild(checkBox);
//iconDiv.appendChild(<theSvgIcon>)
li.appendChild(iconDiv);
li.appendChild(dlLink);

checkBox.onchange = function(){
  if(this.checked) console.log('add data-viewType to list of stuff to be zipped !');
  else console.log('add remove data-viewType to list of stuff to be zipped !');
}
(){
  if(this.checked) console.log('add data-viewType to list of stuff to be zipped !');
  else console.log('add remove data-viewType to list of stuff to be zipped !');
}

dlLink.onclick = function(){
  console.log(this.parentElement.attribute('data-viewType' + ' to be savedAs !'))
}
(){
  console.log(this.parentElement.attribute('data-viewType' + ' to be savedAs !'))
}
// the popup
var popupTitle = document.createElement('h1')
popupTitle.textContent = 'the circuit name'
"the circuit name"
var popupUl = document.createElement('ul')
popupUl.appendChild(li);
var dlZipLink = document.createElement('a')
dlZipLink.onclick = function(){
  console.log('get the items names from toZip array & zim \'em all ! ')
}
(){
  console.log('get the items names from toZip array & zim \'em all ! ')
}
var popupDiv = document.createElement('div')
popupDiv.id = 'dlPopup';
popupDiv.appendChild(popupTitle)
popupDiv.appendChild(popupUl)
popupDiv.appendChild(dlZipLink);
document.body.appendChild(popupDiv)
popupDiv.style.zIndex = 1000;
popupDiv.style.position = 'absolute';
popupDiv.style.backgroundColor = 'white';
popupDiv.style.top = '10px';
popupDiv.style.left = '10px';
dlLink.textContent = 'thisSpecificView'
"thisSpecificView"
li.style.display = 'block';
checkBox.style.float = 'left';
checkBox.style.marginTop = '2.5px';
"2.5px"
checkBox.style.marginRight = '10px';
"10px"
