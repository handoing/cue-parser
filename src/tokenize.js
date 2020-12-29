const State = {
  Start: 'Start',
  BeforeTagName: 'BeforeTagName',
  OpeningTag: 'OpeningTag',
  AfterTagName: 'AfterTagName',
  InValueNq: 'InValueNq',
  InValueSq: 'InValueSq',
  InValueDq: 'InValueDq',
  ClosingOpenTag: 'ClosingOpenTag',
  OpeningSpecial: 'OpeningSpecial',
  OpeningDoctype: 'OpeningDoctype',
  OpeningNormalComment: 'OpeningNormalComment',
  InNormalComment: 'InNormalComment',
  InShortComment: 'InShortComment',
  ClosingNormalComment: 'ClosingNormalComment',
  ClosingTag: 'ClosingTag',
}

const Characters = {
  _S: 32, // ' '
  _N: 10, // \n
  _T: 9, // \t
  _R: 13, // \r
  _F: 12, // \f
  LessThan: 60, // <
  Ep: 33, // !
  Cl: 45, // -
  Sl: 47, // /
  Gt: 62, // >
  Qm: 63, // ?
  La: 97, // a
  Lz: 122, // z
  Ua: 65, // A
  Uz: 90, // Z
  Eq: 61, // =
  Sq: 39, // '
  Dq: 34, // "
  Ld: 100, // d
  Ud: 68, //D
}

const TokenKind = {
  Literal: 'Literal',
  OpenTag: 'OpenTag',
  OpenTagEnd: 'OpenTagEnd',
  CloseTag: 'CloseTag',
  Whitespace: 'Whitespace',
  AttrValueEq: 'AttrValueEq',
  AttrValueNq: 'AttrValueNq',
  AttrValueSq: 'AttrValueSq',
  AttrValueDq: 'AttrValueDq',
}

function isLetter(char) {
  return (char >= Characters.La && char <= Characters.Lz) || (char >= Characters.Ua && char <= Characters.Uz);
}

function isWhiteSpace(char) {
  return (
    char === Characters._S ||
    char === Characters._N ||
    char === Characters._T ||
    char === Characters._T ||
    char === Characters._R ||
    char === Characters._F
  );
}

class Tokenize {
  constructor(input) {
    this.state = State.Start;
    this.buffer = input;
    this.bufferSize = input.length;
    this.sectionStart = 0;
    this.index = 0;
    this.tokens = [];
    this.offset = 0;
  }
  getCurrentChar() {
    return this.buffer.charCodeAt(this.index);
  }
  scan() {
    while (this.index < this.bufferSize) {
      this.char = this.getCurrentChar();
      console.log(this.state)
      console.log(this.buffer[this.index])
      switch (this.state) {
        case State.Start:
          this.parseStart();
          break;
        case State.BeforeTagName:
          this.parseBeforeTagName();
          break;
        case State.OpeningTag:
          this.parseOpeningTag();
          break;
      }
      this.index++;
    }

    return this.tokens;
  }
  parseStart() {
    if (this.char === Characters.LessThan) {
      this.emitToken(TokenKind.Literal, State.BeforeTagName);
    }
  }
  parseBeforeTagName() {
    if (isLetter(this.char)) {
      // <d
      this.state = State.OpeningTag;
      this.sectionStart = this.index;
    }
  }
  parseOpeningTag() {
    if (isWhiteSpace(this.char)) {
      // <div ...
      this.emitToken(TokenKind.OpenTag, State.AfterTagName);
    }
  }
  emitToken(kind, newState = this.state, end = this.index) {
    const sectionStart = this.sectionStart;
    let value = this.buffer.substring(sectionStart, end);

    if (kind === TokenKind.OpenTag || kind === TokenKind.CloseTag) {
      value = value.toLowerCase();
    }

    if (!((kind === TokenKind.Literal || kind === TokenKind.Whitespace) && end === sectionStart)) {
      this.tokens.push({
        type: kind,
        start: sectionStart,
        end,
        value
      });
    }

    if (kind === TokenKind.OpenTagEnd || kind === TokenKind.CloseTag) {
      this.sectionStart = end + 1;
      this.state = State.Start;
    } else {
      this.sectionStart = end;
      this.state = newState;
    }

  }
}

export { Tokenize }