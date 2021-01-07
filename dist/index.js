var x=Object.defineProperty,$=t=>x(t,"__esModule",{value:!0}),y=(t,e)=>{$(t);for(var i in e)x(t,i,{get:e[i],enumerable:!0})};y(exports,{generate:()=>F,parser:()=>B,tokenizer:()=>L});var v={isWhiteSpace(t){return t===32},isLetter(t){return t>=65&&t<=90||t>=97&&t<=122},isChar(t){return t===123||t===125||t===32||t===10||t===9||t>=48&&t<=57||t>=65&&t<=90||t>=97&&t<=122}},s=v,_={};_.CHARACTER_TOKEN="CHARACTER_TOKEN";_.START_TAG_TOKEN="START_TAG_TOKEN";_.END_TAG_TOKEN="END_TAG_TOKEN";_.EOF_TOKEN="EOF_TOKEN";_.EXP_START_IF_TOKEN="EXP_START_IF_TOKEN";_.EXP_THEN_IF_TOKEN="EXP_THEN_IF_TOKEN";_.EXP_END_IF_TOKEN="EXP_END_IF_TOKEN";var h=_,o="DATA_STATE",k="TAG_OPEN_STATE",A="TAG_NAME_STATE",d="TAG_CLOSE_STATE",a="BEFORE_ATTRIBUTE_NAME_STATE",S="ATTRIBUTE_NAME_STATE",N="BEFORE_ATTRIBUTE_VALUE_STATE",O="ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE",R="AFTER_ATTRIBUTE_VALUE_QUOTED_STATE",p="ATTRIBUTE_VALUE_DOUBLE_BRACE_STATE",I="AFTER_ATTRIBUTE_VALUE_BRACE_STATE",f="TEXT_STATE",C="EXPRESSION_START",u="EXPRESSION",U=class{constructor(e){this.source=e,this.length=e.length,this.index=0,this.state=o,this.currentToken=null,this.currentAttr=null,this.buffer=[]}eof(){return this.index>=this.length}lex(){for(;!this.buffer.length&&!this.eof();){let e=this.source.charCodeAt(this.index);this[this.state](e,this.source[this.index])}return this.buffer.shift()}peek(e){return this.source.charCodeAt(this.index+e)}[o](e){s.isWhiteSpace(e)||e===10?++this.index:e===60?(this.state=k,++this.index):s.isLetter(e)?(this._createTextToken(),this.state=f):e===123?(this.peek(2)===35||this.peek(2)===47)&&this.peek(1)===123?this.index+=2:(this._createTextToken(),this.state=f):(e===35||e===47)&&(this.state=C,++this.index)}[f](e,i){s.isChar(e)||e===46?(this.currentToken.value+=i,++this.index):e===60&&(this._emitCurrentToken(),this.state=o)}[d](e){s.isLetter(e)&&(this._createEndTagToken(),this.state=A)}[k](e){s.isLetter(e)?(this._createStartTagToken(),this.state=A):this.source.charCodeAt(this.index)===47&&(this.state=d,++this.index)}[A](e,i){s.isLetter(e)?(this.currentToken.value+=i,++this.index):s.isWhiteSpace(e)||e===10?(this.state=a,++this.index):e===62&&(this.state=o,++this.index,this._emitCurrentToken())}[a](e){s.isLetter(e)?(this._createAttr(""),this.state=S):(s.isWhiteSpace(e)||e===10||e===9)&&++this.index}[S](e,i){s.isLetter(e)||e===45?(this.currentAttr.name+=i,++this.index):e===61&&(this.state=N,++this.index)}[N](e){e===34?(this.state=O,++this.index):e===123&&this.peek(1)===123&&(this.state=p,this.index+=2)}[O](e,i){e!==34?(this.currentAttr.value+=i,++this.index):e===34&&(this.currentToken.attrs.push(this.currentAttr),this.state=R,++this.index)}[R](e){e===62?(this.state=o,++this.index,this._emitCurrentToken()):s.isWhiteSpace(e)||e===10||e===9?++this.index:s.isLetter(e)?this.state=a:(e===47||this.peek(1)===62)&&(this.state=o,this.index+=2,this._emitCurrentCloseToken())}[p](e,i){e!==125?(this.currentAttr.value+=i,++this.index):e===125&&this.peek(1)===125&&(this.currentToken.attrs.push(this.currentAttr),this.state=I,this.index+=2)}[I](e){e===62?(this.state=o,++this.index,this._emitCurrentToken()):s.isWhiteSpace(e)||e===10||e===9?++this.index:s.isLetter(e)&&(this.state=a)}[C](e){e===105||e===102?++this.index:s.isWhiteSpace(e)?++this.index:e===101?(this._createExpressionThenIf(),this.state=u):e===125?(this._createExpressionEndIf(),this.state=u):s.isLetter(e)&&(this._createExpressionStartIf(),this.state=u)}[u](e,i){s.isLetter(e)?(this.currentToken.value+=i,++this.index):s.isWhiteSpace(e)?++this.index:e===125&&(++this.index,this.source.charCodeAt(this.index)===125&&(this.state=o,++this.index,this._emitCurrentToken()))}_emitCurrentToken(){let e=this.currentToken;this.buffer.push(e)}_emitCurrentCloseToken(){let e=this.currentToken.value;this._emitCurrentToken(),this._createEndTagToken(),this.currentToken.value=e,this._emitCurrentToken()}_createAttr(e){this.currentAttr={name:e,value:""}}_createStartTagToken(){this.currentToken={type:h.START_TAG_TOKEN,value:"",attrs:[]}}_createEndTagToken(){this.currentToken={type:h.END_TAG_TOKEN,value:""}}_createTextToken(){this.currentToken={type:h.CHARACTER_TOKEN,value:""}}_createExpressionStartIf(){this.currentToken={type:h.EXP_START_IF_TOKEN,value:""}}_createExpressionThenIf(){this.currentToken={type:h.EXP_THEN_IF_TOKEN,value:""}}_createExpressionEndIf(){this.currentToken={type:h.EXP_END_IF_TOKEN,value:""}}},g=U,m=class{constructor(e){this.scanner=new g(e)}getNextToken(){if(!this.scanner.eof()){let e=this.scanner.lex();if(e)return e}}};function L(t){let e=[],i=new m(t);try{for(;;){let n=i.getNextToken();if(!n)break;e.push(n)}}catch(n){console.error(n)}return e}function B(t){let e=[],i=[],n=0,r,T;for(;n<t.length;){let E=t[n];switch(E.type){case h.START_TAG_TOKEN:e.push({type:"tag",name:E.value,attrs:E.attrs,children:[]});break;case h.CHARACTER_TOKEN:let l=e[e.length-1];l?l.children.push({type:"text",data:E.value}):i.push({type:"text",data:E.value});break;case h.END_TAG_TOKEN:T=e.pop(),r=e[e.length-1],r?r.children.push(T):i.push(T);break;case h.EXP_START_IF_TOKEN:e.push({type:"if",expression:E.value}),e.push({children:[]});break;case h.EXP_THEN_IF_TOKEN:T=e.pop(),r=e[e.length-1],r&&(r.if=T.children),e.push({children:[]});break;case h.EXP_END_IF_TOKEN:T=e.pop(),r=e[e.length-1],r&&(r.else=T.children),T=e.pop(),r=e[e.length-1],r?r.children.push(T):i.push(T);break}n++}return i}var P=function(){let t={"on-click":function(e){return e=e.replace(/this/g,"_ctx"),`function($event) { ${e} }`},"c-show":function(e){return e},"c-hide":function(e){return e}};return function(e,i){return t[e]?t[e](i):`"${i}"`}}();function X(t){let e=Object.keys(t).reduce((i,n,r)=>{let T=`"${n}"`,E=P(n,t[n]);return i+=`${T}: ${K(E,!0)},`},"");return`{ ${e} }`}function K(t,e){let i=t.match(/\{\{(.+?)\}\}/);if(i){let n=i.input.substring(0,i.index),r=i.input.substring(i.index+i[0].length,i.input.length),T=`${n}" + _string(_ctx.data.${i[1]}) + "${r}`;return e?T:`"${T}"`}else return e?t:`"${t}"`}function D(t,e){let i=e===0?"":",";if(t.type==="text")return`${i}_createText(${K(t.data)})`;if(t.type==="tag"){let n={};return t.attrs.length>0&&t.attrs.map(({name:r,value:T})=>{n[r]=T}),`${i}_creatElement('${t.name}', ${X(n)}, [ ${t.children?c(t.children):""} ])`}if(t.type==="if")return`${i}_if(_ctx.data.${t.expression}, function() { return ${t.if?c(t.if):"[]"} }, function() { return ${t.else?c(t.else):"[]"} })`}function c(t){return t.map(function(e,i){return D(e,i)}).join("")}function F(t,e){let i=c(t);return`function create(_ctx) { return ${i} }`}
