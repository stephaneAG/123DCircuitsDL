// get resources from the website to be used as icons :)
var typeIcons = [ 'schematic', 'pcb', 'bom'];
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
    document.querySelector(link.href + 'Tab').querySelector('svg')]) // the SVG for the view
});

// seeing the above ,why not build an array with also the views SVGs ? ( as SVGs or as blobs ? -> as SVG in a 1st time 
)
// now we could create <li>'s with checkbox, icon, link using items in 'viewsLinks' array
// after doing so, we just have to add 2 more <li>'s, for the BOM ( .csv & .html versions ) ..
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
htmlTable.innerText.split("\t").join(",")
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
