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

// build up popup div

// helper fcn(s) for boxes check/uncheck
var chk = document.querySelector('input[type="checkbox"][value="Ass"]')
chk.onchange = function(){ console.log( this.checked ) }
// helper fcn(s) for saving file/blob ( .whatever )

// helper fcn(s) for saving .zip
