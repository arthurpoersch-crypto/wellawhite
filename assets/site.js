(function(){
  'use strict';
  var btn=document.getElementById('hamburger');
  var overlay=document.getElementById('menuOverlay');
  var backdrop=document.getElementById('menuBackdrop');
  var closeBtn=document.getElementById('menuClose');
  function openMenu(){
    if(!overlay||!backdrop||!btn)return;
    overlay.classList.add('open');backdrop.classList.add('open');
    btn.setAttribute('aria-expanded','true');
  }
  function closeMenu(){
    if(!overlay||!backdrop||!btn)return;
    overlay.classList.remove('open');backdrop.classList.remove('open');
    btn.setAttribute('aria-expanded','false');
  }
  if(btn)btn.addEventListener('click',function(){overlay&&overlay.classList.contains('open')?closeMenu():openMenu()});
  if(closeBtn)closeBtn.addEventListener('click',closeMenu);
  if(backdrop)backdrop.addEventListener('click',closeMenu);
  if(overlay)overlay.addEventListener('click',function(e){if(e.target.tagName==='A')closeMenu()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu()});

  var bar=document.getElementById('offerBarBottom');
  var hero=document.getElementById('hero') || document.querySelector('.hero');
  function updateBottomToolbar(){
    if(!bar)return;
    var threshold=hero ? (hero.offsetTop + hero.offsetHeight - 80) : 260;
    var y=window.pageYOffset || document.documentElement.scrollTop || 0;
    bar.classList.toggle('is-shown', y > threshold);
  }
  if(bar){
    window.addEventListener('scroll',updateBottomToolbar,{passive:true});
    window.addEventListener('resize',updateBottomToolbar);
    updateBottomToolbar();
  }
})();


/* WellaWhite cookie toolbar behavior */
(function(){
  'use strict';

  // Keep product videos playing silently and repeating continuously.
  document.querySelectorAll('video').forEach(function(video){
    video.muted=true;
    video.defaultMuted=true;
    video.loop=true;
    video.playsInline=true;
    var attempt=video.play();
    if(attempt && typeof attempt.catch==='function') attempt.catch(function(){});
    video.addEventListener('ended',function(){
      video.currentTime=0;
      var replay=video.play();
      if(replay && typeof replay.catch==='function') replay.catch(function(){});
    });
  });

  // Compact informational cookie toolbar used by the validated template.
  var banner=document.getElementById('privacyBanner');
  if(banner)banner.classList.add('is-visible');

  var bottomBar=document.getElementById('offerBarBottom');
  function positionCookieToolbar(){
    if(!banner || !bottomBar)return;
    var visible=bottomBar.classList.contains('is-shown');
    var height=visible ? Math.ceil(bottomBar.getBoundingClientRect().height) : 0;
    document.documentElement.style.setProperty('--Product-bottom-bar-height',height+'px');
    document.body.classList.toggle('bottom-offer-visible',visible);
  }
  window.addEventListener('scroll',positionCookieToolbar,{passive:true});
  window.addEventListener('resize',positionCookieToolbar,{passive:true});
  if(bottomBar && 'MutationObserver' in window){
    new MutationObserver(positionCookieToolbar).observe(bottomBar,{attributes:true,attributeFilter:['class']});
  }
  positionCookieToolbar();
})();


/* Product passive-video enforcement */
document.querySelectorAll('video').forEach(function(video){
  video.controls=false;
  video.muted=true;
  video.defaultMuted=true;
  video.loop=true;
  video.autoplay=true;
  video.playsInline=true;
  video.setAttribute('tabindex','-1');
  video.setAttribute('aria-hidden','true');
  var playPromise=video.play();
  if(playPromise && typeof playPromise.catch==='function') playPromise.catch(function(){});
});


/* Product cookie toolbar dismiss-only behavior */
document.querySelectorAll('[data-cookie-dismiss]').forEach(function(control){
  control.addEventListener('click', function(){
    var banner = document.getElementById('privacyBanner');
    if (banner) {
      banner.classList.remove('is-visible');
      banner.style.display = 'none';
      document.body.classList.remove('bottom-offer-visible');
    }
  });
});

/* WellaWhite FAQ: all closed initially, exactly one open at a time. */
(function(){
  'use strict';
  document.querySelectorAll('[data-ft-faq]').forEach(function(group){
    var items=Array.prototype.slice.call(group.querySelectorAll('.ft-faq-item'));
    items.forEach(function(item){ item.open=false; });
    items.forEach(function(item){
      var summary=item.querySelector('.ft-faq-question');
      if(!summary) return;
      summary.addEventListener('click',function(event){
        event.preventDefault();
        var shouldOpen=!item.open;
        items.forEach(function(other){ other.open=false; });
        item.open=shouldOpen;
      });
    });
  });
})();

/* Product slug toolbar redirect */
(function(){
  'use strict';
  document.querySelectorAll('.offer-bar-bottom[data-toolbar-href]').forEach(function(bar){
    bar.addEventListener('click', function(e){
      var target = e.target;
      if(target && (target.closest('a') || target.closest('button'))) return;
      var href = bar.getAttribute('data-toolbar-href');
      if(href) window.location.href = href;
    });
  });
})();


/* WellaWhite FAQ: all closed initially; one open at a time. */
(function(){
  'use strict';
  document.querySelectorAll('[data-ft-faq]').forEach(function(group){
    var items=Array.prototype.slice.call(group.querySelectorAll('.ft-faq-item'));
    items.forEach(function(item){ item.open=false; });
    items.forEach(function(item){
      var summary=item.querySelector('.ft-faq-question');
      if(!summary) return;
      summary.addEventListener('click',function(event){
        event.preventDefault();
        event.stopImmediatePropagation();
        var shouldOpen=!item.open;
        items.forEach(function(other){ other.open=false; });
        item.open=shouldOpen;
      },true);
    });
  });
})();

/* WellaWhite bottom-toolbar redirect. */
(function(){
  'use strict';
  document.querySelectorAll('.offer-bar-bottom[data-toolbar-href]').forEach(function(bar){
    bar.addEventListener('click',function(event){
      var target=event.target;
      if(target && (target.closest('a') || target.closest('button'))) return;
      var href=bar.getAttribute('data-toolbar-href');
      if(href) window.location.href=href;
    });
  });
})();


/* Robust muted autoplay for product videos */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('main video[autoplay]').forEach(function (video) {
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    var attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(function () {});
    }
  });
});


/* WellaWhite: robust muted inline autoplay */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('main video[autoplay]').forEach(function (video) {
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    var attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(function () {});
    }
  });
});
