import{b as y,f as k,o as a,c as i,q as x,e,y as d,B as A,u as n,t as r,v as h,w as C,F as w,L as D,M as I,U as b}from"./vendor.bee95a75.js";/* empty css                        */import{_ as L,c as M,b as B,f as S}from"./index.707f245a.js";const c=s=>(D("data-v-95e3e7c8"),s=s(),I(),s),N={key:0,class:"bg-shadow"},T=c(()=>e("div",{class:"null"},"\u7A7A\u7A7A\u5982\u4E5F~",-1)),V=[T],q=["onClick"],z={class:"article-img"},E={class:"image-slot"},F={class:"article-message"},H={class:"article-title"},U=["innerHTML"],$=c(()=>e("div",{class:"more"},[e("i",{class:"iconfont iconmore"})],-1)),R={class:"article-info"},j={class:"date"},G=c(()=>e("span",{class:"iconfont icondate"},null,-1)),J=["onClick"],K=c(()=>e("span",{class:"iconfont iconfenlei"},null,-1)),O={props:{articles:Array},emits:["toArticleDetail"],setup(s,{emit:m}){const u=s;y(()=>{u.articles});const p=o=>{m("toArticleDetail",o)},g=k(),v=(o,l)=>{g.push({name:"CategoryDetail",params:{id:o},query:{name:l}})};return(o,l)=>{const _=b;return s.articles.length?(a(!0),i(w,{key:1},x(s.articles,t=>(a(),i("article",{key:t._id,onClick:f=>p(t._id),class:"bg-shadow"},[e("div",z,[d(_,{lazy:"",src:t.img_url,fit:"cover"},{error:A(()=>[e("div",E,[d(_,{lazy:"",src:n(M).defaultImgUrl,fit:"cover"},null,8,["src"])])]),_:2},1032,["src"])]),e("div",F,[e("h3",H,r(t.title),1),e("div",{class:"article-content",innerHTML:n(B)(t.content)},null,8,U),$,e("div",R,[e("div",j,[G,h(" "+r(n(S)(t.created_at)),1)]),e("div",{class:"category",onClick:C(f=>v(t.category._id,t.category.cat_name),["stop"])},[K,h(" "+r(t.category.cat_name),1)],8,J)])])],8,q))),128)):(a(),i("article",N,V))}}};var X=L(O,[["__scopeId","data-v-95e3e7c8"]]);export{X as A};
