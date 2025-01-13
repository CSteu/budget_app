import{C as T,D as z,a as o,c as l,E as d,G as $,q as h,b as r,m as D,t as b,_ as U,r as f,H as R,I as W,J as X,o as F,d as g,A as S,u as v,F as O,p as P,j as Y,K as C,L as A,f as Z,M as x,N as I,O as ee,P as ne}from"./index-Dz63qjqx.js";var te=function(c){var a=c.dt;return`
.p-card {
    background: `.concat(a("card.background"),`;
    color: `).concat(a("card.color"),`;
    box-shadow: `).concat(a("card.shadow"),`;
    border-radius: `).concat(a("card.border.radius"),`;
    display: flex;
    flex-direction: column;
}

.p-card-caption {
    display: flex;
    flex-direction: column;
    gap: `).concat(a("card.caption.gap"),`;
}

.p-card-body {
    padding: `).concat(a("card.body.padding"),`;
    display: flex;
    flex-direction: column;
    gap: `).concat(a("card.body.gap"),`;
}

.p-card-title {
    font-size: `).concat(a("card.title.font.size"),`;
    font-weight: `).concat(a("card.title.font.weight"),`;
}

.p-card-subtitle {
    color: `).concat(a("card.subtitle.color"),`;
}
`)},ae={root:"p-card p-component",header:"p-card-header",body:"p-card-body",caption:"p-card-caption",title:"p-card-title",subtitle:"p-card-subtitle",content:"p-card-content",footer:"p-card-footer"},se=T.extend({name:"card",theme:te,classes:ae}),re={name:"BaseCard",extends:z,style:se,provide:function(){return{$pcCard:this,$parentInstance:this}}},N={name:"Card",extends:re,inheritAttrs:!1};function ie(e,c,a,i,m,u){return o(),l("div",d({class:e.cx("root")},e.ptmi("root")),[e.$slots.header?(o(),l("div",d({key:0,class:e.cx("header")},e.ptm("header")),[$(e.$slots,"header")],16)):h("",!0),r("div",d({class:e.cx("body")},e.ptm("body")),[e.$slots.title||e.$slots.subtitle?(o(),l("div",d({key:0,class:e.cx("caption")},e.ptm("caption")),[e.$slots.title?(o(),l("div",d({key:0,class:e.cx("title")},e.ptm("title")),[$(e.$slots,"title")],16)):h("",!0),e.$slots.subtitle?(o(),l("div",d({key:1,class:e.cx("subtitle")},e.ptm("subtitle")),[$(e.$slots,"subtitle")],16)):h("",!0)],16)):h("",!0),r("div",d({class:e.cx("content")},e.ptm("content")),[$(e.$slots,"content")],16),e.$slots.footer?(o(),l("div",d({key:1,class:e.cx("footer")},e.ptm("footer")),[$(e.$slots,"footer")],16)):h("",!0)],16)],16)}N.render=ie;var oe=function(c){var a=c.dt;return`
.p-progressbar {
    position: relative;
    overflow: hidden;
    height: `.concat(a("progressbar.height"),`;
    background: `).concat(a("progressbar.background"),`;
    border-radius: `).concat(a("progressbar.border.radius"),`;
}

.p-progressbar-value {
    margin: 0;
    background: `).concat(a("progressbar.value.background"),`;
}

.p-progressbar-label {
    color: `).concat(a("progressbar.label.color"),`;
    font-size: `).concat(a("progressbar.label.font.size"),`;
    font-weight: `).concat(a("progressbar.label.font.weight"),`;
}

.p-progressbar-determinate .p-progressbar-value {
    height: 100%;
    width: 0%;
    position: absolute;
    display: none;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: width 1s ease-in-out;
}

.p-progressbar-determinate .p-progressbar-label {
    display: inline-flex;
}

.p-progressbar-indeterminate .p-progressbar-value::before {
    content: "";
    position: absolute;
    background: inherit;
    inset-block-start: 0;
    inset-inline-start: 0;
    inset-block-end: 0;
    will-change: inset-inline-start, inset-inline-end;
    animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
}

.p-progressbar-indeterminate .p-progressbar-value::after {
    content: "";
    position: absolute;
    background: inherit;
    inset-block-start: 0;
    inset-inline-start: 0;
    inset-block-end: 0;
    will-change: inset-inline-start, inset-inline-end;
    animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    animation-delay: 1.15s;
}

@keyframes p-progressbar-indeterminate-anim {
    0% {
        inset-inline-start: -35%;
        inset-inline-end: 100%;
    }
    60% {
        inset-inline-start: 100%;
        inset-inline-end: -90%;
    }
    100% {
        inset-inline-start: 100%;
        inset-inline-end: -90%;
    }
}
@-webkit-keyframes p-progressbar-indeterminate-anim {
    0% {
        inset-inline-start: -35%;
        inset-inline-end: 100%;
    }
    60% {
        inset-inline-start: 100%;
        inset-inline-end: -90%;
    }
    100% {
        inset-inline-start: 100%;
        inset-inline-end: -90%;
    }
}

@keyframes p-progressbar-indeterminate-anim-short {
    0% {
        inset-inline-start: -200%;
        inset-inline-end: 100%;
    }
    60% {
        inset-inline-start: 107%;
        inset-inline-end: -8%;
    }
    100% {
        inset-inline-start: 107%;
        inset-inline-end: -8%;
    }
}
@-webkit-keyframes p-progressbar-indeterminate-anim-short {
    0% {
        inset-inline-start: -200%;
        inset-inline-end: 100%;
    }
    60% {
        inset-inline-start: 107%;
        inset-inline-end: -8%;
    }
    100% {
        inset-inline-start: 107%;
        inset-inline-end: -8%;
    }
}
`)},le={root:function(c){var a=c.instance;return["p-progressbar p-component",{"p-progressbar-determinate":a.determinate,"p-progressbar-indeterminate":a.indeterminate}]},value:"p-progressbar-value",label:"p-progressbar-label"},de=T.extend({name:"progressbar",theme:oe,classes:le}),ce={name:"BaseProgressBar",extends:z,props:{value:{type:Number,default:null},mode:{type:String,default:"determinate"},showValue:{type:Boolean,default:!0}},style:de,provide:function(){return{$pcProgressBar:this,$parentInstance:this}}},j={name:"ProgressBar",extends:ce,inheritAttrs:!1,computed:{progressStyle:function(){return{width:this.value+"%",display:"flex"}},indeterminate:function(){return this.mode==="indeterminate"},determinate:function(){return this.mode==="determinate"}}},ue=["aria-valuenow"];function pe(e,c,a,i,m,u){return o(),l("div",d({role:"progressbar",class:e.cx("root"),"aria-valuemin":"0","aria-valuenow":e.value,"aria-valuemax":"100"},e.ptmi("root")),[u.determinate?(o(),l("div",d({key:0,class:e.cx("value"),style:u.progressStyle},e.ptm("value")),[e.value!=null&&e.value!==0&&e.showValue?(o(),l("div",d({key:0,class:e.cx("label")},e.ptm("label")),[$(e.$slots,"default",{},function(){return[D(b(e.value+"%"),1)]})],16)):h("",!0)],16)):u.indeterminate?(o(),l("div",d({key:1,class:e.cx("value")},e.ptm("value")),null,16)):h("",!0)],16,ue)}j.render=pe;const me={class:"container"},ve={class:"category-header"},be={class:"category-name"},ge={class:"budget-controls"},fe={class:"budget-value"},he={class:"spending-info"},ye={class:"transaction-container"},$e={class:"transaction-list"},ke={class:"description"},Be={class:"dialog-content"},we={class:"dialog-label"},Se={class:"dialog-footer"},Ee={__name:"BudgetDetail",setup(e){const a=f([{name:"Food",value:"Food"},{name:"Transport",value:"Transport"},{name:"Entertainment",value:"Entertainment"},{name:"Health",value:"Health"},{name:"Bills",value:"Bills"},{name:"Groceries",value:"Groceries"},{name:"Shopping",value:"Shopping"},{name:"Subscriptions",value:"Subscriptions"},{name:"Dining",value:"Dining"},{name:"Education",value:"Education"},{name:"Other",value:"Other"}].map(t=>t.value)),i=f({}),m=f({}),u=f([]),k=f(!1),B=f(""),y=f(0),G=R("transactionData",[]),H=W(),J=()=>{const t=localStorage.getItem("budgets");if(t)try{const n=JSON.parse(t);a.value.forEach(s=>{i.value[s]=typeof n[s]=="number"?n[s]:0})}catch(n){console.error("Error parsing budgets from localStorage:",n),a.value.forEach(s=>{i.value[s]=0})}else a.value.forEach(n=>{i.value[n]=0})},M=()=>{localStorage.setItem("budgets",JSON.stringify(i.value))},V=()=>{const t={};a.value.forEach(n=>{t[n]=0}),Array.isArray(u.value)&&u.value.forEach(n=>{if(!n.isIncome){const s=n.category||"Other",p=typeof n.amount=="number"?n.amount:0;t.hasOwnProperty(s)?t[s]+=p:t.Other+=p}}),m.value=t};X(()=>G,t=>{u.value=Array.isArray(t)?t:[],V()},{immediate:!0,deep:!0});const w=t=>typeof t!="number"||isNaN(t)?"0.00":t.toFixed(2),E=t=>{const n=typeof i.value[t]=="number"?i.value[t]:0,s=typeof m.value[t]=="number"?m.value[t]:0;return n>0&&s>n},_=t=>{const n=typeof i.value[t]=="number"?i.value[t]:0,s=typeof m.value[t]=="number"?m.value[t]:0;return n>0?Math.min(s/n*100,100):0},L=t=>Array.isArray(u.value)?u.value.filter(n=>{const s=n.category||"Other",p=typeof n.amount=="number"&&!isNaN(n.amount);return s===t&&!n.isIncome&&p}):[],q=t=>{B.value=t,y.value=typeof i.value[t]=="number"?i.value[t]:0,k.value=!0},K=()=>{i.value[B.value]=typeof y.value=="number"?y.value:0,M(),k.value=!1,H.add({severity:"success",summary:"Budget Updated",detail:`Budget for ${B.value} updated to $${w(y.value)}`,life:3e3})},Q=()=>{k.value=!1};return F(()=>{J(),V()}),(t,n)=>(o(),l("div",me,[n[5]||(n[5]=r("h2",{class:"header"},"Budget Details",-1)),g(v(N),{class:"test-card"},{default:S(()=>n[2]||(n[2]=[r("p",null,"This is a test card to verify rendering.",-1)])),_:1}),(o(!0),l(O,null,P(a.value,s=>(o(),Y(v(N),{key:s,class:"category-card"},{default:S(()=>[r("div",ve,[r("h3",be,b(s),1),r("div",ge,[r("span",fe,"Target: $"+b(w(i.value[s]||0)),1),g(v(C),{icon:"pi pi-pencil",class:"edit-button",onClick:p=>q(s),tooltip:"Edit Target","tooltip-options":"{ position: 'top' }"},null,8,["onClick"])])]),g(v(j),{value:_(s),class:"progress-bar",style:{height:"20px"},color:E(s)?"#e74c3c":"#2ecc71"},null,8,["value","color"]),r("div",he,[r("span",null,"Spent: $"+b(w(m.value[s]||0)),1),r("span",{class:A(E(s)?"over-budget":"under-budget")},b(E(s)?"Over Budget":"Under Budget"),3)]),r("div",ye,[r("ul",$e,[(o(!0),l(O,null,P(L(s),p=>(o(),l("li",{class:"transaction-item",key:p.id},[r("span",ke,b(p.description),1),r("span",{class:A(["amount",p.isIncome?"income":"expense"])}," $"+b(w(p.amount)),3)]))),128))])])]),_:2},1024))),128)),g(v(x),{header:"Edit Budget",visible:k.value,"onUpdate:visible":n[1]||(n[1]=s=>k.value=s),modal:"",closable:!1,class:"edit-dialog"},{footer:S(()=>[r("div",Se,[g(v(C),{label:"Cancel",icon:"pi pi-times",class:"p-button-text",onClick:Q}),g(v(C),{label:"Save",icon:"pi pi-check",class:"p-button-text",onClick:K})])]),default:S(()=>[r("div",Be,[r("span",we,[n[3]||(n[3]=D("Set budget for ")),r("strong",null,b(B.value),1),n[4]||(n[4]=D(":"))]),g(v(Z),{modelValue:y.value,"onUpdate:modelValue":n[0]||(n[0]=s=>y.value=s),mode:"currency",currency:"USD",locale:"en-US",class:"input-number",min:0,max:1e6},null,8,["modelValue"])])]),_:1},8,["visible"])]))}},Ce=U(Ee,[["__scopeId","data-v-70d5b9cb"]]),De={class:"wrapper"},Ne={__name:"BudgetPageView",setup(e){ne("transactionData",I),console.log(I);const c=async()=>{await ee()};return F(()=>{c()}),(a,i)=>(o(),l("main",null,[i[0]||(i[0]=r("div",{class:"header"},[r("div",{class:"header-title"},[r("i",{class:"pi pi-chart-line header-icon"}),r("h1",null,"Budget")])],-1)),r("div",De,[g(Ce)])]))}},Oe=U(Ne,[["__scopeId","data-v-b95483b7"]]);export{Oe as default};
