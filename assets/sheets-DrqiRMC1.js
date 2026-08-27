const ve="https://ivenkurz.github.io/supercharger-price/europe.json",G="https://ivenkurz.github.io/supercharger-price/privacy.html",V="https://ivenkurz.github.io/supercharger-price/support.html",_="https://api.frankfurter.dev/v2/rates?base=EUR",me={lat:51.85,lon:12.24},A={secondary:"#8B919B",accent:"#3BD37E",yellow:"#E8C158",red:"#E0655A"},C=1e6;function N(e,t){if(!e)return null;const a=e.rates[t];if(a==null)return null;const n=typeof a=="number"?a:a.rate;return typeof n!="number"||!Number.isFinite(n)||n<=0?null:n}function B(e,t,a,n){if(!Number.isFinite(e))return null;const s=(t||"EUR").toUpperCase(),r=(a||"EUR").toUpperCase();if(s===r)return e;const i=N(n,s),o=N(n,r);if(i==null||o==null)return null;const l=e/i*o;return Number.isFinite(l)?l:null}function J(e){if(!(e!=null&&e.fetchedAt))return null;const t=Date.parse(e.fetchedAt);return Number.isNaN(t)?null:Date.now()-t}async function be(e){const t=J(e);if(t==null||t<=6*3600*1e3)return e;try{const a=await fetch(_);if(!a.ok)return e;const n=await a.json();if(!n.rates)return e;const s={base:"EUR",fetchedAt:new Date().toISOString(),rates:{...e.rates}};s.rates.EUR={rate:1,date:n.date,provider:"IDENTITY"};for(const[r,i]of Object.entries(n.rates))typeof i=="number"&&i>0&&(s.rates[r]={rate:i,date:n.date,provider:"FRANKFURTER"});return s}catch{return e}}const Y=["EUR","CHF","CZK","DKK","GBP","HUF","ISK","NOK","PLN","RON","SEK","TRY"];function $(e){return(Math.round(e*100)/100).toFixed(2).replace(".",",")}function w(e,t="EUR"){const a=t==="EUR"?"€":t;return t==="EUR"?`${$(e)} €/kWh`:`${$(e)} ${a}/kWh`}function Z(e){return`${(Math.round(e*10)/10).toFixed(1).replace(".",",")} km`}function f(e,t=0){return`${String(e).padStart(2,"0")}:${String(t).padStart(2,"0")}`}function F(e){const t=e.name||"",a=t.lastIndexOf(" - ");if(a>=0){const s=t.slice(a+3).trim();if(s)return s}const n=t.indexOf(",");return n>0?t.slice(0,n).trim():t||e.address.city||"Supercharger"}function q(e){const t=e.address||{},a=[t.street].filter(Boolean).join(" "),n=[t.postalCode,t.city].filter(Boolean).join(" ");return[a,n].filter(Boolean).join(", ")}function fe(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":new Intl.DateTimeFormat("de-DE",{hour:"numeric",minute:"2-digit",hour12:!1}).format(t)}function ge(e){const t=new Date(e);if(Number.isNaN(t.getTime()))return"";const n=new Intl.DateTimeFormat("de-DE",{timeZone:"Europe/Berlin",day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(t),s=d=>{var h;return((h=n.find(b=>b.type===d))==null?void 0:h.value)??""},r=s("day").padStart(2,"0"),i=s("month").padStart(2,"0"),o=s("year"),c=s("hour").padStart(2,"0"),l=s("minute").padStart(2,"0");return!r||!i||!o||!c||!l?"":`${r}.${i}.${o}, ${c}:${l}`}function Q(e){return e===0?64:1<<e-1}function X(e){return e.start===0&&e.end===1440}function ee(e,t,a){return(e.days&t)===0?!1:a>=e.start&&a<e.end}function te(e,t,a){const n=e.filter(o=>ee(o,t,a));if(n.length===0)return null;const s=n.filter(o=>!X(o)),r=s.length>0?s:n;let i=r[0];for(let o=1;o<r.length;o++){const c=r[o],l=i.end-i.start,d=c.end-c.start;(d<l||d===l&&c.start<i.start)&&(i=c)}return i}function ne(e,t,a){const n=te(e,t,a);return n?n.price:null}function I(e,t){const a=t||"Europe/Berlin",s=new Intl.DateTimeFormat("en-US",{timeZone:a,weekday:"short",hour:"2-digit",minute:"2-digit",hourCycle:"h23",hour12:!1}).formatToParts(e),r=d=>{var h;return((h=s.find(b=>b.type===d))==null?void 0:h.value)??""},o={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[r("weekday")]??0;let c=parseInt(r("hour"),10);(Number.isNaN(c)||c===24)&&(c=0);const l=parseInt(r("minute"),10)||0;return{weekdayJs:o,minutes:c*60+l,hour:c,minute:l}}function ae(e,t,a=new Date){const n=I(a,e.timezone),s=Q(n.weekdayJs);return t.mode==="live"?{dayBit:s,minutes:n.minutes}:{dayBit:s,minutes:t.hour*60}}function D(e,t,a=new Date){if(e.pricingStatus==="unavailable"||!e.prices||e.prices.length===0)return null;const n=ae(e,t,a);return ne(e.prices,n.dayBit,n.minutes)}function P(e,t,a=new Date){return D(e,{mode:"manual",hour:t},a)}const se={what:"Was das ist: Supercharger Price ist ein privates Experiment von Iven Kurz, keine Firma und kein Produkt. Die App ist kostenlos, ein Versuch, Preise auf einer Karte sichtbar zu machen.",warranty:"Ohne Gewähr: Es gibt keine Garantie, dass Preise, Zeiten oder Stationen stimmen, vollständig oder aktuell sind. Die App ist kein Rat zum Laden, Fahren oder Bezahlen. Wer lädt, prüft den Preis selbst am Stall und in der Tesla-App. Nutzung auf eigenes Risiko. Soweit gesetzlich zulässig, keine Haftung für Schäden aus der Nutzung, aus falschen oder fehlenden Daten oder aus dem Ausfall der App. Zwingende gesetzliche Haftung (Vorsatz, grobe Fahrlässigkeit) bleibt unberührt.",trademarks:"Marken: Tesla, Supercharger und verwandte Marken gehören Tesla, Inc. Diese App ist unabhängig, nicht von Tesla, nicht mit Tesla verbunden, nicht genehmigt. Sie ersetzt die Tesla-App nicht.",contact:"Kontakt: iven.kurz@me.com",fx:"Wechselkurse: api.frankfurter.dev",privacyLabel:"Datenschutz",supportLabel:"Support",settingsTitle:"Einstellungen",currencyLabel:"WÄHRUNG",currencyHint:"Anzeige-Währung",aboutLabel:"ÜBER",languageLabel:"SPRACHE",languageRow:"Sprache",displayLabel:"Anzeige",displayConverted:"Umgerechnet",targetCurrency:"Zielwährung",legalLabel:"RECHTLICHES",aboutRow:"Über",aboutTitle:"Über",favBanner:"Favoriten liegen jetzt auf der Karte — Stern-Button oben rechts. Sie sind Inhalt, keine Einstellung.",versionLabel:"VERSION",appVersionRow:"App-Version",feedUpdatedRow:"Letzte Datenaktualisierung"},re={what:"What this is: Supercharger Price is a private experiment by Iven Kurz, not a company and not a product. The app is free: an attempt to show prices on a map.",warranty:"No warranty: There is no guarantee that prices, times, or stations are correct, complete, or current. The app is not advice to charge, drive, or pay. If you charge, check the price yourself at the stall and in the Tesla app. Use at your own risk. To the extent permitted by law, no liability for damage from use, from wrong or missing data, or from the app being unavailable. Mandatory liability (intent, gross negligence) remains.",trademarks:"Trademarks: Tesla, Supercharger, and related marks belong to Tesla, Inc. This app is independent, not made by Tesla, not affiliated, not endorsed. It does not replace the Tesla app.",contact:"Contact: iven.kurz@me.com",fx:"Exchange rates: api.frankfurter.dev",privacyLabel:"Privacy",supportLabel:"Support",settingsTitle:"Settings",currencyLabel:"CURRENCY",currencyHint:"Display currency",aboutLabel:"ABOUT",languageLabel:"LANGUAGE",languageRow:"Language",displayLabel:"Display",displayConverted:"Converted",targetCurrency:"Target currency",legalLabel:"LEGAL",aboutRow:"About",aboutTitle:"About",favBanner:"Favoriten liegen jetzt auf der Karte — Stern-Button oben rechts. Sie sind Inhalt, keine Einstellung.",versionLabel:"VERSION",appVersionRow:"App version",feedUpdatedRow:"Last data update"};function ie(e){return(typeof navigator<"u"?navigator.language:"de").toLowerCase().startsWith("de")?"de":"en"}function z(e){return e==="de"?se:re}function oe(e){const t=z(e);return`
<div class="about" lang="${e}">
  <p>${t.what}</p>
  <p>${t.warranty}</p>
  <p>${t.trademarks}</p>
  <p>${t.contact.replace("iven.kurz@me.com",'<a href="mailto:iven.kurz@me.com">iven.kurz@me.com</a>')}</p>
  <p>${t.fx}</p>
</div>`}const M="scp.lang";function ye(){try{const e=localStorage.getItem(M);if(e==="de"||e==="en")return e}catch{}return ie()}function $e(e){try{localStorage.setItem(M,e)}catch{}}function we(e,t,a,n){const s=[];for(let r=0;r<24;r++){let i=null;for(const o of e){const c=P(o,r,t);if(c==null)continue;const l=B(c/C,o.currency,a,n);l!=null&&(i==null||l<i)&&(i=l)}s.push({hour:r,price:i})}return s}function le(e){const t=e.filter(i=>i.price!=null);if(t.length===0)return null;const a=t.reduce((i,o)=>Math.min(i,o.price),t[0].price),n=e.map(i=>i.price!=null&&Math.abs(i.price-a)<1e-9);if(n.every(Boolean))return{start:0,endExclusive:0,count:24,price:a};let s=0,r=0;for(let i=0;i<24;i++){if(!n[i]||n[(i+23)%24])continue;let o=0;for(;o<24&&n[(i+o)%24];)o++;o>r&&(s=i,r=o)}return r===0?null:{start:s,endExclusive:(s+r)%24,count:r,price:a}}function T(e){return String(e).padStart(2,"0")}function ce(e){return e.count===24?"00–23 Uhr":e.count===1?`${T(e.start)} Uhr`:`${T(e.start)}–${T(e.endExclusive)} Uhr`}function Se(e){e.innerHTML=`
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
  `}function ue(){return'<svg viewBox="0 0 24 24"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>'}function K(){return'<svg viewBox="0 0 24 24"><path d="M12 3l2.6 6.3 6.9.6-5.2 4.5 1.6 6.7L12 17.8 5.1 21.1l1.6-6.7L1.5 9.9l6.9-.6z"/></svg>'}function de(){return'<svg viewBox="0 0 24 24"><path d="M12 3v2M12 19v2M3 12h2M19 12h2"/><circle cx="12" cy="12" r="4"/></svg>'}function Ee(e){var a;const t=Math.max(12,e);(a=document.getElementById("radar"))==null||a.style.setProperty("--r",`${t}px`)}function Le(e,t){const a=I(t,"Europe/Berlin"),n=document.getElementById("time-label"),s=document.getElementById("now-chip"),r=document.querySelector("#time-chip .dot");e.mode==="live"?(n.textContent=`Jetzt · ${f(a.hour,a.minute)}`,s.hidden=!0,r.style.background="#3BD37E"):(n.textContent=f(e.hour,0),s.hidden=!1,r.style.background="#E8C158")}function ke(e){const t=document.getElementById("banner");if(!e){t.classList.remove("show"),t.textContent="";return}t.textContent=e,t.classList.add("show")}function xe(e,t){const a=document.getElementById("cheap");document.getElementById("cheap-txt").textContent=e,a.classList.toggle("empty",t)}function Re(e){const t=document.getElementById("radius-val");t&&(t.textContent=`${e} km`);const a=document.getElementById("radius");a&&Number(a.value)!==e&&(a.value=String(e))}function Te(e){var t;(t=document.getElementById("empty"))==null||t.classList.toggle("show",e)}function Ce(e){const t=document.getElementById("sheet-root"),a=document.getElementById("sheet");a.innerHTML=e,t.classList.add("open")}function Be(){var e;(e=document.getElementById("sheet-root"))==null||e.classList.remove("open")}function Ie(e,t,a,n,s=0){var v,E;const r=t.map(p=>p.price).filter(p=>p!=null),i=Math.max(...r,.01),o=e.mode==="manual"?e.hour:a,c=t.map(p=>{const x=p.price==null?8:10+p.price/i*70,L=A.accent;return`<button type="button" class="${p.hour===o?"bar sel":"bar"}" data-hour="${p.hour}" style="height:${x}px;background:${L}" aria-label="${p.hour} Uhr"></button>`}).join(""),l=((v=t[o])==null?void 0:v.price)??null,d=l==null?"":`<span class="time-price">${w(l,n)}</span>`,h=((E=t[a])==null?void 0:E.price)??null,b=e.mode==="manual"?`<div class="time-now">Jetzt ${f(a,s)} · ${h==null?"—":$(h)}</div>`:"",g=le(t),S=g==null?"":`<div class="time-foot"><span class="dot"></span>Günstig: ${ce(g)} · ${w(g.price,n)}</div>`;return`
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
          ${d}
        </div>
        ${b}
      </div>
      <div class="bars">${c}</div>
      <div class="bar-axis"><span>0</span><span>6</span><span>12</span><span>18</span><span>23 Uhr</span></div>
      ${S}
    </div>`}function ze(e,t,a,n,s,r,i,o){const c=D(e,t,a),l=c==null?null:B(c/C,e.currency,s,n),d=I(a,e.timezone),h=["So","Mo","Di","Mi","Do","Fr","Sa"],b=t.mode==="live"?`Jetzt · ${f(d.hour,d.minute)}`:`${h[d.weekdayJs]??""} ${f(t.hour,0)}`.trim(),g=l==null?'<div class="price-xl muted">Kein Preis</div>':`<div class="price-xl">${w(l,s)}</div>`,S=[],v=[];for(let m=0;m<24;m++){const k=P(e,m,a),y=k==null?null:B(k/C,e.currency,s,n);y!=null&&v.push(y),S.push({hour:m,val:y})}const E=Math.max(...v,.01),p=t.mode==="manual"?t.hour:d.hour,x=S.map(m=>{const k=m.val==null?6:10+m.val/E*70,y=A.accent;return`<button type="button" class="${m.hour===p?"bar sel":"bar"}" data-hour="${m.hour}" style="height:${k}px;background:${y}"></button>`}).join(""),L=v.length?Math.min(...v):null,R=v.length?Math.max(...v):null,H=L==null||R==null?"":`<span class="tages-minmax">min ${$(L)} · max ${$(R)}</span>`,U=`https://www.tesla.com/de_DE/findus/location/supercharger/${e.id}`,O=`geo:${e.lat},${e.lon}?q=${e.lat},${e.lon}(${encodeURIComponent(e.name)})`,W=e.stallCount!=null&&Number.isFinite(e.stallCount)?`<span class="meta">${e.stallCount} Stellplätze</span>`:"",j=e.maxPowerKw!=null&&Number.isFinite(e.maxPowerKw)?`<span class="meta">${e.maxPowerKw} kW</span>`:"";return`
    <div class="grab"></div>
    <div class="sheet-head">
      <div style="flex:1">
        <h2>${u(e.name||F(e))}${o?'<span class="tag">GÜNSTIG</span>':""}</h2>
        <p class="addr">${u(q(e))}</p>
      </div>
      <div class="sheet-actions">
        <button class="star-btn${i?" on":""}" id="fav-toggle" type="button" aria-label="Favorit">${K()}</button>
        <button class="close" id="sheet-close" type="button" aria-label="Schließen">×</button>
      </div>
    </div>
    <div class="sheet-body">
      <div class="price-line">
        ${g}
        <div class="owner">Owner-Preis · ${u(b)}</div>
      </div>
      <div class="tages-head"><span>Tagesverlauf</span>${H}</div>
      <div class="bars">${x}</div>
      <div class="bar-axis"><span>0</span><span>6</span><span>12</span><span>18</span><span>23 Uhr</span></div>
      <div class="meta-chips">${W}${j}<span class="meta">${Z(r)}</span></div>
    </div>
    <div class="sheet-foot">
      <button class="primary" id="send-tesla" type="button" data-url="${u(U)}" data-name="${u(e.name)}" data-price="${l==null?"":u(w(l,s))}">An Tesla senden</button>
      <div class="linkrow">
        <a href="${O}">In Karten öffnen</a>
        <button type="button" id="share-btn" data-url="${u(U)}" data-name="${u(e.name)}">Teilen</button>
      </div>
    </div>`}function pe(){return'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.6 6.3 6.9.6-5.2 4.5 1.6 6.7L12 17.8 5.1 21.1l1.6-6.7L1.5 9.9l6.9-.6z"/></svg>'}function Ue(e,t,a){const n=z(t),s=Y.map(r=>`<option value="${r}"${r===e?" selected":""}>${r}</option>`).join("");return`
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
          <select class="row-select" id="ccy">${s}</select>
        </label>
      </div>
      <div class="section-label">${n.versionLabel}</div>
      <div class="group">
        <div class="row static">
          <span>${n.appVersionRow}</span>
          <span class="muted">1.0.0</span>
        </div>
        <div class="row static">
          <span>${n.feedUpdatedRow}</span>
          <span class="muted">${u(a||"—")}</span>
        </div>
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
        <a class="row" href="${V}" target="_blank" rel="noopener">
          <span>${n.supportLabel}</span>
          <span class="ext">↗</span>
        </a>
      </div>
      <div class="fav-banner">
        ${pe()}
        <p>${n.favBanner}</p>
      </div>
    </div>`}function Ne(e){return`
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
    <div class="sheet-body">${e.length===0?'<p class="muted">Keine Favoriten.</p>':e.map(a=>{const n=a.station,s=[n.address.city,n.country].filter(Boolean).join(", "),r=a.price==null?"":w(a.price,a.displayCcy);return`<button class="fav-item" type="button" data-fav="${u(n.id)}"><span class="ampel-dot" style="background:${u(a.color)}"></span><span class="fav-meta"><span class="nm">${u(n.name||F(n))}</span><span class="muted">${u(s)}</span></span><span class="fav-price" style="color:${u(a.color)}">${u(r)}</span><span class="chev">›</span></button>`}).join("")}</div>`}function u(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}export{ze as A,A as C,ve as F,C as M,Re as a,me as b,B as c,Ee as d,xe as e,$ as f,Le as g,I as h,Ue as i,$e as j,Ae as k,ye as l,Se as m,Te as n,Ce as o,ke as p,we as q,Be as r,D as s,Ie as t,Ne as u,be as v,fe as w,w as x,F as y,ge as z};
