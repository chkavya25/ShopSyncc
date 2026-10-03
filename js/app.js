const products=[
{id:1,name:'Wireless Earbuds',platform:'Amazon',category:'Electronics',audience:'All',price:1999,icon:'🎧',image:'images/wireless-earbuds.png',sizes:['Standard'],colors:['Black','White','Blue']},
{id:2,name:'HP Laptop Backpack',platform:'Flipkart',category:'Accessories',audience:'Kids',price:1299,icon:'🎒',image:'images/hp-laptop-backpack.jpg',sizes:['15-inch','17-inch'],colors:['Black','Blue']},
{id:3,name:'Girls Purple Outfit',platform:'AJIO',category:'Fashion',audience:'Girl',price:899,icon:'👗',image:'images/girls-purple-outfit.jpg',sizes:['2-3Y','4-5Y','6-7Y','8-9Y'],colors:['Purple','White','Pink']},
{id:4,name:'Chicken Biryani',platform:'Swiggy',category:'Food',audience:'All',price:250,icon:'🍛',image:'images/chicken-biryani.jpg',sizes:['Regular','Large'],colors:['Classic','Spicy']},
{id:5,name:'Veg Pizza',platform:'Zomato',category:'Food',audience:'All',price:299,icon:'🍕',image:'images/veg-pizza.jpg',sizes:['Regular','Medium','Large'],colors:['Classic','Cheese Burst','Spicy']},
{id:6,name:'Smart Watch',platform:'Amazon',category:'Electronics',audience:'All',price:2999,icon:'⌚',image:'images/smart-watch.jpg',sizes:['Small','Medium','Large'],colors:['Green','Black','Blue']},
{id:7,name:'Anime Graphic T-Shirt',platform:'AJIO',category:'Fashion',audience:'Boy',price:499,icon:'👕',image:'images/anime-black-tshirt.jpg',sizes:['S','M','L','XL'],colors:['Black','White','Blue']},
{id:8,name:'Blue School Backpack',platform:'Flipkart',category:'Accessories',audience:'Kids',price:1099,icon:'🎒',image:'images/blue-school-backpack.jpg',sizes:['Standard','Large'],colors:['Navy Blue','Black']},
{id:9,name:'Black Casual Dress',platform:'AJIO',category:'Fashion',audience:'Women',price:799,icon:'👗',image:'images/black-dress.jpg',sizes:['S','M','L','XL'],colors:['Black','Red','Blue']},
{id:10,name:'Classic Wrist Watch',platform:'Amazon',category:'Accessories',audience:'Women',price:1599,icon:'⌚',image:'images/classic-wrist-watch.jpg',sizes:['Standard'],colors:['Silver','Purple','Black']},
{id:11,name:'Denim Casual Shirt',platform:'AJIO',category:'Fashion',audience:'Boy',price:699,icon:'👔',image:'images/denim-shirt.jpg',sizes:['S','M','L','XL'],colors:['Blue','Light Blue']},
{id:12,name:'Red Ethnic Dress Set',platform:'AJIO',category:'Fashion',audience:'Women',price:1199,icon:'👗',image:'images/red-ethnic-set.jpg',sizes:['S','M','L','XL'],colors:['Red','Maroon']},
{id:13,name:'White Embroidered Kurta Set',platform:'AJIO',category:'Fashion',audience:'Women',price:1399,icon:'🥻',image:'images/white-kurta-set.jpg',sizes:['S','M','L','XL'],colors:['White','Cream']},
{id:14,name:'Black Check Casual Shirt',platform:'AJIO',category:'Fashion',audience:'Men',price:749,icon:'👔',image:'images/men-plaid-shirt-black.jpg',sizes:['S','M','L','XL'],colors:['Black','White']},
{id:15,name:'Brown Check Casual Shirt',platform:'AJIO',category:'Fashion',audience:'Men',price:799,icon:'👔',image:'images/men-plaid-shirt-brown.jpg',sizes:['S','M','L','XL'],colors:['Brown','Cream']}
];
const orders=[
{id:'SS1001',platform:'Swiggy',item:'Chicken Biryani',date:'Today',time:'12:25 PM',status:'Out for delivery',icon:'🍛',amount:250},
{id:'SS1002',platform:'Amazon',item:'Wireless Earbuds',date:'Oct 2',time:'11 AM–2 PM',status:'Shipped',icon:'🎧',amount:1999},
{id:'SS1003',platform:'AJIO',item:'Girls Purple Outfit',date:'Oct 3',time:'2 PM–6 PM',status:'Processing',icon:'👗',amount:899},
{id:'SS1004',platform:'Flipkart',item:'HP Laptop Backpack',date:'Oct 4',time:'10 AM–2 PM',status:'Confirmed',icon:'🎒',amount:1299},
{id:'SS1005',platform:'Zomato',item:'Veg Pizza',date:'Today',time:'6:00 PM',status:'Confirmed',icon:'🍕',amount:299}
];
const invoices=[
{no:'#SS-260928',platform:'Amazon',item:'Wireless Earbuds',date:'28 Sep 2026',amount:2239.64,status:'Paid'},
{no:'#SS-260927',platform:'Flipkart',item:'HP Laptop Backpack',date:'27 Sep 2026',amount:1299,status:'Pending'},
{no:'#SS-260926',platform:'AJIO',item:'Girls Purple Outfit',date:'26 Sep 2026',amount:899,status:'Paid'},
{no:'#SS-260925',platform:'Swiggy',item:'Chicken Biryani',date:'25 Sep 2026',amount:250,status:'Paid'},
{no:'#SS-260924',platform:'Zomato',item:'Veg Pizza',date:'24 Sep 2026',amount:299,status:'Paid'}
];
let cart=JSON.parse(localStorage.getItem('shopsyncCart')||'[]');

function money(n){return '₹'+Number(n).toLocaleString('en-IN',{maximumFractionDigits:2});}
function showSection(id){document.querySelectorAll('.section').forEach(s=>s.classList.remove('active-section'));const el=document.getElementById(id);if(el)el.classList.add('active-section');document.querySelectorAll('.nav').forEach(n=>n.classList.toggle('active',n.dataset.section===id));window.scrollTo({top:0,behavior:'smooth'});}
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200);}
function productByName(name){return products.find(p=>p.name===name);}
function productImage(name){return productByName(name)?.image||'';}
function imageMarkup(src,title,cls=''){
  if(!src)return '';
  return `<button class="image-button ${cls}" type="button" aria-label="View ${title} image" onclick='openImageViewer(${JSON.stringify(src)},${JSON.stringify(title)})'><img src="${src}" alt="${title}" loading="lazy"></button>`;
}
function renderProducts(list=products){
  document.getElementById('productGrid').innerHTML=list.map(p=>{
    const secondLabel=p.category==='Food'?'Item option':'Colour';
    const audience=p.audience&&p.audience!=='All'?`<span class="audience-pill">${p.audience}</span>`:'';
    return `<div class="product"><div class="product-icon">${p.image?imageMarkup(p.image,p.name):p.icon}</div><div class="product-tags"><span class="platform-pill">${p.platform}</span>${audience}</div><h3>${p.name}</h3><small>${p.category}</small><div class="variant-grid"><label><span>Size</span><select id="size-${p.id}">${p.sizes.map(x=>`<option>${x}</option>`).join('')}</select></label><label><span>${secondLabel}</span><select id="color-${p.id}">${p.colors.map(x=>`<option>${x}</option>`).join('')}</select></label></div><div class="product-bottom"><b>${money(p.price)}</b><button onclick="addToCart(${p.id})">+ Add</button></div></div>`;
  }).join('')||'<div class="empty">No products found.</div>';
}
function filterProducts(cat,btn){document.querySelectorAll('.chip').forEach(c=>c.classList.remove('selected'));btn.classList.add('selected');renderProducts(cat==='All'?products:products.filter(p=>p.category===cat||p.audience===cat));}
function addToCart(id){const p=products.find(x=>x.id===id);const size=document.getElementById('size-'+id)?.value||p.sizes?.[0]||'Standard';const color=document.getElementById('color-'+id)?.value||p.colors?.[0]||'Default';cart.push({...p,selectedSize:size,selectedColor:color});localStorage.setItem('shopsyncCart',JSON.stringify(cart));updateCart();toast(p.name+' added to cart');}
function updateCart(){document.getElementById('cartCount').textContent=cart.length;document.getElementById('cartItems').innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-item"><div class="cart-product">${p.image?`<img src="${p.image}" alt="${p.name}">`:p.icon}<span><b>${p.name}</b><small>${p.platform} · Size: ${p.selectedSize||'Standard'} · ${p.category==='Food'?'Option':'Colour'}: ${p.selectedColor||'Default'}</small></span></div><b>${money(p.price)}</b><button onclick="removeCart(${i})">×</button></div>`).join(''):'<div class="empty">Your cart is empty.</div>';document.getElementById('cartTotal').textContent=money(cart.reduce((s,p)=>s+p.price,0));}
function removeCart(i){cart.splice(i,1);localStorage.setItem('shopsyncCart',JSON.stringify(cart));updateCart();}
function openCart(){updateCart();document.getElementById('cartModal').classList.add('open');}
function closeCart(){document.getElementById('cartModal').classList.remove('open');}
function placeDemoOrder(){if(!cart.length){toast('Add a product first');return;}closeCart();toast('Demo order created — real platform ordering needs authorized APIs.');cart=[];localStorage.setItem('shopsyncCart','[]');updateCart();showSection('orders');}
function renderOrders(){
  document.getElementById('ordersList').innerHTML=orders.map(o=>`<div class="order-card"><div class="order-image">${productImage(o.item)?imageMarkup(productImage(o.item),o.item):o.icon}</div><div class="order-main"><div class="order-top"><b>${o.item}</b><span>${o.status}</span></div><small>${o.platform} · Order ${o.id}</small><div class="order-meta"><span>📅 ${o.date}</span><span>⏱ ${o.time}</span><b>${money(o.amount)}</b></div></div></div>`).join('');
  document.getElementById('dashboardOrders').innerHTML=orders.slice(0,3).map(o=>`<div class="mini-order"><div class="mini-image">${productImage(o.item)?imageMarkup(productImage(o.item),o.item):o.icon}</div><div><b>${o.item}</b><small>${o.platform} · ${o.date}</small></div><strong>${o.status}</strong></div>`).join('');
}
function renderTimeline(){
  const html=orders.map((o,i)=>`<div class="timeline-item"><div class="dot ${i===0?'live':''}"></div><div><small>${o.date} · ${o.time}</small><b>${o.item}</b><span>${o.platform} · ${o.status}</span></div></div>`).join('');
  document.getElementById('dashboardTimeline').innerHTML=orders.slice(0,3).map(o=>`<div class="mini-timeline"><div class="timeline-image">${productImage(o.item)?imageMarkup(productImage(o.item),o.item):o.icon}</div><div><b>${o.time}</b><small>${o.platform} · ${o.item}</small></div></div>`).join('');
  document.getElementById('fullTimeline').innerHTML=html;
}
function renderInvoices(){document.getElementById('invoiceTable').innerHTML=invoices.map((x,i)=>`<tr><td><b>${x.no}</b></td><td>${x.platform}</td><td>${x.item}</td><td>${x.date}</td><td><b>${money(x.amount)}</b></td><td><span class="status ${x.status.toLowerCase()}">${x.status}</span></td><td><button class="table-btn" onclick="previewInvoice(${i})">View</button></td></tr>`).join('');}
function previewInvoice(i){const x=invoices[i];document.querySelector('.invoice-preview .invoice-head span').textContent=x.no;document.querySelector('.invoice-preview .invoice-lines').innerHTML=`<div><span>Purchase amount</span><b>${money(x.amount-49)}</b></div><div><span>Platform delivery</span><b>₹49</b></div><div><span>Tax / GST</span><b>Included</b></div>`;document.querySelector('.invoice-total b').textContent=money(x.amount);document.querySelector('.invoice-preview .paid-badge').textContent=x.status.toUpperCase();document.querySelector('.invoice-preview .paid-badge').className='paid-badge '+(x.status==='Paid'?'':'pending-badge');toast('Showing '+x.no);}
function renderCompare(){const groups=[['Wireless Earbuds','Amazon',1999,'₹0','₹1,999'],['Wireless Earbuds','Flipkart',2099,'₹49','₹2,148'],['Women’s Kurti','AJIO',899,'₹0','₹899']];document.getElementById('compareCards').innerHTML=groups.map(g=>`<div class="compare-card"><div class="compare-top"><span>🔎 ${g[0]}</span><b>${g[1]}</b></div><div><small>Listed price</small><strong>${money(g[2])}</strong></div><div><small>Delivery</small><strong>${g[3]}</strong></div><div class="final"><small>Final payable</small><strong>${g[4]}</strong></div></div>`).join('');}

function openImageViewer(src,title){
  const viewer=document.getElementById('imageViewer');
  const image=document.getElementById('viewerImage');
  const caption=document.getElementById('viewerTitle');
  if(!viewer||!image)return;
  image.src=src;
  image.alt=title||'Product image';
  caption.textContent=title||'Product image';
  viewer.classList.add('open');
  document.body.classList.add('viewer-open');
}
function closeImageViewer(){
  const viewer=document.getElementById('imageViewer');
  if(!viewer)return;
  viewer.classList.remove('open');
  document.body.classList.remove('viewer-open');
  setTimeout(()=>{document.getElementById('viewerImage').src='';},180);
}
function toggleDeliveryMode(){
  const mode=document.querySelector('input[name="deliveryMode"]:checked')?.value;
  document.querySelectorAll('.delivery-mode').forEach(card=>card.classList.toggle('selected',card.querySelector('input').value===mode));
  document.getElementById('oneTimeFields').classList.toggle('hidden',mode!=='one-time');
  document.getElementById('multipleInfo').classList.toggle('hidden',mode!=='multiple');
}
function scheduleOneTimeDelivery(){
  const date=document.getElementById('deliveryDate').value;
  const time=document.getElementById('deliveryTime').value;
  if(!date){toast('Select a delivery date first');return;}
  const formatted=new Date(date+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
  const box=document.getElementById('scheduledDelivery');
  box.innerHTML='<b>✓ One-time delivery scheduled</b><span>'+formatted+' · '+time+'</span>';
  box.classList.remove('hidden');
  localStorage.setItem('shopsyncDeliveryPlan',JSON.stringify({mode:'one-time',date,time}));
  toast('One-time delivery scheduled');
}
function setDeliveryDefaults(){
  const input=document.getElementById('deliveryDate');
  if(!input)return;
  const now=new Date();
  const localDate=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().split('T')[0];
  input.min=localDate;
  const saved=JSON.parse(localStorage.getItem('shopsyncDeliveryPlan')||'null');
  if(saved?.mode==='one-time'){
    input.value=saved.date;
    document.getElementById('deliveryTime').value=saved.time;
    const formatted=new Date(saved.date+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
    const box=document.getElementById('scheduledDelivery');
    box.innerHTML='<b>✓ One-time delivery scheduled</b><span>'+formatted+' · '+saved.time+'</span>';
    box.classList.remove('hidden');
  }
}

function togglePassword(){const p=document.getElementById('loginPassword');p.type=p.type==='password'?'text':'password';}
function loginSuccess(email){localStorage.setItem('shopsyncLoggedIn','1');localStorage.setItem('shopsyncEmail',email);document.getElementById('loginPage').classList.add('hidden');document.getElementById('app').classList.remove('hidden');}
function demoLogin(){loginSuccess('demo@shopsync.app');toast('Welcome to ShopSync demo');}
function demoForgot(e){e.preventDefault();toast('Demo: password reset is not connected.');}
function logout(){localStorage.removeItem('shopsyncLoggedIn');document.getElementById('app').classList.add('hidden');document.getElementById('loginPage').classList.remove('hidden');toast('Signed out');}
function printBilling(){window.print();}
function downloadInvoiceDemo(){toast('Demo invoice action — connect backend storage/PDF generation in production.');}

document.querySelectorAll('.nav').forEach(n=>n.addEventListener('click',()=>showSection(n.dataset.section)));
document.getElementById('loginForm').addEventListener('submit',e=>{e.preventDefault();loginSuccess(document.getElementById('loginEmail').value);});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeImageViewer();});
document.getElementById('searchInput').addEventListener('input',e=>{const q=e.target.value.toLowerCase();showSection('shop');renderProducts(products.filter(p=>(p.name+' '+p.platform+' '+p.category).toLowerCase().includes(q)));});
renderProducts();renderOrders();renderTimeline();renderInvoices();renderCompare();updateCart();toggleDeliveryMode();setDeliveryDefaults();
if(localStorage.getItem('shopsyncLoggedIn')==='1'){document.getElementById('loginPage').classList.add('hidden');document.getElementById('app').classList.remove('hidden');}
