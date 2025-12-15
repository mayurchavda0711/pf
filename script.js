// TYPING EFFECT
const typingText=["Websites","Web Apps","Interactive UI"];
let i=0,j=0,currentText="",isDeleting=false;
const typingSpan=document.querySelector('.typing');
function type(){
  if(!typingSpan) return;
  if(!isDeleting && j<=typingText[i].length){ currentText=typingText[i].substring(0,j++); typingSpan.textContent=currentText; }
  else if(isDeleting && j>=0){ currentText=typingText[i].substring(0,j--); typingSpan.textContent=currentText; }
  if(j===typingText[i].length) isDeleting=true;
  if(isDeleting && j===0){ isDeleting=false; i=(i+1)%typingText.length; }
  setTimeout(type,isDeleting?50:150);
}
type();

// GSAP SCROLL ANIMATION
gsap.utils.toArray('.hidden').forEach(section => {
  gsap.to(section, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });
});

// CUSTOM CURSOR
// const cursor=document.querySelector('.cursor');
// document.addEventListener('mousemove',e=>{
//   cursor.style.left=e.clientX+'px';
//   cursor.style.top=e.clientY+'px';
// });
document.addEventListener('mousemove', e => {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.left = e.clientX + 'px';
  star.style.top = e.clientY + 'px';
  document.body.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 500); // match animation duration
});



// PARTICLE BACKGROUND
const canvas=document.getElementById('bgCanvas');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let particles=[];
for(let i=0;i<100;i++){
  particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*2+1,speedX:(Math.random()-0.5)*1,speedY:(Math.random()-0.5)*1});
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.speedX; p.y+=p.speedY;
    if(p.x<0||p.x>canvas.width)p.speedX*=-1;
    if(p.y<0||p.y>canvas.height)p.speedY*=-1;
    ctx.fillStyle='rgba(0,255,240,0.7)';
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});
