import{a as z,m as X,W as Y,X as U,o as n,c as r,u as o,r as b,h as Q,i as H,f as tt,e as t,t as p,C as P,B as I,x as $,v as g,y as c,Y as nt,Z as ct,_ as lt,s as it,A as rt,F as Z,q as G,L as et,M as st,H as L,K as dt,J as _t,$ as ut,g as mt,U as vt}from"./vendor.bee95a75.js";/* empty css                        */import{M as ht}from"./index.80a93ad8.js";/* empty css                                                          */import{_ as j,f as E,a as pt,g as gt,d as ft,e as yt,c as kt}from"./index.707f245a.js";/* empty css                */import{L as wt}from"./index.c61ec5b0.js";import{b as Ct,c as O}from"./fetch.bab85dd8.js";const $t=["innerHTML"],bt={props:{html:String},setup(u){const m=u,d=z({nHtml:String}),l=_=>X.parse(m.html,{renderer:new X.Renderer,highlight:function(y,s){const M=Y.getLanguage(s)?s:"plaintext";return Y.highlight(y,{language:M}).value},langPrefix:"hljs language-"});return d.nHtml=l(m.html),U(()=>m.html,_=>d.nHtml=l()),(_,y)=>(n(),r("div",{class:"md-to-html",innerHTML:o(d).nHtml},null,8,$t))}};var A=j(bt,[["__scopeId","data-v-5a5ebec8"]]);const J=u=>(et("data-v-d0a84a92"),u=u(),st(),u),It={class:"comments"},St={class:"title"},Lt=J(()=>t("span",null,[g("\u652F\u6301 "),t("span",{class:"special"},"markdown"),g(" \u8BED\u6CD5")],-1)),xt={class:"comments-box"},At={class:"tip_login"},Ht=g("\u767B\u5F55\u8FDB\u884C\u8BC4\u8BBA"),zt={class:"comment_form"},Mt={key:1,class:"input"},Nt={key:0,class:"to-user"},Tt={class:"comments-input"},Dt=["onKeyup"],Et={key:1,placeholder:"\u9884\u89C8",class:"shadow pre"},Ut={class:"submit vsubmit"},qt=g("\u9884\u89C8"),Bt=g("\u63D0\u4EA4"),Vt={class:"list_box",ref:"commentsList"},Rt={class:"parent-comment"},Kt={class:"avatar"},Ft={class:"comment-content bg-shadow"},Pt={class:"title-info"},jt={class:"username"},Jt={class:"created"},Wt=["onClick"],Xt=J(()=>t("i",{class:"iconfont iconreply"},null,-1)),Yt=[Xt],Zt={class:"content"},Gt={class:"avatar"},Ot={class:"comment-content bg-shadow"},Qt={class:"title-info"},te={class:"username"},ee={class:"created"},se=["onClick"],ae=J(()=>t("i",{class:"iconfont iconreply"},null,-1)),oe=[ae],ne={key:0,class:"to_user_info"},ce={class:"to_user_name"},le={class:"username"},ie={class:"created"},re={class:"to_user_content"},de={class:"content"},_e={key:0,class:"add"},ue=g("\u52A0\u8F7D\u66F4\u591A"),me={props:{comments:Array,total:Number,btnLoading:!1,addLoading:!1},emits:["saveComment","loadAdd"],setup(u,{emit:m}){const d=u,l=z({comments:[],previewContent:"\u9884\u89C8",commnetInput:""});U(()=>l.commnetInput,e=>l.previewContent=e||"\u9884\u89C8");const _=b(""),y=()=>{_.value="",_.value=""},s=z({content:"",to_user_id:null,level:1,to_comment_id:null}),M=()=>{if(_.value||(s.level=1,s.to_comment_id=null),!l.commnetInput)return L.error("\u8BF7\u8F93\u5165\u8BC4\u8BBA\u5185\u5BB9");s.content=l.commnetInput,f.commit("setCommentIsNull",!1),m("saveComment",s)},S=(e,a)=>{s.to_comment_id=e._id,s.to_user_id=e.user_id,s.level=a,_.value=e.user.name},w=e=>{e.target.selectionStart||(_.value=""),s.level=1},N=e=>{window.open(e)},f=Q(),q=H(()=>f.state.userinfo),x=H(()=>f.state.status);U(()=>f.state.commentStatus,e=>e?l.commnetInput="":l.commnetInput);const k=b(!1),B=()=>{k.value=!k.value},C=e=>{let a=0;return e.forEach(i=>{a+=i.childComments.length}),a+e.length},T=H(()=>C(d.comments)<d.total),V=()=>{m("loadAdd")},R=()=>{f.commit("setIsShowLogin",!0)},K=tt(),F=()=>{K.push("/me")};return(e,a)=>{const i=dt,D=_t,at=ut;return n(),r("div",It,[t("div",St,[t("span",null,p(d.total)+"\u6761\u8BC4\u8BBA",1),Lt]),t("div",xt,[t("div",At,[o(x)?$("",!0):(n(),P(i,{key:0,onClick:R},{default:I(()=>[Ht]),_:1}))]),t("div",zt,[o(x)?(n(),P(D,{key:0,size:50,src:o(q).avatar_url,class:"user-avatar",onClick:F},null,8,["src"])):$("",!0),o(x)?(n(),r("div",Mt,[_.value?(n(),r("div",Nt,[g("@"+p(_.value)+" ",1),c(at,{class:"close",onClick:y},{default:I(()=>[c(o(nt))]),_:1})])):$("",!0),t("div",Tt,[ct(t("textarea",{rows:"4",type:"textarea",placeholder:"\u8BF7\u8F93\u5165\u8BC4\u8BBA\u5185\u5BB9","onUpdate:modelValue":a[0]||(a[0]=v=>o(l).commnetInput=v),class:it(`shadow ${_.value?"is-reply":""}`),onKeyup:rt(w,["delete"])},"  ",42,Dt),[[lt,o(l).commnetInput]])]),k.value?(n(),r("div",Et,[c(A,{html:o(l).previewContent},null,8,["html"])])):$("",!0),t("div",Ut,[c(i,{round:"",onClick:B},{default:I(()=>[qt]),_:1}),c(i,{round:"",onClick:a[1]||(a[1]=v=>M(e.ruleFormRef)),loading:d.btnLoading},{default:I(()=>[Bt]),_:1},8,["loading"])])])):$("",!0)])]),t("div",Vt,[(n(!0),r(Z,null,G(d.comments,v=>(n(),r("div",{class:"list",key:v._id},[t("div",Rt,[t("div",Kt,[c(D,{size:50,src:v.user.avatar_url,onClick:h=>N(v.user.html_url)},null,8,["src","onClick"])]),t("div",Ft,[t("div",Pt,[t("span",jt,p(v.user.name),1),t("span",Jt,p(o(E)(v.created_at)),1),t("span",{class:"reply",title:"\u56DE\u590D",onClick:h=>S(v,2)},Yt,8,Wt)]),t("div",Zt,[c(A,{html:v.content},null,8,["html"])])])]),(n(!0),r(Z,null,G(v.childComments,h=>(n(),r("div",{class:"child-comment",key:h._id},[t("div",Gt,[c(D,{size:50,src:h.user.avatar_url,onClick:ot=>N(v.user.html_url)},null,8,["src","onClick"])]),t("div",Ot,[t("div",Qt,[t("span",te,p(h.user.name),1),t("span",ee,p(o(E)(h.created_at)),1),t("span",{class:"reply",title:"\u56DE\u590D",onClick:ot=>S(h,3)},oe,8,se)]),h.show?(n(),r("div",ne,[t("div",ce,[t("span",le,"@"+p(h.to_user.name),1),t("span",ie,p(o(E)(h.created_at)),1)]),t("div",re,[c(A,{html:h.to_content},null,8,["html"])])])):$("",!0),t("div",de,[c(A,{html:h.content},null,8,["html"])])])]))),128))]))),128))],512),o(T)?(n(),r("div",_e,[c(i,{onClick:V,loading:d.addLoading},{default:I(()=>[ue]),_:1},8,["loading"])])):$("",!0)])}}};var ve=j(me,[["__scopeId","data-v-d0a84a92"]]),he="/assets/head-bg.6c0b5954.png";const W=u=>(et("data-v-776e6bb2"),u=u(),st(),u),pe={key:1},ge={class:"wraper"},fe={class:"image-slot"},ye={class:"article-header"},ke=W(()=>t("div",{class:"head-bg"},null,-1)),we={class:"title-box"},Ce={class:"title"},$e={class:"title-name"},be={class:"info"},Ie={class:"article-info"},Se=W(()=>t("i",{class:"iconfont icondate"},null,-1)),Le=W(()=>t("i",{class:"iconfont iconfenlei1"},null,-1)),xe={class:"source"},Ae=g("source: "),He={class:"source-name"},ze={class:"article-content"},Me={class:"star"},Ne={setup(u){const m=new Q,d=H(()=>m.state.userinfo),l=H(()=>m.state.status),_=mt(),y=b(!0),s=z({article:{},comments:[],id:_.params.id});(async e=>{y.value=!0;const a=await Ct(e);s.article=a.data.data,y.value=!1,N(e),l.value&&T()})(s.id);const S=z({pagenum:1,pagesize:1}),w=b(0),N=async e=>{const a=await O(e,S);a.status===200&&a.ok&&(s.comments=a.data.data,w.value=a.data.total)},f=b(!1),q=async()=>{f.value=!0;const e=await O(s.id,S);e.status===200&&e.ok&&(f.value=!1,e.data.data,s.comments=[...s.comments,...e.data.data],w.value=e.data.total)},x=()=>{S.pagenum++,q()},k=b(!1),B=async e=>{const a={article_id:s.article._id,user_id:d.value._id,content:e.content,level:1};e.to_comment_id&&(a.to_comment_id=e.to_comment_id),a.level=e.level,k.value=!0;const i=await pt(a);i.status===200&&i.ok?(k.value=!1,L.success("\u8BC4\u8BBA\u6210\u529F"),m.commit("setCommentIsNull",!0),s.comments.length==w.value&&(s.comments.push(i.data.data),w.value++)):(k.value=!1,L.error("\u63D0\u4EA4\u8D85\u65F6"))},C=b(!1),T=async()=>{const e=await gt(s.article._id);e.status===200&&e.ok&&(C.value=!0)},V=async()=>{if(l.value){const e={user_id:d.value.user_id,article_id:s.article._id},a=await ft(e);a.status===200&&a.ok&&(L.success("\u6536\u85CF\u6210\u529F"),C.value=!0)}else m.commit("setIsShowLogin",!0),L.error("\u8BF7\u5148\u767B\u5F55")},R=async()=>{const e=await yt(s.article._id);e.status===200&&e.ok&&(L.success("\u53D6\u6D88\u6536\u85CF\u6210\u529F"),C.value=!1)},K=tt(),F=(e,a)=>{K.push({name:"CategoryDetail",params:{id:e},query:{name:a}})};return U(()=>m.state.status,e=>{e?T():C.value=!1}),(e,a)=>{const i=vt;return y.value?(n(),P(wt,{key:0})):(n(),r("div",pe,[c(ht,null,{default:I(()=>[t("article",null,[t("div",ge,[c(i,{lazy:"",fit:"cover",src:o(s).article.img_url},{error:I(()=>[t("div",fe,[c(i,{lazy:"",src:o(kt).defaultImgUrl,fit:"cover"},null,8,["src"])])]),_:1},8,["src"])]),t("div",ye,[c(i,{lazy:"",fit:"cover",src:o(he)},null,8,["src"]),ke,t("div",we,[t("div",Ce,[t("div",$e,p(o(s).article.title),1)]),t("div",be,[t("div",Ie,[t("span",null,[Se,g(" "+p(o(E)(o(s).article.created_at)),1)]),t("span",{onClick:a[0]||(a[0]=D=>F(o(s).article.category_id,o(s).article.category.cat_name)),class:"category_name"},[Le,g(" "+p(o(s).article.category.cat_name),1)])]),t("div",xe,[Ae,t("span",He,p(o(s).article.img_source),1)])])])]),t("div",ze,[c(A,{html:o(s).article.content},null,8,["html"])])])]),_:1}),t("div",Me,[C.value?(n(),r("i",{key:0,class:"iconfont iconstarton stared",title:"\u53D6\u6D88\u6536\u85CF",onClick:R})):(n(),r("i",{key:1,class:"iconfont iconstaroff",title:"\u6536\u85CF",onClick:V}))]),c(ve,{onSaveComment:B,comments:o(s).comments,total:w.value,onLoadAdd:x,btnLoading:k.value,addLoading:f.value},null,8,["comments","total","btnLoading","addLoading"])]))}}};var Ke=j(Ne,[["__scopeId","data-v-776e6bb2"]]);export{Ke as default};
