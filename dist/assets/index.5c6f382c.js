import{e as f,f as y,r as h,a as v,o as p,C as u,B as x,p as o,v as C,t as q,u as s,y as _,L as A,M as k}from"./vendor.b1f7e7cf.js";import{M as D}from"./index.8e98b2b3.js";import{L as z}from"./index.72fe7916.js";import{A as B}from"./index.9e1a6fb8.js";import{g as I}from"./fetch.601d8262.js";import{P as L}from"./index.241d4e43.js";import{_ as N}from"./index.29fd4036.js";/* empty css                        */const P=r=>(A("data-v-1f3c4271"),r=r(),k(),r),S={class:"category-detail"},w={class:"title"},M=P(()=>o("span",null," Category:",-1)),V={class:"cate-name"},R={setup(r){const c=f(),n=y(),i=h(!0),d=()=>{c.push({name:"Categories"})},e=v({articles:[],cat_name:"",req:{pagesize:10,pagenum:1,category_id:null},total:0}),l=async()=>{i.value=!0,e.cat_name=n.query.name;const a=n.params.id;e.req.category_id=a;const t=await I(e.req);t.status===200&&t.ok?(e.articles=t.data.data,e.total=t.data.total,i.value=!1):c.push({name:"NotFound"})};l();const m=a=>{e.req.pagenum=a,l()},g=a=>{c.push({name:"ArticleDetail",params:{id:a}})};return(a,t)=>i.value?(p(),u(z,{key:0})):(p(),u(D,{key:1},{default:x(()=>[o("div",S,[o("div",w,[M,o("span",V,[C(q(s(e).cat_name)+" ",1),o("i",{class:"iconfont iconclose",onClick:d})])]),_(B,{articles:s(e).articles,onToArticleDetail:g},null,8,["articles"]),_(L,{pagesize:s(e).req.pagesize,pagenum:s(e).req.pagenum,total:s(e).total,onChangePage:m},null,8,["pagesize","pagenum","total"])])]),_:1}))}};var K=N(R,[["__scopeId","data-v-1f3c4271"]]);export{K as default};