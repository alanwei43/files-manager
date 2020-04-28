(function(t){function e(e){for(var i,r,s=e[0],l=e[1],c=e[2],d=0,f=[];d<s.length;d++)r=s[d],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&f.push(a[r][0]),a[r]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);u&&u(e);while(f.length)f.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],i=!0,s=1;s<n.length;s++){var l=n[s];0!==a[l]&&(i=!1)}i&&(o.splice(e--,1),t=r(r.s=n[0]))}return t}var i={},a={app:0},o=[];function r(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=i,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var u=l;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("router-view")},o=[];n("99af"),n("a15b"),n("d81d"),n("b64b"),n("d3b7");function r(t,e,n,i){var a={method:t,headers:{"content-type":"application/json"}};return n&&(e+="?"+Object.keys(n).map((function(t){return"".concat(encodeURIComponent(t),"=").concat(encodeURIComponent(n[t]))})).join("&")),i&&(a.body=JSON.stringify(i)),fetch(e,a).then((function(t){return t.json()}))}function s(t,e){return r("GET",t,e)}function l(t,e,n){return r("POST",t,n,e)}function c(t,e){return l("/api/dir",{name:e,path:t})}function u(t,e){return r("DELETE","/api/dir",null,{name:e,path:t})}function d(t,e){return r("DELETE","/api/files",null,{name:e,path:t})}function f(t){return s("/api/files",{path:t})}n("b680"),n("ac1f"),n("25f0"),n("5319"),n("1276");function p(t){return new Promise((function(e,n){var i=new FileReader;i.onload=function(t){var n=t.target.result.split("base64,")[1];e(n)},i.onerror=function(){n()},i.readAsDataURL(t)}))}function h(){return Date.now().toString(16)+Math.random().toString(16).substr(2)}function m(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];return n.join(t).replace(/(\/{2,})/,"/").replace(/(\\{2,})/,"\\")}function v(t){var e=t/1024;if(e<1024)return{size:e.toFixed(2),unit:"KB"};var n=e/1024;if(n<1024)return{size:n.toFixed(2),unit:"MB"};var i=n/1024;return{size:i.toFixed(2),unit:"GB"}}var g={config:{title:"",clientRootPath:"",uploadFileSize:50,sysRootPath:"",pathSeperator:""}},b={data:function(){return{share:g}},mounted:function(){var t=this;s("/api/config").then((function(e){t.share.config=e,document.title=t.share.config.title}))}},_=b,y=n("2877"),w=Object(y["a"])(_,a,o,!1,null,null,null),C=w.exports,S=n("8c4f"),x=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/files-manager"}},[t._v("文件管理")])],1)},F=[],k={name:"Home"},D=k,z=Object(y["a"])(D,x,F,!1,null,null,null),E=z.exports,O=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("alert",{ref:"Alert",staticStyle:{position:"fixed",right:"0",top:"0",width:"auto"}}),t.share.config.title?n("ol",{staticClass:"breadcrumb"},[n("li",[n("a",{attrs:{href:"javascript:void(0)"}},[t._v(t._s(t.share.config.title))])])]):t._e(),n("div",{staticClass:"container-fluid",staticStyle:{"margin-top":"1em"}},[n("div",{staticClass:"panel panel-default"},[n("div",{staticClass:"panel-heading"},[t._v("拖拽/选择文件上传")]),n("div",{staticClass:"panel-body"},[n("file-upload",{attrs:{path:t.route.path},on:{"upload-success":t.onUploadSuccess,alert:t.alert}})],1)]),n("div",{staticClass:"panel panel-primary"},[n("div",{staticClass:"panel-heading"},[t._v("文件管理")]),n("div",{staticClass:"panel-body"},[n("div",{staticClass:"col-row"},[n("div",{staticClass:"col-sm-4 col-xs-12"},[n("div",{staticClass:"input-group input-group-sm"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.vm.dirName,expression:"vm.dirName"}],staticClass:"form-control",attrs:{type:"text",placeholder:"请输入目录名称"},domProps:{value:t.vm.dirName},on:{input:function(e){e.target.composing||t.$set(t.vm,"dirName",e.target.value)}}}),n("span",{staticClass:"input-group-btn"},[n("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:t.doCreateDir}},[t._v("创建目录")])])])])])]),n("table",{staticClass:"table table-bordered"},[t._m(0),n("tbody",t._l(t.files.data,(function(e){return n("file-item",{key:e.path||e.name,attrs:{item:e,path:t.route.path},on:{"delete-file":t.onDeleteFile,alert:t.alert}})})),1),n("tfoot",[n("tr",[n("td",{attrs:{colspan:"4"}},[n("span",{staticStyle:{"padding-right":"10px","font-size":"12px"}},[t._v(" 文件数量: "),n("mark",[t._v(t._s(t.fileTotalCount))])]),n("span",{staticStyle:{"padding-right":"10px","font-size":"12px"}},[t._v(" 总大小: "),n("mark",[t._v(t._s(t.fileTotalSize))])])])])])])])])],1)},j=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",[t._v("名称")]),n("th",[t._v("路径")]),n("th",[t._v("信息")]),n("th",[t._v("操作")])])])}],P=(n("4de4"),n("c975"),n("13d5"),n("fb6a"),n("a434"),n("b0c0"),n("9911"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",{attrs:{title:t.item.name}},[t.item.isParent?[n("td",{attrs:{colspan:"4"}},[n("router-link",{staticClass:"small",attrs:{to:t.item.link}},[t._v(t._s(t.item.name))])],1)]:t._e(),t.item.isParent?t._e():[n("td",[t.item.isDir?n("router-link",{staticClass:"text-ellipsis",staticStyle:{"max-width":"200px"},attrs:{to:t.item.link}},[t._v(t._s(t.item.name))]):t._e(),t.item.isFile?n("span",{staticClass:"text-ellipsis",staticStyle:{"max-width":"200px"}},[t._v(t._s(t.item.name))]):t._e()],1),n("td",[t.fileAddress?n("code",[t._v(t._s(t.fileAddress))]):t._e()]),n("td",[t.item.isFile?n("span",{staticClass:"small text-info",attrs:{title:"大小 | 修改时间"}},[t._v(t._s(t._f("showSize")(t.item.size))+" | "+t._s(t.item.mtime))]):t._e()]),n("td",[n("button",{staticClass:"btn btn-danger btn-sm",attrs:{title:"删除文件 "+t.item.name},on:{click:function(e){return t.doDeleteFile(t.item)}}},[t._v("删除")]),t._v(" "),t.downloadLink?n("a",{staticClass:"btn btn-default btn-sm",attrs:{target:"blank",href:t.downloadLink,title:"下载文件 "+t.item.name}},[t._v("下载")]):t._e()])]],2)}),$=[],A={props:{item:{required:!0},path:{required:!0}},data:function(){return{}},mounted:function(){},methods:{doDeleteFile:function(t){var e=this,n=d;t.isDir&&(n=u),n(this.path,this.item.name).then((function(n){n.success?e.$emit("delete-file",t):e.$emit("alert",{html:"<b>".concat(e.item.name,"</b> 删除失败: ").concat(n.message),type:"danger",closeable:!0,time:5e3})}))}},filters:{showSize:function(t){return v(t).size+v(t).unit}},computed:{downloadLink:function(){if(this.item.isFile)return"/api/file?name=".concat(encodeURIComponent(this.item.name),"&path=").concat(encodeURIComponent(this.path))},fileAddress:function(){return this.item.isParent?"":m(g.config.pathSeperator,g.config.clientRootPath,this.path,this.item.name)}}},R=A,T=Object(y["a"])(R,P,$,!1,null,null,null),N=T.exports,L=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("input",{attrs:{type:"file",multiple:""},on:{change:t.selectFile}}),t.status.showedAlertCounts?n("hr"):t._e(),n("alert",{ref:"Alert",staticStyle:{width:"auto",display:"inline-block"},on:{"showed-alerts":function(e){return t.status.showedAlertCounts=e.length}}})],1)},M=[],U=(n("4160"),n("159b"),n("bf19"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",t._l(t.alerts,(function(e){return n("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"item.show"}],key:e.id,staticClass:"alert",class:{"alert-warning":"warning"===e.type,"alert-success":"success"===e.type,"alert-info":"info"===e.type,"alert-danger":"danger"===e.type,"alert-dismissible":e.closeable}},[e.closeable?n("button",{staticClass:"close",attrs:{type:"button"},on:{click:function(t){e.show=!1}}},[n("span",[t._v("×")])]):t._e(),e.html?n("div",{staticStyle:{display:"inline-block"},domProps:{innerHTML:t._s(e.html)}}):t._e(),e.content?n("div",{staticStyle:{display:"inline-block"}},[t._v(t._s(e.content))]):t._e()])})),0)}),I=[],B={data:function(){return{alerts:[{id:"例子",show:!1,html:"<strong>Warning!</strong> Better check yourself, you're not looking too good.",content:"hello world",type:"success",closeable:!0}]}},methods:{alert:function(t){var e=t.html,n=t.content,i=t.type,a=t.closeable,o=t.time,r={id:Date.now()+Math.random(),html:e,content:n,type:i||"success",closeable:"boolean"===typeof a&&a,show:!0};return this.alerts.push(r),o&&setTimeout((function(){r.show=!1}),o),r}},computed:{showedAlerts:function(){return this.alerts.filter((function(t){return t.show}))}},watch:{showedAlerts:{handler:function(){this.$emit("showed-alerts",this.showedAlerts)},immediate:!0}}},J=B,q=Object(y["a"])(J,U,I,!1,null,null,null),H=q.exports,G={props:{path:{required:!0}},data:function(){return{config:{randomName:!1},status:{showedAlertCounts:0,onDraging:!1}}},mounted:function(){this.initDrag()},methods:{selectFile:function(t){var e=this,n=t.target.files||[];n.forEach((function(t){return e.uploadFile(t)}))},uploadFile:function(t){var e=this,n=t.size/1024/1024;if(n>g.config.uploadFileSize)this.$refs.Alert.alert({html:"<b>".concat(t.name,"</b> 文件超出最大限制 ").concat(g.config.uploadFileSize,"MB"),type:"danger",closeable:!0});else{var i=t.name;if(this.config.randomName){var a=t.name.split(".").slice(-1);i=h()+"."+a}var o=this.$refs.Alert.alert({html:"<b>".concat(i,"</b> 正在上传"),type:"info"});p(t).then((function(t){return l("/api/files",{name:i,path:e.path,data:t})})).then((function(n){if(n.success)return e.$emit("upload-success",{ctime:(new Date).toJSON(),isDir:!1,isFile:!0,mtime:(new Date).toJSON(),name:i,path:void 0,size:t.size}),"success";throw new Error(n.message||"upload_fail")})).catch((function(t){return t.message})).then((function(t){"success"===t?(o.type="success",o.html="<b>".concat(i,"</b> 上传成功"),setTimeout((function(){o.show=!1}),2e3)):(o.type="danger",o.html="<b>".concat(i,"</b> 上传失败: ").concat(t),o.closeable=!0)}))}},initDrag:function(){var t=this,e=document.documentElement;["dragenter","dragover","dragleave","drop"].forEach((function(t){e.addEventListener(t,(function(t){t.preventDefault(),t.stopPropagation()}),!1)})),["dragenter","dragover"].forEach((function(n){e.addEventListener(n,(function(){return t.status.onDraging=!0}),!1)})),["dragleave","drop"].forEach((function(n){e.addEventListener(n,(function(){return t.status.onDraging=!1}),!1)})),e.addEventListener("drop",(function(e){var n=e.dataTransfer.files||[];n.forEach((function(e){return t.uploadFile(e)}))}),!1)}},components:{alert:H}},K=G,W=Object(y["a"])(K,L,M,!1,null,null,null),Q=W.exports,V={data:function(){return{share:g,files:{data:[],totalCount:null,totalSize:0},vm:{dirName:""},route:{path:void 0,parent:void 0},status:{process:[],onDraging:!1}}},mounted:function(){this.loadFiles(),this.onRouteChange()},methods:{loadFiles:function(){var t=this;if(this.route.path){var e=this.route.path;this.files.totalSize=0,f(e).then((function(n){if(e===t.route.path&&(t.files.data=n.files.map((function(t){return{ctime:t.ctime,isDir:t.isDir,isFile:t.isFile,mtime:t.mtime,name:t.name,path:t.path,size:t.size}})).map((function(e){return e.link="".concat(location.pathname,"/").concat(e.name),e.isFile&&(e.downloadLink="/api/file?name=".concat(encodeURIComponent(e.name),"&path=").concat(encodeURIComponent(t.route.path))),t.files.totalSize+=e.size||0,e})),t.files.totalCount=n.totalCount,"string"===typeof t.route.parent)){var i=h();t.files.data.unshift({isParent:!0,isDir:!0,isFile:!1,link:(decodeURIComponent(location.pathname)+i).replace(t.route.path+i,"")+t.route.parent,name:"上一级目录"})}}))}},onRouteChange:function(){this.route.path=this.$route.params.pathMatch||"/","string"===typeof this.route.path&&"/"!==this.route.path?this.route.parent=this.route.path.split("/").slice(0,-1).join("/")||"/":this.route.parent=void 0,this.loadFiles()},onDeleteFile:function(t){var e=this.files.data.indexOf(t);this.files.data.splice(e,1)},onUploadSuccess:function(t){this.files.data.filter((function(e){return e.name===t.name})).length||this.files.data.push(t)},doCreateDir:function(){var t=this.vm.dirName;c(this.route.path,t).then((function(t){t.success&&window.location.reload()}))},alert:function(t){var e=t.html,n=t.content,i=t.type,a=t.closeable,o=t.time;this.$refs.Alert.alert({html:e,content:n,type:i,closeable:a,time:o})}},computed:{fileTotalCount:function(){return this.files.data.filter((function(t){return t.isFile})).length},fileTotalSize:function(){var t=this.files.data.reduce((function(t,e){return t+(e.size||0)}),0),e=v(t);return e.size+e.unit}},components:{"file-item":N,"file-upload":Q,alert:H},watch:{$route:"onRouteChange"}},X=V,Y=Object(y["a"])(X,O,j,!1,null,null,null),Z=Y.exports;i["a"].use(S["a"]);var tt=[{path:"/",name:"Home",component:E},{path:"/files-manager",name:"FilesManagerRoot",component:Z},{path:"/files-manager/*",name:"FilesManager",component:Z},{path:"*",component:E}],et=new S["a"]({mode:"history",base:"/",routes:tt}),nt=et;i["a"].config.productionTip=!1,new i["a"]({router:nt,render:function(t){return t(C)}}).$mount("#app")}});
//# sourceMappingURL=app.4c084982.js.map