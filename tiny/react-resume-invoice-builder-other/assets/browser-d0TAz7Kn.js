function g(t,n){for(var e=0;e<n.length;e++){const r=n[e];if(typeof r!="string"&&!Array.isArray(r)){for(const a in r)if(a!=="default"&&!(a in t)){const s=Object.getOwnPropertyDescriptor(r,a);s&&Object.defineProperty(t,a,s.get?s:{enumerable:!0,get:()=>r[a]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}var c={};const m="bold|bolder|lighter|[1-9]00",d="italic|oblique",p="small-caps",f="ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded",b="px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q",u=`'([^']+)'|"([^"]+)"|[\\w\\s-]+`,w=new RegExp(`(${m}) +`,"i"),h=new RegExp(`(${d}) +`,"i"),x=new RegExp(`(${p}) +`,"i"),v=new RegExp(`(${f}) +`,"i"),y=new RegExp(`([\\d\\.]+)(${b}) *((?:${u})( *, *(?:${u}))*)`),i={},z=16;var R=t=>{if(i[t])return i[t];const n=y.exec(t);if(!n)return;const e={weight:"normal",style:"normal",stretch:"normal",variant:"normal",size:parseFloat(n[1]),unit:n[2],family:n[3].replace(/["']/g,"").replace(/ *, */g,",")};let r,a,s,l;const o=t.substring(0,n.index);switch((r=w.exec(o))&&(e.weight=r[1]),(a=h.exec(o))&&(e.style=a[1]),(s=x.exec(o))&&(e.variant=s[1]),(l=v.exec(o))&&(e.stretch=l[1]),e.unit){case"pt":e.size/=.75;break;case"pc":e.size*=16;break;case"in":e.size*=96;break;case"cm":e.size*=96/2.54;break;case"mm":e.size*=96/25.4;break;case"%":break;case"em":case"rem":e.size*=z/.75;break;case"q":e.size*=96/25.4/4;break}return i[t]=e};const k=R;var F=c.parseFont=k,$=c.createCanvas=function(t,n){return Object.assign(document.createElement("canvas"),{width:t,height:n})},E=c.createImageData=function(t,n,e){switch(arguments.length){case 0:return new ImageData;case 1:return new ImageData(t);case 2:return new ImageData(t,n);default:return new ImageData(t,n,e)}},I=c.loadImage=function(t,n){return new Promise(function(e,r){const a=Object.assign(document.createElement("img"),n);function s(){a.onload=null,a.onerror=null}a.onload=function(){s(),e(a)},a.onerror=function(){s(),r(new Error('Failed to load the image "'+t+'"'))},a.src=t})};const D=g({__proto__:null,createCanvas:$,createImageData:E,default:c,loadImage:I,parseFont:F},[c]);export{D as b};
