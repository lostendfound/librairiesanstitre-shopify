if(customElements.get("mega-menu-grid"))console.log("MegaMenuGrid: custom element already defined");else{class h extends HTMLElement{connectedCallback(){console.log("MegaMenuGrid: connectedCallback fired",this),this.drawGridLines();let o;window.addEventListener("resize",()=>{clearTimeout(o),o=setTimeout(()=>{console.log("MegaMenuGrid: resize triggered"),this.drawGridLines()},100)});const e=this.closest("details");console.log("MegaMenuGrid: found details element?",!!e),e&&e.addEventListener("toggle",()=>{console.log("MegaMenuGrid: details toggled, open?",e.open),e.open&&setTimeout(()=>this.drawGridLines(),50)})}drawGridLines(){console.log("MegaMenuGrid: drawGridLines called");const o=this.querySelectorAll(".mega-menu-grid-line");console.log("MegaMenuGrid: removing existing lines",o.length),o.forEach(n=>n.remove());const e=this.querySelector(".mega-menu__list");if(console.log("MegaMenuGrid: found list?",!!e,e),!e){console.warn("MegaMenuGrid: no .mega-menu__list found!");return}const l=Array.from(e.children);if(console.log("MegaMenuGrid: items count",l.length),l.length===0){console.warn("MegaMenuGrid: no items in list!");return}const u=getComputedStyle(e),i=u.gridTemplateColumns.split(" ").length;console.log("MegaMenuGrid: columns detected",i,"gridTemplateColumns:",u.gridTemplateColumns);const r=Math.ceil(l.length/i);console.log("MegaMenuGrid: rows calculated",r),e.style.position="relative";const m=parseFloat(getComputedStyle(document.documentElement).fontSize),s=.8182*m,a=.6545*m;console.log("MegaMenuGrid: spacing calculated - horizontal:",s+"px","vertical:",a+"px");const c=e.getBoundingClientRect(),M=c.width-s*2,G=c.height-a*2;console.log("MegaMenuGrid: drawing",i-1,"vertical lines");for(let n=1;n<i;n++){const t=s+n/i*M,d=document.createElement("div");d.className="mega-menu-grid-line mega-menu-grid-line--vertical",d.style.cssText=`
          position: absolute;
          left: ${t}px;
          top: ${a}px;
          height: ${G}px;
          width: 1px;
          background: #808080;
          pointer-events: none;
          z-index: 1;
        `,e&&e.appendChild?(e.appendChild(d),console.log("MegaMenuGrid: vertical line added at",t+"px")):console.error("MegaMenuGrid: Cannot append line - list is invalid",e)}console.log("MegaMenuGrid: drawing",r-1,"horizontal lines");for(let n=1;n<r;n++){const t=n*i-1;if(console.log("MegaMenuGrid: checking item at index",t),l[t]){const p=l[t].getBoundingClientRect().bottom-c.top;console.log("MegaMenuGrid: horizontal line at",p+"px");const g=document.createElement("div");g.className="mega-menu-grid-line mega-menu-grid-line--horizontal",g.style.cssText=`
            position: absolute;
            top: ${p}px;
            left: ${s}px;
            width: ${M}px;
            height: 1px;
            background: #808080;
            pointer-events: none;
            z-index: 1;
          `,e&&e.appendChild?e.appendChild(g):console.error("MegaMenuGrid: Cannot append line - list is invalid",e)}}e&&e.querySelectorAll&&console.log("MegaMenuGrid: drawGridLines complete. Total lines added:",e.querySelectorAll(".mega-menu-grid-line").length)}}customElements.define("mega-menu-grid",h),console.log("MegaMenuGrid: custom element defined")}
