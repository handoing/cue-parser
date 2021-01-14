var v=Object.defineProperty,H=t=>v(t,"__esModule",{value:!0}),V=(t,e)=>{H(t);for(var i in e)v(t,i,{get:e[i],enumerable:!0})};V(exports,{compile:()=>Te,generate:()=>$,generateSnabb:()=>z,parser:()=>O,tokenizer:()=>p});var W={isWhiteSpace(t){return t===32},isLetter(t){return t===45||t===95||t>=65&&t<=90||t>=97&&t<=122},isChar(t){return t===46||t===45||t===95||t===123||t===125||t===32||t===10||t===9||t>=48&&t<=57||t>=65&&t<=90||t>=97&&t<=122}},h=W,o={};o.CHARACTER_TOKEN="CHARACTER_TOKEN";o.START_TAG_TOKEN="START_TAG_TOKEN";o.END_TAG_TOKEN="END_TAG_TOKEN";o.EOF_TOKEN="EOF_TOKEN";o.EXP_START_IF_TOKEN="EXP_START_IF_TOKEN";o.EXP_THEN_IF_TOKEN="EXP_THEN_IF_TOKEN";o.EXP_END_IF_TOKEN="EXP_END_IF_TOKEN";o.EXP_START_FOR_TOKEN="EXP_START_FOR_TOKEN";o.EXP_END_FOR_TOKEN="EXP_END_FOR_TOKEN";var c=o,a="DATA_STATE",I="TAG_OPEN_STATE",d="TAG_NAME_STATE",g="TAG_CLOSE_STATE",A="BEFORE_ATTRIBUTE_NAME_STATE",F="ATTRIBUTE_NAME_STATE",m="BEFORE_ATTRIBUTE_VALUE_STATE",y="ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE",C="AFTER_ATTRIBUTE_VALUE_QUOTED_STATE",K="ATTRIBUTE_VALUE_DOUBLE_BRACE_STATE",P="AFTER_ATTRIBUTE_VALUE_BRACE_STATE",k="TEXT_STATE",X="IF_EXPRESSION_START",x="IF_EXPRESSION",D="IF_EXPRESSION_END",U="FOR_EXPRESSION_START",S="FOR_EXPRESSION",b="FOR_EXPRESSION_END",L="c-",B=class{constructor(e){this.source=e,this.length=e.length,this.index=0,this.state=a,this.currentToken=null,this.currentAttr=null,this.buffer=[]}eof(){return this.index>=this.length}lex(){for(;!this.buffer.length&&!this.eof();){let e=this.source.charCodeAt(this.index);this[this.state](e,this.source[this.index])}return this.buffer.shift()}peek(e){return this.source.charCodeAt(this.index+e)}[a](e){h.isWhiteSpace(e)||e===10?++this.index:e===60?(this.state=I,++this.index):h.isLetter(e)?(this._createTextToken(),this.state=k):e===123?(this.peek(2)===35||this.peek(2)===47)&&this.peek(1)===123?this.index+=2:(this._createTextToken(),this.state=k):(e===35||e===47)&&(this.peek(1)===105&&this.peek(2)===102||this.peek(1)===101?(this.state=X,++this.index):this.peek(1)===108&&this.peek(2)===105&&(this.state=U,++this.index))}[k](e,i){h.isChar(e)?(this.currentToken.value+=i,++this.index):e===60&&(this._emitCurrentToken(),this.state=a)}[g](e){h.isLetter(e)&&(this._createEndTagToken(),this.state=d)}[I](e){h.isLetter(e)?(this._createStartTagToken(),this.state=d):this.source.charCodeAt(this.index)===47&&(this.state=g,++this.index)}[d](e,i){h.isLetter(e)?(this.currentToken.value+=i,++this.index):h.isWhiteSpace(e)||e===10?(this.state=A,++this.index):e===62&&(this.state=a,++this.index,this._emitCurrentToken())}[A](e){h.isLetter(e)?(this._createAttr(""),this.state=F):(h.isWhiteSpace(e)||e===10||e===9)&&++this.index}[F](e,i){h.isLetter(e)||e===45?(this.currentAttr.name+=i,++this.index):e===61&&(this.state=m,++this.index)}[m](e){e===34?(this.state=y,++this.index):e===123&&this.peek(1)===123&&(this.state=K,this.index+=2)}[y](e,i){e!==34?(this.currentAttr.value+=i,++this.index):e===34&&(this.currentAttr.name.indexOf(L)===0?this.currentToken.directives.push(this.currentAttr):this.currentToken.attrs.push(this.currentAttr),this.state=C,++this.index)}[C](e){e===62?(this.state=a,++this.index,this._emitCurrentToken()):h.isWhiteSpace(e)||e===10||e===9?++this.index:h.isLetter(e)?this.state=A:(e===47||this.peek(1)===62)&&(this.state=a,this.index+=2,this._emitCurrentCloseToken())}[K](e,i){e!==125?(this.currentAttr.value+=i,++this.index):e===125&&this.peek(1)===125&&(this.currentAttr.name.indexOf(L)===0?this.currentToken.directives.push(this.currentAttr):this.currentToken.attrs.push(this.currentAttr),this.state=P,this.index+=2)}[P](e){e===62?(this.state=a,++this.index,this._emitCurrentToken()):h.isWhiteSpace(e)||e===10||e===9?++this.index:h.isLetter(e)&&(this.state=A)}[X](e){e===105||e===102?++this.index:h.isWhiteSpace(e)?++this.index:e===101?(this._createExpressionThenIf(),this.state=x):e===125?(this._createExpressionEndIf(),this.state=x):h.isLetter(e)&&(this._createExpressionStartIf(),this.state=x)}[x](e,i){h.isLetter(e)?(this.currentToken.value+=i,++this.index):h.isWhiteSpace(e)?++this.index:e===125&&(++this.index,this.state=D)}[D](e,i){e===125&&(this.state=a,++this.index,this._emitCurrentToken())}[U](e,i){e===108||e===105||e===115||e===116?this.peek(1)===105&&this.peek(2)===115&&this.peek(3)===116&&(this.index+=4):h.isWhiteSpace(e)?++this.index:e===125?(this._createExpressionEndFor(),this.state=S):h.isLetter(e)&&(this._createExpressionStartFor(),this.state=S)}[S](e,i){h.isLetter(e)?(this.currentToken.value+=i,++this.index):h.isWhiteSpace(e)?(this.currentToken.value+=i,++this.index):e===125&&(++this.index,this.state=b)}[b](e,i){e===125&&(this.state=a,++this.index,this._emitCurrentToken())}_emitCurrentToken(){let e=this.currentToken;this.buffer.push(e)}_emitCurrentCloseToken(){let e=this.currentToken.value;this._emitCurrentToken(),this._createEndTagToken(),this.currentToken.value=e,this._emitCurrentToken()}_createAttr(e){this.currentAttr={name:e,value:""}}_createStartTagToken(){this.currentToken={type:c.START_TAG_TOKEN,value:"",attrs:[],directives:[]}}_createEndTagToken(){this.currentToken={type:c.END_TAG_TOKEN,value:""}}_createTextToken(){this.currentToken={type:c.CHARACTER_TOKEN,value:""}}_createExpressionStartIf(){this.currentToken={type:c.EXP_START_IF_TOKEN,value:""}}_createExpressionThenIf(){this.currentToken={type:c.EXP_THEN_IF_TOKEN,value:""}}_createExpressionEndIf(){this.currentToken={type:c.EXP_END_IF_TOKEN,value:""}}_createExpressionStartFor(){this.currentToken={type:c.EXP_START_FOR_TOKEN,value:""}}_createExpressionEndFor(){this.currentToken={type:c.EXP_END_FOR_TOKEN,value:""}}},G=B,w=class{constructor(e){this.scanner=new G(e)}getNextToken(){if(!this.scanner.eof()){let e=this.scanner.lex();if(e)return e}}};function j(t){let e=[],i=new w(t);try{for(;;){let s=i.getNextToken();if(!s)break;e.push(s)}}catch(s){console.error(s)}return e}var p=j;function M(t){let e=[],i=[],s=0,r,n;for(;s<t.length;){let T=t[s];switch(T.type){case c.START_TAG_TOKEN:e.push({type:"tag",name:T.value,attrs:T.attrs,directives:T.directives,children:[]});break;case c.CHARACTER_TOKEN:let u=e[e.length-1];u?u.children.push({type:"text",data:T.value}):i.push({type:"text",data:T.value});break;case c.END_TAG_TOKEN:n=e.pop(),r=e[e.length-1],r?r.children.push(n):i.push(n);break;case c.EXP_START_IF_TOKEN:e.push({type:"if",expression:T.value}),e.push({children:[]});break;case c.EXP_THEN_IF_TOKEN:n=e.pop(),r=e[e.length-1],r&&(r.if=n.children),e.push({children:[]});break;case c.EXP_END_IF_TOKEN:n=e.pop(),r=e[e.length-1],r&&(r.else=n.children),n=e.pop(),r=e[e.length-1],r?r.children.push(n):i.push(n);break;case c.EXP_START_FOR_TOKEN:e.push({type:"for",expression:T.value,children:[]});break;case c.EXP_END_FOR_TOKEN:n=e.pop(),r=e[e.length-1],r?r.children.push(n):i.push(n);break}s++}return i}var O=M,Q=function(){let t={"on-click":function(e){return e=e.replace(/this/g,"_ctx"),`function($event) { ${e} }`}};return function(e,i){return t[e]?t[e](i):`"${i}"`}}(),q=function(){let t={"c-show":function(e){return"_vShow"},"c-hide":function(e){return"_vHide"}};return function(e,i){return t[e]?t[e](i):`"${e}"`}}();function J(t){let e=Object.keys(t).reduce((i,s,r)=>{let n=`"${s}"`,T=Q(s,t[s]);return i+=`${n}: ${R(T,{isAnalysisEvent:!0})},`},"");return`{ ${e} }`}function Y(t){let e=Object.keys(t).reduce((i,s,r)=>{let n=q(s,t[s]),T=t[s];return i+=`[${n}, ${R(T)}],`},"");return`[ ${e} ]`}function R(t,{isAnalysisEvent:e}={}){let i=t.match(/\{\{(.+?)\}\}/);if(i){let s=i.input.substring(0,i.index),r=i.input.substring(i.index+i[0].length,i.input.length),n=`${s}" + _string(_ctx.data.${i[1]}) + "${r}`;return e?n:`"${n}"`}else return e?t:`"${t}"`}function Z(t,e){let i=e===0?"":",";if(t.type==="text")return`${i}_createText(${R(t.data)})`;if(t.type==="tag"){let s=t.attrs.length>0,r=t.directives.length>0,n={},T={},u="";return s&&t.attrs.map(({name:_,value:E})=>{n[_]=E}),u=`_creatElement('${t.name}', ${J(n)}, [ ${t.children?f(t.children):""} ])`,r&&(t.directives.map(({name:_,value:E})=>{T[_]=E}),u=`_withDirectives(${u}, ${Y(T)})`),`${i} ${u}`}if(t.type==="if")return`${i}_if(_ctx.data.${t.expression}, function() { return ${t.if?f(t.if):"[]"} }, function() { return ${t.else?f(t.else):"[]"} })`;if(t.type==="for"){let[s,r,n]=t.expression.split(/ as | by /g);return`${i}_for(_ctx.data.${s}, function(${r}, ${n}) { return [ ${t.children?f(t.children):""} ] })`}}function f(t){return t.map(function(e,i){return Z(e,i)}).join("")}function ee(t,e){let i=f(t);return`function create(_ctx) { return ${i} }`}var $=ee,te=function(){let t={"c-show":function(e){return"_vShow"},"c-hide":function(e){return"_vHide"}};return function(e,i){return t[e]?t[e](i):`"${e}"`}}();function ie(t){let e=Object.keys(t).reduce((i,s,r)=>{switch(!0){case/^class$/.test(s):{let n=t[s];return i+=`class: {${n}: true},`}case/^on-/.test(s):{let n=s.slice(3),T=t[s];return T=T.replace(/this/g,"_ctx"),i+=`on: { ${n}: function($event) { ${T} } },`}default:{let n=t[s];return i+=`props: {${s}: ${N(`"${n}"`,{isAnalysisEvent:!0})}},`}}},"");return`{ ${e} }`}function se(t){let e=Object.keys(t).reduce((i,s,r)=>{let n=te(s,t[s]),T=t[s];return i+=`[${n}, ${N(T)}],`},"");return`[ ${e} ]`}function N(t,{isAnalysisEvent:e}={}){let i=t.match(/\{\{(.+?)\}\}/);if(i){let s=i.input.substring(0,i.index),r=i.input.substring(i.index+i[0].length,i.input.length),n=`${s}" + _string(_ctx.data.${i[1]}) + "${r}`;return e?n:`"${n}"`}else return e?t:`"${t}"`}function ne(t,e){let i=e===0?"":",";if(t.type==="text")return`${i}_createText(${N(t.data)})`;if(t.type==="tag"){let s=t.attrs.length>0,r=t.directives.length>0,n={},T={},u="";return s&&t.attrs.map(({name:_,value:E})=>{n[_]=E}),u=`h('${t.name}', ${ie(n)}, [ ${t.children?l(t.children):""} ])`,r&&(t.directives.map(({name:_,value:E})=>{T[_]=E}),u=`_withDirectives(${u}, ${se(T)})`),`${i} ${u}`}if(t.type==="if")return`${i}_if(_ctx.data.${t.expression}, function() { return ${t.if?l(t.if):"[]"} }, function() { return ${t.else?l(t.else):"[]"} })`;if(t.type==="for"){let[s,r,n]=t.expression.split(/ as | by /g);return`${i}..._for(_ctx.data.${s}, function(${r}, ${n}) { return [ ${t.children?l(t.children):""} ] })`}}function l(t){return t.map(function(e,i){return ne(e,i)}).join("")}function re(t,e){let i=l(t);return`function create(_ctx) { return ${i} }`}var z=re;function Te(t){let e=p(t),i=O(e),s=$(i),r=new Function(`return ${s}`);return r()}
