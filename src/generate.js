
const isDirective = (function() {
  const directives = [
    'on-click',
    'c-show',
    'c-hide'
  ];
  return function(attrName) {
    return directives.includes(attrName);
  }
})()

function serializeAttrs(attrs) {
  const serializeSting = Object.keys(attrs).reduce((serializeSting, attrName, index) => {
    const key = `"${attrName}"`;
    const value = isDirective(attrName) ? attrs[attrName] : `"${attrs[attrName]}"`
    return serializeSting += `${key}: ${createText(value, true)},`
  }, '')
  return `{ ${serializeSting} }`;
}

function createText(text, isDirectiveValue) {
  const match = text.match(/\{\{(.+?)\}\}/);
  if (match) {
    const prefix = match.input.substring(0, match.index);
    const suffix = match.input.substring(match.index + match[0].length, match.input.length);
    const _t = `${prefix}" + _string(_ctx.data.${match[1]}) + "${suffix}`
    return isDirectiveValue ? _t : `"${_t}"`
  } else {
    return isDirectiveValue ? text : `"${text}"`;
  }
}

function generateCode(node, index) {
  const prefix = index === 0 ? '' : ',';

  if (node.type === 'text') {
    return `${prefix}_createText(${createText(node.data)})`
  }

  if (node.type === 'tag') {
    const attrs = {};
    if (node.attrs.length > 0) {
      node.attrs.map(({ name, value }) => {
        attrs[name] = value;
      })
    }
    return `${prefix}_creatElement('${node.name}', ${serializeAttrs(attrs)}, [ ${ node.children ? traversal(node.children) : '' } ])`
  }

  if (node.type === 'if') {
    return `${prefix}_if(_ctx.data.${node.expression}, function() { return ${ node.if ? traversal(node.if) : '[]' } }, function() { return ${ node.else ? traversal(node.else) : '[]' } })`
  }
}

function traversal(nodes) {
  return nodes.map(function(node, i) {
    return generateCode(node, i)
  }).join('');
}

function generate(ast, options) {
  let code = traversal(ast);
  return `function create(_ctx) { return ${code} }`
}

export { generate };