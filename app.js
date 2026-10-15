const PRODUCTS = [
  {id:1,name:"The Everyday Linen Shirt",category:"Women",price:2450,oldPrice:2900,badge:"Bestseller",image:"https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=82",colors:["#e9e1d2","#8b9581","#282b27"],description:"An easy, breathable layer made for slow mornings and full days. Relaxed through the body with a soft, lived-in feel.",sizes:["XS","S","M","L","XL"],isNew:true},
  {id:2,name:"Relaxed Cotton Overshirt",category:"Men",price:2850,badge:"New",image:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=82",colors:["#c7b8a3","#474b40","#d5d0c4"],description:"A versatile overshirt with a clean silhouette and everyday comfort. Wear it open, layered or buttoned up.",sizes:["S","M","L","XL"],isNew:true},
  {id:3,name:"The Soft Knit Tank",category:"Women",price:1650,image:"https://images.unsplash.com/photo-1564257577-7a4f4a3c8c0c?auto=format&fit=crop&w=900&q=82",colors:["#ded4c5","#8d9b84","#302e2b"],description:"A soft, easy knit with just the right amount of structure. Your go-to base layer for all seasons.",sizes:["XS","S","M","L"],isNew:false},
  {id:4,name:"Everyday Straight Trousers",category:"Men",price:3250,badge:"Easy favourite",image:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=82",colors:["#b7a78e","#373b34","#d8d4ca"],description:"A considered fit with room to move. These straight-leg trousers bring a polished feel to your everyday rotation.",sizes:["S","M","L","XL"],isNew:false},
  {id:5,name:"Weekend Shoulder Bag",category:"Accessories",price:2200,image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=82",colors:["#a36e4e","#292a25","#d4c6ae"],description:"The right size for all the essentials. A simple shape, considered details and a strap made for everyday use.",sizes:["One size"],isNew:true},
  {id:6,name:"Minimal Leather Watch",category:"Accessories",price:3950,badge:"Limited edit",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=82",colors:["#d5c2a3","#292a25"],description:"A quietly confident finishing touch, with a clean dial and an understated strap that works with everything.",sizes:["One size"],isNew:false},
  {id:7,name:"The Boxy Everyday Tee",category:"Men",price:1250,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=82",colors:["#e8e4da","#252621","#8e9a80"],description:"Your favourite tee, refined. Soft cotton, a relaxed boxy fit and a neckline that keeps its shape.",sizes:["S","M","L","XL"],isNew:false},
  {id:8,name:"Easy Day Midi Dress",category:"Women",price:3450,badge:"New",image:"https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=900&q=82",colors:["#b6bba2","#cbb8a8","#292a25"],description:"An easy midi dress that takes the thinking out of getting dressed. Relaxed, versatile and ready for the day.",sizes:["XS","S","M","L"],isNew:true}
];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const money = n => "৳" + n.toLocaleString("en-BD");
let activeFilter="All", searchTerm="", sortMode="featured", cart=[], wishlist=new Set(), selectedProduct=null, selectedSize="", selectedColor=0, toastTimer;
const savedTheme=(()=>{try{return localStorage.getItem("fh-theme")}catch(e){return null}})();
if(savedTheme==="dark")document.body.classList.add("dark");
$("#year").textContent=new Date().getFullYear();

function renderProducts(){
 let list=PRODUCTS.filter(p=>(activeFilter==="All"||p.category===activeFilter)&&(`${p.name} ${p.category} ${p.description}`).toLowerCase().includes(searchTerm.toLowerCase()));
 if(sortMode==="price-low")list.sort((a,b)=>a.price-b.price);
 if(sortMode==="price-high")list.sort((a,b)=>b.price-a.price);
 if(sortMode==="name")list.sort((a,b)=>a.name.localeCompare(b.name));
 $("#product-grid").innerHTML=list.map(p=>`<article class="product-card">
  <div class="product-image" data-product="${p.id}" role="button" tabindex="0" aria-label="View ${p.name}">
   <img src="${p.image}" alt="${p.name}" loading="lazy">${p.badge?`<span class="product-badge">${p.badge}</span>`:""}
   <button class="wish-btn ${wishlist.has(p.id)?"active":""}" data-wish="${p.id}" aria-label="${wishlist.has(p.id)?"Remove from":"Add to"} wishlist">${wishlist.has(p.id)?"♥":"♡"}</button>
   <button class="quick-add" data-quick="${p.id}">Quick view <span>↗</span></button>
  </div><div class="product-meta"><span class="product-category">${p.category} · ${p.isNew?"Just in":"Wardrobe essential"}</span><div class="product-name-row"><span class="product-name" data-product="${p.id}">${p.name}</span><span class="product-price">${money(p.price)}</span></div><div class="product-colors">${p.colors.map(c=>`<span class="color-dot" style="background:${c}" title="${c}"></span>`).join("")}</div></div></article>`).join("");
 $("#no-results").classList.toggle("hidden",list.length>0);
 $("#product-grid").classList.toggle("hidden",list.length===0);
}
function setFilter(f){activeFilter=f;$$(".filter-tab").forEach(b=>b.classList.toggle("active",b.dataset.filter===f));renderProducts();$("#shop").scrollIntoView({behavior:"smooth",block:"start"});}
function showToast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2600)}
function openScrim(){ $("#scrim").classList.add("open"); document.body.style.overflow="hidden";}
function closeLayers(){ $("#scrim").classList.remove("open");$("#cart-drawer").classList.remove("open");$("#cart-drawer").setAttribute("aria-hidden","true");$$(".modal").forEach(m=>{m.classList.remove("open");m.setAttribute("aria-hidden","true")});document.body.style.overflow="";}
function openCart(){closeLayers();openScrim();$("#cart-drawer").classList.add("open");$("#cart-drawer").setAttribute("aria-hidden","false");renderCart();}
function openModal(id){closeLayers();openScrim();const m=$("#"+id);m.classList.add("open");m.setAttribute("aria-hidden","false");}
function addToCart(id,size="M",color=0){const p=PRODUCTS.find(x=>x.id===id);if(!p)return;const existing=cart.find(x=>x.id===id&&x.size===size&&x.color===color);if(existing)existing.qty++;else cart.push({id,size,color,qty:1});renderCartCount();showToast(`${p.name} added to your bag`);}
function renderCartCount(){const count=cart.reduce((n,x)=>n+x.qty,0);$("#cart-count").textContent=count;$("#drawer-count").textContent=`(${count})`;}
function renderCart(){
 const container=$("#cart-items"),footer=$("#cart-footer");
 if(!cart.length){container.innerHTML=`<div class="empty-cart"><span>♡</span><h3>Your bag is taking a breather.</h3><p>Looks like you haven't found your next favourite yet.</p><button class="btn btn-dark" id="empty-shop">Explore the collection <span>→</span></button></div>`;footer.classList.add("hidden");$("#empty-shop").onclick=()=>{closeLayers();$("#shop").scrollIntoView({behavior:"smooth"})};return;}
 footer.classList.remove("hidden");
 container.innerHTML=cart.map((item,i)=>{const p=PRODUCTS.find(x=>x.id===item.id);return `<div class="cart-line"><img src="${p.image}" alt="${p.name}"><div><h3>${p.name}</h3><small>${item.size==="One size"?"One size":`Size: ${item.size}`} · Colour ${item.color+1}</small><div class="qty-control"><button data-qty="${i}" data-change="-1" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button data-qty="${i}" data-change="1" aria-label="Increase quantity">+</button></div><button class="remove-item" data-remove="${i}">Remove</button></div><span class="cart-line-price">${money(p.price*item.qty)}</span></div>`}).join("");
 $("#cart-subtotal").textContent=money(cart.reduce((sum,item)=>sum+PRODUCTS.find(p=>p.id===item.id).price*item.qty,0));
}
function openProduct(id){const p=PRODUCTS.find(x=>x.id===id);if(!p)return;selectedProduct=p;selectedSize=p.sizes.includes("M")?"M":p.sizes[0];selectedColor=0;
 $("#product-modal-content").innerHTML=`<div class="product-detail"><div class="product-detail-image"><img src="${p.image}" alt="${p.name}"></div><div class="product-detail-copy"><p class="eyebrow">${p.category} · FASHIONHUB EDIT</p><h2 id="product-modal-title">${p.name}</h2><div class="detail-price">${money(p.price)} ${p.oldPrice?`<del style="color:var(--muted);font-size:11px;margin-left:7px">${money(p.oldPrice)}</del>`:""}</div><p class="detail-description">${p.description}</p><span class="option-label">Colour · <span id="selected-colour-label">${selectedColor+1}</span></span><div class="option-buttons">${p.colors.map((c,i)=>`<button class="option-btn ${i===0?"selected":""}" data-color="${i}" aria-label="Choose colour ${i+1}"><span class="color-dot" style="display:inline-block;background:${c};vertical-align:middle;margin-right:5px"></span> ${i+1}</button>`).join("")}</div><span class="option-label">Select size</span><div class="option-buttons">${p.sizes.map(s=>`<button class="option-btn ${s===selectedSize?"selected":""}" data-size="${s}">${s}</button>`).join("")}</div><button class="btn btn-dark detail-add" id="detail-add">Add to bag · ${money(p.price)} <span>→</span></button><p class="detail-description" style="margin-top:15px">Thoughtful quality · Easy returns · Secure checkout</p></div></div>`;
 openModal("product-modal");
}
function openInfo(title){const content={Shipping:"Complimentary shipping on orders over ৳3,500. Standard delivery timing and shipping fees should be confirmed by the store before launch.",Returns:"Our demo policy is 30 days to decide. In a live store, publish your real return conditions and contact details before accepting orders.",FAQ:"This is a front-end demo storefront. Product prices and cart interactions work in your browser, but inventory, order processing and payments are not connected to a backend.",Contact:"Add your real customer support email, phone number and business address before publishing this storefront for customers."};$("#info-title").textContent=title==="FAQ"?"A few quick answers.":title==="Contact"?"Say hello.":title==="Shipping"?"Delivery, made simple.":"Let's make it right.";$("#info-content").textContent=content[title]||content.FAQ;openModal("info-modal");}
$("#product-grid").addEventListener("click",e=>{const wish=e.target.closest("[data-wish]");if(wish){e.stopPropagation();const id=+wish.dataset.wish;if(wishlist.has(id))wishlist.delete(id);else wishlist.add(id);renderProducts();showToast(wishlist.has(id)?"Saved to your wishlist":"Removed from wishlist");return;}const quick=e.target.closest("[data-quick]");if(quick){openProduct(+quick.dataset.quick);return;}const product=e.target.closest("[data-product]");if(product)openProduct(+product.dataset.product);});
$("#product-grid").addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches("[data-product]")){e.preventDefault();openProduct(+e.target.dataset.product)}});
$$(".filter-tab").forEach(b=>b.addEventListener("click",()=>setFilter(b.dataset.filter)));
$$("[data-nav]").forEach(a=>a.addEventListener("click",()=>{const f=a.dataset.nav;if(f==="women")setFilter("Women");else if(f==="men")setFilter("Men");else setFilter("All");$("#main-nav")?.classList.remove("open")}));
$$("[data-category]").forEach(b=>b.addEventListener("click",()=>setFilter(b.dataset.category)));
$$("[data-footer-filter]").forEach(a=>a.addEventListener("click",()=>setFilter(a.dataset.footerFilter)));
$("#sort-select").addEventListener("change",e=>{sortMode=e.target.value;renderProducts()});
$("#clear-filter").addEventListener("click",e=>{e.preventDefault();setFilter("All");$("#search-input").value="";searchTerm="";});
$("#show-all").addEventListener("click",()=>{setFilter("All");$("#search-input").value="";searchTerm="";});
$("#reset-filters").addEventListener("click",()=>{activeFilter="All";searchTerm="";$("#search-input").value="";$("#sort-select").value="featured";sortMode="featured";$$(".filter-tab").forEach(b=>b.classList.toggle("active",b.dataset.filter==="All"));renderProducts()});
$("#search-toggle").addEventListener("click",()=>{$("#search-bar").classList.toggle("open");if($("#search-bar").classList.contains("open"))$("#search-input").focus()});
$("#search-close").addEventListener("click",()=>{$("#search-bar").classList.remove("open");$("#search-input").value="";searchTerm="";renderProducts()});
$("#search-input").addEventListener("input",e=>{searchTerm=e.target.value;renderProducts();if(searchTerm)$("#shop").scrollIntoView({behavior:"smooth",block:"start"})});
$("#cart-open").addEventListener("click",openCart);
$("#account-open").addEventListener("click",()=>openModal("account-modal"));
$("#scrim").addEventListener("click",closeLayers);
$$(".drawer-close,.modal-close").forEach(b=>b.addEventListener("click",closeLayers));
$("#continue-shopping").addEventListener("click",closeLayers);
$("#cart-items").addEventListener("click",e=>{const qty=e.target.closest("[data-qty]");if(qty){const i=+qty.dataset.qty;cart[i].qty+=+qty.dataset.change;if(cart[i].qty<1)cart.splice(i,1);renderCartCount();renderCart();return;}const rem=e.target.closest("[data-remove]");if(rem){cart.splice(+rem.dataset.remove,1);renderCartCount();renderCart();}});
$("#cart-footer").addEventListener("click",e=>{if(e.target.closest("#checkout-btn")){showToast("Checkout is a demo. Connect a secure payment provider before launch.");}});
$("#product-modal-content").addEventListener("click",e=>{const size=e.target.closest("[data-size]");if(size){selectedSize=size.dataset.size;$$("[data-size]").forEach(b=>b.classList.toggle("selected",b.dataset.size===selectedSize));return;}const color=e.target.closest("[data-color]");if(color){selectedColor=+color.dataset.color;$$("[data-color]").forEach(b=>b.classList.toggle("selected",+b.dataset.color===selectedColor));$("#selected-colour-label").textContent=selectedColor+1;return;}if(e.target.closest("#detail-add")){addToCart(selectedProduct.id,selectedSize,selectedColor);closeLayers();}});
$("#theme-toggle").addEventListener("click",()=>{document.body.classList.toggle("dark");try{localStorage.setItem("fh-theme",document.body.classList.contains("dark")?"dark":"light")}catch(e){}showToast(document.body.classList.contains("dark")?"Dark mode on":"Light mode on")});
$("#mobile-menu").addEventListener("click",()=>{$(".main-nav").classList.toggle("open")});
$("#account-form").addEventListener("submit",e=>{e.preventDefault();showToast("Demo account ready. No data was sent to a server.");closeLayers();});
$("#guest-continue").addEventListener("click",()=>{closeLayers();showToast("Continuing as a guest")});
$("#newsletter-form").addEventListener("submit",e=>{e.preventDefault();showToast("Thanks for subscribing — demo only, no email stored.");e.target.reset()});
$$("[data-info]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();openInfo(a.dataset.info)}));
$("#info-close").addEventListener("click",closeLayers);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLayers()});
renderProducts();renderCartCount();
