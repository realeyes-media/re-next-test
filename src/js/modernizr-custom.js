/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-boxsizing-cssgradients-cssvalid-cssvhunit-objectfit-setclasses !*/
!function(e,n,t){function r(e,n){return typeof e===n}function i(){var e,n,t,i,o,s,a;for(var l in b)if(b.hasOwnProperty(l)){if(e=[],n=b[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(i=r(n.fn,"function")?n.fn():n.fn,o=0;o<e.length;o++)s=e[o],a=s.split("."),1===a.length?Modernizr[a[0]]=i:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=i),x.push((i?"":"no-")+a.join("-"))}}function o(e){var n=S.className,t=Modernizr._config.classPrefix||"";if(_&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),_?S.className.baseVal=n:S.className=n)}function s(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):_?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function a(n,t,r){var i;if("getComputedStyle"in e){i=getComputedStyle.call(e,n,t);var o=e.console;if(null!==i)r&&(i=i.getPropertyValue(r));else if(o){var s=o.error?"error":"log";o[s].call(o,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else i=!t&&n.currentStyle&&n.currentStyle[r];return i}function l(e,n){return e-1===n||e===n||e+1===n}function f(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function u(){var e=n.body;return e||(e=s(_?"svg":"body"),e.fake=!0),e}function d(e,t,r,i){var o,a,l,f,d="modernizr",c=s("div"),p=u();if(parseInt(r,10))for(;r--;)l=s("div"),l.id=i?i[r]:d+(r+1),c.appendChild(l);return o=s("style"),o.type="text/css",o.id="s"+d,(p.fake?p:c).appendChild(o),p.appendChild(c),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(n.createTextNode(e)),c.id=d,p.fake&&(p.style.background="",p.style.overflow="hidden",f=S.style.overflow,S.style.overflow="hidden",S.appendChild(p)),a=t(c,e),p.fake?(p.parentNode.removeChild(p),S.style.overflow=f,S.offsetHeight):c.parentNode.removeChild(c),!!a}function c(e,n){return!!~(""+e).indexOf(n)}function p(e,n){return function(){return e.apply(n,arguments)}}function m(e,n,t){var i;for(var o in e)if(e[o]in n)return t===!1?e[o]:(i=n[e[o]],r(i,"function")?p(i,t||n):i);return!1}function g(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function h(n,r){var i=n.length;if("CSS"in e&&"supports"in e.CSS){for(;i--;)if(e.CSS.supports(g(n[i]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];i--;)o.push("("+g(n[i])+":"+r+")");return o=o.join(" or "),d("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==a(e,null,"position")})}return t}function v(e,n,i,o){function a(){u&&(delete L.style,delete L.modElem)}if(o=r(o,"undefined")?!1:o,!r(i,"undefined")){var l=h(e,i);if(!r(l,"undefined"))return l}for(var u,d,p,m,g,v=["modernizr","tspan","samp"];!L.style&&v.length;)u=!0,L.modElem=s(v.shift()),L.style=L.modElem.style;for(p=e.length,d=0;p>d;d++)if(m=e[d],g=L.style[m],c(m,"-")&&(m=f(m)),L.style[m]!==t){if(o||r(i,"undefined"))return a(),"pfx"==n?m:!0;try{L.style[m]=i}catch(y){}if(L.style[m]!=g)return a(),"pfx"==n?m:!0}return a(),!1}function y(e,n,t,i,o){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+E.join(s+" ")+s).split(" ");return r(n,"string")||r(n,"undefined")?v(a,n,i,o):(a=(e+" "+k.join(s+" ")+s).split(" "),m(a,n,t))}function C(e,n,r){return y(e,t,t,n,r)}var x=[],b=[],w={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){b.push({name:e,fn:n,options:t})},addAsyncTest:function(e){b.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=w,Modernizr=new Modernizr;var S=n.documentElement,_="svg"===S.nodeName.toLowerCase(),z=w._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];w._prefixes=z,Modernizr.addTest("cssgradients",function(){for(var e,n="background-image:",t="gradient(linear,left top,right bottom,from(#9f9),to(white));",r="",i=0,o=z.length-1;o>i;i++)e=0===i?"to ":"",r+=n+z[i]+"linear-gradient("+e+"left top, #9f9, white);";Modernizr._config.usePrefixes&&(r+=n+"-webkit-"+t);var a=s("a"),l=a.style;return l.cssText=r,(""+l.backgroundImage).indexOf("gradient")>-1});var P=w.testStyles=d;Modernizr.addTest("cssvalid",function(){return P("#modernizr input{height:0;border:0;padding:0;margin:0;width:10px} #modernizr input:valid{width:50px}",function(e){var n=s("input");return e.appendChild(n),n.clientWidth>10})}),P("#modernizr { height: 50vh; }",function(n){var t=parseInt(e.innerHeight/2,10),r=parseInt(a(n,null,"height"),10);Modernizr.addTest("cssvhunit",l(r,t))});var T="Moz O ms Webkit",E=w._config.usePrefixes?T.split(" "):[];w._cssomPrefixes=E;var j=function(n){var r,i=z.length,o=e.CSSRule;if("undefined"==typeof o)return t;if(!n)return!1;if(n=n.replace(/^@/,""),r=n.replace(/-/g,"_").toUpperCase()+"_RULE",r in o)return"@"+n;for(var s=0;i>s;s++){var a=z[s],l=a.toUpperCase()+"_"+r;if(l in o)return"@-"+a.toLowerCase()+"-"+n}return!1};w.atRule=j;var k=w._config.usePrefixes?T.toLowerCase().split(" "):[];w._domPrefixes=k;var N={elem:s("modernizr")};Modernizr._q.push(function(){delete N.elem});var L={style:N.elem.style};Modernizr._q.unshift(function(){delete L.style}),w.testAllProps=y;var O=w.prefixed=function(e,n,t){return 0===e.indexOf("@")?j(e):(-1!=e.indexOf("-")&&(e=f(e)),n?y(e,n,t):y(e,"pfx"))};Modernizr.addTest("objectfit",!!O("objectFit"),{aliases:["object-fit"]}),w.testAllProps=C,Modernizr.addTest("boxsizing",C("boxSizing","border-box",!0)&&(n.documentMode===t||n.documentMode>7)),i(),o(x),delete w.addTest,delete w.addAsyncTest;for(var A=0;A<Modernizr._q.length;A++)Modernizr._q[A]();e.Modernizr=Modernizr}(window,document);