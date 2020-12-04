(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{104:function(e,t,a){e.exports=a(138)},114:function(e,t,a){},137:function(e,t,a){},138:function(e,t,a){"use strict";a.r(t);var n,r,c=a(0),i=a.n(c),o=a(9),l=a.n(o),s=a(18),u=(a(114),a(181)),d=a(182),f=a(183),m=a(174),p=a(140),b=a(177),O=a(185),v=a(186),E=a(184),T=a(178),k=a(139),g=a(15),h=a(46),j=a(187),S=a(175),I=i.a.memo((function(e){console.log("AddItemForm");var t=Object(c.useState)(""),a=Object(h.a)(t,2),n=a[0],r=a[1],o=Object(c.useState)(null),l=Object(h.a)(o,2),s=l[0],u=l[1],d=function(){""!==n.trim()?(e.addItem(n),r("")):u("Title is required")};return i.a.createElement("div",null,i.a.createElement(j.a,{disabled:e.disabled,variant:"outlined",value:n,onChange:function(e){r(e.currentTarget.value)},onKeyPress:function(e){13===e.charCode&&d(),s&&u(null)},label:"Title",helperText:s,error:!!s}),i.a.createElement(m.a,{color:"primary",onClick:d,disabled:e.disabled},i.a.createElement(S.a,{fontSize:"large"})))})),y=a(10),C=a.n(y),w=a(22),A=a(61),x=a(31),L=a(7),D=a(88),N=a.n(D).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"api-key":"9209cc73-1dd6-4bef-bbf6-e01b3e14b107"}}),P=function(){return N.get("auth/me")},R=function(e){return N.post("auth/login",e)},F=function(){return N.delete("auth/login")},G=function(){return N.get("todo-lists")},U=function(e){return N.post("todo-lists",{title:e})},H=function(e){return N.delete("todo-lists/".concat(e))},K=function(e,t){return N.put("todo-lists/".concat(e),{title:t})},M=function(e){return N.get("/todo-lists/".concat(e,"/tasks"))},z=function(e,t){return N.post("/todo-lists/".concat(e,"/tasks"),{title:t})},_=function(e,t,a){return N.put("/todo-lists/".concat(e,"/tasks/").concat(t),a)},V=function(e,t){return N.delete("/todo-lists/".concat(e,"/tasks/").concat(t))};!function(e){e[e.New=0]="New",e[e.InProgress=1]="InProgress",e[e.Completed=2]="Completed",e[e.Draft=3]="Draft"}(n||(n={})),function(e){e[e.Low=0]="Low",e[e.Middle=1]="Middle",e[e.Hi=2]="Hi",e[e.Urgenty=3]="Urgenty",e[e.Later=4]="Later"}(r||(r={}));var Z=function(e,t){e.messages.length?t($(e.messages[0])):t($("Some ERROR")),t(W("failed"))},Y=function(e,t){t(W("failed")),t($(e.message))},q={isLoggedIn:!1},B=function(e){return{type:"login/SET-IS-LOGGED-IN",value:e}},J={status:"idle",error:null,isInitialazed:!1},W=function(e){return{type:"APP/SET-STATUS",status:e}},$=function(e){return{type:"APP/SET-ERROR",error:e}},Q=function(e,t){return{type:"REMOVE-TASK",todolistId:t,taskId:e}},X=function(e,t,a){return{type:"UPDATE_TASK",updateModel:t,todolistId:a,taskId:e}},ee=function(e,t){return{type:"SET_TASKS",tasks:e,todolistId:t}},te=function(e,t,a){return{type:"CHANGE-TASK-ENTITY-STATUS",entityStatus:e,taskId:t,todolistId:a}},ae=function(e,t,a){return function(){var n=Object(w.a)(C.a.mark((function n(r,c){var i,o,l;return C.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(r(W("loading")),r(te("loading",e,a)),!(i=c().tasks1[a].find((function(t){return t.id===e})))){n.next=16;break}return o=Object(L.a)({title:i.title,description:i.description,status:i.status,priority:i.priority,startDate:i.startDate,deadline:i.deadline},t),n.prev=5,n.next=8,_(a,e,o);case 8:0===(l=n.sent).data.resultCode?(r(X(e,t,a)),r(W("succeeded")),r(te("succeeded",e,a))):(Z(l.data,r),r(te("failed",e,a))),n.next=16;break;case 12:n.prev=12,n.t0=n.catch(5),Y(n.t0,r),r(te("failed",e,a));case 16:case"end":return n.stop()}}),n,null,[[5,12]])})));return function(e,t){return n.apply(this,arguments)}}()},ne=a(176),re=i.a.memo((function(e){console.log("EditableSpan");var t=Object(c.useState)(!1),a=Object(h.a)(t,2),n=a[0],r=a[1],o=Object(c.useState)(""),l=Object(h.a)(o,2),s=l[0],u=l[1];return n?i.a.createElement(j.a,{value:s,onChange:function(e){u(e.currentTarget.value)},onBlur:function(){r(!1),e.onChange(s)},autoFocus:!0}):i.a.createElement("span",{onDoubleClick:function(){e.disabled&&(r(!0),u(e.title))},title:"to change it use a double click",className:e.isDone?"is-done":""},e.title)})),ce=a(189),ie=i.a.memo((function(e){var t=Object(c.useCallback)((function(){return e.removeTask(e.task.id,e.id)}),[e.removeTask,e.task.id,e.id]),a=Object(c.useCallback)((function(t){e.changeTaskStatus(e.task.id,t.currentTarget.checked?n.Completed:n.New,e.id)}),[e.changeTaskStatus,e.task.id,e.id]),r=Object(c.useCallback)((function(t){e.changeTaskTitle(e.task.id,t,e.id)}),[e.changeTaskTitle,e.task.id,e.id]);return i.a.createElement("div",{key:e.task.id,style:{fontSize:"19px"}},i.a.createElement(ce.a,{color:"primary",checked:e.task.status===n.Completed,onChange:a}),i.a.createElement(re,{disabled:"loading"!==e.task.entityStatus,onChange:r,title:e.task.title,isDone:e.task.status===n.Completed}),i.a.createElement(m.a,{onClick:t,disabled:"loading"===e.task.entityStatus},i.a.createElement(ne.a,null)))})),oe=i.a.memo((function(e){var t=Object(s.b)();Object(c.useEffect)((function(){var a;t((a=e.todolist.id,function(){var e=Object(w.a)(C.a.mark((function e(t){var n,r;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(W("loading")),e.prev=1,e.next=4,M(a);case 4:n=e.sent,r=n.data.items.reverse(),t(ee(r,a)),t(W("succeeded")),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),Y(e.t0,t);case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t){return e.apply(this,arguments)}}()))}),[]),console.log("TodoList");var a=e.tasks;"active"===e.todolist.filter&&(a=e.tasks.filter((function(e){return e.status===n.New}))),"completed"===e.todolist.filter&&(a=e.tasks.filter((function(e){return e.status===n.Completed})));var r=Object(c.useCallback)((function(){return e.changeFilter("all",e.todolist.id)}),[e.todolist.id,e.changeFilter]),o=Object(c.useCallback)((function(){return e.changeFilter("active",e.todolist.id)}),[e.todolist.id,e.changeFilter]),l=Object(c.useCallback)((function(){return e.changeFilter("completed",e.todolist.id)}),[e.todolist.id,e.changeFilter]),u=Object(c.useCallback)((function(){return e.removeTodolist(e.todolist.id)}),[e.todolist.id,e.removeTodolist]),d=Object(c.useCallback)((function(t){return e.addTasks(t,e.todolist.id)}),[e.addTasks,e.todolist.id]),f=Object(c.useCallback)((function(t){return e.changeTodoListTitle(t,e.todolist.id)}),[e.changeTodoListTitle,e.todolist.id]);return i.a.createElement("div",null,i.a.createElement("h3",null,i.a.createElement(re,{title:e.todolist.title,onChange:f,disabled:"loading"!==e.todolist.entityStatus}),i.a.createElement(m.a,{onClick:u,disabled:"loading"===e.todolist.entityStatus},i.a.createElement(ne.a,null))),i.a.createElement(I,{addItem:d,disabled:"loading"===e.todolist.entityStatus}),i.a.createElement("div",null,a.map((function(t){return i.a.createElement(ie,{changeTaskStatus:e.changeTaskStatus,changeTaskTitle:e.changeTaskTitle,removeTask:e.removeTask,task:t,id:e.todolist.id,key:t.id})}))),i.a.createElement("div",null,i.a.createElement(b.a,{size:"small",variant:"all"===e.todolist.filter?"contained":"text",onClick:r,color:"default"},"All"),i.a.createElement(b.a,{style:{margin:"0 5px"},size:"small",variant:"active"===e.todolist.filter?"contained":"text",onClick:o,color:"primary"},"Active"),i.a.createElement(b.a,{size:"small",variant:"completed"===e.todolist.filter?"contained":"text",onClick:l,color:"secondary"},"Completed")))})),le=function(e){return{type:"REMOVE-TODOLIST",todolistId:e}},se=function(e,t){return{type:"CHANGE-TODOLIST-TITLE",todolistId:e,title:t}},ue=function(e,t){return{type:"CHANGE-TODOLIST-ENTITY-STATUS",entityStatus:e,todolistId:t}},de=function(){var e=Object(s.b)(),t=Object(s.c)((function(e){return e})),a=t.todoLists,n=t.tasks1,r=Object(s.c)((function(e){return e.auth.isLoggedIn}));Object(c.useEffect)((function(){r&&e(function(){var e=Object(w.a)(C.a.mark((function e(t){var a;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(W("loading")),e.prev=1,e.next=4,G();case 4:a=e.sent,t({type:"SET_TODOLISTS",todolists:a.data}),t(W("succeeded")),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),Y(e.t0,t);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}())}),[]);var o=Object(c.useCallback)((function(t,a){e(function(e,t){return function(){var a=Object(w.a)(C.a.mark((function a(n){var r;return C.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n(W("loading")),a.prev=1,a.next=4,z(t,e);case 4:0===(r=a.sent).data.resultCode?(n({type:"ADD-TASK",task:r.data.data.item}),n(W("succeeded"))):Z(r.data,n),a.next=11;break;case 8:a.prev=8,a.t0=a.catch(1),Y(a.t0,n);case 11:case"end":return a.stop()}}),a,null,[[1,8]])})));return function(e){return a.apply(this,arguments)}}()}(t,a)),d("all",a)}),[e]),l=Object(c.useCallback)((function(t,a){e(function(e,t){return function(){var a=Object(w.a)(C.a.mark((function a(n){var r;return C.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n(W("loading")),n(te("loading",e,t)),a.prev=2,a.next=5,V(t,e);case 5:0===(r=a.sent).data.resultCode?(n(Q(e,t)),n(W("succeeded"))):Z(r.data,n),a.next=12;break;case 9:a.prev=9,a.t0=a.catch(2),Y(a.t0,n);case 12:case"end":return a.stop()}}),a,null,[[2,9]])})));return function(e){return a.apply(this,arguments)}}()}(t,a))}),[e]),u=Object(c.useCallback)((function(t,a,n){e(ae(t,{status:a},n))}),[e]),d=Object(c.useCallback)((function(t,a){e(function(e,t){return{type:"CHANGE-TODOLIST-FILTER",todolistId:e,filter:t}}(a,t))}),[e]),f=Object(c.useCallback)((function(t){e(function(e){return function(){var t=Object(w.a)(C.a.mark((function t(a){var n;return C.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a(W("loading")),a(ue("loading",e)),t.prev=2,t.next=5,H(e);case 5:0===(n=t.sent).data.resultCode?(a(le(e)),a(W("succeeded"))):Z(n.data,a),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(2),Y(t.t0,a);case 12:case"end":return t.stop()}}),t,null,[[2,9]])})));return function(e){return t.apply(this,arguments)}}()}(t))}),[e]),m=Object(c.useCallback)((function(t){e(function(e){return function(){var t=Object(w.a)(C.a.mark((function t(a){var n;return C.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a(W("loading")),t.prev=1,t.next=4,U(e);case 4:0===(n=t.sent).data.resultCode?(a({type:"ADD-TODOLIST",todolist:n.data.data.item}),a(W("succeeded"))):Z(n.data,a),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),Y(t.t0,a);case 11:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}()}(t))}),[e]),p=Object(c.useCallback)((function(t,a,n){e(ae(t,{title:a},n))}),[e]),b=Object(c.useCallback)((function(t,a){var n,r;e((n=a,r=t,function(){var e=Object(w.a)(C.a.mark((function e(t){var a;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(W("loading")),e.prev=1,e.next=4,K(n,r);case 4:0===(a=e.sent).data.resultCode?(t(se(n,r)),t(W("succeeded"))):Z(a.data,t),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),Y(e.t0,t);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}()))}),[e]);return r?i.a.createElement(i.a.Fragment,null,i.a.createElement(T.a,{container:!0,style:{padding:"20px"}},i.a.createElement(I,{addItem:m})),i.a.createElement(T.a,{container:!0,spacing:3},a.map((function(e){var t=n[e.id];return i.a.createElement(T.a,{item:!0,key:e.id},i.a.createElement(k.a,{elevation:8,style:{padding:"10px"}},i.a.createElement(oe,{todolist:e,tasks:t,removeTask:l,changeFilter:d,addTasks:o,changeTaskStatus:u,removeTodolist:f,changeTaskTitle:p,changeTodoListTitle:b})))})))):i.a.createElement(g.a,{to:"/login"})},fe=a(191),me=a(188);function pe(e){return i.a.createElement(me.a,Object.assign({elevation:6,variant:"filled"},e))}function be(){var e=Object(s.c)((function(e){return e.app.error})),t=Object(s.b)(),a=function(e,a){"clickaway"!==a&&t($(null))};return i.a.createElement(fe.a,{open:!!e,autoHideDuration:3e3,onClose:a},i.a.createElement(pe,{onClose:a,severity:"error"},e||"Some error"))}var Oe=a(192),ve=a(173),Ee=a(179),Te=a(180),ke=a(92),ge=function(){var e=Object(s.b)(),t=Object(s.c)((function(e){return e.auth.isLoggedIn})),a=Object(ke.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Required",e.password||(t.password="Required"),t},onSubmit:function(t){var a;e((a=t,function(){var e=Object(w.a)(C.a.mark((function e(t){var n;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(W("loading")),e.prev=1,e.next=4,R(a);case 4:0===(n=e.sent).data.resultCode?(t(B(!0)),t(W("succeeded"))):Z(n.data,t),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),Y(e.t0,t);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}()))}});return t?i.a.createElement(g.a,{to:"/"}):i.a.createElement(T.a,{container:!0,justify:"center"},i.a.createElement(T.a,{item:!0,xs:4},i.a.createElement(Oe.a,null,i.a.createElement(ve.a,null,i.a.createElement("p",null,"To log in get registered",i.a.createElement("a",{href:"https://social-network.samuraijs.com/",target:"blank"},"here")),i.a.createElement("p",null,"or use common test account credentials:"),i.a.createElement("p",null,"Email: alkhovikvlad@gmail.com"),i.a.createElement("p",null,"Password: itkamasutra")),i.a.createElement("form",{onSubmit:a.handleSubmit},i.a.createElement(Ee.a,null,i.a.createElement(j.a,Object.assign({label:"Email",margin:"normal"},a.getFieldProps("email"))),a.errors.email?i.a.createElement("div",{style:{color:"red"}},a.errors.email):null,i.a.createElement(j.a,Object.assign({type:"password",label:"Password",margin:"normal"},a.getFieldProps("password"))),a.errors.password?i.a.createElement("div",{style:{color:"red"}},a.errors.password):null,i.a.createElement(Te.a,{label:"Remember me",control:i.a.createElement(ce.a,a.getFieldProps("rememberMe"))}),i.a.createElement(b.a,{disabled:!!a.errors.email||!!a.errors.password,type:"submit",variant:"contained",color:"primary"},"Login"))))))};var he=function(){var e=Object(s.c)((function(e){return e.app.status})),t=Object(s.c)((function(e){return e.app.isInitialazed})),a=Object(s.c)((function(e){return e.auth.isLoggedIn})),n=Object(s.b)();return Object(c.useEffect)((function(){n(function(){var e=Object(w.a)(C.a.mark((function e(t){var a;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(W("loading")),e.prev=1,e.next=4,P();case 4:a=e.sent,t({type:"APP/SET-INITIALAZED",isInitialazed:!0}),0===a.data.resultCode?(t(B(!0)),t(W("succeeded"))):Z(a.data,t),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),Y(e.t0,t);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}())}),[]),t?i.a.createElement("div",{className:"App"},i.a.createElement(be,null),i.a.createElement(d.a,{position:"static"},i.a.createElement(f.a,null,i.a.createElement(m.a,{edge:"start",color:"inherit","aria-label":"menu"},i.a.createElement(E.a,null)),i.a.createElement(p.a,{variant:"h6"},"News"),a&&i.a.createElement(b.a,{color:"inherit",onClick:function(){n(function(){var e=Object(w.a)(C.a.mark((function e(t){var a;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(W("loading")),e.prev=1,e.next=4,F();case 4:0===(a=e.sent).data.resultCode?(t(B(!1)),t(W("succeeded"))):Z(a.data,t),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),Y(e.t0,t);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}())}},"Log out")),i.a.createElement("div",{style:{height:"4px"}},"loading"===e&&i.a.createElement(O.a,null))),i.a.createElement(v.a,{fixed:!0},i.a.createElement(g.d,null,i.a.createElement(g.b,{exact:!0,path:"/",render:function(){return i.a.createElement(de,null)}}),i.a.createElement(g.b,{path:"/login",render:function(){return i.a.createElement(ge,null)}}),i.a.createElement(g.b,{path:"/404",render:function(){return i.a.createElement("h1",null,"404: PAGE NOT FOUND")}}),i.a.createElement(g.a,{from:"*",to:"/404"})))):i.a.createElement("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"}},i.a.createElement(u.a,null))};a(137),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var je=a(43),Se=a(91),Ie=Object(je.c)({todoLists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TODOLIST":return e.filter((function(e){return e.id!==t.todolistId}));case"CHANGE-TODOLIST-ENTITY-STATUS":return e.map((function(e){return e.id===t.todolistId?Object(L.a)(Object(L.a)({},e),{},{entityStatus:t.entityStatus}):e}));case"ADD-TODOLIST":return[Object(L.a)(Object(L.a)({},t.todolist),{},{filter:"all",entityStatus:"idle"})].concat(Object(A.a)(e));case"CHANGE-TODOLIST-TITLE":return e.map((function(e){return e.id===t.todolistId?Object(L.a)(Object(L.a)({},e),{},{title:t.title}):e}));case"CHANGE-TODOLIST-FILTER":return e.map((function(e){return e.id===t.todolistId?Object(L.a)(Object(L.a)({},e),{},{filter:t.filter}):e}));case"SET_TODOLISTS":return t.todolists.map((function(e){return Object(L.a)(Object(L.a)({},e),{},{filter:"all",entityStatus:"idle"})}));default:return e}},tasks1:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TASK":return Object(L.a)(Object(L.a)({},e),{},Object(x.a)({},t.todolistId,e[t.todolistId].filter((function(e){return e.id!==t.taskId}))));case"ADD-TASK":return Object(L.a)(Object(L.a)({},e),{},Object(x.a)({},t.task.todoListId,[].concat(Object(A.a)(e[t.task.todoListId]),[Object(L.a)(Object(L.a)({},t.task),{},{entityStatus:"idle"})])));case"UPDATE_TASK":return Object(L.a)(Object(L.a)({},e),{},Object(x.a)({},t.todolistId,e[t.todolistId].map((function(e){return e.id===t.taskId?Object(L.a)(Object(L.a)({},e),t.updateModel):e}))));case"ADD-TODOLIST":return Object(L.a)(Object(L.a)({},e),{},Object(x.a)({},t.todolist.id,[]));case"CHANGE-TASK-ENTITY-STATUS":return Object(L.a)(Object(L.a)({},e),{},Object(x.a)({},t.todolistId,e[t.todolistId].map((function(e){return e.id===t.taskId?Object(L.a)(Object(L.a)({},e),{},{entityStatus:t.entityStatus}):e}))));case"SET_TODOLISTS":var a=Object(L.a)({},e);return t.todolists.forEach((function(e){a[e.id]=[]})),a;case"SET_TASKS":return Object(L.a)(Object(L.a)({},e),{},Object(x.a)({},t.todolistId,t.tasks.map((function(e){return Object(L.a)(Object(L.a)({},e),{},{entityStatus:"idle"})}))));case"REMOVE-TODOLIST":var n=Object(L.a)({},e);return delete n[t.todolistId],n;default:return e}},app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:J,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP/SET-STATUS":return Object(L.a)(Object(L.a)({},e),{},{status:t.status});case"APP/SET-ERROR":return Object(L.a)(Object(L.a)({},e),{},{error:t.error});case"APP/SET-INITIALAZED":return Object(L.a)(Object(L.a)({},e),{},{isInitialazed:t.isInitialazed});default:return e}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"login/SET-IS-LOGGED-IN":return Object(L.a)(Object(L.a)({},e),{},{isLoggedIn:t.value});default:return e}}}),ye=Object(je.d)(Ie,Object(je.a)(Se.a));window.store=ye;var Ce=a(48);l.a.render(i.a.createElement(Ce.a,null,i.a.createElement(s.a,{store:ye},i.a.createElement(he,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[104,1,2]]]);
//# sourceMappingURL=main.a95714a4.chunk.js.map