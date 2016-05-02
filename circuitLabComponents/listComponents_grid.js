// R: the following code works for the "All Components Grid" only ( the one for "All Components List" is coming, with description as well ;p )

var allComponents = document.querySelectorAll('a.js-add-component')

/*
for (var i =0; i < allComponents.length; i++ ){ // R: the 'length-1' is because the last component link seems to be a 'load more' typoe of stuff ( so maybe we'll need to scroll down <x> times beforehand )
  allComponentsArr.push( allComponents[i].dataset.did )
}
*/


//aComponentLink = document.querySelector( allComponentsArr[0] )
//aComponentLink = document.querySelector( 'a[data-did="'+allComponentsArr[0]+'"]' )

allComponentsArr = []; // empty array for easier debug ;p
// fill the above array with the name/imageUrl/did of each component available in the circuits lab
for (var i =0; i < allComponents.length; i++ ){
  // R: doc.qs stuff needs to be assigned to a var to get stuff out ..
  var aComponent = allComponents[i];
  
  var componentName = /*aComponent.querySelector('div.search_overlay__result__column__item__name').innerText ||*/ 'component name not found';
  var componentNameDiv = aComponent.querySelector('div.search_overlay__result__column__item__name');
  if ( componentNameDiv !== null ) { componentName = componentNameDiv.innerText; console.log( componentName ); }
  
  var componentImageUrl = /*aComponent.querySelector('img').src ||*/ 'component image url not found';
  var componentImageImg = aComponent.querySelector('img');
  if ( componentImageImg !== null ) { componentImageUrl = componentImageImg.src; console.log( componentImageUrl ); }

  //console.log( aComponent.querySelector('div.search_overlay__result__column__item__name').innerText ); // shows up for most, but error at last :/
  
  var componentImageUrl = /*aComponent.querySelector('img').src ||*/ 'component image url not found';
  // R: component name / image Url / did
  /*
  allComponentsArr.push( allComponents[i].querySelector('div.search_overlay__result__column__item__name').innerText || 'component name not found',
                         allComponents[i].querySelector('img').src || 'component image url not found', 
                         allComponents[i].dataset.did )
  */
  allComponentsArr.push( [componentName,
                         componentImageUrl, 
                         allComponents[i].dataset.did] )
}

// quick log
allComponentsArr
