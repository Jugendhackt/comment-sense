(this["webpackJsonpmain-site"]=this["webpackJsonpmain-site"]||[]).push([[0],{103:function(e,n,t){},104:function(e,n,t){"use strict";t.r(n);var a,r,c,l,o,i,s,u,m,p,b,g,E,f,d,h,j=t(0),y=t.n(j),O=t(10),x=t.n(O),C=t(48),w=t(163),v=t(77),S=Object(v.a)({palette:{type:"dark",primary:{light:"#ff9800",main:"#f57c00",dark:"#e65100",contrastText:"#fffff"},secondary:{light:"#42a5f5",main:"#1e88e5",dark:"#0d47a1",contrastText:"#fffff"}},themeName:"CommentSense"}),N=t(72),k=t(167),I=t(141),T=t(107),U=t(37),z=t(144),F=t(145),A=t(146),D=t(148),W="http://commentsense.de",B={brandName:"CommentSense",home:"Home",signIn:"Anmelden",signInText:"Hier kommt noch ein Text hin",signInSuccessTitle:"Erfolgreich angemeldet",signInSuccessText:"Du hast dich erfolgreich angemeldet",signInErrTitle:"Fehler!",signInErrText:"Fehler beim anmelden",signUp:"Registieren",signUpText:"Hier kommt noch ein Text hin",signUpSuccessTitle:"Nutzer erstellt",signUpSuccessText:"Der Nutzer wurde erfolgreich erstellt",signUpErrTitle:"Fehler!",signUpErrText:"Der Nutzer konnte nicht erstellt werden",toWebsite:"zur Website wechseln",username:"Nickname",password:"Passwort",email:"E-mail",cancel:"Abbrechen",ok:"OK",saveChanges:"\xc4nderungen speichern",account:"Account bearbeiten",github:"CommentSense auf Github",notFoundTitle:"Seite nicht gefunden!",notFoundText:"Die angefragte Seite konnte nicht gefunden werden.",loggedInAs:"Angemeldet als: "},q=t(147),J=t(149),H=t(150),P=t(151),R=t(152),L=t(135),G=t(136),K=t(137),M=t(138),Q=t(139),V=t(140),X=t(166),Y=t(165),Z=t(142),$=t(60),_=t(14),ee=t(12),ne=t(27),te=t(13),ae=(t(47),t(7)),re=(a=function e(){Object(ne.a)(this,e),Object(ee.a)(this,"username",r,this),Object(ee.a)(this,"password",c,this),Object(ee.a)(this,"email",l,this),Object(ee.a)(this,"sid",o,this),Object(ee.a)(this,"loggedIn",i,this)},r=Object(te.a)(a.prototype,"username",[ae.e],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),c=Object(te.a)(a.prototype,"password",[ae.e],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),l=Object(te.a)(a.prototype,"email",[ae.e],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),o=Object(te.a)(a.prototype,"sid",[ae.e],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),i=Object(te.a)(a.prototype,"loggedIn",[ae.e],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),a),ce=Object(j.createContext)(new re),le=(s=function e(){Object(ne.a)(this,e),Object(ee.a)(this,"openSignIn",u,this),Object(ee.a)(this,"openSignUp",m,this),Object(ee.a)(this,"openSignInSuccess",p,this),Object(ee.a)(this,"openSignInFail",b,this),Object(ee.a)(this,"openSignUpSuccess",g,this),Object(ee.a)(this,"openSignUpFail",E,this),Object(ee.a)(this,"openAccount",f,this),Object(ee.a)(this,"anchorElAccount",d,this),Object(ee.a)(this,"openDrawer",h,this)},u=Object(te.a)(s.prototype,"openSignIn",[ae.e],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),m=Object(te.a)(s.prototype,"openSignUp",[ae.e],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),p=Object(te.a)(s.prototype,"openSignInSuccess",[ae.e],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),b=Object(te.a)(s.prototype,"openSignInFail",[ae.e],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),g=Object(te.a)(s.prototype,"openSignUpSuccess",[ae.e],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),E=Object(te.a)(s.prototype,"openSignUpFail",[ae.e],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),f=Object(te.a)(s.prototype,"openAccount",[ae.e],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),d=Object(te.a)(s.prototype,"anchorElAccount",[ae.e],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),h=Object(te.a)(s.prototype,"openDrawer",[ae.e],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),s),oe=Object(j.createContext)(new le),ie=Object(N.a)((function(e){return{box:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",alignContent:"center",width:"100%"},mb:{marginBottom:e.spacing(2)},margin:{margin:e.spacing(1)}}})),se=Object(_.a)((function(e){var n=Object($.a)(),t=Object(L.a)(n.breakpoints.down("sm")),a=Object(j.useContext)(ce),r=Object(j.useContext)(oe),c=ie();return y.a.createElement(y.a.Fragment,null,y.a.createElement(G.a,{open:e.open,onClose:e.onClose,fullScreen:t},y.a.createElement(K.a,null,B.signUp),y.a.createElement(M.a,{dividers:!0},y.a.createElement(Q.a,null,B.signUpText),y.a.createElement(V.a,null,y.a.createElement(X.a,{className:c.box},y.a.createElement(Y.a,{label:B.username,value:a.username,fullWidth:!0,required:!0,className:c.mb,onChange:function(e){return a.username=e.target.value}}),y.a.createElement(Y.a,{label:B.password,value:a.password,fullWidth:!0,required:!0,className:c.mb,onChange:function(e){return a.password=e.target.value},type:"password"}),y.a.createElement(Y.a,{label:B.email,value:a.email,fullWidth:!0,className:c.mb,onChange:function(e){return a.email=e.target.value}}),y.a.createElement(X.a,{className:c.margin},y.a.createElement(Z.a,{variant:"contained",color:"primary",className:c.margin,onClick:function(){a.username&&a.password&&fetch("".concat(W,"/api/signup/"),{method:"POST",body:JSON.stringify({userName:a.username,password:a.password})}).then((function(e){200===e.status?r.openSignUpSuccess=!0:r.openSignUpFail=!0})).catch((function(e){r.openSignUpFail=!0}))}},B.signUp),y.a.createElement(Z.a,{variant:"contained",color:"secondary",className:c.margin,onClick:e.onClose},B.cancel)))))),y.a.createElement(ue,{open:r.openSignUpSuccess,onClose:function(){return r.openSignInSuccess=!1}}),y.a.createElement(me,{open:r.openSignUpFail,onClose:function(){return r.openSignUpFail=!1}}))}));function ue(e){var n=Object($.a)(),t=Object(L.a)(n.breakpoints.down("sm"));return y.a.createElement(G.a,{open:e.open,onClose:e.onClose,fullScreen:t},y.a.createElement(K.a,null,B.signUpSuccessTitle),y.a.createElement(M.a,null,y.a.createElement(Q.a,null,B.signUpSuccessText),y.a.createElement(V.a,null,y.a.createElement(Z.a,{variant:"contained",color:"primary",onClick:function(){window.location.reload()}},B.ok))))}function me(e){var n=Object($.a)(),t=Object(L.a)(n.breakpoints.down("sm"));return y.a.createElement(G.a,{open:e.open,onClose:e.onClose,fullScreen:t},y.a.createElement(K.a,null,B.signUpErrTitle),y.a.createElement(M.a,null,y.a.createElement(Q.a,null,B.signUpErrText),y.a.createElement(V.a,null,y.a.createElement(Z.a,{variant:"contained",color:"secondary",onClick:e.onClose},B.ok))))}function pe(e){return y.a.createElement(se,e)}var be=Object(N.a)((function(e){return{box:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",alignContent:"center",width:"100%"},margin:{margin:e.spacing(1)},mb:{marginBottom:e.spacing(2)}}})),ge=Object(_.a)((function(e){var n=Object(j.useContext)(ce),t=Object(j.useContext)(oe),a=be(),r=Object($.a)(),c=Object(L.a)(r.breakpoints.down("sm"));return y.a.createElement(y.a.Fragment,null,y.a.createElement(G.a,{open:e.open,onClose:e.onClose,fullScreen:c},y.a.createElement(K.a,null,B.signIn),y.a.createElement(M.a,null,y.a.createElement(Q.a,null,B.signInText),y.a.createElement(V.a,null,y.a.createElement(X.a,{className:a.box},y.a.createElement(Y.a,{label:B.username,value:n.username,fullWidth:!0,required:!0,className:a.mb,onChange:function(e){return n.username=e.target.value}}),y.a.createElement(Y.a,{label:B.password,value:n.password,fullWidth:!0,required:!0,className:a.mb,onChange:function(e){return n.password=e.target.value},type:"password"}),y.a.createElement(X.a,{className:a.margin},y.a.createElement(Z.a,{variant:"contained",color:"primary",className:a.margin,onClick:function(){fetch("".concat(W,"/api/signin?name='").concat(n.username,"'&password='").concat(n.username,"'")).then((function(e){200===e.status?t.openSignInSuccess=!0:t.openSignInFail=!0})).catch((function(e){t.openSignInFail=!0}))}},B.signIn),y.a.createElement(Z.a,{variant:"contained",color:"secondary",className:a.margin,onClick:e.onClose},B.cancel)))))),y.a.createElement(Ee,{open:t.openSignInSuccess,onClose:function(){return t.openSignInSuccess=!1}}),y.a.createElement(fe,{open:t.openSignInFail,onClose:function(){return t.openSignInFail=!1}}))}));function Ee(e){var n=Object($.a)(),t=Object(L.a)(n.breakpoints.down("sm"));return y.a.createElement(G.a,{open:e.open,onClose:e.onClose,fullScreen:t},y.a.createElement(K.a,null,B.signInSuccessTitle),y.a.createElement(M.a,null,y.a.createElement(Q.a,null,B.signInSuccessText),y.a.createElement(V.a,null,y.a.createElement(Z.a,{variant:"contained",color:"primary",onClick:function(){window.location.reload()}},B.ok))))}function fe(e){var n=Object($.a)(),t=Object(L.a)(n.breakpoints.down("sm"));return y.a.createElement(G.a,{open:e.open,onClose:e.onClose,fullScreen:t},y.a.createElement(K.a,null,B.signInErrTitle),y.a.createElement(M.a,null,y.a.createElement(Q.a,null,B.signInErrText),y.a.createElement(V.a,null,y.a.createElement(Z.a,{variant:"contained",color:"secondary",onClick:e.onClose},B.ok))))}function de(e){return y.a.createElement(ge,e)}var he=Object(N.a)((function(e){return{list:{width:250,height:"100%"}}})),je=Object(_.a)((function(e){var n=Object(j.useContext)(oe),t=Object(j.useContext)(ce),a=he();return y.a.createElement(k.a,{open:e.open,onClose:e.onClose,onOpen:e.onClose},y.a.createElement("div",{className:a.list},y.a.createElement(I.a,null,y.a.createElement(T.a,null,y.a.createElement(U.a,{variant:"h6"},B.brandName)),y.a.createElement(z.a,null),y.a.createElement(F.a,{color:"inherit",href:"/"},y.a.createElement(T.a,{button:!0},y.a.createElement(A.a,null,y.a.createElement(q.a,{color:"secondary"})),y.a.createElement(D.a,{primary:B.home}))),y.a.createElement(ye,{display:t.loggedIn,onClickSignIn:function(){return n.openSignIn=!0},onClickSignUp:function(){return n.openSignUp=!0}}),y.a.createElement(Oe,{display:t.loggedIn}),y.a.createElement(F.a,{color:"inherit",href:"https://github.com/Jugendhackt/comment-sense/"},y.a.createElement(T.a,{button:!0},y.a.createElement(A.a,null,y.a.createElement(J.a,{color:"secondary"})),y.a.createElement(D.a,{primary:B.github}))))),y.a.createElement(pe,{open:n.openSignUp,onClose:function(){return n.openSignUp=!1}}),y.a.createElement(de,{open:n.openSignIn,onClose:function(){return n.openSignIn=!1}}))})),ye=function(e){return e.display?null:y.a.createElement(y.a.Fragment,null,y.a.createElement(T.a,{button:!0,onClick:e.onClickSignIn},y.a.createElement(A.a,null,y.a.createElement(H.a,{color:"secondary"})),y.a.createElement(D.a,{primary:B.signIn})),y.a.createElement(T.a,{button:!0,onClick:e.onClickSignUp},y.a.createElement(A.a,null,y.a.createElement(P.a,{color:"secondary"})),y.a.createElement(D.a,{primary:B.signUp})))},Oe=Object(_.a)((function(e){var n=Object(j.useContext)(ce);return e.display?y.a.createElement(y.a.Fragment,null,y.a.createElement(F.a,{color:"inherit",href:"/account/"},y.a.createElement(T.a,{button:!0},y.a.createElement(A.a,null,y.a.createElement(R.a,{color:"secondary"})),y.a.createElement(D.a,{primary:B.account}))),y.a.createElement(T.a,{button:!0},y.a.createElement(A.a,null,y.a.createElement(H.a,{color:"secondary"})),y.a.createElement(D.a,{primary:"".concat(B.loggedInAs," ").concat(n.username)}))):null})),xe=t(154),Ce=t(155),we=t(156),ve=t(157),Se=t(158),Ne=t(78),ke=t(153),Ie=Object(_.a)((function(e){var n=Object(j.useContext)(ce);return e.display?y.a.createElement(Ne.a,{keepMounted:!0,anchorEl:e.anchorEl,open:e.open,onClose:e.onClose},y.a.createElement(ke.a,null,y.a.createElement(A.a,null,y.a.createElement(H.a,{color:"secondary"})),y.a.createElement(D.a,{primary:"".concat(B.loggedInAs," ").concat(n.username)})),y.a.createElement(F.a,{color:"inherit",href:"/account/"},y.a.createElement(ke.a,null,y.a.createElement(A.a,null,y.a.createElement(R.a,{color:"secondary"})),y.a.createElement(D.a,{primary:B.account})))):null})),Te=Object(N.a)((function(e){return{menuButton:{marginRight:e.spacing(2)},account:{display:"flex",justifyContent:"flex-end",width:"100%"}}})),Ue=Object(_.a)((function(e){var n=Object(j.useContext)(oe),t=Object(j.useContext)(ce),a=Te(),r=function(e){(!e||"keydown"!==e.target.type||"Tab"!==e.key&&"Shift"!==e.key)&&(n.openDrawer=!n.openDrawer)};return y.a.createElement("div",null,y.a.createElement(xe.a,{position:"static"},y.a.createElement(Ce.a,null,y.a.createElement(we.a,{edge:"start",className:a.menuButton,color:"inherit",onClick:r},y.a.createElement(ve.a,null)),y.a.createElement(U.a,{variant:"h6"},B.brandName),y.a.createElement(X.a,{className:a.account,display:t.loggedIn?"block":"none !important"},y.a.createElement(we.a,{onClick:function(e){n.openAccount=!0,n.anchorElAccount=e.currentTarget}},y.a.createElement(Se.a,null))),y.a.createElement(Ie,{open:n.openAccount,anchorEl:n.anchorElAccount,onClose:function(){n.openAccount=!1,n.anchorElAccount=null},display:t.loggedIn}))),y.a.createElement(je,{open:n.openDrawer,onOpen:r,onClose:function(){return n.openDrawer=!1}}))}));function ze(e){return y.a.createElement(Ue,e)}var Fe,Ae,De=t(35),We=t(161),Be=t(160),qe=t(54),Je=t.n(qe),He=t(79),Pe=t(159),Re=Object(N.a)((function(e){return{website:{display:"flex",flexDirection:"column",margin:e.spacing(1)},title:{margin:e.spacing(2)},paper:{margin:e.spacing(1),padding:"5%",minWidth:"40%"},text:{marginLeft:e.spacing(1)}}}));function Le(e){var n=Re();return y.a.createElement(T.a,{button:!0,className:n.website},y.a.createElement(He.a,{className:n.paper},y.a.createElement(U.a,{variant:"h5"},e.url),y.a.createElement("br",null),y.a.createElement(X.a,{display:"flex"},y.a.createElement(Pe.a,{color:"secondary"}),y.a.createElement(D.a,{primary:e.comments,className:n.text})),y.a.createElement(F.a,{color:"inherit",href:e.url},y.a.createElement(Z.a,{color:"primary",variant:"contained"},B.toWebsite))))}var Ge=(Fe=function e(){Object(ne.a)(this,e),Object(ee.a)(this,"websites",Ae,this)},Ae=Object(te.a)(Fe.prototype,"websites",[ae.e],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),Fe),Ke=Object(j.createContext)(new Ge),Me=Object(N.a)((function(e){return{progress:{margin:"5%"},box:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}})),Qe=Object(_.a)((function(e){var n=Object(j.useContext)(Ke),t=Me();return Object(j.useEffect)((function(){fetch("".concat(W,"/api/sites/")).then((function(e){if(e.ok)return e.json()})).then((function(e){n.websites=e.sites}))}),[]),y.a.createElement(I.a,null,Array.isArray(n.websites)&&n.websites.length?Array.from(n.websites).map((function(e){return y.a.createElement(Le,{url:e.url,comments:e.comments,key:Je.a.v4()})})):y.a.createElement(X.a,{className:t.box},y.a.createElement(Be.a,{size:100,className:t.progress}),y.a.createElement(Be.a,{size:100,className:t.progress}),y.a.createElement(Be.a,{size:100,className:t.progress}),y.a.createElement(Be.a,{size:100,className:t.progress}),y.a.createElement(Be.a,{size:100,className:t.progress})))}));function Ve(e){return y.a.createElement(Qe,e)}var Xe,Ye,Ze=Object(N.a)((function(e){return{comment:{display:"flex",flexDirection:"column",margin:e.spacing(1)},paper:{margin:e.spacing(2),padding:"5%",minWidth:"40%"},box:{display:"flex",flexDirection:"row",justifyContent:"space-between"},mb:{marginBottom:e.spacing(2)},text:{marginLeft:e.spacing(1)}}}));function $e(e){var n=Ze();return y.a.createElement(T.a,{button:!0,className:n.comment},y.a.createElement(He.a,{className:n.paper},y.a.createElement(X.a,{className:"".concat(n.box," ").concat(n.mb)},y.a.createElement(U.a,{variant:"h5"},e.title),y.a.createElement(U.a,{variant:"caption"},e.date)),y.a.createElement(D.a,{primary:e.content,className:n.mb}),y.a.createElement(X.a,{className:n.box},y.a.createElement(U.a,{variant:"caption"},e.author),y.a.createElement(X.a,{display:"flex"},y.a.createElement(Pe.a,{color:"secondary"}),y.a.createElement(D.a,{primary:e.votes,className:n.text})))))}var _e=(Xe=function e(){Object(ne.a)(this,e),Object(ee.a)(this,"comments",Ye,this)},Ye=Object(te.a)(Xe.prototype,"comments",[ae.e],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),Xe),en=Object(j.createContext)(new _e),nn=Object(N.a)((function(e){return{box:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},progress:{margin:"5%"}}})),tn=Object(_.a)((function(e){var n=nn(),t=Object(j.useContext)(en);return Object(j.useEffect)((function(){fetch("".concat(W,"/api/comments?count=5")).then((function(e){if(e.ok)return e.json()})).then((function(e){t.comments=e.comments}))}),[]),y.a.createElement(I.a,null,Array.isArray(t.comments)&&t.comments.length?t.comments.map((function(e){return y.a.createElement($e,{date:e.date,content:e.content,title:e.headline,url:e.url,author:e.author,votes:e.likes,key:Je.a.v4()})})):y.a.createElement(X.a,{className:n.box},y.a.createElement(Be.a,{size:100,className:n.progress}),y.a.createElement(Be.a,{size:100,className:n.progress}),y.a.createElement(Be.a,{size:100,className:n.progress}),y.a.createElement(Be.a,{size:100,className:n.progress}),y.a.createElement(Be.a,{size:100,className:n.progress})))}));function an(e){return y.a.createElement(tn,e)}function rn(){return y.a.createElement(We.a,{container:!0},y.a.createElement(We.a,{item:!0,xs:12,sm:6},y.a.createElement(Ve,null)),y.a.createElement(We.a,{item:!0,xs:12,sm:6},y.a.createElement(an,null)))}var cn=t(9),ln=Object(N.a)((function(e){return{paper:{width:"100%",padding:e.spacing(2)},textField:{width:"90%",margin:e.spacing(1)},div:{display:"flex",justifyContent:"center"},box:{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"},buttonBox:Object(cn.a)({display:"flex",flexDirection:"row",justifyContent:"center",width:"100%"},e.breakpoints.down("sm"),{flexDirection:"column"}),button:{margin:e.spacing(2)}}})),on=Object(_.a)((function(e){var n=Object(j.useContext)(ce),t=ln(),a=Object(De.g)();return y.a.createElement("div",{className:t.div},y.a.createElement(He.a,{className:t.paper},y.a.createElement(X.a,{className:t.box},y.a.createElement(Y.a,{label:B.username,className:t.textField,value:n.username,onChange:function(e){return n.username=e.target.value}}),y.a.createElement(Y.a,{label:B.password,className:t.textField,value:n.password,onChange:function(e){return n.password=e.target.value},type:"password"}),y.a.createElement(Y.a,{label:B.email,className:t.textField,value:n.email,onChange:function(e){return n.email=e.target.value}}),y.a.createElement(X.a,{className:t.buttonBox},y.a.createElement(Z.a,{variant:"contained",color:"primary",onClick:function(){},className:t.button},B.saveChanges),y.a.createElement(Z.a,{variant:"contained",color:"secondary",onClick:function(){a.push("/")},className:t.button},B.cancel)))))}));function sn(e){return y.a.createElement(y.a.Fragment,null,y.a.createElement(U.a,{variant:"h3"},B.notFoundTitle),y.a.createElement(U.a,{variant:"p"},B.notFoundText))}var un=t(162),mn=Object(N.a)((function(e){return{mt:{marginTop:e.spacing(2)}}}));function pn(e){var n=mn();return y.a.createElement(un.a,{fixed:!0,className:n.mt},y.a.createElement(De.d,null,y.a.createElement(De.b,{exact:!0,path:"/",render:function(e){return y.a.createElement(rn,e)}}),y.a.createElement(De.b,{exact:!0,path:"/account",render:function(e){return y.a.createElement(on,e)}}),y.a.createElement(De.b,{exact:!0,path:"/404",render:function(e){return y.a.createElement(sn,e)}}),y.a.createElement(De.a,{to:"/404"})))}var bn=t(164),gn=Object(_.a)((function(e){var n=Object(j.useContext)(ce);return function(e){return new Promise((function(n){fetch("".concat(W,"/api/checksid?sid='").concat(e,"'")).then((function(e){410===e.status?n(!1):200===e.status&&n(!0)}))}))}(function(){var e=document.cookie.match(new RegExp("(^| )sid=([^;]+)"));if(e)return e.length?e[0].split("=")[1]:null}()).then((function(e){e&&(n.loggedIn=!0)})),y.a.createElement("div",null,y.a.createElement(w.a,{theme:S},y.a.createElement(C.a,null,y.a.createElement(bn.a,null),y.a.createElement(ze,null),y.a.createElement(pn,null))))}));t(103);x.a.render(y.a.createElement(gn,null),document.getElementById("root"))},91:function(e,n,t){e.exports=t(104)}},[[91,1,2]]]);
//# sourceMappingURL=main.0c5dbefa.chunk.js.map