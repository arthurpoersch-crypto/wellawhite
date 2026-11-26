/* WellaWhite regional top-edge exit routing */
(function(){
  'use strict';

  if(!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;

  var body=document.body;
  if(!body) return;

  var href=body.getAttribute('data-exit-affiliate');
  if(!href || !/^https:\/\//i.test(href)) return;

  var armed=false;
  var redirected=false;

  document.addEventListener('mousemove',function(event){
    if(event.clientY > 100) armed=true;
  },{passive:true});

  document.addEventListener('mouseout',function(event){
    if(redirected || !armed) return;

    var leavingDocument =
      event.relatedTarget === null &&
      event.toElement === null;

    var throughTopEdge = event.clientY <= 0;

    if(leavingDocument && throughTopEdge){
      redirected=true;
      window.location.href=href;
    }
  });
})();
