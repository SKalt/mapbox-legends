var features = map.queryRenderedFeatures({layers:['your-layer']});
var properties = features.map(f => f.properties);
var propertyLevels = properties.map(p => p.yourProperty);
var [maxLevel, minLevel] = [Math.max(...propertyLevels), Math.min(...propertyLevels)];
// produce some levels to display here.  The regular-interval approach is on of many.
// for common binning methods, see https://github.com/d3/d3-array/blob/master/README.md#thresholdSturges
var interval = maxLevel - minLevel;
if (interval === 0) throw new Error('no interval selected');
displayLevels = [0,1,2,3,4,5].map( i => interval * ( i / interval) + minLevel )
displayColors = displayLevels.map(
  level => {
    map.getLayer('your-layer')._paintDeclarations['']['fill-color'].function(
      map.getZoom(),
      {'your-property': level}
    )
  }
)