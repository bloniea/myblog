import{_ as m}from"./index.2e28db02.js";import{r as i,b as d,o as p,c as r,y as l}from"./vendor.999b5c7f.js";const f={class:"pagination"},x={props:{pagenum:Number,pagesize:Number,total:Number},emits:["changePage"],setup(u,{emit:c}){const a=u,n=i(!0),s=i(!0),g=()=>{const e=a.pagenum,t=a.total,o=a.pagesize;e<=1&&(n.value=!1),e*o>=t&&(s.value=!1)};d(()=>{g()});const _=()=>{let e=a.pagenum;e-=1,e<=1&&(e=1,n.value=!1),c("changePage",e)},v=()=>{let e=a.pagenum,t=a.total,o=a.pagesize;e+=1,e*o>=t&&(s.value=!1),c("changePage",e)};return(e,t)=>(p(),r("div",f,[n.value?(p(),r("div",{key:0,class:"prev",onClick:_},"prev")):l("",!0),s.value?(p(),r("div",{key:1,class:"next",onClick:v},"next")):l("",!0)]))}};var k=m(x,[["__scopeId","data-v-0792be50"]]);export{k as P};
