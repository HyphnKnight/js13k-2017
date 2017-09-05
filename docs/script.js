(function(){'use strict';function a(a,b){for(let c=-1;++c<a.length;)b(a[c],c,a);return a}function b(a,b,c){for(let d=-1;++d<a.length;)c=b(c,a[d],d,a);return c}function c(a,b=1){const c=[];for(let d=0;d<b&&d<a.length;)c.push(a[d++]);return c}function d(a,b=8){const c=n(10,b);return Math.round(a*c)/c}function e(a,b){const e=m(b),f=l(b);return[d(a[0]*f-a[1]*e),d(a[0]*e+a[1]*f)]}async function f(a,b){if(``===a)return await Oa(0.75*(1e3*b));const c=Na.createOscillator(),d=Na.createGain();d.gain.value=1.1-k(1,(Date.now()-Pa)/3e3),c.connect(d),c.type=`square`,c.frequency.value=a,d.connect(Na.destination),c.start(0),d.gain.exponentialRampToValueAtTime(1e-5,Na.currentTime+b),await Oa(0.75*(1e3*b))}async function g(a){Qa=!1;for(let b=-1,c=-1;!Qa&&++b<a.length;){const[d,e]=a[b];if(Array.isArray(d)){for(;++c<d.length-1;)f(d[c],Array.isArray(e)?e[c]:e);f(d[c],Array.isArray(e)?e[c]:e),await Oa(0.75*(1e3*(Array.isArray(e)?k(...e):e))),c=-1}else await f(d,e)}return await!0}var h=Math.max,j=Math.abs,k=Math.min,l=Math.cos,m=Math.sin,n=Math.pow;const o=(a,c=(a)=>!!a)=>b(a,(a,b,d,e)=>c(b,d,e)?q(a,b):a,[]),p=(a)=>a.slice(0),q=(a,b,c=0)=>{const d=p(a);return d.splice(c,0,b),d},r=(a)=>0<a?1:0>a?-1:0,s=(a)=>a*a,u=(a=(a)=>!!a)=>(b)=>a(b),v=u((a)=>null===a),w=u((a)=>'undefined'==typeof a),x=u((a)=>v(a)||w(a)),y=u((a)=>'string'==typeof a),z=u((a)=>'number'==typeof a),A=u((a)=>'boolean'==typeof a),B=u((a)=>'[object Date]'===Object.prototype.toString.call(a)),C=u((a)=>'[object Date]'===Object.prototype.toString.call(a)),D=u((a)=>Array.isArray(a)),E=u((a)=>a.__proto__===Map.prototype),F=u((a)=>a.__proto__===Set.prototype),G=u((a)=>{let b=a;if('object'!=typeof a||null===a)return!1;for(;b=Object.getPrototypeOf(b),null!==Object.getPrototypeOf(b););return Object.getPrototypeOf(a)===b}),H=u((a)=>x(a)||z(a)||A(a)||y(a)||C(a)||'symbol'==typeof a),I=u((a)=>x(a)||A(a)&&!a||y(a)&&''===a),J=u((a)=>z(a[0])&&z(a[1])),K=(a,b)=>[a[0]+b[0],a[1]+b[1]],L=(a,b)=>(a[0]+=b[0],a[1]+=b[1],a),M=(a,b)=>[a[0]-b[0],a[1]-b[1]],N=(a,b)=>(a[0]-=b[0],a[1]-=b[1],a),O=(a,b)=>(a[0]*=b,a[1]*=b,a),P=(a)=>s(a[0])+s(a[1]),Q=(a)=>Math.sqrt(P(a)),R=(a)=>0===a[0]&&0===a[1]?[0,0]:O(a,1/Q(a)),S=(a,b)=>O(R(a),b),T=(a,b)=>{const c=[];for(let d=0,e=a.length;d<e;d+=2)c[d]=a[d]+b[0],c[d+1]=a[d+1]+b[1];return c},U=(a,b)=>{for(let c=0,d=a.length;c<d;c+=2)a[c]+=b[0],a[c+1]+=b[1];return a},V=(a,b)=>{const c=[];for(let d=0,e=a.length;d<e;d+=2)c[d]=a[d]-b[0],c[d+1]=a[d+1]-b[1];return c},W=(a,b)=>{const e=[],f=m(b),g=l(b);for(let c=0,h=a.length;c<h;c+=2)e[c]=d(a[c]*g-a[c+1]*f),e[c+1]=d(a[c]*f+a[c+1]*g);return e},X=(a,b,c)=>T(W(V(a,b),c),b),Y=(a,b)=>{for(let c=0;c<a.length;c+=2)b([a[c],a[c+1]],c/2,a)},Z=()=>Math.random().toString(36).substr(2,9)+Math.random().toString(36).substr(2,9),$=u((a)=>'Point'===a.shape),_=u((a)=>'Circle'===a.shape),aa=u((a)=>'Rectangle'===a.shape),ba=u((a)=>'Polygon'===a.shape),ca=(a,b)=>[-a/2,+b/2,-a/2,-b/2,+a/2,-b/2,+a/2,+b/2],da=(a,b=0,c=1,d=1,e='')=>({id:Z(),shape:'Rectangle',label:e,position:a,rotation:b,width:c,height:d,points:ca(c,d)});let ea=document.createElement('canvas'),fa=ea.getContext('2d');const ga=(a)=>{ea=a;const b=a.getContext('2d');b&&(fa=b)},ha=[0,0],ia=(a)=>fa.translate(d(a[0],0),d(a[1],0)),ja=(a)=>fa.rotate(a),ka=(a,b,c)=>fa.clearRect(d(a[0],0),d(a[1],0),d(b,0),d(c,0)),la=()=>ka(ha,ea.width,ea.height),ma=(a)=>fa.moveTo(d(a[0],0),d(a[1],0)),na=(a)=>fa.lineTo(d(a[0],0),d(a[1],0)),oa=(a,b,c,e,f)=>fa.arc(d(a[0],0),d(a[1],0),b,c,e,f),pa=(a,b,c)=>fa.rect(d(a[0],0),d(a[1],0),d(b,0),d(c,0)),qa=(a,b=0)=>{const c=[a[0],a[1]],d=V(a,c);fa.save(),ia(c),ja(b),ma(ha),Y(d,na),fa.restore()},ra=(a,b,c=0)=>{const d=[b[b.length-2],b[b.length-1]];fa.save(),ia(a),ja(c),ma(d),Y(b,na),fa.restore()},sa=(a,b,c,e=0)=>{fa.save(),ia(a),ja(e),pa([-b/2,-c/2],d(b,0),d(c,0)),fa.restore()},ta=(a,b=100,c=0,d=0,e=2*Math.PI,f=!1)=>{fa.save(),ia(a),ja(c),oa(ha,b,d,e,f),fa.restore()},ua=(a)=>(b,...c)=>{fa.save(),fa.beginPath(),fa.fillStyle=b,a(...c),fa.fill(),fa.restore()},va=(a)=>(b,...c)=>{fa.save(),fa.beginPath(),fa.strokeStyle=b.style||'',fa.lineWidth=b.thickness||1,a(...c),fa.stroke(),fa.restore()},wa=ua(ra),xa=ua(sa),ya=ua(qa),za=ua(ta),Aa=va(ra),Ba=va(sa),Ca=va(qa),Da=va(ta),Ea=(a,b,c,e=0)=>{if(fa.save(),fa.fillStyle=a.style||'',fa.font=a.font||fa.font,fa.textAlign=a.textAlign||fa.textAlign,fa.textBaseline=a.textBaseline||fa.textBaseline,ja(e),a.horizontalAlign){const{width:a}=fa.measureText(c);ia([-a/2,0])}fa.fillText(c,d(b[0],0),d(b[1],0),a.maxWidth),fa.restore()},Fa=document.querySelector(`canvas`);ga(Fa),fa.imageSmoothingEnabled=!1;const Ga=160,Ha=192;let Ia=Fa.offsetWidth,Ja=Fa.offsetHeight,Ka=1,La=1;Fa.width=Ga,Fa.height=Ha;const Ma=()=>{const{top:a,left:b,width:c,height:d}=Fa.getBoundingClientRect();Ia=b,Ja=a,Ka=Ga/c,La=Ha/d};Ma(),window.addEventListener(`resize`,Ma);const Na=new AudioContext,Oa=(a)=>new Promise((b)=>setTimeout(b,a)),Pa=Date.now();let Qa=!1;const Ra=82.41,Sa=87.31,Ta=98,Ua=110,Va=130.81,Wa=164.81,Xa=174.61,Ya=196,Za=220,$a=246.94,_a=261.63,ab=293.66,bb=329.63,cb=349.23,db=392,eb=440,fb=493.88,gb=523.25,hb=587.33,ib=659.26,jb=783.99,kb=880,lb=987.77,mb=async()=>await g([[[bb,_a],1],[[ab,Ya],1],[[_a,Za],1],[[$a,Wa],1],[[Za,Xa],1],[[Ya,Va],1],[[Za,Xa],1],[[$a,Ya],1],[[1318.51,jb,gb],1],[[1174.66,lb,db],1],[[1046.5,eb],1],[[lb,jb,bb],1],[[kb,gb,cb],1],[[jb,ib,_a],1],[[kb,698.46,cb],1],[[lb,hb,db],1],[[gb,_a,bb],[0.5,1,1]],[gb,0.5],[[hb,ab,Ya],[0.5,1,1]],[fb,0.5],[[gb,bb,eb],[0.5,1,1]],[ib,0.5],[[jb,Wa],[0.5,1,1]],[db,0.5],[[eb,Za,Xa],[0.5,1,1]],[cb,0.5],[[bb,Va],[0.5,1,1]],[db,0.5],[[cb,Za,Xa],[0.5,1,1]],[gb,0.5],[[fb,$a,Ya],[0.5,1,1]],[db,0.5],[[_a,Wa,Va],[0.5,1,1]],[bb,0.25],[db,0.25],[[db,Ta],[0.25,1,1]],[eb,0.25],[db,0.25],[cb,0.25],[[bb,Ua,Va],[0.75,1,1]],[bb,0.25],[[bb,Ta,Ra],[0.25,1,1]],[cb,0.25],[bb,0.25],[ab,0.25],[[_a,Ua,Sa],[0.25,1,1]],[233.08,0.25],[Za,0.25],[$a,0.25],[[Ya,Ra,65.41],[0.5,1,1]],[Wa,0.5],[[Va,Ua,Sa],[0.5,1,1]],[Xa,0.25],[Wa,0.25],[[146.83,123.47,Ta],[0.5,1,1]],[Ya,0.25],[Xa,0.25],[[``,bb,_a],[0.5,1,1]],[gb,0.5],[[hb,Ya],[0.5,1,1]],[fb,0.5],[[gb,_a,Za],[0.5,1,1]],[bb,0.5],[[db,$a,Wa],[0.75,1,1]],[eb,0.25],[[cb,Za,Xa],[0.5,1,1]],[_a,0.5],[[bb,Ya,Va],[0.5,1,1]],[db,0.5],[[cb,Za,Xa],[0.5,1,1]],[bb,0.5],[[ab,$a,Ya],[0.5,1,1]],[db,0.5],[[bb,_a,Va],[2,2,2]]]),nb=()=>{Qa=!0},ob={38:`up`,40:`down`,37:`left`,39:`right`,81:`q`,87:`w`,69:`e`,65:`a`,83:`s`,68:`d`,48:`0`,49:`1`,50:`2`,51:`3`,52:`4`,53:`5`,54:`6`,55:`7`,56:`8`,57:`9`,189:`-`,187:`=`,32:`space`,13:`return`,16:`shift`,17:`ctrl`,9:`tab`,18:`alt`},pb={up:0,down:0,left:0,right:0,q:0,w:0,e:0,a:0,s:0,d:0,0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,"-":0,"=":0,space:0,return:0,shift:0,ctrl:0,tab:0,alt:0,mousePosition:null,click:null},qb=(a,b=1)=>{const c=ob[a];return c&&(0===b||2!==pb[c])&&(pb[c]=b),pb[c]};document.body.onkeyup=({keyCode:a})=>qb(a,0),document.body.onkeydown=({keyCode:a})=>qb(a,1);const rb=()=>{const a=Object.keys(pb);for(let b=-1;++b<a.length;)pb[a[b]]=1===pb[a[b]]?2:pb[a[b]]};document.body.onmousedown=()=>pb.click=1,document.body.onmouseup=()=>pb.click=0;const sb=({clientX:a,clientY:b,touches:c})=>c?[c[0].clientX,c[0].clientY]:[a,b];document.body.onmousemove=(a)=>{const b=N(sb(a),[Ia,Ja]);b[0]*=Ka,b[1]*=La,pb.mousePosition=b};const tb=`\uD83D\uDC69\uD83C\uDFFC\u200D\uD83C\uDF3E`,ub=`\uD83D\uDC6E\uD83C\uDFFF\u200D`,vb=`\uD83D\uDD75\uD83C\uDFFD`,wb=`\uD83D\uDC69\uD83C\uDFFB\u200D\uD83C\uDFA4`,xb=`\uD83C\uDF32`,yb=`\uD83C\uDF33`,zb=`\u2601\uFE0F`,Ab=`\uD83C\uDFD4`,Bb=`\uD83D\uDC7B`,Cb=`\uD83C\uDF75`,Db=`\uD83D\uDC8E`,Eb={dialog:[[`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam accumsan eu metus et porta. Ut rutrum aliquam velit, et euismod lorem maximus non. Etiam non magna sit amet velit molestie tempor vel lacinia est. Aenean convallis placerat ante ultricies venenatis. Maecenas erat tellus, bibendum in enim id, porta consectetur purus. Curabitur rhoncus pulvinar volutpat. Vestibulum condimentum sem sed sollicitudin elementum. Nunc eget est eleifend, feugiat arcu ut, tincidunt lectus. Proin interdum augue in neque aliquet sollicitudin. Mauris posuere eget elit eu fermentum. Mauris viverra, ante ac pretium tincidunt, nunc felis egestas enim, nec placerat libero justo eu felis. Nulla ipsum mi, condimentum mattis nibh sed, scelerisque pharetra magna. Donec laoreet et lectus ut congue. Donec vulputate ac nulla nec facilisis.`,[wb,`ya mum`]]],position:[0,0],target:null,logic:null},Fb=[0,0];class Gb{constructor(){this.apply=(a)=>Object.assign(Object.create(null),a,{position:[...this.position],rotation:this.rotation}),this.position=Fb,this.rotation=0,this.saved_positions=[],this.saved_rotations=[]}save(){this.saved_positions.push([this.position[0],this.position[1]]),this.saved_rotations.push(this.rotation)}restore(){if(0<this.saved_positions.length){const a=this.saved_positions.pop();J(a)&&(this.position[0]=a[0],this.position[1]=a[1]);const b=this.saved_rotations.pop();z(b)&&(this.rotation=b)}}}const Hb=(a,b)=>r((b[2]-b[0])*(a[1]-b[1])-(b[3]-b[1])*(a[0]-b[0])),Ib=(a,b,c)=>P(M(a,b))<=s(c),Jb=(a,b,c,d)=>j(a[0]-b[0])<=c/2&&j(a[1]-b[1])<=d/2,Kb=(a,b)=>{for(let c=0,d=b.length,e=0,f=0;;){if(e=c==d-2?0:c+2,f=Hb(a,[b[c],b[c+1],b[e],b[e+1]]),-1===f)return!1;if(c+=2,c>d-2)break}return!0},Lb=(a,b,c,d,e)=>Jb(a,c,d,e)||Ib(c,a,b)||s(a[0]-h(c[0],k(a[0],c[0]+d)))+s(a[1]-h(c[1],k(a[1],c[1]+e)))<s(b),Mb=(a,b,c,d,e,f)=>!(j(d[0]-a[0])>b/2+e/2||j(d[1]-a[1])>c/2+f/2),Nb=(a,b,c,d)=>{if(Kb(a,d)||Kb(c,b))return!0;const e=h(b.length,d.length);for(let f=0;f<e;f+=2)if(f<b.length&&Kb([b[f],b[f+1]],d)||f<d.length&&Kb([d[f],d[f+1]],b))return!0;return!1},Ob=new Map,Pb=new Map,Qb=new Map;let Rb=da([0,0],0,window.innerWidth,window.innerHeight,'window');window.onresize=()=>Object.assign(Rb,da([0,0],0,window.innerWidth,window.innerHeight,'window'));const Sb=((a=Rb)=>(b)=>{const{geometry:c={shape:null}}=b;switch(c.shape){case'Circle':return Lb(c.position,c.radius,a.position,a.width,a.height);case'Rectangle':return Mb(c.position,c.width,c.height,a.position,a.width,a.height);case'Polygon':return Nb(c.position,U(X(c.points,[0,0],c.rotation),c.position),a.position,U(X(a.points,[0,0],a.rotation),a.position));default:return!0;}})(Rb),Tb=(b)=>(c)=>{const{geometry:d,children:f,render:g,interact:h}=c;fa.save(),b.save(),!d||(ia(d.position),L(b.position,e(d.position,b.rotation)),ja(d.rotation),b.rotation+=d.rotation),fa.save(),g&&(!d||Sb(b.apply(d)))&&g(c),fa.restore(),f&&a(f,Tb(b)),h&&(h.onMouseDown?Ob.set(c,[c,d&&b.apply(d),h.onMouseDown]):Ob.delete(c),h.onMouseMove?Pb.set(c,[c,d&&b.apply(d),h.onMouseMove]):Pb.delete(c),h.onMouseUp?Qb.set(c,[c,d&&b.apply(d),h.onMouseUp]):Qb.delete(c)),fa.restore(),b.restore()},Ub='ontouchstart'in window,Vb=(a)=>u((a)=>!!a.clientX)(a)?[a.clientX,a.clientY]:[a.touches[0].clientX,a.touches[0].clientY],Wb=(a)=>(b)=>{switch(b.shape){case'Circle':return Ib(a,b.position,b.radius);case'Rectangle':return Jb(a,b.position,b.width,b.height);case'Polygon':return Kb(a,U(X(b.points,[0,0],b.rotation),b.position));default:return!1;}};let Xb=0,Yb=0,Zb=1,$b=1;const _b=()=>{const{top:a,left:b,width:c,height:d}=ea.getBoundingClientRect();Xb=b,Yb=a,Zb=ea.width/c,$b=ea.height/d};_b(),window.addEventListener('resize',_b);const ac=(b)=>(c)=>{if(!!b.size){const d=N(Vb(c),[Xb,Yb]);d[0]*=Zb,d[1]*=$b;const e=Wb(d);a(o([...b.values()],([a,b])=>e(b)),([a,b,c])=>c(a,d))}},bc=[],cc=()=>{for(;bc.length;)bc.pop()},dc=((a,b)=>(ga(a),a.addEventListener(Ub?'ontouchstart':'mousedown',ac(Ob)),a.addEventListener(Ub?'ontouchmove':'mousemove',ac(Pb)),a.addEventListener(Ub?'ontouchend':'mouseup',ac(Qb)),()=>Tb(new Gb)(b)))(Fa,{geometry:da([Fa.width/2,Fa.height/2],0,Fa.width,Fa.height),children:bc,render({geometry:a}){a.position[0]=Fa.width/2,a.position[1]=Fa.height/2,a.width=Fa.width,a.height=Fa.height,a.points=ca(a.width,a.height)}});let ec;const fc=(a)=>{cc(),a.init(),ec&&ec.dismiss(),ec=a};let gc=0,hc=0;const t=`#fff`,ic=`#00f`,jc=`Arial Black, Gadget, sans-serif`,kc=`"Lucida Console", Monaco, monospace`,lc=12,mc=1.1*lc,nc=`24px ${jc}`,oc=`${lc}px ${kc}`,pc=2,qc={style:t,thickness:pc},rc=[0,-pc/2],sc=(a,b,c,d=0)=>{xa(ic,K(a,rc),b,c*mc+d),Ba(qc,K(a,rc),b,c*mc+d)};let tc=null;const uc=Ga-pc,vc=5*mc,wc=uc-4*pc,xc=vc-4*pc,yc=(a,b,c)=>{const d=[];b=b.toUpperCase(),a.textBaseline=`top`,a.font=`${lc}px monospace`;const e=b.split(` `);let f=``,g=0,h=0;for(const[i,j]of e.entries()){const b=`${f+j} `,e=a.measureText(b),k=e.width;if(h+b.length>c)return k>wc?(d.push([-wc/2,-xc/2+g,f]),h+=f.length,d.push([-wc/2,-xc/2+g+mc,j.substr(0,c-h)])):d.push([-wc/2,-xc/2+g,b.substr(0,c-h)]),d;k>wc&&0<i?(d.push([-wc/2,-xc/2+g,f]),h+=f.length,f=`${j} `,g+=mc):f=b}return d.push([-wc/2,-xc/2+g,f]),d},zc={geometry:da([0,Ha/2-vc/2],0,uc,vc),render:({geometry:a})=>{const{dialog:b}=Eb,[c]=b;if(!c)return;tc||(tc=Date.now());const d=Math.floor((Date.now()-tc)/50);sc([0,0],a.width,0,a.height);const[e,f]=c,g=yc(fa,e,d);let h=0;if(f){const[a,b]=f,{width:c}=fa.measureText(b),d=c+16+4*pc,e=-uc/2+c,g=-vc/2-2*pc;sc([e,g],d,1,4*pc),fa.font=`${lc}px monospace`,Ea({style:t},[e-6+4*pc-d/2,g-mc/2],a),Ea({style:t},[e-6+4*pc-d/2+16,g-mc/2],b),h=0.33*mc}g.forEach(([a,b,c])=>{Ea({style:t},[a,b+h],c)}),1===pb.space&&(Eb.dialog.shift(),tc=null)},interact:{onMouseDown:()=>{Eb.dialog.shift(),tc=null}}},Ac=[0,80,140],Bc=((a)=>([b,c])=>{const[d,e,f]=a,g=c+e;let h;return h=0>g?Ha+f*c/g:0<g?Ha-f*c/g:Ha,[b+c*(d-b)/(c+e)-d+Ga/2,h,n(e+c,2)+n(d-b,2)]})(Ac),Cc=((a)=>([b,c])=>{const[d,e,f]=a,g=e/(-f/(c-Ha)-1);return[-(-2*d*e+Ga*g+Ga*e+-2*b*g+-2*b*e)/(2*e),g]})(Ac),Dc=[],Ec=((a,b)=>{for(let c=0;c<a.length;c+=2)a.splice(c,2,...b([a[c],a[c+1]],c/2));return a})(U(ca(1e4,1600),[0,800]),(a)=>c(Bc(a),2)),Fc=fa.createLinearGradient(0,0,200,200);Fc.addColorStop(0,`#5E8C6A`),Fc.addColorStop(1,`#BFB35A`);const Gc=fa.createLinearGradient(0,0,200,200);Gc.addColorStop(0,`#69D2E7`),Gc.addColorStop(1,`#A7DBD8`);const Hc=()=>{xa(Gc,[0,0],2*Ga,Ha,0),wa(Fc,[0,0],Ec),Dc.map((a)=>[...Bc(a),a[2],a[3],a[4]]).sort((c,a)=>a[2]-c[2]).forEach(([a,b,c,d,e])=>Ea({},[a,b-d],e))},Ic=(a)=>([b,c],d=0)=>[b,c,d,a],Jc=Ic(xb),Kc=Ic(yb),Lc=Ic(tb),Mc=Ic(ub),Nc=Ic(vb),Oc=Ic(wb),Pc=Ic(zb),Qc=Ic(Ab),Rc=Ic(Bb),Sc=Ic(Cb),Tc=Ic(Db),Uc=[0,0],Vc=3;let Wc=1e3;for(;0<--Wc;)Dc.push((0.5<Math.random()?Jc:Kc)([5120*Math.random()-2560,1280*Math.random()],0));for(Wc=25;0<--Wc;)Dc.push(Pc([1e4*Math.random()-5e3,1e3*Math.random()+3500],30*Math.random()+10));for(Wc=5;0<--Wc;)Dc.push(Sc([5120*Math.random()-2560,1280*Math.random()],0));const i=Oc([20*Math.random()-10,20*Math.random()-10],0),Xc=Lc([20*Math.random()-10,20*Math.random()-10],0),Yc=Mc([20*Math.random()-10,20*Math.random()-10],0),Zc=Nc([20*Math.random()-10,20*Math.random()-10],0),$c=Tc([20*Math.random()-10,20*Math.random()-10],0),_c=()=>(a,b)=>{const c=M(Eb.position,a);Q(c)>b&&L(a,S(c,Vc))};Dc.push(i,Xc,Yc,Zc,$c);var ad=()=>{if(Uc[0]=0,Uc[1]=0,(pb.w||pb.up||pb.s||pb.down||pb.d||pb.right||pb.a||pb.left)&&(Eb.target=null),(pb.w||pb.up)&&(Uc[1]+=1),(pb.s||pb.down)&&(Uc[1]-=1),(pb.d||pb.right)&&(Uc[0]+=1),(pb.a||pb.left)&&(Uc[0]-=1),L(Eb.position,S(Uc,Vc)),null!==Eb.target){const a=M(Eb.target,Eb.position);3>P(a)&&(Eb.target=null),L(Eb.position,S(a,Vc))}Eb.position[1]=h(Eb.position[1],5),i[0]=Eb.position[0],i[1]=Eb.position[1];const a=_c(i);a(Xc,20+Date.now()%300/30),a(Yc,45+Date.now()%300/30),a(Zc,70+Date.now()%300/30),a($c,90+Date.now()%300/30);const b=Eb.position[0]-Ac[0];j(b)>0.2*Ga&&(Ac[0]+=b-0.2*(r(b)*Ga))},bd={init:()=>{bc.push(zc),Eb.logic=(a)=>{ad(a),Hc(a),pb.click&&(Eb.target=Cc(pb.mousePosition))}},dismiss:()=>{}};const cd=(a,b,c,d,e,f)=>{const g=1===e.length?e[0][1][e[0][1].length-1][0]:e.reduce((a,b)=>h(a.length&&a[1][a[1].length-1][0]||a,b[1][b[1].length-1][0])),i=(a,b)=>{const{width:c,height:d}=fa.measureText(a);return{geometry:da([0,0],0,c,d),render(){Ea(b,[0,0],a)}}},j=e.map((a)=>{let b=a[0];const{fontOptions:f={},x:c,y:d,rotation:e}=a[1][0][1];return`string`==typeof b&&(b=i(b,f)),b.geometry.position=[c,d],b.geometry.rotation=e,b});let k=!1;const l=Date.now();return{geometry:da([a,b],0,c,d),children:j.map((a,b)=>0===e[b][1][0][0]?a:{}).reverse(),render({children:a}){const b=Date.now(),c=b-l;if(c>g)return void(f&&!k&&(f(),k=!0));for(const[b,d]of e.entries()){const e=d[1];let f={};for(const[d,[g,h]]of e.entries()){if(c>g){if(0===d&&(a[a.length-1-b]=j[b]),h.remove){a[a.length-1-b]={};break}else{f={time:g,keyframe:h};continue}}else if(0===d)break;0===d&&(f={time:g,keyframe:h});let e=(c-f.time)/(g-f.time);for(const a in 0.995<e&&(e=1),f.keyframe){const b=f.keyframe[a];`function`==typeof b&&(f.keyframe[a]=b(1))}h.symbol?(`string`==typeof h.symbol&&(h.symbol=i(h.symbol,h.fontOptions)),a[a.length-1-b]=h.symbol):a[a.length-1-b]=j[b];const k=h.symbol?Object.assign({},j[b],h.symbol):j[b],{x:l,y:m,rotation:n}=f.keyframe,{x:o,y:p,rotation:q}=h,{geometry:r}=k,{position:s}=r;`function`==typeof o?s[0]=o.call(this,e):void 0!==o&&(s[0]=l+(o-l)*e),`function`==typeof p?s[1]=p.call(this,e):void 0!==p&&(s[1]=m+(p-m)*e),`function`==typeof q?r.rotation=q.call(this,e):void 0!==q&&(r.rotation=n+(q-n)*e);break}}}}},dd={textBaseline:`middle`,style:t,font:nc,horizontalAlign:!0},ed=[[`A L T E R`,[[0,{fontOptions:dd,x:0,y:-Ha/2,rotation:0}],[12000,{y:0}]]],[Db,[[0,{fontOptions:dd,x:0,y:Ha,rotation:0}],[24000,{x:(a)=>-m(10*a-10)*Ga/4,y:Ha-1.125*Ha}]]],[`new game`,[[24500,{fontOptions:Object.assign({},dd,{font:oc}),x:0,y:48,rotation:0}],[24600,{}]]],[{geometry:da([0,0],0,Ga,Ha),render(){400<Date.now()%600&&wa(`white`,[-42,48],[-5,3,5,0,-5,-3])}},[[24500,{x:0,y:0,rotation:0}]]]],fd=()=>{ed[0][1]=[[0,{fontOptions:dd,x:0,y:0,rotation:0}]],ed[1][1]=[[0,{fontOptions:dd,x:-0*Ga/4,y:Ha-1.125*Ha,rotation:0}]],ed[2][1][0][0]=0,ed[3][1][0][0]=0};let gd=!1;const hd=()=>gd?void fc(bd):void(gd=!0,id.children.length=0,fd(),id.children.push(cd(0,0,Ga,Ha,ed))),id={geometry:da([0,0],0,Ga,Ha),children:[cd(0,0,Ga,Ha,ed,()=>{gd=!0})],render(){(1===pb.space||1===pb.return)&&hd()},interact:{onMouseDown:hd}};fc({init:()=>{bc.push(id),mb(),Eb.logic=null},dismiss:()=>nb()}),((a)=>{let b=!0;return requestAnimationFrame(function c(){gc=k(16,Date.now()-hc),b&&a(gc),hc=Date.now(),requestAnimationFrame(c)}),()=>b=!b})((a)=>{la(),Eb.logic&&Eb.logic(),dc(a),rb()})})();