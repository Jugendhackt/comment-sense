(this["webpackJsonpmain-site"]=this["webpackJsonpmain-site"]||[]).push([[0],{106:function(e,t,n){},107:function(e,t,n){"use strict";n.r(t);var a,r,c,o,l,i,s,u,m,p,d,g,f,h,b,E,y,S,O,j,w=n(0),x=n.n(w),v=n(11),I=n.n(v),C=n(49),k=n(165),U=n(79),N=Object(U.a)({palette:{type:"dark",primary:{light:"#ff9800",main:"#f57c00",dark:"#e65100",contrastText:"#fffff"},secondary:{light:"#42a5f5",main:"#1e88e5",dark:"#0d47a1",contrastText:"#fffff"}},themeName:"CommentSense"}),T=n(74),A=n(158),F=n(159),D=n(157),z=n(37),P=n(160),B={brandName:"CommentSense",home:"Home",signIn:"Anmelden",signInText:"Hier kommt noch ein Text hin",signInSuccessTitle:"Erfolgreich angemeldet",signInSuccessText:"Du hast dich erfolgreich angemeldet",signInErrTitle:"Fehler!",signInErrText:"Fehler beim anmelden",signUp:"Registieren",signUpText:"Hier kommt noch ein Text hin",signUpSuccessTitle:"Nutzer erstellt",signUpSuccessText:"Der Nutzer wurde erfolgreich erstellt",signUpErrTitle:"Fehler!",signUpErrText:"Der Nutzer konnte nicht erstellt werden",toWebsite:"zur Website wechseln",username:"Nickname",password:"Passwort",email:"E-mail",cancel:"Abbrechen",ok:"OK",saveChanges:"\xc4nderungen speichern",account:"Account bearbeiten",github:"CommentSense auf Github",notFoundTitle:"Seite nicht gefunden!",notFoundText:"Die angefragte Seite konnte nicht gefunden werden.",loggedInAs:"Angemeldet als: ",logout:"Abmelden",addComment:"Kommentar schreiben",addCommentText:"Bitte f\xfclle alle Felder aus",commentSend:"Kommentar senden",commentTitle:"Titel",commentText:"Kommentar",commentSuccessTitle:"Kommentar erfolgreich erstellt",commentSuccessText:"Hier kommt noch Text hin",commentFailTitle:"Fehler beim Kommentar erstellen",commentFailText:"Hier kommt noch Text hin"},W=n(152),H=n(144),J=n(110),K=n(153),q=n(145),L=n(146),R=n(148),G=n(154),M=n(155),Q=n(137),V=n(139),X=n(140),Y=n(141),Z=n(167),$=n(142),_=n(143),ee=n(13),te=n(108),ne=n(23),ae=n(136),re=x.a.forwardRef((function(e,t){return x.a.createElement(te.a,Object.assign({direction:"up",ref:t},e))})),ce=Object(ee.a)((function(e){var t=Object(ne.a)(),n=Object(ae.a)(t.breakpoints.down("sm"));return x.a.createElement(Q.a,{open:e.open,onClose:e.onClose,fullScreen:n,TransitionComponent:re},x.a.createElement(V.a,null,e.title),x.a.createElement(X.a,null,x.a.createElement(Y.a,null,e.text)),x.a.createElement($.a,null,x.a.createElement(_.a,{variant:"contained",color:"secondary",onClick:e.onClose},B.cancel)))})),oe="http://commentsense.de",le=function(){return"".concat(oe,"/api/signup/")},ie=function(e){return e.username&&e.password?"".concat(oe,"/api/signin?username=").concat(e.username,"&password=").concat(e.password):null},se=function(){return"".concat(oe,"/api/comments/")},ue=function(){return"".concat(oe,"/api/user")},me=n(14),pe=n(31),de=n(41),ge=n(8),fe=(n(48),n(6)),he=(a=function(){function e(){Object(pe.a)(this,e),Object(me.a)(this,"comments",r,this)}return Object(de.a)(e,[{key:"handleComments",value:function(e){this.comments=e}}]),e}(),r=Object(ge.a)(a.prototype,"comments",[fe.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),Object(ge.a)(a.prototype,"handleComments",[fe.b],Object.getOwnPropertyDescriptor(a.prototype,"handleComments"),a.prototype),a),be=(c=function(){function e(){Object(pe.a)(this,e),Object(me.a)(this,"username",o,this),Object(me.a)(this,"password",l,this),Object(me.a)(this,"email",i,this),Object(me.a)(this,"sid",s,this),Object(me.a)(this,"loggedIn",u,this)}return Object(de.a)(e,[{key:"handleUsername",value:function(e){this.username=e}},{key:"handlePassword",value:function(e){this.password=e}},{key:"handleSid",value:function(e){this.sid=e}},{key:"handleLoggedIn",value:function(e){this.loggedIn=e}}]),e}(),o=Object(ge.a)(c.prototype,"username",[fe.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),l=Object(ge.a)(c.prototype,"password",[fe.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),i=Object(ge.a)(c.prototype,"email",[fe.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),s=Object(ge.a)(c.prototype,"sid",[fe.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),u=Object(ge.a)(c.prototype,"loggedIn",[fe.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),Object(ge.a)(c.prototype,"handleUsername",[fe.b],Object.getOwnPropertyDescriptor(c.prototype,"handleUsername"),c.prototype),Object(ge.a)(c.prototype,"handlePassword",[fe.b],Object.getOwnPropertyDescriptor(c.prototype,"handlePassword"),c.prototype),Object(ge.a)(c.prototype,"handleSid",[fe.b],Object.getOwnPropertyDescriptor(c.prototype,"handleSid"),c.prototype),Object(ge.a)(c.prototype,"handleLoggedIn",[fe.b],Object.getOwnPropertyDescriptor(c.prototype,"handleLoggedIn"),c.prototype),c),Ee=(m=function(){function e(){Object(pe.a)(this,e),Object(me.a)(this,"openSignIn",p,this),Object(me.a)(this,"openSignUp",d,this),Object(me.a)(this,"openSignInSuccess",g,this),Object(me.a)(this,"openSignInFail",f,this),Object(me.a)(this,"openSignUpSuccess",h,this),Object(me.a)(this,"openSignUpFail",b,this),Object(me.a)(this,"openAccount",E,this),Object(me.a)(this,"anchorElAccount",y,this),Object(me.a)(this,"openDrawer",S,this)}return Object(de.a)(e,[{key:"handleSignIn",value:function(e){this.openSignIn=e}},{key:"handleSignUp",value:function(e){this.openSignUp=e}},{key:"handleSignInSuccess",value:function(e){this.openSignInSuccess=e}},{key:"handleSignInFail",value:function(e){this.openSignInFail=e}},{key:"handleSignUpSuccess",value:function(e){this.openSignUpSuccess=e}},{key:"handleSignUpFail",value:function(e){this.openSignUpFail=e}},{key:"handleAccount",value:function(e){this.openAccount=e}},{key:"handleAnchorElAccount",value:function(e){this.anchorElAccount=e}},{key:"handleDrawer",value:function(e){this.openDrawer=e}}]),e}(),p=Object(ge.a)(m.prototype,"openSignIn",[fe.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),d=Object(ge.a)(m.prototype,"openSignUp",[fe.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),g=Object(ge.a)(m.prototype,"openSignInSuccess",[fe.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),f=Object(ge.a)(m.prototype,"openSignInFail",[fe.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),h=Object(ge.a)(m.prototype,"openSignUpSuccess",[fe.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),b=Object(ge.a)(m.prototype,"openSignUpFail",[fe.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),E=Object(ge.a)(m.prototype,"openAccount",[fe.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),y=Object(ge.a)(m.prototype,"anchorElAccount",[fe.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),S=Object(ge.a)(m.prototype,"openDrawer",[fe.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),Object(ge.a)(m.prototype,"handleSignIn",[fe.b],Object.getOwnPropertyDescriptor(m.prototype,"handleSignIn"),m.prototype),Object(ge.a)(m.prototype,"handleSignUp",[fe.b],Object.getOwnPropertyDescriptor(m.prototype,"handleSignUp"),m.prototype),Object(ge.a)(m.prototype,"handleSignInSuccess",[fe.b],Object.getOwnPropertyDescriptor(m.prototype,"handleSignInSuccess"),m.prototype),Object(ge.a)(m.prototype,"handleSignInFail",[fe.b],Object.getOwnPropertyDescriptor(m.prototype,"handleSignInFail"),m.prototype),Object(ge.a)(m.prototype,"handleSignUpSuccess",[fe.b],Object.getOwnPropertyDescriptor(m.prototype,"handleSignUpSuccess"),m.prototype),Object(ge.a)(m.prototype,"handleSignUpFail",[fe.b],Object.getOwnPropertyDescriptor(m.prototype,"handleSignUpFail"),m.prototype),Object(ge.a)(m.prototype,"handleAccount",[fe.b],Object.getOwnPropertyDescriptor(m.prototype,"handleAccount"),m.prototype),Object(ge.a)(m.prototype,"handleAnchorElAccount",[fe.b],Object.getOwnPropertyDescriptor(m.prototype,"handleAnchorElAccount"),m.prototype),Object(ge.a)(m.prototype,"handleDrawer",[fe.b],Object.getOwnPropertyDescriptor(m.prototype,"handleDrawer"),m.prototype),m),ye=Object(w.createContext)({commentStore:new he,userStore:new be,dialogStore:new Ee}),Se=function(){return Object(w.useContext)(ye)},Oe=function(e){return new Promise((function(t){console.log(e),void 0!==e&&null!==e?fetch("".concat(oe,"/api/checksid?sid='").concat(e,"'")).then((function(e){401===e.status?t(!1):200===e.status&&t(!0)})):t(!1)}))},je=function(){document.cookie="sid=; expires Thu, 01 Jan 1970 00:00:01 GMT;"},we=Object(T.a)((function(e){return{box:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",alignContent:"center",width:"100%"},mb:{marginBottom:e.spacing(2)},center:{display:"flex",justifyContent:"center"}}})),xe=Object(ee.a)((function(e){var t=Se(),n=t.userStore,a=t.dialogStore,r=we();return x.a.createElement(x.a.Fragment,null,x.a.createElement(Q.a,{open:a.openSignUp,onClose:function(){return a.handleSignUp(!1)},fullScreen:!0},x.a.createElement(V.a,null,B.signUp),x.a.createElement(X.a,{dividers:!0},x.a.createElement(Y.a,null,B.signUpText),x.a.createElement(Z.a,{label:B.username,value:n.username,fullWidth:!0,required:!0,className:r.mb,onChange:function(e){return n.handleUsername(e.target.value)}}),x.a.createElement(Z.a,{label:B.password,value:n.password,fullWidth:!0,required:!0,className:r.mb,onChange:function(e){return n.handlePassword(e.target.value)},type:"password"})),x.a.createElement($.a,{className:r.center},x.a.createElement(_.a,{variant:"contained",color:"primary",onClick:function(){n.username&&n.password&&fetch(le(),{method:"POST",header:{"Content-Type":"application/json"},body:JSON.stringify({username:n.username,password:n.password})}).then((function(e){200===e.status?(a.handleSignUpSuccess(!0),a.handleSignUp(!1)):(a.handleSignUpFail(!0),a.handleSignUp(!1))})).catch((function(e){a.handleSignUpFail(!0)}))}},B.signUp),x.a.createElement(_.a,{variant:"contained",color:"secondary",onClick:function(){return a.handleSignUp(!1)}},B.cancel))),x.a.createElement(ce,{open:a.openSignUpSuccess,onClose:function(){return a.handleSignUpSuccess(!1)},title:B.signUpSuccessTitle,text:B.signUpSuccessText}),x.a.createElement(ce,{open:a.openSignUpFail,onClose:function(){return a.handleSignUpFail(!1)},title:B.signUpErrTitle,text:B.signUpErrText}))})),ve=function(e,t){if(Array.isArray(e)&&Array.isArray(t))for(var n=0;n<e.length;n++)localStorage.setItem(e[n],t[n]);else localStorage.setItem(e,t)},Ie=function(e){if(Array.isArray(e)){for(var t=[],n=e.length,a=0;a<n;a++)t.push(localStorage.getItem(e[a]));return t}return localStorage.getItem(e)},Ce=Object(T.a)((function(e){return{box:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",alignContent:"center",width:"100%"},center:{display:"flex",justifyContent:"center"},mb:{marginBottom:e.spacing(2)}}})),ke=Object(ee.a)((function(e){var t=Se(),n=t.userStore,a=t.dialogStore,r=Ce();return x.a.createElement(x.a.Fragment,null,x.a.createElement(Q.a,{open:a.openSignIn,onClose:function(){return a.handleSignIn(!1)},fullScreen:!0},x.a.createElement(V.a,null,B.signIn),x.a.createElement(X.a,null,x.a.createElement(Y.a,null,B.signInText),x.a.createElement(Z.a,{label:B.username,value:n.username,fullWidth:!0,required:!0,className:r.mb,onChange:function(e){return n.handleUsername(e.target.value)}}),x.a.createElement(Z.a,{label:B.password,value:n.password,fullWidth:!0,required:!0,className:r.mb,onChange:function(e){return n.handlePassword(e.target.value)},type:"password"})),x.a.createElement($.a,{className:r.center},x.a.createElement(_.a,{variant:"contained",color:"primary",onClick:function(){fetch(ie({username:n.username,password:n.password})).then((function(e){if(200===e.status)return ve("username",n.username),a.handleSignInSuccess(!0),a.handleSignIn(!1),e.json();a.handleSignInFail(!0),a.handleSignIn(!1)})).then((function(e){e.sid&&(n.handleSid(e.sid),ve("sid",e.sid))})).catch((function(e){a.handleSignInFail(!0)}))}},B.signIn),x.a.createElement(_.a,{variant:"contained",color:"secondary",onClick:function(){return a.handleSignIn(!1)}},B.cancel))),x.a.createElement(ce,{open:a.openSignInSuccess,onClose:function(){return a.handleSignInSuccess(!1)},title:B.signInSuccessTitle,text:B.signInSuccessText}),x.a.createElement(ce,{open:a.openSignInFail,onClose:function(){return a.handleSignInFail(!1)},title:B.signUpErrTitle,text:B.signUpErrText}))})),Ue=n(147),Ne=n(149),Te=n(150),Ae=Object(ee.a)((function(e){var t=Se().userStore;return t.loggedIn?x.a.createElement(x.a.Fragment,null,x.a.createElement(q.a,{color:"inherit",href:"/account/"},x.a.createElement(J.a,{button:!0},x.a.createElement(L.a,null,x.a.createElement(Ue.a,{color:"secondary"})),x.a.createElement(R.a,{primary:B.account}))),x.a.createElement(J.a,{button:!0},x.a.createElement(L.a,null,x.a.createElement(Ne.a,{color:"secondary"})),x.a.createElement(R.a,{primary:"".concat(B.loggedInAs," ").concat(t.username)})),x.a.createElement(J.a,{button:!0,onClick:function(){t.loggedIn=!1,t.password="",t.username="",t.email="",t.sid="",je(),window.location.reload()}},x.a.createElement(L.a,null,x.a.createElement(Te.a,{color:"secondary"})),x.a.createElement(R.a,{primary:B.logout}))):null})),Fe=n(151),De=Object(ee.a)((function(e){var t=Se(),n=t.dialogStore;return t.userStore.loggedIn?null:x.a.createElement(x.a.Fragment,null,x.a.createElement(J.a,{button:!0,onClick:function(){return n.openSignIn=!0}},x.a.createElement(L.a,null,x.a.createElement(Ne.a,{color:"secondary"})),x.a.createElement(R.a,{primary:B.signIn})),x.a.createElement(J.a,{button:!0,onClick:function(){return n.openSignUp=!0}},x.a.createElement(L.a,null,x.a.createElement(Fe.a,{color:"secondary"})),x.a.createElement(R.a,{primary:B.signUp})))})),ze=Object(T.a)((function(e){return{list:{width:250,height:"100%"}}})),Pe=Object(ee.a)((function(e){var t=Se().dialogStore,n=ze();return x.a.createElement(W.a,{open:t.openDrawer,onClose:function(){return t.handleDrawer(!1)}},x.a.createElement("div",{className:n.list},x.a.createElement(H.a,null,x.a.createElement(J.a,null,x.a.createElement(z.a,{variant:"h6"},B.brandName)),x.a.createElement(K.a,null),x.a.createElement(q.a,{color:"inherit",href:"/"},x.a.createElement(J.a,{button:!0},x.a.createElement(L.a,null,x.a.createElement(G.a,{color:"secondary"})),x.a.createElement(R.a,{primary:B.home}))),x.a.createElement(De,null),x.a.createElement(Ae,null),x.a.createElement(q.a,{color:"inherit",href:"https://github.com/Jugendhackt/comment-sense/"},x.a.createElement(J.a,{button:!0},x.a.createElement(L.a,null,x.a.createElement(M.a,{color:"secondary"})),x.a.createElement(R.a,{primary:B.github}))))),x.a.createElement(xe,null),x.a.createElement(ke,null))})),Be=n(80),We=n(156),He=Object(ee.a)((function(e){var t=Se(),n=t.userStore,a=t.dialogStore;return n.loggedIn?x.a.createElement(Be.a,{keepMounted:!0,anchorEl:a.anchorElAccount,open:a.openAccount,onClose:function(){a.handleAnchorElAccount(null),a.handleAccount(!1)}},x.a.createElement(We.a,null,x.a.createElement(L.a,null,x.a.createElement(Ne.a,{color:"secondary"})),x.a.createElement(R.a,{primary:"".concat(B.loggedInAs," ").concat(n.username)})),x.a.createElement(We.a,{onClick:function(){var e;!function(e){e.username="",e.password="",e.email="",e.sid="",e.loggedIn=!1}(n),e="sid",localStorage.removeItem(e),window.location.reload()}},x.a.createElement(L.a,null,x.a.createElement(Ne.a,{color:"secondary"})),x.a.createElement(R.a,{primary:B.logout}))):null})),Je=n(168),Ke=Object(T.a)((function(){return{account:{display:"flex",justifyContent:"flex-end",width:"100%"}}})),qe=Object(ee.a)((function(e){var t=Se(),n=t.dialogStore,a=t.userStore,r=Ke();return a.loggedIn?x.a.createElement(Je.a,{className:r.account},x.a.createElement(D.a,{color:"inherit",onClick:function(e){n.handleAccount(!0),n.handleAnchorElAccount(e.currentTarget)}},x.a.createElement(Ne.a,null))):null})),Le=Object(T.a)((function(e){return{menuButton:{marginRight:e.spacing(2)}}})),Re=Object(ee.a)((function(e){var t=Se().dialogStore,n=Le();return x.a.createElement(x.a.Fragment,null,x.a.createElement(A.a,{position:"sticky"},x.a.createElement(F.a,null,x.a.createElement(D.a,{edge:"start",className:n.menuButton,color:"inherit",onClick:function(e){(!e||"keydown"!==e.target.type||"Tab"!==e.key&&"Shift"!==e.key)&&t.handleDrawer(!t.openDrawer)}},x.a.createElement(P.a,null)),x.a.createElement(z.a,{variant:"h6"},B.brandName),x.a.createElement(qe,null),x.a.createElement(He,null))),x.a.createElement(Pe,null))})),Ge=n(33),Me=n(163),Qe=n(162),Ve=n(55),Xe=n.n(Ve),Ye=n(62),Ze=n(161),$e=Object(T.a)((function(e){return{website:{display:"flex",flexDirection:"column",margin:e.spacing(1)},title:{margin:e.spacing(2)},paper:{margin:e.spacing(1),padding:"5%",minWidth:"40%"},text:{marginLeft:e.spacing(1)}}})),_e=function(e){var t=$e();return x.a.createElement(J.a,{button:!0,className:t.website},x.a.createElement(Ye.a,{className:t.paper},x.a.createElement(z.a,{variant:"h5"},e.url.length>40?e.url.substring(0,40)+"...":e.url),x.a.createElement("br",null),x.a.createElement(Je.a,{display:"flex"},x.a.createElement(Ze.a,{color:"secondary"}),x.a.createElement(R.a,{primary:e.comments,className:t.text})),x.a.createElement(q.a,{color:"inherit",href:e.url},x.a.createElement(_.a,{color:"primary",variant:"contained"},B.toWebsite))))},et=(O=function e(){Object(pe.a)(this,e),Object(me.a)(this,"websites",j,this)},j=Object(ge.a)(O.prototype,"websites",[fe.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),O),tt=Object(w.createContext)(new et),nt=Object(T.a)((function(){return{progress:{margin:"5%"},box:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}})),at=Object(ee.a)((function(e){var t=Object(w.useContext)(tt),n=nt();Object(w.useEffect)((function(){fetch("".concat(oe,"/api/sites/")).then((function(e){if(e.ok)return e.json()})).then((function(e){t.websites=e.sites}))}),[]);return x.a.createElement(H.a,null,Array.isArray(t.websites)&&t.websites.length?Array.from(t.websites).map((function(e){return x.a.createElement(_e,{url:e.url,comments:e.comments,key:Xe.a.v4()})})):x.a.createElement(Je.a,{className:n.box},x.a.createElement(Qe.a,{size:100,className:n.progress}),x.a.createElement(Qe.a,{size:100,className:n.progress}),x.a.createElement(Qe.a,{size:100,className:n.progress}),x.a.createElement(Qe.a,{size:100,className:n.progress}),x.a.createElement(Qe.a,{size:100,className:n.progress})))})),rt=function(e){return x.a.createElement(at,e)},ct=Object(T.a)((function(e){return{comment:{display:"flex",flexDirection:"column"},paper:{margin:e.spacing(2),padding:"5%",minWidth:"70%"},box:{display:"flex",flexDirection:"row",justifyContent:"space-between"},mb:{marginBottom:e.spacing(2)},text:{marginLeft:e.spacing(1)}}})),ot=function(e){var t=Se().userStore,n=ct();return x.a.createElement(J.a,{button:!0,className:n.comment},x.a.createElement(Ye.a,{className:n.paper},x.a.createElement(Je.a,{className:"".concat(n.box," ").concat(n.mb)},x.a.createElement(z.a,{variant:"h5"},e.title),x.a.createElement(z.a,{variant:"caption"},e.date)),x.a.createElement(R.a,{primary:e.content,className:n.mb}),x.a.createElement(Je.a,{className:n.box},x.a.createElement(z.a,{variant:"caption"},e.author),x.a.createElement(Je.a,{display:"flex",onClick:function(){console.log(t.sid),fetch(se(),{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({sid:t.sid,username:t.username,id:e.id,vote:!e.voted,password:"q"})}).then((function(e){200===e.status||e.status}))}},x.a.createElement(Ze.a,{color:e.voted?"primary":"inherit"}),x.a.createElement(R.a,{primary:e.votes,className:n.text})))))},lt=Object(T.a)((function(e){return{box:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},progress:{margin:"5%"}}})),it=Object(ee.a)((function(e){var t=lt(),n=Se().commentStore;return Object(w.useEffect)((function(){fetch("".concat(oe,"/api/comments?count=5")).then((function(e){if(e.ok)return e.json()})).then((function(e){n.comments=e.comments}))}),[]),x.a.createElement(H.a,null,Array.isArray(n.comments)&&n.comments.length?n.comments.map((function(e){return x.a.createElement(ot,{date:e.date,content:e.content,title:e.headline,url:e.url,author:e.author,votes:e.likes,key:Xe.a.v4()})})):x.a.createElement(Je.a,{className:t.box},x.a.createElement(Qe.a,{size:100,className:t.progress}),x.a.createElement(Qe.a,{size:100,className:t.progress}),x.a.createElement(Qe.a,{size:100,className:t.progress}),x.a.createElement(Qe.a,{size:100,className:t.progress}),x.a.createElement(Qe.a,{size:100,className:t.progress})))}));function st(e){return x.a.createElement(it,e)}function ut(){return x.a.createElement(Me.a,{container:!0},x.a.createElement(Me.a,{item:!0,xs:12,sm:6},x.a.createElement(rt,null)),x.a.createElement(Me.a,{item:!0,xs:12,sm:6},x.a.createElement(st,null)))}var mt=n(77),pt=Object(T.a)((function(e){return{paper:{width:"100%",padding:e.spacing(2)},textField:{width:"90%",margin:e.spacing(1)},div:{display:"flex",justifyContent:"center"},box:{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"},buttonBox:Object(mt.a)({display:"flex",flexDirection:"row",justifyContent:"center",width:"100%"},e.breakpoints.down("sm"),{flexDirection:"column"}),button:{margin:e.spacing(2)}}})),dt=Object(ee.a)((function(e){var t=Se().userStore,n=pt(),a=Object(Ge.g)();return x.a.createElement("div",{className:n.div},x.a.createElement(Ye.a,{className:n.paper},x.a.createElement(Je.a,{className:n.box},x.a.createElement(Z.a,{label:B.username,className:n.textField,value:t.username,onChange:function(e){return t.username=e.target.value}}),x.a.createElement(Z.a,{label:B.password,className:n.textField,value:t.password,onChange:function(e){return t.password=e.target.value},type:"password"}),x.a.createElement(Z.a,{label:B.email,className:n.textField,value:t.email,onChange:function(e){return t.email=e.target.value}}),x.a.createElement(Je.a,{className:n.buttonBox},x.a.createElement(_.a,{variant:"contained",color:"primary",onClick:function(){fetch(ue(),{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t.username,password:t.password,email:t.email,"new password":""})})},className:n.button},B.saveChanges),x.a.createElement(_.a,{variant:"contained",color:"secondary",onClick:function(){a.push("/")},className:n.button},B.cancel)))))}));function gt(e){return x.a.createElement(x.a.Fragment,null,x.a.createElement(z.a,{variant:"h3"},B.notFoundTitle),x.a.createElement(z.a,{variant:"body1"},B.notFoundText))}var ft=n(164),ht=Object(T.a)((function(e){return{mt:{marginTop:e.spacing(2)}}}));function bt(e){var t=ht();return x.a.createElement(ft.a,{fixed:!0,className:t.mt},x.a.createElement(Ge.d,null,x.a.createElement(Ge.b,{exact:!0,path:"/",render:function(e){return x.a.createElement(ut,e)}}),x.a.createElement(Ge.b,{exact:!0,path:"/account",render:function(e){return x.a.createElement(dt,e)}}),x.a.createElement(Ge.b,{exact:!0,path:"/404",render:function(e){return x.a.createElement(gt,e)}}),x.a.createElement(Ge.a,{to:"/404"})))}var Et=n(166),yt=Object(ee.a)((function(e){var t=Se().userStore,n=Ie("sid");return Oe(n).then((function(e){e&&(t.loggedIn=!0,t.username=Ie("username"))})),x.a.createElement("div",null,x.a.createElement(k.a,{theme:N},x.a.createElement(C.a,null,x.a.createElement(Et.a,null),x.a.createElement(Re,null),x.a.createElement(bt,null))))}));n(106);I.a.render(x.a.createElement(yt,null),document.getElementById("root"))},94:function(e,t,n){e.exports=n(107)}},[[94,1,2]]]);
//# sourceMappingURL=main.a2d2c42f.chunk.js.map