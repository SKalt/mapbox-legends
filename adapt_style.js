/**
* @param {mapboxgl.Map} map a mapboxgl map, used a an argument to ensure it is in scope
* @param {String} paintProperty the paint property to set, such as circle-radius or paint
* @param {String} max the most intense paint property level in your interpolation
* @param {String} min the least intense paint property level in your interpolation
*/
function adaptStyleSimpleExponential(map, paintProperty, max, min){
  // see http://colorbrewer2.org/ for color ramp ideas
  var features = map.queryRenderedFeatures({layers:['your-layer']});
  var properties = features.map(f => f.properties);
  var propertyLevels = properties.map(p => p.yourProperty);
  var [maxLevel, minLevel] = [Math.max(...propertyLevels), Math.min(...propertyLevels)];
  map.setPaintProperty('your-layer', paintProperty, {
    property: 'your-property',
    stops: [
      [minLevel, min],
      [maxLevel, max]
      ],
    type: 'exponential'
  })
  
  