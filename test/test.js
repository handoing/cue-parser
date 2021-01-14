const fs = require("fs");
const path = require("path");
const { tokenizer, parser, generate, generateSnabb } = require("../dist");

const tokens = tokenizer(`
<div
  class="main"
>
  <img class="image1" on-click={{this.onChange($event)}} src="{{img}}"/>
  <img class="image2" on-click={{this.onChange($event)}} src="{{img}}"/>
  <div class="toggle">
    <p>toggle {{toggle}}</p>
  </div>
  <div c-show="{{toggle}}" c-abc="{{isGo}}">ooooo</div>
  {{#list nnnn as item by item_index}}
  <p>------</p>
  {{/list}}
</div>
`);

const ast = parser(tokens);

const code = generateSnabb(ast);

fs.writeFileSync(path.resolve(__dirname, './AST.json'), JSON.stringify(ast, null, '\t'))
fs.writeFileSync(path.resolve(__dirname, './CODE.js'), code)