/* == R: code used while POCing the pcb.svg from 123dCircuits */
//var diodeLayers = document.querySelectorAll('[id*="id_153e5dc72f2-3e-d416ab48-242f-4fd5-8422-5326edad8c56_"]')
//var drawingsLayers = document.querySelectorAll('[stroke="white"]')


// ================= SUMMARY OF THE STACKED GROUPS ================= //
/*
 1: grid
 2: outline
 3: bottomsilk
 4: soldermaskbottom
 5: bottommetal
 6: bottomfr4
 7: fr4
 8: topmetal -> we need those ( metallic pins to solder components to )
 9: soldermasktop
 10: silkscreen -> we want those in grey
 11: drill -> the drill holes
 12: <white stuff> -> we may want those in grey too
 13: ratsnest
 14: <?>
 15: <yellow stuff>
 16: <6 green stuff>
 17: <?>
 18: gizmo
 19: <?>
 20: <?>
*/

// ================= HOW TO REF THEM ================= //


// the grid:
var grid = document.querySelector('g[stroke="#34495e"][fill="#34495e"]')
// to remove it
grid.parentElement.removeChild( grid )

// the gizmo
var gizmo = document.querySelector('[stroke="#1da750"][fill="#1da750"]')
// to remove it
gizmo.parentElement.removeChild( gizmo )

// the yellows
var yellows = document.querySelectorAll('[stroke="yellow"][fill="yellow"][opacity="0.5"]')
// to remove the yellows from the page
for ( var i=0; i < yellows.length; i++){
  yellows[i].parentElement.removeChild(yellows[i]) ;
}
// or
/*
[].forEach.call( yellows, function(yellow){
  yellow.parentElement.removeChild(yellow) ;
});
*/

// the green's ( my current guess: used for detecting "collisions", such as components too close to each other )
var greens = document.querySelectorAll('[stroke="green"][fill="green"][opacity="0"]')
// to remove the greens from the page
// 1:
for ( var i=0; i < greens.length; i++){
  greens[i].parentElement.removeChild(greens[i]) ;
}
// 2:
/*
[].forEach.call( greens, function(green){
  green.parentElement.removeChild(green) ;
});

*/

// the whites
var whites = document.querySelectorAll('[fill="white"][stroke="white"]')
// the thinWhites
var thinWhites = document.querySelectorAll('[fill="white"][stroke="white"][stroke-width="1"]')


// the one with a stroke param but not associated value ?
var valLessStroked = document.querySelectorAll('[stroke=""]');
// R: each of these have a hex ID that starts with 4 chars from the circuit ID & that ends with a number ( that's, ( best guess ) the layering z-index )
// stroke those in red ( nb: grey 'd be better .. )
[].forEach.call( valLessStroked, function(gettingStroked){
  gettingStroked.setAttribute('stroke', 'grey'); // to see those on a white background
  gettingStroked.setAttribute('stroke-width', '1'); // may prevent later troubles in Illustrator
});
// Progress: the above leads us the Text of the components ( L1, R3, .. ), & for some of them, a part of the white drawing

// "All right" .. .. the missing stuff ( the parts that didn't get colored in red ) are actually path, lines & stuff that have a 'stroke:white' & 'stroke-width:127' or :111 in their style attr
// these elements are lines, paths, & maybe other tag types as well
var thoseElems = document.querySelectorAll('line, path, circle, rect')
// loop over them all
[].forEach.call( thoseElems, function(thatElem){
  console.log( 'stroke color: ' + thatElem.style.stroke + '  stroke width: ' + thatElem.style.strokeWidth ) ;
});
// loop over them all & override stroke color to red ( grey 'd better )
/*
[].forEach.call( thoseElems, function(thatElem){
  console.log( 'stroke color: ' + thatElem.style.stroke + '  stroke width: ' + thatElem.style.strokeWidth ) ;
  // crude / naïve override of the color & the stroke width
  // stroke color
  if ( thatElem.style.stroke === 'white' ) thatElem.style.stroke = 'grey'; // white to red
  else if ( thatElem.style.stroke === '' ) thatElem.style.stroke = 'grey'; // unknown to red ( R: != 'none' )
  // stroke width
  //if ( thatElem.style.strokeWidth >= 100 ) thatElem.style.strokeWidth = thatElem.style.strokeWidth/100; // big to normal
  //if ( thatElem.style.strokeWidth === '' ) thatElem.style.strokeWidth = 1; // unknown to normal
});
*/
// loop over them all & override stroke color to red ( nb: grey 'd be better .. ) as well as stroke width 
[].forEach.call( thoseElems, function(thatElem){
  console.log( 'stroke color: ' + thatElem.style.stroke + '  stroke width: ' + thatElem.style.strokeWidth ) ;
  // crude / naïve override of the color & the stroke width
  // stroke color
  if ( thatElem.style.stroke === 'white' ) thatElem.style.stroke = 'grey'; // white to red
  else if ( thatElem.style.stroke === '' ) thatElem.style.stroke = 'grey'; // unknown to red ( R: != 'none' )
  // stroke width R: since I still have pbs with some of the silkscreen items's strokes, it may seem Illustrator doesn't care bout the attributes present in the style="" stuff ? 
  if ( thatElem.style.strokeWidth >= 100 ) thatElem.style.strokeWidth = thatElem.style.strokeWidth/100; // big to normal
  if ( thatElem.style.strokeWidth === '' ) thatElem.style.strokeWidth = 1; // unknown to normal
});

// wip seems needed
// loop over them all & override stroke color to red ( nb: grey 'd be better .. ) as well as stroke width 
/*
[].forEach.call( thoseElems, function(thatElem){
  console.log( 'stroke color: ' + thatElem.style.stroke + '  stroke width: ' + thatElem.style.strokeWidth ) ;
  // crude / naïve override of the color & the stroke width
  // stroke color
  if ( thatElem.style.stroke === 'white' ) thatElem.style.stroke = 'grey'; // white to red
  else if ( thatElem.style.stroke === '' ) thatElem.style.stroke = 'grey'; // unknown to red ( R: != 'none' )
  // stroke width R: since I still have pbs with some of the silkscreen items's strokes, it may seem Illustrator doesn't care bout the attributes present in the style="" stuff ? 
  if ( thatElem.style.strokeWidth >= 100 ) thatElem.style.strokeWidth = thatElem.style.strokeWidth/100; thatElem.setAttribute('stroke-width', thatElem.style.strokeWidth);  // big to normal + override
  if ( thatElem.style.strokeWidth === '' ) thatElem.style.strokeWidth = 1; thatElem.setAttribute('stroke-width', thatElem.style.strokeWidth); // unknown to normal + override
});
*/
