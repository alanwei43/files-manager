(function(e){function t(t){for(var a,o,s=t[0],u=t[1],l=t[2],f=0,p=[];f<s.length;f++)o=s[f],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&p.push(i[o][0]),i[o]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);c&&c(t);while(p.length)p.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,s=1;s<n.length;s++){var u=n[s];0!==i[u]&&(a=!1)}a&&(r.splice(t--,1),e=o(o.s=n[0]))}return e}var a={},i={app:0},r=[];function o(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=a,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var c=u;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},r=[],o=n("2877"),s={},u=Object(o["a"])(s,i,r,!1,null,null,null),l=u.exports,c=n("8c4f"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v("| "),n("router-link",{attrs:{to:"/list-files"}},[e._v("list files")])],1)},p=[],d={name:"Home"},h=d,m=Object(o["a"])(h,f,p,!1,null,null,null),v=m.exports,g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"drag"}},[n("div",[n("input",{attrs:{type:"file",multiple:""},on:{change:e.selectFile}})]),n("div",e._l(e.status.process,(function(t){return n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"process.show"}],key:t.key},[n("b",[e._v(e._s(t.name))]),"loading"===t.load?n("span",[e._v("正在上传")]):e._e(),"fail"===t.load?n("span",[e._v("上传失败 "+e._s(t.error))]):e._e(),"success"===t.load?n("span",[e._v("上传成功")]):e._e()])})),0),n("ol",e._l(e.files.data,(function(t){return n("file-item",{key:t.path||t.name,attrs:{item:t,path:e.route.path},on:{"delete-file":e.onDeleteFile}})})),1)])},b=[];n("99af"),n("4160"),n("c975"),n("a15b"),n("d81d"),n("fb6a"),n("a434"),n("b0c0"),n("ac1f"),n("5319"),n("1276"),n("9911"),n("159b"),n("bf19"),n("d3b7"),n("25f0");function _(e){return new Promise((function(t,n){var a=new FileReader;a.onload=function(e){var n=e.target.result.split("base64,")[1];t(n)},a.onerror=function(){n()},a.readAsDataURL(e)}))}function w(){return Date.now().toString(16)+Math.random().toString(16).substr(2)}n("b64b");function y(e,t,n,a){var i={method:e,headers:{"content-type":"application/json"}};return n&&(t+="?"+Object.keys(n).map((function(e){return"".concat(encodeURIComponent(e),"=").concat(encodeURIComponent(n[e]))})).join("&")),a&&(i.body=JSON.stringify(a)),fetch(t,i).then((function(e){return e.json()}))}function F(e,t){return y("GET",e,t)}function O(e,t,n){return y("POST",e,n,t)}var k=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",[e.item.isDir?n("router-link",{attrs:{to:e.item.link}},[e._v(e._s(e.item.name))]):e._e(),e.item.isFile?n("span",[e._v(e._s(e.item.name))]):e._e(),e._v(" "),e.item.isFile?n("button",{staticClass:"btn btn-warning btn-xs",on:{click:function(t){return e.deleteFile(e.item)}}},[e._v("Delete")]):e._e(),e._v(" "),e.downloadLink?n("a",{staticClass:"btn btn-default btn-xs",attrs:{target:"blank",href:e.downloadLink}},[e._v("Download")]):e._e()],1)},D=[],E={props:{item:{required:!0},path:{required:!0}},methods:{deleteFile:function(e){var t=this;y("DELETE","/api/files",null,{name:this.item.name,path:this.path}).then((function(n){n.success&&t.$emit("delete-file",e)}))}},computed:{downloadLink:function(){if(this.item.isFile)return"/api/file?name=".concat(encodeURIComponent(this.item.name),"&path=").concat(encodeURIComponent(this.path))}}},j=E,x=Object(o["a"])(j,k,D,!1,null,null,null),R=x.exports,C={data:function(){return{config:{randomName:!1},files:{data:[]},route:{path:void 0,parent:void 0},status:{process:[],onDraging:!1}}},mounted:function(){this.loadFiles(),this.onRouteChange(),this.initDrag()},methods:{loadFiles:function(){var e=this;if(this.route.path){var t=this.route.path;F("/api/files",{path:t}).then((function(n){if(t===e.route.path&&(e.files.data=n.files.map((function(e){return{ctime:e.ctime,isDir:e.isDir,isFile:e.isFile,mtime:e.mtime,name:e.name,path:e.path,size:e.size}})).map((function(t){return t.link="".concat(location.pathname,"/").concat(t.name),t.isFile&&(t.downloadLink="/api/file?name=".concat(encodeURIComponent(t.name),"&path=").concat(encodeURIComponent(e.route.path))),t})),"string"===typeof e.route.parent)){var a=w();e.files.data.unshift({isDir:!0,isFile:!1,link:(location.pathname+a).replace(e.route.path+a,"")+e.route.parent,name:"../"})}}))}},onRouteChange:function(){this.route.path=this.$route.params.pathMatch||"/","string"===typeof this.route.path&&"/"!==this.route.path?this.route.parent=this.route.path.split("/").slice(0,-1).join("/")||"/":this.route.parent=void 0,this.loadFiles()},selectFile:function(e){var t=this,n=e.target.files||[];n.forEach((function(e){return t.uploadFile(e)}))},uploadFile:function(e){var t=this,n=e.name;if(this.config.randomName){var a=e.name.split(".").slice(-1);n=w()+"."+a}var i={key:w(),name:e.name,path:this.route.path,load:"loading",error:void 0,show:!0};this.status.process.push(i),_(e).then((function(e){return O("/api/files",{name:n,path:t.route.path,data:e})})).then((function(a){if(a.success)return i.load="success",t.files.data.push({ctime:(new Date).toJSON(),isDir:!1,isFile:!0,mtime:(new Date).toJSON(),name:n,path:void 0,size:e.size}),"success";throw new Error("upload_fail")})).catch((function(e){return i.load="fail",i.error=e.message||e,"fail"})).then((function(e){setTimeout((function(){return i.show=!1}),"success"===e?3e3:5e3)}))},initDrag:function(){var e=this,t=document.documentElement;["dragenter","dragover","dragleave","drop"].forEach((function(e){t.addEventListener(e,(function(e){e.preventDefault(),e.stopPropagation()}),!1)})),["dragenter","dragover"].forEach((function(n){t.addEventListener(n,(function(){return e.status.onDraging=!0}),!1)})),["dragleave","drop"].forEach((function(n){t.addEventListener(n,(function(){return e.status.onDraging=!1}),!1)})),t.addEventListener("drop",(function(t){var n=t.dataTransfer.files||[];n.forEach((function(t){return e.uploadFile(t)}))}),!1)},onDeleteFile:function(e){var t=this.files.data.indexOf(e);this.files.data.splice(t,1)}},components:{"file-item":R},watch:{$route:"onRouteChange"}},S=C,L=Object(o["a"])(S,g,b,!1,null,null,null),P=L.exports;a["a"].use(c["a"]);var M=[{path:"/",name:"Home",component:v},{path:"/files-manager",name:"FilesManagerRoot",component:P},{path:"/files-manager/*",name:"FilesManager",component:P},{path:"*",component:v}],T=new c["a"]({mode:"history",base:"/",routes:M}),$=T;a["a"].config.productionTip=!1,new a["a"]({router:$,render:function(e){return e(l)}}).$mount("#app")}});
//# sourceMappingURL=app.9175b293.js.map