import{p as l,m as r,a6 as c,g as p,a7 as v,x as m,a as t,q as u}from"./index-5dc12fdf.js";function d(e){return{aspectStyles:u(()=>{const n=Number(e.aspectRatio);return n?{paddingBottom:String(1/n*100)+"%"}:void 0})}}const y=l({aspectRatio:[String,Number],contentClass:String,inline:Boolean,...r(),...c()},"VResponsive"),S=p()({name:"VResponsive",props:y(),setup(e,n){let{slots:s}=n;const{aspectStyles:o}=d(e),{dimensionStyles:i}=v(e);return m(()=>{var a;return t("div",{class:["v-responsive",{"v-responsive--inline":e.inline},e.class],style:[i.value,e.style]},[t("div",{class:"v-responsive__sizer",style:o.value},null),(a=s.additional)==null?void 0:a.call(s),s.default&&t("div",{class:["v-responsive__content",e.contentClass]},[s.default()])])}),{}}});export{S as V,y as m};
