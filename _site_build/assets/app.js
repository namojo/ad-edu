/* ===== Harness Ad Academy — site interactions ===== */
(function(){
  // ---- Theme ----
  var root=document.documentElement;
  var saved=localStorage.getItem('haa-theme');
  if(saved) root.setAttribute('data-theme',saved);
  window.toggleTheme=function(){
    var cur=root.getAttribute('data-theme')==='dark'?'light':'dark';
    root.setAttribute('data-theme',cur); localStorage.setItem('haa-theme',cur);
    var b=document.getElementById('themeBtn'); if(b) b.textContent=cur==='dark'?'☀':'☾';
  };
  var tb=document.getElementById('themeBtn');
  if(tb) tb.textContent=(root.getAttribute('data-theme')==='dark')?'☀':'☾';

  // ---- Copy buttons ----
  document.querySelectorAll('.codeblock').forEach(function(cb){
    var btn=cb.querySelector('.copy'); var pre=cb.querySelector('pre');
    if(!btn||!pre) return;
    btn.addEventListener('click',function(){
      var txt=pre.innerText;
      navigator.clipboard.writeText(txt).then(function(){
        var o=btn.textContent; btn.textContent='복사됨 ✓'; btn.classList.add('done');
        setTimeout(function(){btn.textContent=o;btn.classList.remove('done');},1600);
      });
    });
  });

  // ---- Task list persistence (per page) ----
  var pageKey='haa-tasks-'+(document.body.getAttribute('data-course')||location.pathname);
  var store={};
  try{store=JSON.parse(localStorage.getItem(pageKey)||'{}');}catch(e){}
  var boxes=document.querySelectorAll('.article li.task-list-item input[type=checkbox]');
  boxes.forEach(function(box,i){
    box.disabled=false;
    if(store[i]){box.checked=true; box.closest('li').classList.add('done');}
    box.addEventListener('change',function(){
      box.closest('li').classList.toggle('done',box.checked);
      store[i]=box.checked; localStorage.setItem(pageKey,JSON.stringify(store));
      updateProgress();
    });
  });

  // ---- Progress bar (scroll + checklist) ----
  var bar=document.getElementById('progbar');
  function updateProgress(){
    if(!bar) return;
    var h=document.documentElement;
    var sc=(h.scrollTop)/(h.scrollHeight-h.clientHeight||1);
    bar.style.width=Math.max(0,Math.min(1,sc))*100+'%';
  }
  window.addEventListener('scroll',updateProgress,{passive:true});
  updateProgress();

  // ---- TOC scroll-spy ----
  var tocLinks=Array.prototype.slice.call(document.querySelectorAll('.toc a'));
  if(tocLinks.length){
    var map={};
    tocLinks.forEach(function(a){var id=a.getAttribute('href').slice(1); map[id]=a;});
    var heads=document.querySelectorAll('.article h2[id],.article h3[id]');
    var obs=new IntersectionObserver(function(ents){
      ents.forEach(function(e){
        if(e.isIntersecting){
          tocLinks.forEach(function(l){l.classList.remove('active');});
          var a=map[e.target.id]; if(a) a.classList.add('active');
        }
      });
    },{rootMargin:'-84px 0px -70% 0px',threshold:0});
    heads.forEach(function(h){obs.observe(h);});
  }

  // ---- Mobile sidebar ----
  var side=document.querySelector('.side'), scrim=document.querySelector('.scrim');
  window.toggleMenu=function(){
    if(!side) return; side.classList.toggle('open');
    if(scrim) scrim.classList.toggle('on',side.classList.contains('open'));
  };
  if(scrim) scrim.addEventListener('click',window.toggleMenu);
  document.querySelectorAll('.toc a,.side .courselist a').forEach(function(a){
    a.addEventListener('click',function(){ if(side&&side.classList.contains('open')) window.toggleMenu(); });
  });
})();
