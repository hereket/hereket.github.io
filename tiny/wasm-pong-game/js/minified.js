var DEBUG_data=[["canvas",1,[0,0,0,0,0,0,0,0,0],[DEBUG_pageWidth=600,DEBUG_pageHeight=400,16774869],[-1,-1,-1,-1],10,1],["rect",2,[200,100,0,-1,-1,1,1,0,0],[0,0,200,100,0,0,"   (2)",1,1,"0x5500D4",[3,4],3],[-1,-1],10,1]];const MARKERS=[65472,65473,65474,65475,65477,65478,65479,65480,65481,65482,65483,65484,65485,65486,65487],COLOR_SPACE_MAP={1:"DeviceGray",3:"DeviceRGB",4:"DeviceCMYK"};function base64ToArrayBuffer(e){for(var t=window.atob(e),n=t.length,r=new Uint8Array(n),a=0;a<n;a++)r[a]=t.charCodeAt(a);return r.buffer}function stringToArray(e){for(var t=e.length,n=new Uint8Array(t),r=0;r<t;r++)n[r]=e.charCodeAt(r);return n.buffer}function stringUTF8ToArray(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r>255){var a=255&r,o=r>>8;t.push(o),t.push(a)}else t.push(r)}return new Uint8Array(t).buffer}function arrayBufferToString(e){for(var t="",n=0;n<e.byteLength;n++){t+=String.fromCharCode(e[n])}return t}function readUint16(e,t){return parseInt(e[t])<<8|parseInt(e[t+1])}function JPEG(e){var t={};t.data=new Uint8Array(base64ToArrayBuffer(e));var n,r=0;for(65496!=(n=readUint16(t.data,r))&&console.log("Not a JPEG file"),r+=2;r<t.data.length&&(n=readUint16(t.data,r),r+=2,!MARKERS.includes(n));)r+=readUint16(t.data,r);r+=2,t.bits=t.data[r],r+=1,t.width=readUint16(t.data,r),r+=2,t.height=readUint16(t.data,r),r+=2;var a=t.data[r];return r+=1,t.colorSpace=COLOR_SPACE_MAP[a],t}var gID=0,globalPdfBody="",globalObjectList=[{id:0,offset:0}],globalPdfSecondaryBody="",globalSecondaryObjectList=[],globalPageWidth=200,globalPageHeight=200,LINEJOIN={mitter:0,round:1,bevel:2},LINECAP={butt:0,round:1,squre:2},tempObjList=[];function getNextId(){return gID+=1}var globalResourceId=0;function getResourceId(){var e=globalResourceId;return++globalResourceId,e}function pushToBody(e){globalPdfBody+=e+"\n"}function paddedNumber(e,t){var n="",r="",a=e.toString(10);if(a.length<t){for(var o=0;o<t-a.length;++o)n+="0";r=n+=a}return r}function saveFile(e,t){var n=document.createElement("a");n.href=t,n.download=e,n.dispatchEvent(new MouseEvent("click"))}function isNumeric(e){return!isNaN(e)}function format(){var e="";if(1==arguments.length)e=arguments[0];else if(arguments.length>=2){e=arguments[0];for(var t=1;t<arguments.length;++t){var n=new RegExp("\\{"+(t-1)+"\\}","g"),r=arguments[t];if(isNumeric(r)){var a=1e-6;r<a&&r>-a&&(r=0)}e=e.replace(n,r)}}return e}function strarray(e){for(var t="[ ",n=0;n<e.length;n++)t+=e[n]+" ";return t+="]"}function getNextByteOffset(e){return stringToArray(e).byteLength+1}function pushObjectToFront(e,t){var n=getNextByteOffset(globalPdfBody);globalPdfBody+=t;var r={id:e,offset:n};globalObjectList.push(r)}function pushObjectOld(e,t){var n=getNextByteOffset(globalPdfSecondaryBody);globalPdfSecondaryBody+=t;var r={id:e,offset:n};globalSecondaryObjectList.push(r)}function pushObject(e){var t=getNextId(),n=tempObjList.length;return tempObjList.push({id:t,object:e}),n}function renderDict(e){var t="";for(var n in e)"Stream"!==n&&(t+=format("     {0} {1}\n",renderType(n),renderType(e[n])));return t}function renderType(e){var t="";if("string"==typeof e)t=format("/{0}",e);else if("number"==typeof e)t=format("{0}",e);else if(Array.isArray(e)){t+="[ ";for(var n=0;n<e.length;++n){var r=e[n];t+=format("{0} ",renderType(r))}t+="]"}else if("boolean"==typeof e)t=format("{0}",e);else if("object"==typeof e){var a=e.t;0===Object.keys(e).length&&e.constructor===Object?t=format("<< >>"):"link"==a?t=format("{0} 0 R",e.content):"dict"==a?(t+="\n << \n",t+=renderDict(e.content),t+=" >> \n"):t=format("<< {0} >>",JSON.stringify(e))}return t}function renderObjects(){for(var e=0;e<tempObjList.length;++e){var t="",n=tempObjList[e],r="Stream"in n.object&&"Length"in n.object;if(r){var a=n.object.Stream,o=getNextByteOffset(a);n.object.Length=o,a="stream\n"+(a+="\nendstream\n")}for(var i in t+=format("{0} 0 obj\n",n.id),t+=format("  << \n"),n.object)"Stream"!==i&&(t+=format("     {0} {1}\n",renderType(i),renderType(n.object[i])));t+=format("  >>\n"),r&&(t+=a),t+=format("endobj\n\n"),tempObjList[e].offset=getNextByteOffset(globalPdfBody),globalPdfBody+=t}}function createTransforms(e){var t="",n=[0,0,0,0,0,0];0==e.scaleX&&(e.scaleX=1),0==e.scaleY&&(e.scaleY=1),n[4]+=e.x,n[5]+=e.y,n[0]=e.scaleX,n[3]=e.scaleY;var r=e.angle,a=e.skewX,o=e.skewY;return a==Math.PI/2&&(a=0),o==Math.PI/2&&(o=0),n[0]=e.scaleX*Math.cos(r+a),n[1]=e.scaleX*Math.sin(r+a),n[2]=e.scaleY*-Math.sin(r-o),n[3]=e.scaleY*Math.cos(r-o),t+=format("{0} {1} {2} {3} {4} {5} cm\n",n[0],n[1],n[2],n[3],n[4],n[5])}function getColoringFromString(e){var t={};return"("==(e=e.trim())[0]&&")"==e[e.length-1]?(t.type="link",t.value=parseInt(e.slice(1,e.length-1))):(t.type="color",t.value=parseInt(e)),t}function getShape(e,t,n,r=!1){var a=t[0],o=(t[1],t[2]),i=t[3],l=(t[4],t[5],t[6],{});l.x=o[0],l.y=o[1],l.angle=o[2],l.rotX=o[3],l.rotY=o[4],l.scaleX=o[5],l.scaleY=o[6],l.skewX=o[7],l.skewY=o[8];var c="",s="";switch(s+=createTransforms(l),a){case"canvas":globalPageWidth=i[0],globalPageHeight=i[1];var f=((k=i[2])>>16&255)/255,d=(k>>8&255)/255,g=(k>>0&255)/255;r||(s+=format("{0} {1} {2} rg\n",f,d,g)),s+=format("0 0 {0} {1} re f\n",globalPageWidth,globalPageHeight);break;case"rect":var m=i[0],b=i[1],p=i[2],u=i[3],h=getColoringFromString(i[6]),y=i[8],v=getColoringFromString(i[9]),j=i[10],O=i[11],P=format("{0} {1} {2} {3} re \n",m,b,p,u);if(!r){var B=(v.value>>16&255)/255,T=(v.value>>8&255)/255,S=(v.value>>0&255)/255;if(s+=format("{0} {1} {2} RG\n",B,T,S),s+=format("{0} w \n",y),s+=format("{0} {1} d \n",strarray(j),O),"color"==h.type){f=(h.value>>16&255)/255,d=(h.value>>8&255)/255,g=(h.value>>0&255)/255;s+=format("{0} {1} {2} rg\n",f,d,g)}}s+=P,r||(s+="b \n");break;case"circle":var L=i[0],I=i[1],C=i[2],k=i[3],x=(y=i[5],i[6]),w=(j=i[7],O=i[8],L+C),G=I,R=L,E=I+C,D=L-C,N=I,A=L,M=I-C;f=(k>>16&255)/255,d=(k>>8&255)/255,g=(k>>0&255)/255,B=(x>>16&255)/255,T=(x>>8&255)/255,S=(x>>0&255)/255;r||(s+=format("{0} {1} {2} rg\n",f,d,g),s+=format("{0} {1} {2} RG\n",B,T,S),s+=format("{0} w \n",y),s+=format("{0} {1} d \n",strarray(j),O)),s+=format("{0} {1} m \n",w,G),s+=format("{0} {1} {2} {3} y \n",R+C,E,R,E),s+=format("{0} {1} {2} {3} v \n",D,N+C,D,N),s+=format("{0} {1} {2} {3} v \n",A-C,M,A,M),s+=format("{0} {1} {2} {3} v \n",w,G-C,w,G),r||(s+="b\n");break;case"ellipse":L=i[0],I=i[1];var U=i[2],F=i[3];k=i[4],y=i[6],x=i[7],j=i[8],O=i[9],w=L+U,G=I,R=L,E=I+F,D=L-U,N=I,A=L,M=I-F,f=(k>>16&255)/255,d=(k>>8&255)/255,g=(k>>0&255)/255,B=(x>>16&255)/255,T=(x>>8&255)/255,S=(x>>0&255)/255;r||(s+=format("{0} {1} {2} rg\n",f,d,g),s+=format("{0} {1} {2} RG\n",B,T,S),s+=format("{0} w \n",y),s+=format("{0} {1} d \n",strarray(j),O)),s+=format("{0} {1} m \n",w,G),s+=format("{0} {1} {2} {3} y \n",R+U,E,R,E),s+=format("{0} {1} {2} {3} v \n",R-U,E,D,N),s+=format("{0} {1} {2} {3} v \n",A-U,M,A,M),s+=format("{0} {1} {2} {3} v \n",w,G-F,w,G),r||(s+="b\n");break;case"polygon":var W=i[0],X=parseInt(W.length/2),_=(k=i[1],y=i[4],x=i[5],j=i[6],O=i[7],i[8]),Y=i[9];f=(k>>16&255)/255,d=(k>>8&255)/255,g=(k>>0&255)/255,B=(x>>16&255)/255,T=(x>>8&255)/255,S=(x>>0&255)/255;if(r||(s+=format("{0} {1} {2} rg\n",f,d,g),s+=format("{0} {1} {2} RG\n",B,T,S),s+=format("{0} w \n",y),s+=format("{0} {1} d \n",strarray(j),O),s+=format("{0} j\n",LINEJOIN[_]),s+=format("{0} M\n",Y)),X>=2){s+=format("{0} {1} m \n",W[0],W[1]);for(var H=1;H<X;++H){m=W[2*H],b=W[2*H+1];s+=format("{0} {1} l \n",m,b)}r||(s+="b\n")}break;case"line":var J=i[0],K=i[1],z=i[2],q=i[3],Q=(y=i[5],x=i[6],j=i[7],O=i[8],i[9]);B=(x>>16&255)/255,T=(x>>8&255)/255,S=(x>>0&255)/255;r||(s+=format("{0} {1} {2} RG\n",B,T,S),s+=format("{0} w \n",y),s+=format("{0} {1} d \n",strarray(j),O),s+=format("{0} J\n",LINECAP[Q])),s+=format("{0} {1} m  {2} {3} l \n",J,K,z,q),r||(s+="S \n");break;case"polyline":W=i[0],X=parseInt(W.length/2),y=i[2],x=i[3],j=i[4],O=i[5],_=i[6],Y=i[7],Q=i[8],B=(x>>16&255)/255,T=(x>>8&255)/255,S=(x>>0&255)/255;if(r||(s+=format("{0} {1} {2} RG\n",B,T,S),s+=format("{0} w \n",y),s+=format("{0} {1} d \n",strarray(j),O),s+=format("{0} j\n",LINEJOIN[_]),s+=format("{0} M\n",Y),s+=format("{0} J\n",LINECAP[Q])),X>=2){s+=format("{0} {1} m \n",W[0],W[1]);for(H=1;H<X;++H){m=W[2*H],b=W[2*H+1];s+=format("{0} {1} l \n",m,b)}}r||(s+="S\n");break;case"path":var V=i[0];k=i[1],y=i[4],x=i[5],j=i[6],O=i[7],_=i[8],Y=i[9],Q=i[10],f=(k>>16&255)/255,d=(k>>8&255)/255,g=(k>>0&255)/255,B=(x>>16&255)/255,T=(x>>8&255)/255,S=(x>>0&255)/255;r||(s+=format("{0} {1} {2} RG\n",B,T,S),s+=format("{0} {1} {2} rg\n",f,d,g),s+=format("{0} w \n",y),s+=format("{0} {1} d \n",strarray(j),O),s+=format("{0} j\n",LINEJOIN[_]),s+=format("{0} M\n",Y),s+=format("{0} J\n",LINECAP[Q]));for(var Z=0;Z<V.length;++Z){for(var $=V[Z],ee=$[0],te="",ne=1;ne<$.length;++ne)te+=$[ne]+" ";var re="";if("M"==ee)re+=te+" m \n";else if("L"==ee)re+=te+" l \n";else if("Z"==ee)re+=" h \n";else if("C"==ee)re+=te+" c \n";else if("Q"==ee){J=$[1],K=$[2],m=$[3],b=$[4];re+=format("{0} {1} {2} {3} {4} {5} c\n",J,K,J,K,m,b)}else if("S"==ee){z=$[1],q=$[2],m=$[3],b=$[4];re+=format("{0} {1} {2} {3} v\n",z,q,m,b)}else if("A"==ee){m=$[3],b=$[4];re+=format("{0} {1} {2} {3} v\n",z,q,m,b)}else if("H"==ee){m=$[1];re+=format("{0} {1} m \n",m,0),re+=format("{0} {1} l \n",m,globalPageHeight)}else if("V"==ee){b=$[1];re+=format("{0} {1} m \n",0,b),re+=format("{0} {1} l \n",globalPageWidth,b)}s+=re}r||(s+=" b\n");break;case"image":m=i[0],b=i[1],p=i[2],u=i[3];var ae=i[4],oe=(y=i[6],x=i[7],j=i[8],O=i[9],B=(x>>16&255)/255,T=(x>>8&255)/255,S=(x>>0&255)/255,m-y/2),ie=b-y/2,le=p+y,ce=u+y,se=tempObjList[n],fe=JPEG(ae),de={Type:"XObject",Subtype:"Image",Width:fe.width,Height:fe.height,ColorSpace:fe.colorSpace,BitPerComponent:fe.bits,Length:fe.data.length,Filter:"DCTDecode",Stream:arrayBufferToString(fe.data)},ge=pushObject(de),me=tempObjList[ge],be="Im"+getResourceId(),pe={t:"link",content:me.id};se.resourceObject.object.XObject.content[be]=pe,r||(s+=format("{0} {1} {2} RG \n",B,T,S),s+=format("{0} w \n",y),s+=format("{0} {1} {2} {3} re h s\n",oe,ie,le,ce),s+=format("{0} {1} d \n",strarray(j),O),s+=format("{0} {1} {2} {3} {4} {5} cm \n",p,0,0,u,m,b),s+=format("/{0} Do\n",be));break;case"tspan":m=i[0],b=i[1],i[2];var ue=i[3],he=i[5],ye=i[6],ve=i[7],je=i[8],Oe=(i[9],i[10]),Pe=i[11];f=(he>>16&255)/255,d=(he>>8&255)/255,g=(he>>0&255)/255,B=(ve>>16&255)/255,T=(ve>>8&255)/255,S=(ve>>0&255)/255;r||(s+=format("{0} {1} {2} rg \n",f,d,g),s+=format("{0} {1} {2} RG \n",B,T,S),s+=format("{0} w \n",ye),s+="BT\n",s+="2 Tr \n",s+=format("{0} Tc\n",Oe),s+=format("{0} Tw\n",Pe),s+=format("/F13 {0} Tf \n",je)),s+=format("{0} {1} Td \n",m,b),s+=format("( {0} ) Tj \n",ue),r||(s+="ET\n");break;case"clipPath":for(var Be=i[0],Te=(i[1],i[2],0);Te<Be.length;++Te){var Se=e[Be[Te]];s+=getShape(e,Se,n,!0),s+=" W n\n"}break;case"pattern":m=i[0],b=i[1],p=i[2],u=i[3],Be=i[8];for(var Le="",Ie=0;Ie<Be.length;++Ie){var Ce=e[Be[Ie]];Le+=getShape(e,Ce,n)}se=tempObjList[n];var ke=pushObject({Type:"Pattern",PatternType:1,PaintType:1,TilingType:2,BBox:[0,0,100,100],XStep:p,YStep:u,Stream:Le,Length:0}),xe=tempObjList[ke],we="P"+getResourceId(),Ge={t:"link",content:xe.id};se.resourceObject.object.Pattern.content[we]=Ge;r||(s+="\n                0.0 G\n                1.0 1.0 0.0 rg\n% Set nonstroking colour to yellow \n25 175 175 -150 re\n% Construct rectangular path \nf\n                ",s+=format("/Pattern cs\n"),s+=format("/{0} scn\n",we),s+="\n                    99.92 49.92 m\n% Start new path \n99.92 77.52 77.52 99.92 49.92 99.92 c\n% Construct lower-left circle \n22.32 99.92 -0.08 77.52 -0.08 49.92 c \n-0.08 22.32 22.32 -0.08 49.92 -0.08 c \n77.52 -0.08 99.92 22.32 99.92 49.92 c \nB\n% Fill and stroke path \n \n224.96 49.92 m\n% Start new path \n224.96 77.52 202.56 99.92 174.96 99.92 c\n% Construct lower-right circle \n147.36 99.92 124.96 77.52 124.96 49.92 c \n124.96 22.32 147.36 -0.08 174.96 -0.08 c \n202.56 -0.08 224.96 22.32 224.96 49.92 c \nB\n% Fill and stroke path \n \n87.56 201.70 m\n% Start new path \n63.66 187.90 55.46 157.32 69.26 133.40 c\n% Construct upper circle \n83.06 109.50 113.66 101.30 137.56 115.10 c \n161.46 128.90 169.66 159.50 155.86 183.40 c \n142.06 207.30 111.46 215.50 87.56 201.70 c \nB\n% Fill and stroke path \n \n50 50 m\n% Start new path \n175 50 l\n% Construct triangular path \n112.5 158.253 l \nb\n% Close, fill, and stro\n                    ");break;case"linearGradient":se=tempObjList[n];var Re=pushObject({FunctionType:2,Domain:[0,1],C0:[1,0,0],C1:[1,1,0],N:1}),Ee={ShadingType:2,ColorSpace:"DeviceRGB",Coords:[40,30,10,90],Function:{t:"link",content:tempObjList[Re].id},Extend:[!1,!0]},De=pushObject(Ee),Ne=tempObjList[De],Ae="Sh"+getResourceId(),Me={t:"link",content:Ne.id};s+="\n                20 20 300 100 re W n\n                b\n\n                /Sh0 sh\n                ",se.resourceObject.object.Shading.content[Ae]=Me;break;case"radialGradient":se=tempObjList[n],Re=pushObject({FunctionType:2,Domain:[0,1],C0:[1,0,0],C1:[1,1,0],N:1}),Ee={ShadingType:3,ColorSpace:"DeviceRGB",Coords:[100,100,50,100,100,190],Function:{t:"link",content:tempObjList[Re].id},Extend:[!0,!0]},De=pushObject(Ee),Ne=tempObjList[De],Ae="Sh"+getResourceId(),Me={t:"link",content:Ne.id};s+="\n                90 20 300 100 re W n\n                b\n                /Sh0 sh\n                ",se.resourceObject.object.Shading.content[Ae]=Me}return r?c+=s:(c+="q\n",c+=s,c+="Q\n"),c}function processData(e,t){for(var n="",r=0;r<e.length;r++){var a=e[r],o=(a[4],a[5],"");a[6]&&(o+=getShape(e,a,t)),n+="%  "+a[0]+" -----------------------------------------------\n",n+=o,n+="\n\n"}return n+="\n"}function pdfAddPage(e,t){var n=pushObject({Type:"Page",Parent:{t:"link",content:t},Resources:{},MediaBox:[0,0,200,200],Contents:{t:"link",content:1}}),r=tempObjList[n],a=pushObject({ProcSet:["PDF","ImageB"],XObject:{t:"dict",content:{}},Pattern:{t:"dict",content:{}},Shading:{t:"dict",content:{}}}),o=tempObjList[a];r.resourceObject=o,r.object.Resources={t:"link",content:o.id};var i=processData(e,n),l=pushObject({Length:20,Stream:i}),c=tempObjList[l];return r.object.MediaBox[2]=globalPageWidth,r.object.MediaBox[3]=globalPageHeight,r.object.Contents={t:"link",content:c.id},n}function pdfGenBody(e){var t=pushObject({Type:"Catalog",Pages:0}),n=pushObject({Type:"Pages",Kids:[],Count:0}),r=tempObjList[t],a=tempObjList[n],o=pdfAddPage(e,a.id),i=tempObjList[o];r.object.Pages={t:"link",content:a.id},a.object.Count=1,a.object.Kids=[{t:"link",content:i.id}],renderObjects()}function pdfMainComosite(e){globalPdfBody="",tempObjList=[],gID=0;pushToBody("%PDF-1.7\n%¥±¥±ëë\n\n"),pdfGenBody(e);var t=getNextByteOffset(globalPdfBody);pushToBody("xref");var n=tempObjList.length+1;pushToBody("0 "+n),pushToBody("0000000000 65535 f ");for(var r=0;r<tempObjList.length;++r){tempObjList[r].id;var a=paddedNumber(tempObjList[r].offset,10);pushToBody(a+" 00000 n ")}pushToBody("trailer"),pushToBody("  << /Root 1 0 R"),pushToBody("     /Size "+n),pushToBody("  >>"),pushToBody("startxref"),pushToBody(t);return pushToBody("%%EOF"),globalPdfBody}function genPdf(e,t,n,r){return pdfMainComosite(n)}gID=0,globalPdfBody="",globalObjectList=[{id:0,offset:0}],globalPdfSecondaryBody="",globalSecondaryObjectList=[],globalPageWidth=200,globalPageHeight=200,LINEJOIN={mitter:0,round:1,bevel:2},LINECAP={butt:0,round:1,squre:2},tempObjList=[];function getNextId(){return gID+=1}globalResourceId=0;function getResourceId(){var e=globalResourceId;return++globalResourceId,e}function pushToBody(e){globalPdfBody+=e+"\n"}function paddedNumber(e,t){var n="",r="",a=e.toString(10);if(a.length<t){for(var o=0;o<t-a.length;++o)n+="0";r=n+=a}return r}function saveFile(e,t){var n=document.createElement("a");n.href=t,n.download=e,n.dispatchEvent(new MouseEvent("click"))}function isNumeric(e){return!isNaN(e)}function format(){var e="";if(1==arguments.length)e=arguments[0];else if(arguments.length>=2){e=arguments[0];for(var t=1;t<arguments.length;++t){var n=new RegExp("\\{"+(t-1)+"\\}","g"),r=arguments[t];if(isNumeric(r)){var a=1e-6;r<a&&r>-a&&(r=0)}e=e.replace(n,r)}}return e}function strarray(e){for(var t="[ ",n=0;n<e.length;n++)t+=e[n]+" ";return t+="]"}function getNextByteOffset(e){return stringToArray(e).byteLength+1}function pushObjectToFront(e,t){var n=getNextByteOffset(globalPdfBody);globalPdfBody+=t;var r={id:e,offset:n};globalObjectList.push(r)}function pushObjectOld(e,t){var n=getNextByteOffset(globalPdfSecondaryBody);globalPdfSecondaryBody+=t;var r={id:e,offset:n};globalSecondaryObjectList.push(r)}function pushObject(e){var t=getNextId(),n=tempObjList.length;return tempObjList.push({id:t,object:e}),n}function renderDict(e){var t="";for(var n in e)"Stream"!==n&&(t+=format("     {0} {1}\n",renderType(n),renderType(e[n])));return t}function renderType(e){var t="";if("string"==typeof e)t=format("/{0}",e);else if("number"==typeof e)t=format("{0}",e);else if(Array.isArray(e)){t+="[ ";for(var n=0;n<e.length;++n){var r=e[n];t+=format("{0} ",renderType(r))}t+="]"}else if("boolean"==typeof e)t=format("{0}",e);else if("object"==typeof e){var a=e.t;0===Object.keys(e).length&&e.constructor===Object?t=format("<< >>"):"link"==a?t=format("{0} 0 R",e.content):"dict"==a?(t+="\n << \n",t+=renderDict(e.content),t+=" >> \n"):t=format("<< {0} >>",JSON.stringify(e))}return t}function renderObjects(){for(var e=0;e<tempObjList.length;++e){var t="",n=tempObjList[e],r="Stream"in n.object&&"Length"in n.object;if(r){var a=n.object.Stream,o=getNextByteOffset(a);n.object.Length=o,a="stream\n"+(a+="\nendstream\n")}for(var i in t+=format("{0} 0 obj\n",n.id),t+=format("  << \n"),n.object)"Stream"!==i&&(t+=format("     {0} {1}\n",renderType(i),renderType(n.object[i])));t+=format("  >>\n"),r&&(t+=a),t+=format("endobj\n\n"),tempObjList[e].offset=getNextByteOffset(globalPdfBody),globalPdfBody+=t}}function createTransforms(e){var t="",n=[0,0,0,0,0,0];0==e.scaleX&&(e.scaleX=1),0==e.scaleY&&(e.scaleY=1),n[4]+=e.x,n[5]+=e.y,n[0]=e.scaleX,n[3]=e.scaleY;var r=e.angle,a=e.skewX,o=e.skewY;return a==Math.PI/2&&(a=0),o==Math.PI/2&&(o=0),n[0]=e.scaleX*Math.cos(r+a),n[1]=e.scaleX*Math.sin(r+a),n[2]=e.scaleY*-Math.sin(r-o),n[3]=e.scaleY*Math.cos(r-o),t+=format("{0} {1} {2} {3} {4} {5} cm\n",n[0],n[1],n[2],n[3],n[4],n[5])}function getColoringFromString(e){var t={};return"("==(e=e.trim())[0]&&")"==e[e.length-1]?(t.type="link",t.value=parseInt(e.slice(1,e.length-1))):(t.type="color",t.value=parseInt(e)),t}function getShape(e,t,n,r=!1){var a=t[0],o=(t[1],t[2]),i=t[3],l=(t[4],t[5],t[6],{});l.x=o[0],l.y=o[1],l.angle=o[2],l.rotX=o[3],l.rotY=o[4],l.scaleX=o[5],l.scaleY=o[6],l.skewX=o[7],l.skewY=o[8];var c="",s="";switch(s+=createTransforms(l),a){case"canvas":globalPageWidth=i[0],globalPageHeight=i[1];var f=((k=i[2])>>16&255)/255,d=(k>>8&255)/255,g=(k>>0&255)/255;r||(s+=format("{0} {1} {2} rg\n",f,d,g)),s+=format("0 0 {0} {1} re f\n",globalPageWidth,globalPageHeight);break;case"rect":var m=i[0],b=i[1],p=i[2],u=i[3],h=getColoringFromString(i[6]),y=i[8],v=getColoringFromString(i[9]),j=i[10],O=i[11],P=format("{0} {1} {2} {3} re \n",m,b,p,u);if(!r){var B=(v.value>>16&255)/255,T=(v.value>>8&255)/255,S=(v.value>>0&255)/255;if(s+=format("{0} {1} {2} RG\n",B,T,S),s+=format("{0} w \n",y),s+=format("{0} {1} d \n",strarray(j),O),"color"==h.type){f=(h.value>>16&255)/255,d=(h.value>>8&255)/255,g=(h.value>>0&255)/255;s+=format("{0} {1} {2} rg\n",f,d,g)}}s+=P,r||(s+="b \n");break;case"circle":var L=i[0],I=i[1],C=i[2],k=i[3],x=(y=i[5],i[6]),w=(j=i[7],O=i[8],L+C),G=I,R=L,E=I+C,D=L-C,N=I,A=L,M=I-C;f=(k>>16&255)/255,d=(k>>8&255)/255,g=(k>>0&255)/255,B=(x>>16&255)/255,T=(x>>8&255)/255,S=(x>>0&255)/255;r||(s+=format("{0} {1} {2} rg\n",f,d,g),s+=format("{0} {1} {2} RG\n",B,T,S),s+=format("{0} w \n",y),s+=format("{0} {1} d \n",strarray(j),O)),s+=format("{0} {1} m \n",w,G),s+=format("{0} {1} {2} {3} y \n",R+C,E,R,E),s+=format("{0} {1} {2} {3} v \n",D,N+C,D,N),s+=format("{0} {1} {2} {3} v \n",A-C,M,A,M),s+=format("{0} {1} {2} {3} v \n",w,G-C,w,G),r||(s+="b\n");break;case"ellipse":L=i[0],I=i[1];var U=i[2],F=i[3];k=i[4],y=i[6],x=i[7],j=i[8],O=i[9],w=L+U,G=I,R=L,E=I+F,D=L-U,N=I,A=L,M=I-F,f=(k>>16&255)/255,d=(k>>8&255)/255,g=(k>>0&255)/255,B=(x>>16&255)/255,T=(x>>8&255)/255,S=(x>>0&255)/255;r||(s+=format("{0} {1} {2} rg\n",f,d,g),s+=format("{0} {1} {2} RG\n",B,T,S),s+=format("{0} w \n",y),s+=format("{0} {1} d \n",strarray(j),O)),s+=format("{0} {1} m \n",w,G),s+=format("{0} {1} {2} {3} y \n",R+U,E,R,E),s+=format("{0} {1} {2} {3} v \n",R-U,E,D,N),s+=format("{0} {1} {2} {3} v \n",A-U,M,A,M),s+=format("{0} {1} {2} {3} v \n",w,G-F,w,G),r||(s+="b\n");break;case"polygon":var W=i[0],X=parseInt(W.length/2),_=(k=i[1],y=i[4],x=i[5],j=i[6],O=i[7],i[8]),Y=i[9];f=(k>>16&255)/255,d=(k>>8&255)/255,g=(k>>0&255)/255,B=(x>>16&255)/255,T=(x>>8&255)/255,S=(x>>0&255)/255;if(r||(s+=format("{0} {1} {2} rg\n",f,d,g),s+=format("{0} {1} {2} RG\n",B,T,S),s+=format("{0} w \n",y),s+=format("{0} {1} d \n",strarray(j),O),s+=format("{0} j\n",LINEJOIN[_]),s+=format("{0} M\n",Y)),X>=2){s+=format("{0} {1} m \n",W[0],W[1]);for(var H=1;H<X;++H){m=W[2*H],b=W[2*H+1];s+=format("{0} {1} l \n",m,b)}r||(s+="b\n")}break;case"line":var J=i[0],K=i[1],z=i[2],q=i[3],Q=(y=i[5],x=i[6],j=i[7],O=i[8],i[9]);B=(x>>16&255)/255,T=(x>>8&255)/255,S=(x>>0&255)/255;r||(s+=format("{0} {1} {2} RG\n",B,T,S),s+=format("{0} w \n",y),s+=format("{0} {1} d \n",strarray(j),O),s+=format("{0} J\n",LINECAP[Q])),s+=format("{0} {1} m  {2} {3} l \n",J,K,z,q),r||(s+="S \n");break;case"polyline":W=i[0],X=parseInt(W.length/2),y=i[2],x=i[3],j=i[4],O=i[5],_=i[6],Y=i[7],Q=i[8],B=(x>>16&255)/255,T=(x>>8&255)/255,S=(x>>0&255)/255;if(r||(s+=format("{0} {1} {2} RG\n",B,T,S),s+=format("{0} w \n",y),s+=format("{0} {1} d \n",strarray(j),O),s+=format("{0} j\n",LINEJOIN[_]),s+=format("{0} M\n",Y),s+=format("{0} J\n",LINECAP[Q])),X>=2){s+=format("{0} {1} m \n",W[0],W[1]);for(H=1;H<X;++H){m=W[2*H],b=W[2*H+1];s+=format("{0} {1} l \n",m,b)}}r||(s+="S\n");break;case"path":var V=i[0];k=i[1],y=i[4],x=i[5],j=i[6],O=i[7],_=i[8],Y=i[9],Q=i[10],f=(k>>16&255)/255,d=(k>>8&255)/255,g=(k>>0&255)/255,B=(x>>16&255)/255,T=(x>>8&255)/255,S=(x>>0&255)/255;r||(s+=format("{0} {1} {2} RG\n",B,T,S),s+=format("{0} {1} {2} rg\n",f,d,g),s+=format("{0} w \n",y),s+=format("{0} {1} d \n",strarray(j),O),s+=format("{0} j\n",LINEJOIN[_]),s+=format("{0} M\n",Y),s+=format("{0} J\n",LINECAP[Q]));for(var Z=0;Z<V.length;++Z){for(var $=V[Z],ee=$[0],te="",ne=1;ne<$.length;++ne)te+=$[ne]+" ";var re="";if("M"==ee)re+=te+" m \n";else if("L"==ee)re+=te+" l \n";else if("Z"==ee)re+=" h \n";else if("C"==ee)re+=te+" c \n";else if("Q"==ee){J=$[1],K=$[2],m=$[3],b=$[4];re+=format("{0} {1} {2} {3} {4} {5} c\n",J,K,J,K,m,b)}else if("S"==ee){z=$[1],q=$[2],m=$[3],b=$[4];re+=format("{0} {1} {2} {3} v\n",z,q,m,b)}else if("A"==ee){m=$[3],b=$[4];re+=format("{0} {1} {2} {3} v\n",z,q,m,b)}else if("H"==ee){m=$[1];re+=format("{0} {1} m \n",m,0),re+=format("{0} {1} l \n",m,globalPageHeight)}else if("V"==ee){b=$[1];re+=format("{0} {1} m \n",0,b),re+=format("{0} {1} l \n",globalPageWidth,b)}s+=re}r||(s+=" b\n");break;case"image":m=i[0],b=i[1],p=i[2],u=i[3];var ae=i[4],oe=(y=i[6],x=i[7],j=i[8],O=i[9],B=(x>>16&255)/255,T=(x>>8&255)/255,S=(x>>0&255)/255,m-y/2),ie=b-y/2,le=p+y,ce=u+y,se=tempObjList[n],fe=JPEG(ae),de={Type:"XObject",Subtype:"Image",Width:fe.width,Height:fe.height,ColorSpace:fe.colorSpace,BitPerComponent:fe.bits,Length:fe.data.length,Filter:"DCTDecode",Stream:arrayBufferToString(fe.data)},ge=pushObject(de),me=tempObjList[ge],be="Im"+getResourceId(),pe={t:"link",content:me.id};se.resourceObject.object.XObject.content[be]=pe,r||(s+=format("{0} {1} {2} RG \n",B,T,S),s+=format("{0} w \n",y),s+=format("{0} {1} {2} {3} re h s\n",oe,ie,le,ce),s+=format("{0} {1} d \n",strarray(j),O),s+=format("{0} {1} {2} {3} {4} {5} cm \n",p,0,0,u,m,b),s+=format("/{0} Do\n",be));break;case"tspan":m=i[0],b=i[1],i[2];var ue=i[3],he=i[5],ye=i[6],ve=i[7],je=i[8],Oe=(i[9],i[10]),Pe=i[11];f=(he>>16&255)/255,d=(he>>8&255)/255,g=(he>>0&255)/255,B=(ve>>16&255)/255,T=(ve>>8&255)/255,S=(ve>>0&255)/255;r||(s+=format("{0} {1} {2} rg \n",f,d,g),s+=format("{0} {1} {2} RG \n",B,T,S),s+=format("{0} w \n",ye),s+="BT\n",s+="2 Tr \n",s+=format("{0} Tc\n",Oe),s+=format("{0} Tw\n",Pe),s+=format("/F13 {0} Tf \n",je)),s+=format("{0} {1} Td \n",m,b),s+=format("( {0} ) Tj \n",ue),r||(s+="ET\n");break;case"clipPath":for(var Be=i[0],Te=(i[1],i[2],0);Te<Be.length;++Te){var Se=e[Be[Te]];s+=getShape(e,Se,n,!0),s+=" W n\n"}break;case"pattern":m=i[0],b=i[1],p=i[2],u=i[3],Be=i[8];for(var Le="",Ie=0;Ie<Be.length;++Ie){var Ce=e[Be[Ie]];Le+=getShape(e,Ce,n)}se=tempObjList[n];var ke=pushObject({Type:"Pattern",PatternType:1,PaintType:1,TilingType:2,BBox:[0,0,100,100],XStep:p,YStep:u,Stream:Le,Length:0}),xe=tempObjList[ke],we="P"+getResourceId(),Ge={t:"link",content:xe.id};se.resourceObject.object.Pattern.content[we]=Ge;r||(s+="\n                0.0 G\n                1.0 1.0 0.0 rg\n% Set nonstroking colour to yellow \n25 175 175 -150 re\n% Construct rectangular path \nf\n                ",s+=format("/Pattern cs\n"),s+=format("/{0} scn\n",we),s+="\n                    99.92 49.92 m\n% Start new path \n99.92 77.52 77.52 99.92 49.92 99.92 c\n% Construct lower-left circle \n22.32 99.92 -0.08 77.52 -0.08 49.92 c \n-0.08 22.32 22.32 -0.08 49.92 -0.08 c \n77.52 -0.08 99.92 22.32 99.92 49.92 c \nB\n% Fill and stroke path \n \n224.96 49.92 m\n% Start new path \n224.96 77.52 202.56 99.92 174.96 99.92 c\n% Construct lower-right circle \n147.36 99.92 124.96 77.52 124.96 49.92 c \n124.96 22.32 147.36 -0.08 174.96 -0.08 c \n202.56 -0.08 224.96 22.32 224.96 49.92 c \nB\n% Fill and stroke path \n \n87.56 201.70 m\n% Start new path \n63.66 187.90 55.46 157.32 69.26 133.40 c\n% Construct upper circle \n83.06 109.50 113.66 101.30 137.56 115.10 c \n161.46 128.90 169.66 159.50 155.86 183.40 c \n142.06 207.30 111.46 215.50 87.56 201.70 c \nB\n% Fill and stroke path \n \n50 50 m\n% Start new path \n175 50 l\n% Construct triangular path \n112.5 158.253 l \nb\n% Close, fill, and stro\n                    ");break;case"linearGradient":se=tempObjList[n];var Re=pushObject({FunctionType:2,Domain:[0,1],C0:[1,0,0],C1:[1,1,0],N:1}),Ee={ShadingType:2,ColorSpace:"DeviceRGB",Coords:[40,30,10,90],Function:{t:"link",content:tempObjList[Re].id},Extend:[!1,!0]},De=pushObject(Ee),Ne=tempObjList[De],Ae="Sh"+getResourceId(),Me={t:"link",content:Ne.id};s+="\n                20 20 300 100 re W n\n                b\n\n                /Sh0 sh\n                ",se.resourceObject.object.Shading.content[Ae]=Me;break;case"radialGradient":se=tempObjList[n],Re=pushObject({FunctionType:2,Domain:[0,1],C0:[1,0,0],C1:[1,1,0],N:1}),Ee={ShadingType:3,ColorSpace:"DeviceRGB",Coords:[100,100,50,100,100,190],Function:{t:"link",content:tempObjList[Re].id},Extend:[!0,!0]},De=pushObject(Ee),Ne=tempObjList[De],Ae="Sh"+getResourceId(),Me={t:"link",content:Ne.id};s+="\n                90 20 300 100 re W n\n                b\n                /Sh0 sh\n                ",se.resourceObject.object.Shading.content[Ae]=Me}return r?c+=s:(c+="q\n",c+=s,c+="Q\n"),c}function processData(e,t){for(var n="",r=0;r<e.length;r++){var a=e[r],o=(a[4],a[5],"");a[6]&&(o+=getShape(e,a,t)),n+="%  "+a[0]+" -----------------------------------------------\n",n+=o,n+="\n\n"}return n+="\n"}function pdfAddPage(e,t){var n=pushObject({Type:"Page",Parent:{t:"link",content:t},Resources:{},MediaBox:[0,0,200,200],Contents:{t:"link",content:1}}),r=tempObjList[n],a=pushObject({ProcSet:["PDF","ImageB"],XObject:{t:"dict",content:{}},Pattern:{t:"dict",content:{}},Shading:{t:"dict",content:{}}}),o=tempObjList[a];r.resourceObject=o,r.object.Resources={t:"link",content:o.id};var i=processData(e,n),l=pushObject({Length:20,Stream:i}),c=tempObjList[l];return r.object.MediaBox[2]=globalPageWidth,r.object.MediaBox[3]=globalPageHeight,r.object.Contents={t:"link",content:c.id},n}function pdfGenBody(e){var t=pushObject({Type:"Catalog",Pages:0}),n=pushObject({Type:"Pages",Kids:[],Count:0}),r=tempObjList[t],a=tempObjList[n],o=pdfAddPage(e,a.id),i=tempObjList[o];r.object.Pages={t:"link",content:a.id},a.object.Count=1,a.object.Kids=[{t:"link",content:i.id}],renderObjects()}function pdfMainComosite(e){globalPdfBody="",tempObjList=[],gID=0;pushToBody("%PDF-1.7\n%¥±¥±ëë\n\n"),pdfGenBody(e);var t=getNextByteOffset(globalPdfBody);pushToBody("xref");var n=tempObjList.length+1;pushToBody("0 "+n),pushToBody("0000000000 65535 f ");for(var r=0;r<tempObjList.length;++r){tempObjList[r].id;var a=paddedNumber(tempObjList[r].offset,10);pushToBody(a+" 00000 n ")}pushToBody("trailer"),pushToBody("  << /Root 1 0 R"),pushToBody("     /Size "+n),pushToBody("  >>"),pushToBody("startxref"),pushToBody(t);return pushToBody("%%EOF"),globalPdfBody}function genPdf(e,t,n,r){return pdfMainComosite(n)}function genCircle(e,t,n){return["circle",0,[e,t,0,-1,-1,0,0,0,0],[0,0,n,16765994,1,2,16744234,[20,9],1],[1,-1,-1,-1],10,1]}function genRect(e,t,n,r){return["rect",2,[e,t,0,-1,-1,1,1,0,0],[0,0,n,r,0,0,"     0x6c5353    ",1,0,"0xff9999",[3,5],0],[-1,-1],10,1]}function genText(e,t,n,r,a,o){return["tspan",4,[t,n,0,-1,-1,1,1,0,0],[0,0,[],e,"arial",a,1,o,r,500,1,1,0,0,0],[1,-1,-1,-1],10,1]}function range(e,t){return e+parseInt(Math.random()*(t-e))}var DEBUG_pageWidth,DEBUG_pageHeight,globalGameIsPlaying=!1,globalGameStarted=!1,globalT=0,globalPdfOptions="#toolbar=0&navpanes=0&scrollbar=0",ball=(DEBUG_data=[["canvas",1,[0,0,0,0,0,0,0,0,0],[DEBUG_pageWidth=600,DEBUG_pageHeight=400,16774869],[-1,-1,-1,-1],10,1]],{x:100,y:250,r:10,velocity:{x:12,y:12}}),paddle={x:150,y:10,width:90,height:10},bricks=[];function isCircleCollidingWithRect(e,t){var n=t.x-e.r,r=t.y+2*e.r,a=t.width+2*e.r,o=t.height+2*e.r;return n<e.x&&n+a>e.x&&r>e.y&&r-o<e.y}function circleCollisionSide(e,t){var n="--";return e.velocity.y>0?n="top":e.velocity.y<0&&(n="bottom"),n}function simulate(){var e=ball.x+ball.velocity.x,t=ball.y+ball.velocity.y;isCircleCollidingWithRect(ball,paddle)&&(t=paddle.y+2*paddle.height,ball.velocity.y*=-1);for(var n=0;n<bricks.length;n++){var r=bricks[n];if(isCircleCollidingWithRect(ball,r)){circleCollisionSide(ball,r);t=ball.y-1,ball.velocity.y*=-1,bricks.splice(n,1);break}}e>=DEBUG_pageWidth&&(e=DEBUG_pageWidth,ball.velocity.x*=-1),e<=0&&(e=0,ball.velocity.x*=-1),t>=DEBUG_pageHeight&&(t=DEBUG_pageHeight,ball.velocity.y*=-1),t<=0&&(t=0,globalGameIsPlaying=!1),ball.x=e,ball.y=t}function renderGame(){globalT+=.02;for(var e=DEBUG_data.slice(),t=0;t<40;t++){range(1,DEBUG_pageWidth),range(1,DEBUG_pageHeight),range(5,18);e.push(genCircle(20*t,200+100*Math.cos(globalT+.3*t),2,15984831),genCircle(20*t,200+100*Math.sin(globalT+.3*t),2,15984831))}for(t=0;t<bricks.length;t++){var n=bricks[t];n&&e.push(genRect(n.x,n.y,n.width,n.height))}return e.push(genRect(paddle.x,paddle.y,paddle.width,paddle.height)),e.push(genCircle(ball.x,ball.y,ball.r,ball.r)),e}function renderIntro(){var e=DEBUG_data.slice();return e.push(genText("Game of PDF arkanoid",10,250,50,16744234,16744234)),e.push(genText("To play the game",220,150,15,16744234,16744234)),e.push(genText("press SPACE",200,100,25,16722474,16722474)),e.push(genText("'A' key: move left",220,50,15,16744234,16744234)),e.push(genText("'D' key: move right",220,30,15,16744234,16744234)),e}function renderOutro(){var e=DEBUG_data.slice();return 0==bricks.length?(e.push(genRect(170,220,300,100)),e.push(genText("You WON!",180,250,50,16777215,16777215)),e.push(genText("Congratulations. You won your first pdf game",140,200,15,16744234,16744234)),e.push(genText("press SPACE to restart",195,100,20,16744234,16744234))):(e.push(genText("You Lost!",180,250,50,16711680,16711680)),e.push(genText(`There are ${bricks.length} bricks left`,220,200,15,16744234,16744234)),e.push(genText("press SPACE to restart",195,100,20,16744234,16744234))),e}function doGamePdf(){var e=renderGame(),t=stringToArray(genPdf("This is a title","Document Author",e,"")),n=new Blob([t],{type:"application/pdf"});return URL.createObjectURL(n)+globalPdfOptions}function movePad(e){var t=paddle.x+=e;t<0?t=0:t+paddle.width>=DEBUG_pageWidth&&(t=DEBUG_pageWidth-paddle.width),paddle.x=t}function setupKeys(){document.addEventListener("keypress",(function(e){"KeyA"==e.code?movePad(-10):"KeyD"==e.code?movePad(10):"Space"==e.code?(globalGameIsPlaying=!0,globalGameStarted=!0,initialize()):console.log(e.code)}))}function doIntro(e){document.createElement("embed");var t=renderIntro(),n=stringToArray(genPdf("Intro","Hereket",t,"")),r=new Blob([n],{type:"application/pdf"});return URL.createObjectURL(r)+globalPdfOptions}function doOutro(e){document.createElement("embed");var t=renderOutro(),n=stringToArray(genPdf("Intro","Hereket",t,"")),r=new Blob([n],{type:"application/pdf"});return URL.createObjectURL(r)+globalPdfOptions}function initialize(){ball={x:100,y:250,r:10,velocity:{x:12,y:12}},paddle={x:150,y:10,width:90,height:10},bricks=[];var e=(DEBUG_pageWidth-20-600)/9;yStartOffset=360;for(var t=0;t<5;t++)for(var n=0;n<10;n++){var r={x:10+n*(60+e),y:yStartOffset-15*t,width:60,height:15};bricks.push(r)}}let embedCount=3,embedList=[];var renderIndex=0,drawIndex=1;function moveDrawRenderIndexByOne(){(renderIndex+=1)==embedCount&&(renderIndex=0),(drawIndex+=1)==embedCount&&(drawIndex=0)}document.addEventListener("DOMContentLoaded",(function(){let e=document.getElementById("pdf_container");setupKeys(),initialize();for(let t=0;t<embedCount;t++){let t=document.createElement("embed");t.src=doIntro(e),embedList.push(t),e.append(t)}e.children[drawIndex].classList.add("show"),setInterval((function(){var t=document.createElement("embed");globalGameIsPlaying&&globalGameStarted&&(simulate(),t.src=doGamePdf()),globalGameIsPlaying||globalGameStarted||(t.src=doIntro(e,renderIndex,drawIndex)),!globalGameIsPlaying&&globalGameStarted&&(t.src=doOutro(e,renderIndex,drawIndex)),e.replaceChild(t,e.children[renderIndex]);for(let t=0;t<embedCount;t++)t==drawIndex?e.children[t].classList.add("show"):e.children[t].classList.remove("show");moveDrawRenderIndexByOne()}),100)}));