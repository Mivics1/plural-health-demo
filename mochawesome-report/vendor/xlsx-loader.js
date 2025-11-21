(function(){
  // Try to load a local vendor copy of SheetJS first; if it fails, fall back to CDN.
  function loadScript(src, onload, onerror){
    var s = document.createElement('script');
    s.src = src; s.async = false;
    s.onload = onload || function(){};
    s.onerror = onerror || function(){};
    document.head.appendChild(s);
  }

  var local = './vendor/xlsx.min.js';
  var cdn = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.min.js';

  // Attempt to load local file; on error, load CDN.
  loadScript(local, function(){
    console.log('Loaded local SheetJS (vendor/xlsx.min.js)');
  }, function(){
    console.warn('Local SheetJS not found, loading from CDN');
    loadScript(cdn, function(){ console.log('Loaded SheetJS from CDN'); });
  });
})();
