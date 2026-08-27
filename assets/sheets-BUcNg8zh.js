const me="https://ivenkurz.github.io/supercharger-price/europe.json",G="https://ivenkurz.github.io/supercharger-price/privacy.html",_="https://ivenkurz.github.io/supercharger-price/support.html",J="https://api.frankfurter.dev/v2/rates?base=EUR",ve={lat:51.85,lon:12.24},U={secondary:"#8B919B",accent:"#3BD37E",yellow:"#E8C158",red:"#E0655A"},C=1e6;function F(e,t){if(!e)return null;const n=e.rates[t];if(n==null)return null;const a=typeof n=="number"?n:n.rate;return typeof a!="number"||!Number.isFinite(a)||a<=0?null:a}function B(e,t,n,a){if(!Number.isFinite(e))return null;const s=(t||"EUR").toUpperCase(),i=(n||"EUR").toUpperCase();if(s===i)return e;const r=F(a,s),o=F(a,i);if(r==null||o==null)return null;const c=e/r*o;return Number.isFinite(c)?c:null}function Y(e){if(!(e!=null&&e.fetchedAt))return null;const t=Date.parse(e.fetchedAt);return Number.isNaN(t)?null:Date.now()-t}async function fe(e){const t=Y(e);if(t==null||t<=6*3600*1e3)return e;try{const n=await fetch(J);if(!n.ok)return e;const a=await n.json();if(!a.rates)return e;const s={base:"EUR",fetchedAt:new Date().toISOString(),rates:{...e.rates}};s.rates.EUR={rate:1,date:a.date,provider:"IDENTITY"};for(const[i,r]of Object.entries(a.rates))typeof r=="number"&&r>0&&(s.rates[i]={rate:r,date:a.date,provider:"FRANKFURTER"});return s}catch{return e}}const Z=["EUR","CHF","CZK","DKK","GBP","HUF","ISK","NOK","PLN","RON","SEK","TRY"];function $(e){return(Math.round(e*100)/100).toFixed(2).replace(".",",")}function w(e,t="EUR"){const n=t==="EUR"?"€":t;return t==="EUR"?`${$(e)} €/kWh`:`${$(e)} ${n}/kWh`}function q(e){return`${(Math.round(e*10)/10).toFixed(1).replace(".",",")} km`}function f(e,t=0){return`${String(e).padStart(2,"0")}:${String(t).padStart(2,"0")}`}function A(e){const t=e.name||"",n=t.lastIndexOf(" - ");if(n>=0){const s=t.slice(n+3).trim();if(s)return s}const a=t.indexOf(",");return a>0?t.slice(0,a).trim():t||e.address.city||"Supercharger"}function V(e){const t=e.address||{},n=[t.street].filter(Boolean).join(" "),a=[t.postalCode,t.city].filter(Boolean).join(" ");return[n,a].filter(Boolean).join(", ")}function be(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":new Intl.DateTimeFormat("de-DE",{hour:"numeric",minute:"2-digit",hour12:!1}).format(t)}function ge(e){const t=new Date(e);if(Number.isNaN(t.getTime()))return"";const a=new Intl.DateTimeFormat("de-DE",{timeZone:"Europe/Berlin",day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(t),s=c=>{var u;return((u=a.find(h=>h.type===c))==null?void 0:u.value)??""},i=s("day").padStart(2,"0"),r=s("month").padStart(2,"0"),o=s("hour").padStart(2,"0"),l=s("minute").padStart(2,"0");return!i||!r||!o||!l?"":`${i}.${r}. ${o}:${l}`}function Q(e){return e===0?64:1<<e-1}function X(e){return e.start===0&&e.end===1440}function ee(e,t,n){return(e.days&t)===0?!1:n>=e.start&&n<e.end}function te(e,t,n){const a=e.filter(o=>ee(o,t,n));if(a.length===0)return null;const s=a.filter(o=>!X(o)),i=s.length>0?s:a;let r=i[0];for(let o=1;o<i.length;o++){const l=i[o],c=r.end-r.start,u=l.end-l.start;(u<c||u===c&&l.start<r.start)&&(r=l)}return r}function ne(e,t,n){const a=te(e,t,n);return a?a.price:null}function I(e,t){const n=t||"Europe/Berlin",s=new Intl.DateTimeFormat("en-US",{timeZone:n,weekday:"short",hour:"2-digit",minute:"2-digit",hourCycle:"h23",hour12:!1}).formatToParts(e),i=u=>{var h;return((h=s.find(b=>b.type===u))==null?void 0:h.value)??""},o={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[i("weekday")]??0;let l=parseInt(i("hour"),10);(Number.isNaN(l)||l===24)&&(l=0);const c=parseInt(i("minute"),10)||0;return{weekdayJs:o,minutes:l*60+c,hour:l,minute:c}}function ae(e,t,n=new Date){const a=I(n,e.timezone),s=Q(a.weekdayJs);return t.mode==="live"?{dayBit:s,minutes:a.minutes}:{dayBit:s,minutes:t.hour*60}}function P(e,t,n=new Date){if(e.pricingStatus==="unavailable"||!e.prices||e.prices.length===0)return null;const a=ae(e,t,n);return ne(e.prices,a.dayBit,a.minutes)}function D(e,t,n=new Date){return P(e,{mode:"manual",hour:t},n)}const se={what:"Was das ist: Supercharger Price ist ein privates Experiment von Iven Kurz, keine Firma und kein Produkt. Die App ist kostenlos, ein Versuch, Preise auf einer Karte sichtbar zu machen.",warranty:"Ohne Gewähr: Es gibt keine Garantie, dass Preise, Zeiten oder Stationen stimmen, vollständig oder aktuell sind. Die App ist kein Rat zum Laden, Fahren oder Bezahlen. Wer lädt, prüft den Preis selbst am Stall und in der Tesla-App. Nutzung auf eigenes Risiko. Soweit gesetzlich zulässig, keine Haftung für Schäden aus der Nutzung, aus falschen oder fehlenden Daten oder aus dem Ausfall der App. Zwingende gesetzliche Haftung (Vorsatz, grobe Fahrlässigkeit) bleibt unberührt.",trademarks:"Marken: Tesla, Supercharger und verwandte Marken gehören Tesla, Inc. Diese App ist unabhängig, nicht von Tesla, nicht mit Tesla verbunden, nicht genehmigt. Sie ersetzt die Tesla-App nicht.",contact:"Kontakt: iven.kurz@me.com",fx:"Wechselkurse: api.frankfurter.dev",privacyLabel:"Datenschutz",supportLabel:"Support",settingsTitle:"Einstellungen",currencyLabel:"WÄHRUNG",currencyHint:"Anzeige-Währung",aboutLabel:"ÜBER",languageLabel:"SPRACHE",languageRow:"Sprache",displayLabel:"Anzeige",displayConverted:"Umgerechnet",targetCurrency:"Zielwährung",legalLabel:"RECHTLICHES",aboutRow:"Über",aboutTitle:"Über",favBanner:"Favoriten liegen jetzt auf der Karte — Stern-Button oben rechts. Sie sind Inhalt, keine Einstellung."},re={what:"What this is: Supercharger Price is a private experiment by Iven Kurz, not a company and not a product. The app is free: an attempt to show prices on a map.",warranty:"No warranty: There is no guarantee that prices, times, or stations are correct, complete, or current. The app is not advice to charge, drive, or pay. If you charge, check the price yourself at the stall and in the Tesla app. Use at your own risk. To the extent permitted by law, no liability for damage from use, from wrong or missing data, or from the app being unavailable. Mandatory liability (intent, gross negligence) remains.",trademarks:"Trademarks: Tesla, Supercharger, and related marks belong to Tesla, Inc. This app is independent, not made by Tesla, not affiliated, not endorsed. It does not replace the Tesla app.",contact:"Contact: iven.kurz@me.com",fx:"Exchange rates: api.frankfurter.dev",privacyLabel:"Privacy",supportLabel:"Support",settingsTitle:"Settings",currencyLabel:"CURRENCY",currencyHint:"Display currency",aboutLabel:"ABOUT",languageLabel:"LANGUAGE",languageRow:"Language",displayLabel:"Display",displayConverted:"Converted",targetCurrency:"Target currency",legalLabel:"LEGAL",aboutRow:"About",aboutTitle:"About",favBanner:"Favoriten liegen jetzt auf der Karte — Stern-Button oben rechts. Sie sind Inhalt, keine Einstellung."};function ie(e){return(typeof navigator<"u"?navigator.language:"de").toLowerCase().startsWith("de")?"de":"en"}function z(e){return e==="de"?se:re}function oe(e){const t=z(e);return`
<div class="about" lang="${e}">
  <p>${t.what}</p>
  <p>${t.warranty}</p>
  <p>${t.trademarks}</p>
  <p>${t.contact.replace("iven.kurz@me.com",'<a href="mailto:iven.kurz@me.com">iven.kurz@me.com</a>')}</p>
  <p>${t.fx}</p>
</div>`}const M="scp.lang";function ye(){try{const e=localStorage.getItem(M);if(e==="de"||e==="en")return e}catch{}return ie()}function $e(e){try{localStorage.setItem(M,e)}catch{}}function we(e,t,n,a){const s=[];for(let i=0;i<24;i++){let r=null;for(const o of e){const l=D(o,i,t);if(l==null)continue;const c=B(l/C,o.currency,n,a);c!=null&&(r==null||c<r)&&(r=c)}s.push({hour:i,price:r})}return s}function le(e){const t=e.filter(r=>r.price!=null);if(t.length===0)return null;const n=t.reduce((r,o)=>Math.min(r,o.price),t[0].price),a=e.map(r=>r.price!=null&&Math.abs(r.price-n)<1e-9);if(a.every(Boolean))return{start:0,endExclusive:0,count:24,price:n};let s=0,i=0;for(let r=0;r<24;r++){if(!a[r]||a[(r+23)%24])continue;let o=0;for(;o<24&&a[(r+o)%24];)o++;o>i&&(s=r,i=o)}return i===0?null:{start:s,endExclusive:(s+i)%24,count:i,price:n}}function T(e){return String(e).padStart(2,"0")}function ce(e){return e.count===24?"00–23 Uhr":e.count===1?`${T(e.start)} Uhr`:`${T(e.start)}–${T(e.endExclusive)} Uhr`}function Se(e){e.innerHTML=`
    <div id="map"></div>
    <div id="pin-layer"></div>
    <div class="radar" id="radar" style="--r: 140px">
      <div class="radar-mask"></div>
      <div class="radar-ring"></div>
      <div class="radar-center"></div>
    </div>
    <div class="pull" id="pull">Aktualisieren…</div>
    <div class="chrome top-left">
      <div class="chip-row">
        <button class="chip" id="time-chip" type="button"><span class="dot"></span><span id="time-label">Jetzt · --:--</span></button>
        <button class="chip jetzt" id="now-chip" type="button" hidden>Jetzt</button>
      </div>
    </div>
    <div class="chrome top-right">
      <span class="feed-stamp" id="feed-stamp" hidden></span>
      <button class="icon-btn" id="btn-settings" type="button" aria-label="Einstellungen">${ue()}</button>
      <button class="icon-btn" id="btn-favs" type="button" aria-label="Favoriten">${K()}</button>
    </div>
    <div class="chrome banner"><div class="banner-pill" id="banner"></div></div>
    <div class="chrome bottom">
      <div class="radius-line">
        <div class="card">
          <div class="radius-row">
            <span class="lbl">Umkreis</span>
            <input id="radius" type="range" min="5" max="100" step="5" value="25" />
            <span class="val" id="radius-val">25 km</span>
          </div>
        </div>
        <button class="icon-btn" id="btn-locate" type="button" aria-label="Standort">${de()}</button>
      </div>
      <button class="cheap-btn" id="cheap" type="button">
        <span class="dot"></span>
        <span class="txt" id="cheap-txt">Kein Supercharger in 25 km</span>
        <span class="chev">›</span>
      </button>
    </div>
    <div class="empty-screen" id="empty"><p>Keine Daten. Letzter Stand fehlt.</p></div>
    <div class="sheet-root" id="sheet-root">
      <div class="sheet-scrim" id="scrim"></div>
      <div class="sheet" id="sheet"></div>
    </div>
  `}function ue(){return'<svg viewBox="0 0 24 24"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>'}function K(){return'<svg viewBox="0 0 24 24"><path d="M12 3l2.6 6.3 6.9.6-5.2 4.5 1.6 6.7L12 17.8 5.1 21.1l1.6-6.7L1.5 9.9l6.9-.6z"/></svg>'}function de(){return'<svg viewBox="0 0 24 24"><path d="M12 3v2M12 19v2M3 12h2M19 12h2"/><circle cx="12" cy="12" r="4"/></svg>'}function Ee(e){var n;const t=Math.max(12,e);(n=document.getElementById("radar"))==null||n.style.setProperty("--r",`${t}px`)}function xe(e,t){const n=I(t,"Europe/Berlin"),a=document.getElementById("time-label"),s=document.getElementById("now-chip"),i=document.querySelector("#time-chip .dot");e.mode==="live"?(a.textContent=`Jetzt · ${f(n.hour,n.minute)}`,s.hidden=!0,i.style.background="#3BD37E"):(a.textContent=f(e.hour,0),s.hidden=!1,i.style.background="#E8C158")}function ke(e){const t=document.getElementById("banner");if(!e){t.classList.remove("show"),t.textContent="";return}t.textContent=e,t.classList.add("show")}function Le(e){const t=document.getElementById("feed-stamp");if(t){if(!e){t.textContent="",t.hidden=!0;return}t.textContent=e,t.hidden=!1}}function Re(e,t){const n=document.getElementById("cheap");document.getElementById("cheap-txt").textContent=e,n.classList.toggle("empty",t)}function Te(e){const t=document.getElementById("radius-val");t&&(t.textContent=`${e} km`);const n=document.getElementById("radius");n&&Number(n.value)!==e&&(n.value=String(e))}function Ce(e){var t;(t=document.getElementById("empty"))==null||t.classList.toggle("show",e)}function Be(e){const t=document.getElementById("sheet-root"),n=document.getElementById("sheet");n.innerHTML=e,t.classList.add("open")}function Ie(){var e;(e=document.getElementById("sheet-root"))==null||e.classList.remove("open")}function ze(e,t,n,a,s=0){var m,E;const i=t.map(p=>p.price).filter(p=>p!=null),r=Math.max(...i,.01),o=e.mode==="manual"?e.hour:n,l=t.map(p=>{const L=p.price==null?8:10+p.price/r*70,x=U.accent;return`<button type="button" class="${p.hour===o?"bar sel":"bar"}" data-hour="${p.hour}" style="height:${L}px;background:${x}" aria-label="${p.hour} Uhr"></button>`}).join(""),c=((m=t[o])==null?void 0:m.price)??null,u=c==null?"":`<span class="time-price">${w(c,a)}</span>`,h=((E=t[n])==null?void 0:E.price)??null,b=e.mode==="manual"?`<div class="time-now">Jetzt ${f(n,s)} · ${h==null?"—":$(h)}</div>`:"",g=le(t),S=g==null?"":`<div class="time-foot"><span class="dot"></span>Günstig: ${ce(g)} · ${w(g.price,a)}</div>`;return`
    <div class="grab"></div>
    <div class="sheet-head">
      <div style="flex:1">
        <h2>Wann lädst du?</h2>
        <p class="sub">Pins oben folgen der gewählten Stunde.</p>
      </div>
      <button class="close" id="sheet-close" type="button" aria-label="Schließen">×</button>
    </div>
    <div class="sheet-body">
      <div class="time-readout">
        <div class="time-main">
          <span class="time-hm">${f(o,0)}</span>
          ${u}
        </div>
        ${b}
      </div>
      <div class="bars">${l}</div>
      <div class="bar-axis"><span>0</span><span>6</span><span>12</span><span>18</span><span>23 Uhr</span></div>
      ${S}
    </div>`}function Ne(e,t,n,a,s,i,r,o){const l=P(e,t,n),c=l==null?null:B(l/C,e.currency,s,a),u=I(n,e.timezone),h=["So","Mo","Di","Mi","Do","Fr","Sa"],b=t.mode==="live"?`Jetzt · ${f(u.hour,u.minute)}`:`${h[u.weekdayJs]??""} ${f(t.hour,0)}`.trim(),g=c==null?'<div class="price-xl muted">Kein Preis</div>':`<div class="price-xl">${w(c,s)}</div>`,S=[],m=[];for(let v=0;v<24;v++){const k=D(e,v,n),y=k==null?null:B(k/C,e.currency,s,a);y!=null&&m.push(y),S.push({hour:v,val:y})}const E=Math.max(...m,.01),p=t.mode==="manual"?t.hour:u.hour,L=S.map(v=>{const k=v.val==null?6:10+v.val/E*70,y=U.accent;return`<button type="button" class="${v.hour===p?"bar sel":"bar"}" data-hour="${v.hour}" style="height:${k}px;background:${y}"></button>`}).join(""),x=m.length?Math.min(...m):null,R=m.length?Math.max(...m):null,H=x==null||R==null?"":`<span class="tages-minmax">min ${$(x)} · max ${$(R)}</span>`,N=`https://www.tesla.com/de_DE/findus/location/supercharger/${e.id}`,O=`geo:${e.lat},${e.lon}?q=${e.lat},${e.lon}(${encodeURIComponent(e.name)})`,W=e.stallCount!=null&&Number.isFinite(e.stallCount)?`<span class="meta">${e.stallCount} Stellplätze</span>`:"",j=e.maxPowerKw!=null&&Number.isFinite(e.maxPowerKw)?`<span class="meta">${e.maxPowerKw} kW</span>`:"";return`
    <div class="grab"></div>
    <div class="sheet-head">
      <div style="flex:1">
        <h2>${d(e.name||A(e))}${o?'<span class="tag">GÜNSTIG</span>':""}</h2>
        <p class="addr">${d(V(e))}</p>
      </div>
      <div class="sheet-actions">
        <button class="star-btn${r?" on":""}" id="fav-toggle" type="button" aria-label="Favorit">${K()}</button>
        <button class="close" id="sheet-close" type="button" aria-label="Schließen">×</button>
      </div>
    </div>
    <div class="sheet-body">
      <div class="price-line">
        ${g}
        <div class="owner">Owner-Preis · ${d(b)}</div>
      </div>
      <div class="tages-head"><span>Tagesverlauf</span>${H}</div>
      <div class="bars">${L}</div>
      <div class="bar-axis"><span>0</span><span>6</span><span>12</span><span>18</span><span>23 Uhr</span></div>
      <div class="meta-chips">${W}${j}<span class="meta">${q(i)}</span></div>
    </div>
    <div class="sheet-foot">
      <button class="primary" id="send-tesla" type="button" data-url="${d(N)}" data-name="${d(e.name)}" data-price="${c==null?"":d(w(c,s))}">An Tesla senden</button>
      <div class="linkrow">
        <a href="${O}">In Karten öffnen</a>
        <button type="button" id="share-btn" data-url="${d(N)}" data-name="${d(e.name)}">Teilen</button>
      </div>
    </div>`}function pe(){return'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.6 6.3 6.9.6-5.2 4.5 1.6 6.7L12 17.8 5.1 21.1l1.6-6.7L1.5 9.9l6.9-.6z"/></svg>'}function Fe(e,t){const n=z(t),a=Z.map(s=>`<option value="${s}"${s===e?" selected":""}>${s}</option>`).join("");return`
    <div class="grab"></div>
    <div class="sheet-head">
      <div style="flex:1"><h2>${n.settingsTitle}</h2></div>
      <button class="close" id="sheet-close" type="button" aria-label="Schließen">×</button>
    </div>
    <div class="sheet-body">
      <div class="section-label">${n.languageLabel}</div>
      <div class="group">
        <label class="row" for="lang">
          <span>${n.languageRow}</span>
          <select class="row-select" id="lang">
            <option value="de"${t==="de"?" selected":""}>Deutsch</option>
            <option value="en"${t==="en"?" selected":""}>English</option>
          </select>
        </label>
      </div>
      <div class="section-label">${n.currencyLabel}</div>
      <div class="group">
        <label class="row">
          <span>${n.displayLabel}</span>
          <select class="row-select" id="display-mode" aria-label="${n.displayLabel}">
            <option selected>${n.displayConverted}</option>
          </select>
        </label>
        <label class="row" for="ccy">
          <span>${n.targetCurrency}</span>
          <select class="row-select" id="ccy">${a}</select>
        </label>
      </div>
      <div class="section-label">${n.aboutLabel}</div>
      <div class="group">
        <button class="row" type="button" data-open="about">
          <span>${n.aboutRow}</span>
          <span class="chev">›</span>
        </button>
      </div>
      <div class="section-label">${n.legalLabel}</div>
      <div class="group">
        <a class="row" href="${G}" target="_blank" rel="noopener">
          <span>${n.privacyLabel}</span>
          <span class="ext">↗</span>
        </a>
        <a class="row" href="${_}" target="_blank" rel="noopener">
          <span>${n.supportLabel}</span>
          <span class="ext">↗</span>
        </a>
      </div>
      <div class="fav-banner">
        ${pe()}
        <p>${n.favBanner}</p>
      </div>
    </div>`}function Ue(e){return`
    <div class="grab"></div>
    <div class="sheet-head">
      <div style="flex:1"><h2>${z(e).aboutTitle}</h2></div>
      <button class="close" id="sheet-close" type="button" aria-label="Schließen">×</button>
    </div>
    <div class="sheet-body">
      ${oe(e)}
    </div>`}function Ae(e){return`
    <div class="grab"></div>
    <div class="sheet-head">
      <div style="flex:1"><h2>Favoriten</h2></div>
      <button class="close" id="sheet-close" type="button" aria-label="Schließen">×</button>
    </div>
    <div class="sheet-body">${e.length===0?'<p class="muted">Keine Favoriten.</p>':e.map(n=>{const a=n.station,s=[a.address.city,a.country].filter(Boolean).join(", "),i=n.price==null?"":w(n.price,n.displayCcy);return`<button class="fav-item" type="button" data-fav="${d(a.id)}"><span class="ampel-dot" style="background:${d(n.color)}"></span><span class="fav-meta"><span class="nm">${d(a.name||A(a))}</span><span class="muted">${d(s)}</span></span><span class="fav-price" style="color:${d(n.color)}">${d(i)}</span><span class="chev">›</span></button>`}).join("")}</div>`}function d(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}export{Fe as A,Ne as B,U as C,me as F,C as M,Te as a,ve as b,B as c,Ee as d,Re as e,$ as f,xe as g,I as h,$e as i,Ae as j,Ce as k,ye as l,Se as m,ke as n,Be as o,Le as p,we as q,Ie as r,P as s,ze as t,Ue as u,fe as v,ge as w,be as x,w as y,A as z};
