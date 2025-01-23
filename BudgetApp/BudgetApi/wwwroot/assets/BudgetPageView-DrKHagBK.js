import{C as j,D as lt,U as x,E as F,G as ut,H as D,I as dt,J as ct,K as pt,Z as z,L as V,M as vt,N as gt,O as k,P as O,Q as ft,R as mt,S as N,T as ht,V as bt,W as q,a as c,c as g,X as h,Y as L,q as C,b as l,m as P,t as _,_ as Q,$ as yt,a0 as _t,r as E,a1 as $t,o as X,d as v,A as m,u as p,F as wt,p as St,j as Et,w as Tt,a2 as M,a3 as K,z as W,y as Bt,f as kt,a4 as Ot,a5 as Z,a6 as Ct,a7 as Dt}from"./index-DBqlTuQu.js";var Lt=function(e){var t=e.dt;return`
.p-tooltip {
    position: absolute;
    display: none;
    max-width: `.concat(t("tooltip.max.width"),`;
}

.p-tooltip-right,
.p-tooltip-left {
    padding: 0 `).concat(t("tooltip.gutter"),`;
}

.p-tooltip-top,
.p-tooltip-bottom {
    padding: `).concat(t("tooltip.gutter"),` 0;
}

.p-tooltip-text {
    white-space: pre-line;
    word-break: break-word;
    background: `).concat(t("tooltip.background"),`;
    color: `).concat(t("tooltip.color"),`;
    padding: `).concat(t("tooltip.padding"),`;
    box-shadow: `).concat(t("tooltip.shadow"),`;
    border-radius: `).concat(t("tooltip.border.radius"),`;
}

.p-tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
}

.p-tooltip-right .p-tooltip-arrow {
    margin-top: calc(-1 * `).concat(t("tooltip.gutter"),`);
    border-width: `).concat(t("tooltip.gutter")," ").concat(t("tooltip.gutter")," ").concat(t("tooltip.gutter"),` 0;
    border-right-color: `).concat(t("tooltip.background"),`;
}

.p-tooltip-left .p-tooltip-arrow {
    margin-top: calc(-1 * `).concat(t("tooltip.gutter"),`);
    border-width: `).concat(t("tooltip.gutter")," 0 ").concat(t("tooltip.gutter")," ").concat(t("tooltip.gutter"),`;
    border-left-color: `).concat(t("tooltip.background"),`;
}

.p-tooltip-top .p-tooltip-arrow {
    margin-left: calc(-1 * `).concat(t("tooltip.gutter"),`);
    border-width: `).concat(t("tooltip.gutter")," ").concat(t("tooltip.gutter")," 0 ").concat(t("tooltip.gutter"),`;
    border-top-color: `).concat(t("tooltip.background"),`;
    border-bottom-color: `).concat(t("tooltip.background"),`;
}

.p-tooltip-bottom .p-tooltip-arrow {
    margin-left: calc(-1 * `).concat(t("tooltip.gutter"),`);
    border-width: 0 `).concat(t("tooltip.gutter")," ").concat(t("tooltip.gutter")," ").concat(t("tooltip.gutter"),`;
    border-top-color: `).concat(t("tooltip.background"),`;
    border-bottom-color: `).concat(t("tooltip.background"),`;
}
`)},At={root:"p-tooltip p-component",arrow:"p-tooltip-arrow",text:"p-tooltip-text"},Ht=j.extend({name:"tooltip-directive",theme:Lt,classes:At}),xt=lt.extend({style:Ht});function It(n,e){return jt(n)||Pt(n,e)||Mt(n,e)||Vt()}function Vt(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Mt(n,e){if(n){if(typeof n=="string")return G(n,e);var t={}.toString.call(n).slice(8,-1);return t==="Object"&&n.constructor&&(t=n.constructor.name),t==="Map"||t==="Set"?Array.from(n):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?G(n,e):void 0}}function G(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,a=Array(e);t<e;t++)a[t]=n[t];return a}function Pt(n,e){var t=n==null?null:typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(t!=null){var a,o,i,b,$=[],y=!0,w=!1;try{if(i=(t=t.call(n)).next,e!==0)for(;!(y=(a=i.call(t)).done)&&($.push(a.value),$.length!==e);y=!0);}catch(S){w=!0,o=S}finally{try{if(!y&&t.return!=null&&(b=t.return(),Object(b)!==b))return}finally{if(w)throw o}}return $}}function jt(n){if(Array.isArray(n))return n}function J(n,e,t){return(e=Ut(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function Ut(n){var e=Rt(n,"string");return T(e)=="symbol"?e:e+""}function Rt(n,e){if(T(n)!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var a=t.call(n,e||"default");if(T(a)!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}function T(n){"@babel/helpers - typeof";return T=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},T(n)}var Ft=xt.extend("tooltip",{beforeMount:function(e,t){var a,o=this.getTarget(e);if(o.$_ptooltipModifiers=this.getModifiers(t),t.value){if(typeof t.value=="string")o.$_ptooltipValue=t.value,o.$_ptooltipDisabled=!1,o.$_ptooltipEscape=!0,o.$_ptooltipClass=null,o.$_ptooltipFitContent=!0,o.$_ptooltipIdAttr=x()+"_tooltip",o.$_ptooltipShowDelay=0,o.$_ptooltipHideDelay=0,o.$_ptooltipAutoHide=!0;else if(T(t.value)==="object"&&t.value){if(F(t.value.value)||t.value.value.trim()==="")return;o.$_ptooltipValue=t.value.value,o.$_ptooltipDisabled=!!t.value.disabled===t.value.disabled?t.value.disabled:!1,o.$_ptooltipEscape=!!t.value.escape===t.value.escape?t.value.escape:!0,o.$_ptooltipClass=t.value.class||"",o.$_ptooltipFitContent=!!t.value.fitContent===t.value.fitContent?t.value.fitContent:!0,o.$_ptooltipIdAttr=t.value.id||x()+"_tooltip",o.$_ptooltipShowDelay=t.value.showDelay||0,o.$_ptooltipHideDelay=t.value.hideDelay||0,o.$_ptooltipAutoHide=!!t.value.autoHide===t.value.autoHide?t.value.autoHide:!0}}else return;o.$_ptooltipZIndex=(a=t.instance.$primevue)===null||a===void 0||(a=a.config)===null||a===void 0||(a=a.zIndex)===null||a===void 0?void 0:a.tooltip,this.bindEvents(o,t),e.setAttribute("data-pd-tooltip",!0)},updated:function(e,t){var a=this.getTarget(e);if(a.$_ptooltipModifiers=this.getModifiers(t),this.unbindEvents(a),!!t.value){if(typeof t.value=="string")a.$_ptooltipValue=t.value,a.$_ptooltipDisabled=!1,a.$_ptooltipEscape=!0,a.$_ptooltipClass=null,a.$_ptooltipIdAttr=a.$_ptooltipIdAttr||x()+"_tooltip",a.$_ptooltipShowDelay=0,a.$_ptooltipHideDelay=0,a.$_ptooltipAutoHide=!0,this.bindEvents(a,t);else if(T(t.value)==="object"&&t.value)if(F(t.value.value)||t.value.value.trim()===""){this.unbindEvents(a,t);return}else a.$_ptooltipValue=t.value.value,a.$_ptooltipDisabled=!!t.value.disabled===t.value.disabled?t.value.disabled:!1,a.$_ptooltipEscape=!!t.value.escape===t.value.escape?t.value.escape:!0,a.$_ptooltipClass=t.value.class||"",a.$_ptooltipFitContent=!!t.value.fitContent===t.value.fitContent?t.value.fitContent:!0,a.$_ptooltipIdAttr=t.value.id||a.$_ptooltipIdAttr||x()+"_tooltip",a.$_ptooltipShowDelay=t.value.showDelay||0,a.$_ptooltipHideDelay=t.value.hideDelay||0,a.$_ptooltipAutoHide=!!t.value.autoHide===t.value.autoHide?t.value.autoHide:!0,this.bindEvents(a,t)}},unmounted:function(e,t){var a=this.getTarget(e);this.remove(a),this.unbindEvents(a,t),a.$_ptooltipScrollHandler&&(a.$_ptooltipScrollHandler.destroy(),a.$_ptooltipScrollHandler=null)},timer:void 0,methods:{bindEvents:function(e,t){var a=this,o=e.$_ptooltipModifiers;o.focus?(e.$_focusevent=function(i){return a.onFocus(i,t)},e.addEventListener("focus",e.$_focusevent),e.addEventListener("blur",this.onBlur.bind(this))):(e.$_mouseenterevent=function(i){return a.onMouseEnter(i,t)},e.addEventListener("mouseenter",e.$_mouseenterevent),e.addEventListener("mouseleave",this.onMouseLeave.bind(this)),e.addEventListener("click",this.onClick.bind(this))),e.addEventListener("keydown",this.onKeydown.bind(this))},unbindEvents:function(e){var t=e.$_ptooltipModifiers;t.focus?(e.removeEventListener("focus",e.$_focusevent),e.$_focusevent=null,e.removeEventListener("blur",this.onBlur.bind(this))):(e.removeEventListener("mouseenter",e.$_mouseenterevent),e.$_mouseenterevent=null,e.removeEventListener("mouseleave",this.onMouseLeave.bind(this)),e.removeEventListener("click",this.onClick.bind(this))),e.removeEventListener("keydown",this.onKeydown.bind(this))},bindScrollListener:function(e){var t=this;e.$_ptooltipScrollHandler||(e.$_ptooltipScrollHandler=new ut(e,function(){t.hide(e)})),e.$_ptooltipScrollHandler.bindScrollListener()},unbindScrollListener:function(e){e.$_ptooltipScrollHandler&&e.$_ptooltipScrollHandler.unbindScrollListener()},onMouseEnter:function(e,t){var a=e.currentTarget,o=a.$_ptooltipShowDelay;this.show(a,t,o)},onMouseLeave:function(e){var t=e.currentTarget,a=t.$_ptooltipHideDelay,o=t.$_ptooltipAutoHide;if(o)this.hide(t,a);else{var i=D(e.target,"data-pc-name")==="tooltip"||D(e.target,"data-pc-section")==="arrow"||D(e.target,"data-pc-section")==="text"||D(e.relatedTarget,"data-pc-name")==="tooltip"||D(e.relatedTarget,"data-pc-section")==="arrow"||D(e.relatedTarget,"data-pc-section")==="text";!i&&this.hide(t,a)}},onFocus:function(e,t){var a=e.currentTarget,o=a.$_ptooltipShowDelay;this.show(a,t,o)},onBlur:function(e){var t=e.currentTarget,a=t.$_ptooltipHideDelay;this.hide(t,a)},onClick:function(e){var t=e.currentTarget,a=t.$_ptooltipHideDelay;this.hide(t,a)},onKeydown:function(e){var t=e.currentTarget,a=t.$_ptooltipHideDelay;e.code==="Escape"&&this.hide(e.currentTarget,a)},tooltipActions:function(e,t){if(!(e.$_ptooltipDisabled||!dt(e))){var a=this.create(e,t);this.align(e),!this.isUnstyled()&&ct(a,250);var o=this;window.addEventListener("resize",function i(){pt()||o.hide(e),window.removeEventListener("resize",i)}),a.addEventListener("mouseleave",function i(){o.hide(e),a.removeEventListener("mouseleave",i),e.removeEventListener("mouseenter",e.$_mouseenterevent),setTimeout(function(){return e.addEventListener("mouseenter",e.$_mouseenterevent)},50)}),this.bindScrollListener(e),z.set("tooltip",a,e.$_ptooltipZIndex)}},show:function(e,t,a){var o=this;a!==void 0?this.timer=setTimeout(function(){return o.tooltipActions(e,t)},a):this.tooltipActions(e,t)},tooltipRemoval:function(e){this.remove(e),this.unbindScrollListener(e)},hide:function(e,t){var a=this;clearTimeout(this.timer),t!==void 0?setTimeout(function(){return a.tooltipRemoval(e)},t):this.tooltipRemoval(e)},getTooltipElement:function(e){return document.getElementById(e.$_ptooltipId)},create:function(e){var t=e.$_ptooltipModifiers,a=V("div",{class:!this.isUnstyled()&&this.cx("arrow"),"p-bind":this.ptm("arrow",{context:t})}),o=V("div",{class:!this.isUnstyled()&&this.cx("text"),"p-bind":this.ptm("text",{context:t})});e.$_ptooltipEscape?(o.innerHTML="",o.appendChild(document.createTextNode(e.$_ptooltipValue))):o.innerHTML=e.$_ptooltipValue;var i=V("div",J(J({id:e.$_ptooltipIdAttr,role:"tooltip",style:{display:"inline-block",width:e.$_ptooltipFitContent?"fit-content":void 0,pointerEvents:!this.isUnstyled()&&e.$_ptooltipAutoHide&&"none"},class:[!this.isUnstyled()&&this.cx("root"),e.$_ptooltipClass]},this.$attrSelector,""),"p-bind",this.ptm("root",{context:t})),a,o);return document.body.appendChild(i),e.$_ptooltipId=i.id,this.$el=i,i},remove:function(e){if(e){var t=this.getTooltipElement(e);t&&t.parentElement&&(z.clear(t),document.body.removeChild(t)),e.$_ptooltipId=null}},align:function(e){var t=e.$_ptooltipModifiers;t.top?(this.alignTop(e),this.isOutOfBounds(e)&&(this.alignBottom(e),this.isOutOfBounds(e)&&this.alignTop(e))):t.left?(this.alignLeft(e),this.isOutOfBounds(e)&&(this.alignRight(e),this.isOutOfBounds(e)&&(this.alignTop(e),this.isOutOfBounds(e)&&(this.alignBottom(e),this.isOutOfBounds(e)&&this.alignLeft(e))))):t.bottom?(this.alignBottom(e),this.isOutOfBounds(e)&&(this.alignTop(e),this.isOutOfBounds(e)&&this.alignBottom(e))):(this.alignRight(e),this.isOutOfBounds(e)&&(this.alignLeft(e),this.isOutOfBounds(e)&&(this.alignTop(e),this.isOutOfBounds(e)&&(this.alignBottom(e),this.isOutOfBounds(e)&&this.alignRight(e)))))},getHostOffset:function(e){var t=e.getBoundingClientRect(),a=t.left+vt(),o=t.top+gt();return{left:a,top:o}},alignRight:function(e){this.preAlign(e,"right");var t=this.getTooltipElement(e),a=this.getHostOffset(e),o=a.left+k(e),i=a.top+(O(e)-O(t))/2;t.style.left=o+"px",t.style.top=i+"px"},alignLeft:function(e){this.preAlign(e,"left");var t=this.getTooltipElement(e),a=this.getHostOffset(e),o=a.left-k(t),i=a.top+(O(e)-O(t))/2;t.style.left=o+"px",t.style.top=i+"px"},alignTop:function(e){this.preAlign(e,"top");var t=this.getTooltipElement(e),a=this.getHostOffset(e),o=a.left+(k(e)-k(t))/2,i=a.top-O(t);t.style.left=o+"px",t.style.top=i+"px"},alignBottom:function(e){this.preAlign(e,"bottom");var t=this.getTooltipElement(e),a=this.getHostOffset(e),o=a.left+(k(e)-k(t))/2,i=a.top+O(e);t.style.left=o+"px",t.style.top=i+"px"},preAlign:function(e,t){var a=this.getTooltipElement(e);a.style.left="-999px",a.style.top="-999px",ft(a,"p-tooltip-".concat(a.$_ptooltipPosition)),!this.isUnstyled()&&mt(a,"p-tooltip-".concat(t)),a.$_ptooltipPosition=t,a.setAttribute("data-p-position",t);var o=N(a,'[data-pc-section="arrow"]');o.style.top=t==="bottom"?"0":t==="right"||t==="left"||t!=="right"&&t!=="left"&&t!=="top"&&t!=="bottom"?"50%":null,o.style.bottom=t==="top"?"0":null,o.style.left=t==="right"||t!=="right"&&t!=="left"&&t!=="top"&&t!=="bottom"?"0":t==="top"||t==="bottom"?"50%":null,o.style.right=t==="left"?"0":null},isOutOfBounds:function(e){var t=this.getTooltipElement(e),a=t.getBoundingClientRect(),o=a.top,i=a.left,b=k(t),$=O(t),y=ht();return i+b>y.width||i<0||o<0||o+$>y.height},getTarget:function(e){var t;return bt(e,"p-inputwrapper")&&(t=N(e,"input"))!==null&&t!==void 0?t:e},getModifiers:function(e){return e.modifiers&&Object.keys(e.modifiers).length?e.modifiers:e.arg&&T(e.arg)==="object"?Object.entries(e.arg).reduce(function(t,a){var o=It(a,2),i=o[0],b=o[1];return(i==="event"||i==="position")&&(t[b]=!0),t},{}):{}}}}),zt=function(e){var t=e.dt;return`
.p-card {
    background: `.concat(t("card.background"),`;
    color: `).concat(t("card.color"),`;
    box-shadow: `).concat(t("card.shadow"),`;
    border-radius: `).concat(t("card.border.radius"),`;
    display: flex;
    flex-direction: column;
}

.p-card-caption {
    display: flex;
    flex-direction: column;
    gap: `).concat(t("card.caption.gap"),`;
}

.p-card-body {
    padding: `).concat(t("card.body.padding"),`;
    display: flex;
    flex-direction: column;
    gap: `).concat(t("card.body.gap"),`;
}

.p-card-title {
    font-size: `).concat(t("card.title.font.size"),`;
    font-weight: `).concat(t("card.title.font.weight"),`;
}

.p-card-subtitle {
    color: `).concat(t("card.subtitle.color"),`;
}
`)},Nt={root:"p-card p-component",header:"p-card-header",body:"p-card-body",caption:"p-card-caption",title:"p-card-title",subtitle:"p-card-subtitle",content:"p-card-content",footer:"p-card-footer"},Kt=j.extend({name:"card",theme:zt,classes:Nt}),Wt={name:"BaseCard",extends:q,style:Kt,provide:function(){return{$pcCard:this,$parentInstance:this}}},H={name:"Card",extends:Wt,inheritAttrs:!1};function Zt(n,e,t,a,o,i){return c(),g("div",h({class:n.cx("root")},n.ptmi("root")),[n.$slots.header?(c(),g("div",h({key:0,class:n.cx("header")},n.ptm("header")),[L(n.$slots,"header")],16)):C("",!0),l("div",h({class:n.cx("body")},n.ptm("body")),[n.$slots.title||n.$slots.subtitle?(c(),g("div",h({key:0,class:n.cx("caption")},n.ptm("caption")),[n.$slots.title?(c(),g("div",h({key:0,class:n.cx("title")},n.ptm("title")),[L(n.$slots,"title")],16)):C("",!0),n.$slots.subtitle?(c(),g("div",h({key:1,class:n.cx("subtitle")},n.ptm("subtitle")),[L(n.$slots,"subtitle")],16)):C("",!0)],16)):C("",!0),l("div",h({class:n.cx("content")},n.ptm("content")),[L(n.$slots,"content")],16),n.$slots.footer?(c(),g("div",h({key:1,class:n.cx("footer")},n.ptm("footer")),[L(n.$slots,"footer")],16)):C("",!0)],16)],16)}H.render=Zt;var Gt=function(e){var t=e.dt;return`
.p-progressbar {
    position: relative;
    overflow: hidden;
    height: `.concat(t("progressbar.height"),`;
    background: `).concat(t("progressbar.background"),`;
    border-radius: `).concat(t("progressbar.border.radius"),`;
}

.p-progressbar-value {
    margin: 0;
    background: `).concat(t("progressbar.value.background"),`;
}

.p-progressbar-label {
    color: `).concat(t("progressbar.label.color"),`;
    font-size: `).concat(t("progressbar.label.font.size"),`;
    font-weight: `).concat(t("progressbar.label.font.weight"),`;
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
`)},Jt={root:function(e){var t=e.instance;return["p-progressbar p-component",{"p-progressbar-determinate":t.determinate,"p-progressbar-indeterminate":t.indeterminate}]},value:"p-progressbar-value",label:"p-progressbar-label"},qt=j.extend({name:"progressbar",theme:Gt,classes:Jt}),Qt={name:"BaseProgressBar",extends:q,props:{value:{type:Number,default:null},mode:{type:String,default:"determinate"},showValue:{type:Boolean,default:!0}},style:qt,provide:function(){return{$pcProgressBar:this,$parentInstance:this}}},Y={name:"ProgressBar",extends:Qt,inheritAttrs:!1,computed:{progressStyle:function(){return{width:this.value+"%",display:"flex"}},indeterminate:function(){return this.mode==="indeterminate"},determinate:function(){return this.mode==="determinate"}}},Xt=["aria-valuenow"];function Yt(n,e,t,a,o,i){return c(),g("div",h({role:"progressbar",class:n.cx("root"),"aria-valuemin":"0","aria-valuenow":n.value,"aria-valuemax":"100"},n.ptmi("root")),[i.determinate?(c(),g("div",h({key:0,class:n.cx("value"),style:i.progressStyle},n.ptm("value")),[n.value!=null&&n.value!==0&&n.showValue?(c(),g("div",h({key:0,class:n.cx("label")},n.ptm("label")),[L(n.$slots,"default",{},function(){return[P(_(n.value+"%"),1)]})],16)):C("",!0)],16)):i.indeterminate?(c(),g("div",h({key:1,class:n.cx("value")},n.ptm("value")),null,16)):C("",!0)],16,Xt)}Y.render=Yt;const te={class:"budget-page"},ee={class:"budget-page__summary-panels"},ne={class:"budget-page__summary-value budget-page__summary-value--spending"},ae={class:"budget-page__summary-value budget-page__summary-value--savings"},oe={class:"budget-page__summary-value"},ie={class:"budget-page__categories"},re={class:"budget-page__category-header"},se={class:"budget-page__category-title"},le={class:"budget-page__progress"},ue={class:"budget-page__progress-labels"},de={class:"budget-page__progress-label"},ce={class:"budget-page__progress-label"},pe={class:"budget-page__transactions"},ve={class:"budget-page__dialog-form"},ge=["for"],fe={__name:"BudgetDetail",setup(n){const e=yt("transactionData",[]),t=_t(),a=[{name:"Food",value:"Food",defaultValue:200},{name:"Transport",value:"Transport",defaultValue:100},{name:"Entertainment",value:"Entertainment",defaultValue:50},{name:"Health",value:"Health",defaultValue:50},{name:"Bills",value:"Bills",defaultValue:100},{name:"Groceries",value:"Groceries",defaultValue:150},{name:"Shopping",value:"Shopping",defaultValue:50},{name:"Subscriptions",value:"Subscriptions",defaultValue:50},{name:"Dining",value:"Dining",defaultValue:100},{name:"Education",value:"Education",defaultValue:50},{name:"Other",value:"Other",defaultValue:50}],o=E([]),i=E({}),b=E(0),$=E(0),y=E(0),w=E(!1),S=E(""),A=E(0),tt=()=>{const u=localStorage.getItem("budgets");if(u)try{i.value=JSON.parse(u)}catch(s){console.error("Error parsing budgets from localStorage:",s),i.value={}}a.forEach(s=>{i.value[s.name]===void 0&&(i.value[s.name]=s.defaultValue)})},et=()=>{localStorage.setItem("budgets",JSON.stringify(i.value))},I=()=>{const u=Array.isArray(e.transactions)?e.transactions:[],s=u.filter(r=>!r.isIncome),f=u.filter(r=>r.isIncome);b.value=s.reduce((r,d)=>r+d.amount,0),$.value=f.reduce((r,d)=>r+d.amount,0)-b.value,y.value=Object.values(i.value).reduce((r,d)=>r+d,0)},U=()=>{const f=(Array.isArray(e.transactions)?e.transactions:[]).filter(r=>!r.isIncome).reduce((r,d)=>(r[d.category]||(r[d.category]={transactionCount:0,totalSpent:0}),r[d.category].transactionCount+=1,r[d.category].totalSpent+=d.amount,r),{});o.value=a.map(r=>{var d,R;return{name:r.value,transactionCount:((d=f[r.value])==null?void 0:d.transactionCount)||0,totalSpent:((R=f[r.value])==null?void 0:R.totalSpent)||0}})},B=u=>new Intl.NumberFormat("en-US").format(u==null?void 0:u.toFixed(2)),nt=u=>{const s=o.value.find(r=>r.name===u),f=i.value[u]||0;return s&&f>0&&s.totalSpent>f},at=u=>{const s=o.value.find(r=>r.name===u),f=i.value[u]||0;return s&&f>0?Math.min(s.totalSpent/f*100,100):0},ot=u=>e.transactions.filter(s=>!s.isIncome&&s.category===u),it=u=>{S.value=u,A.value=i.value[u]||0,w.value=!0},rt=()=>{i.value[S.value]=A.value,et(),w.value=!1,I(),t.add({severity:"success",summary:"Budget Updated",detail:`Budget for ${S.value} updated to $${B(A.value)}`,life:3e3})},st=()=>{w.value=!1};return $t(()=>e.transactions,()=>{I(),U()},{deep:!0}),X(()=>{tt(),I(),U()}),(u,s)=>{const f=Ft;return c(),g("div",te,[l("div",ee,[v(p(H),{class:"budget-page__summary-panel"},{title:m(()=>s[2]||(s[2]=[l("div",{class:"budget-page__summary-title"},"Total Spending",-1)])),content:m(()=>[l("div",ne," $"+_(B(b.value)),1)]),_:1}),v(p(H),{class:"budget-page__summary-panel"},{title:m(()=>s[3]||(s[3]=[l("div",{class:"budget-page__summary-title"},"Total Savings",-1)])),content:m(()=>[l("div",ae," $"+_(B($.value)),1)]),_:1}),v(p(H),{class:"budget-page__summary-panel"},{title:m(()=>s[4]||(s[4]=[l("div",{class:"budget-page__summary-title"},"Total Budgeted",-1)])),content:m(()=>[l("div",oe," $"+_(B(y.value)),1)]),_:1})]),l("div",ie,[(c(!0),g(wt,null,St(o.value,r=>(c(),Et(p(H),{key:r.name,class:"budget-page__category"},{header:m(()=>[l("div",re,[l("h3",se,_(r.name),1),Tt(v(p(M),{icon:"pi pi-pencil",class:"p-button-text",onClick:d=>it(r.name)},null,8,["onClick"]),[[f,"Edit Target",void 0,{top:!0}]])])]),content:m(()=>[l("div",le,[v(p(Y),{value:at(r.name),showValue:!1,class:K(["budget-page__progress-bar",{"budget-page__progress-bar--over":nt(r.name)}])},null,8,["value","class"]),l("div",ue,[l("span",de," Spent: $"+_(B(r.totalSpent||0)),1),l("span",ce," Target: $"+_(B(i.value[r.name]||0)),1)])]),l("div",pe,[v(p(Bt),{value:ot(r.name),rows:5,responsiveLayout:"scroll"},{default:m(()=>[v(p(W),{field:"description",header:"Description",class:"budget-page__transactions-description"}),v(p(W),{field:"amount",header:"Amount",class:"budget-page__transactions-amount"},{body:m(d=>[l("span",{class:K({"budget-page__transactions-amount--expense":!d.data.isIncome})}," $"+_(B(d.data.amount)),3)]),_:1})]),_:2},1032,["value"])])]),_:2},1024))),128)),v(p(Ot),{visible:w.value,"onUpdate:visible":s[1]||(s[1]=r=>w.value=r),modal:"",header:"Edit Budget",style:{width:"400px"},closable:!1},{footer:m(()=>[v(p(M),{label:"Cancel",icon:"pi pi-times",class:"p-button-text",onClick:st}),v(p(M),{label:"Save",icon:"pi pi-check",onClick:rt,autofocus:""})]),default:m(()=>[l("div",ve,[l("label",{for:"budget-"+S.value,class:"budget-page__dialog-label"},[s[5]||(s[5]=P(" Set budget for ")),l("strong",null,_(S.value),1),s[6]||(s[6]=P(": "))],8,ge),v(p(kt),{id:"budget-"+S.value,modelValue:A.value,"onUpdate:modelValue":s[0]||(s[0]=r=>A.value=r),mode:"currency",currency:"USD",locale:"en-US",min:0,max:1e6},null,8,["id","modelValue"])])]),_:1},8,["visible"])])])}}},me=Q(fe,[["__scopeId","data-v-015a0276"]]),he={class:"wrapper"},be={__name:"BudgetPageView",setup(n){Dt("transactionData",Z),console.log(Z);const e=async()=>{await Ct()};return X(()=>{e()}),(t,a)=>(c(),g("main",null,[a[0]||(a[0]=l("div",{class:"header"},[l("div",{class:"header-title"},[l("i",{class:"pi pi-chart-line header-icon"}),l("h1",null,"Budget")])],-1)),l("div",he,[v(me)])]))}},_e=Q(be,[["__scopeId","data-v-b95483b7"]]);export{_e as default};
