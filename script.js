(function(){
var root=document.documentElement;
document.querySelectorAll('[data-more]').forEach(function(b){b.onclick=function(){var m=document.getElementById(b.dataset.more),o=m.classList.toggle('open');b.setAttribute('aria-expanded',o);b.textContent=o?'Hide details':'Show details'}});
var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.style.width=x.target.dataset.w+'%';io.unobserve(x.target)}})},{threshold:.4});
document.querySelectorAll('.fill').forEach(function(f){io.observe(f)});

var cv=document.getElementById('plot'),c=cv.getContext('2d'),lab=document.getElementById('lab'),W,H,pts=[],q={x:-9,y:-9,on:false},rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
function css(n){return getComputedStyle(root).getPropertyValue(n).trim()}
function init(){var r=cv.getBoundingClientRect(),d=devicePixelRatio||1;W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;c.setTransform(d,0,0,d,0,0);
pts=[];for(var i=0;i<90;i++){var k=i%2,cx=k?W*.78:W*.62,cy=k?H*.3:H*.7,sp=Math.min(W,H)*.2;pts.push({x:cx+(Math.random()-.5)*sp*2,y:cy+(Math.random()-.5)*sp*2,k:k,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25})}}
function draw(){c.clearRect(0,0,W,H);var A=css('--a'),B=css('--b'),L=css('--mute');
pts.forEach(function(p){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1});
var nn=[];if(q.on){nn=pts.map(function(p){return{p:p,d:Math.hypot(p.x-q.x,p.y-q.y)}}).sort(function(a,b){return a.d-b.d}).slice(0,5)}
c.globalAlpha=.4;c.strokeStyle=L;nn.forEach(function(n){c.beginPath();c.moveTo(q.x,q.y);c.lineTo(n.p.x,n.p.y);c.stroke()});
c.globalAlpha=.85;pts.forEach(function(p){c.fillStyle=p.k?B:A;c.beginPath();c.arc(p.x,p.y,5,0,7);c.fill()});
if(q.on){var v=nn.reduce(function(s,n){return s+n.p.k},0)>2;c.globalAlpha=1;c.fillStyle=v?B:A;c.lineWidth=3;c.strokeStyle=css('--ink');c.beginPath();c.arc(q.x,q.y,10,0,7);c.fill();c.stroke();lab.textContent=v?'Coral':'Blue'}}
function loop(){draw();if(!rm)requestAnimationFrame(loop)}
var hero=cv.parentElement;
hero.addEventListener('pointermove',function(e){var r=cv.getBoundingClientRect();q.x=e.clientX-r.left;q.y=e.clientY-r.top;q.on=true;if(rm)draw()});
hero.addEventListener('pointerleave',function(){q.on=false;lab.textContent='–';if(rm)draw()});
addEventListener('resize',function(){init();if(rm)draw()});
init();loop();
})();
