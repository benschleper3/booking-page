let currentDate=new Date(2026,2,1);
let selectedDay=null;
const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
const times=['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM'];

function renderCal(){
  const grid=document.getElementById('cal-grid');
  document.getElementById('cal-month').textContent=months[currentDate.getMonth()]+' '+currentDate.getFullYear();
  grid.innerHTML='';
  const firstDay=new Date(currentDate.getFullYear(),currentDate.getMonth(),1).getDay();
  const daysInMonth=new Date(currentDate.getFullYear(),currentDate.getMonth()+1,0).getDate();
  const today=new Date();today.setHours(0,0,0,0);
  for(let i=0;i<firstDay;i++){const el=document.createElement('div');el.className='cal-day empty';grid.appendChild(el);}
  for(let d=1;d<=daysInMonth;d++){
    const el=document.createElement('div');
    const thisDate=new Date(currentDate.getFullYear(),currentDate.getMonth(),d);
    const dow=thisDate.getDay();
    if(thisDate<today||dow===0||dow===6){el.className='cal-day past';}
    else{el.className='cal-day available';el.onclick=()=>selectDay(d,el);}
    if(d===selectedDay)el.classList.add('selected');
    el.textContent=d;grid.appendChild(el);
  }
}

function selectDay(d,el){
  document.querySelectorAll('.cal-day').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');selectedDay=d;
  document.getElementById('selected-date-label').textContent='Available times for '+months[currentDate.getMonth()]+' '+d;
  renderSlots();
  document.getElementById('time-step').classList.add('visible');
  document.getElementById('form-step').classList.remove('visible');
}

function renderSlots(){
  const grid=document.getElementById('slots-grid');grid.innerHTML='';
  times.filter(()=>Math.random()>0.3).forEach(t=>{
    const el=document.createElement('div');el.className='slot';el.textContent=t;
    el.onclick=()=>selectSlot(el);grid.appendChild(el);
  });
}

function selectSlot(el){
  document.querySelectorAll('.slot').forEach(s=>s.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('form-step').classList.add('visible');
}

function prevMonth(){currentDate.setMonth(currentDate.getMonth()-1);selectedDay=null;document.getElementById('time-step').classList.remove('visible');document.getElementById('form-step').classList.remove('visible');renderCal();}
function nextMonth(){currentDate.setMonth(currentDate.getMonth()+1);selectedDay=null;document.getElementById('time-step').classList.remove('visible');document.getElementById('form-step').classList.remove('visible');renderCal();}

function confirmBooking(){
  ['cal-step','time-step','form-step'].forEach(id=>{const el=document.getElementById(id);if(el)el.style.display='none';});
  document.getElementById('confirmed-step').style.display='block';
}

renderCal();

document.querySelectorAll('.faq-q').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const item=btn.closest('.faq-item');
    const isOpen=item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
    if(!isOpen)item.classList.add('open');
  });
});

const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.
