var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function createCommonjsModule(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire(path, base === void 0 || base === null ? module.path : base);
    }
  }, fn(module, module.exports), module.exports;
}
function commonjsRequire() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var marked = createCommonjsModule(function(module, exports) {
  (function(global2, factory) {
    module.exports = factory();
  })(commonjsGlobal, function() {
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    function _createForOfIteratorHelperLoose(o, allowArrayLike) {
      var it;
      if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          return function() {
            if (i >= o.length)
              return {
                done: true
              };
            return {
              done: false,
              value: o[i++]
            };
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      it = o[Symbol.iterator]();
      return it.next.bind(it);
    }
    function createCommonjsModule2(fn, module2) {
      return module2 = {exports: {}}, fn(module2, module2.exports), module2.exports;
    }
    var defaults2 = createCommonjsModule2(function(module2) {
      function getDefaults2() {
        return {
          baseUrl: null,
          breaks: false,
          gfm: true,
          headerIds: true,
          headerPrefix: "",
          highlight: null,
          langPrefix: "language-",
          mangle: true,
          pedantic: false,
          renderer: null,
          sanitize: false,
          sanitizer: null,
          silent: false,
          smartLists: false,
          smartypants: false,
          tokenizer: null,
          walkTokens: null,
          xhtml: false
        };
      }
      function changeDefaults2(newDefaults) {
        module2.exports.defaults = newDefaults;
      }
      module2.exports = {
        defaults: getDefaults2(),
        getDefaults: getDefaults2,
        changeDefaults: changeDefaults2
      };
    });
    var defaults_1 = defaults2.defaults;
    var defaults_2 = defaults2.getDefaults;
    var defaults_3 = defaults2.changeDefaults;
    var escapeTest = /[&<>"']/;
    var escapeReplace = /[&<>"']/g;
    var escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
    var escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
    var escapeReplacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    var getEscapeReplacement = function getEscapeReplacement2(ch) {
      return escapeReplacements[ch];
    };
    function escape(html, encode) {
      if (encode) {
        if (escapeTest.test(html)) {
          return html.replace(escapeReplace, getEscapeReplacement);
        }
      } else {
        if (escapeTestNoEncode.test(html)) {
          return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
        }
      }
      return html;
    }
    var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
    function unescape(html) {
      return html.replace(unescapeTest, function(_, n) {
        n = n.toLowerCase();
        if (n === "colon")
          return ":";
        if (n.charAt(0) === "#") {
          return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
        }
        return "";
      });
    }
    var caret = /(^|[^\[])\^/g;
    function edit(regex, opt) {
      regex = regex.source || regex;
      opt = opt || "";
      var obj = {
        replace: function replace(name, val) {
          val = val.source || val;
          val = val.replace(caret, "$1");
          regex = regex.replace(name, val);
          return obj;
        },
        getRegex: function getRegex() {
          return new RegExp(regex, opt);
        }
      };
      return obj;
    }
    var nonWordAndColonTest = /[^\w:]/g;
    var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
    function cleanUrl(sanitize, base, href) {
      if (sanitize) {
        var prot;
        try {
          prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, "").toLowerCase();
        } catch (e) {
          return null;
        }
        if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
          return null;
        }
      }
      if (base && !originIndependentUrl.test(href)) {
        href = resolveUrl(base, href);
      }
      try {
        href = encodeURI(href).replace(/%25/g, "%");
      } catch (e) {
        return null;
      }
      return href;
    }
    var baseUrls = {};
    var justDomain = /^[^:]+:\/*[^/]*$/;
    var protocol = /^([^:]+:)[\s\S]*$/;
    var domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;
    function resolveUrl(base, href) {
      if (!baseUrls[" " + base]) {
        if (justDomain.test(base)) {
          baseUrls[" " + base] = base + "/";
        } else {
          baseUrls[" " + base] = rtrim(base, "/", true);
        }
      }
      base = baseUrls[" " + base];
      var relativeBase = base.indexOf(":") === -1;
      if (href.substring(0, 2) === "//") {
        if (relativeBase) {
          return href;
        }
        return base.replace(protocol, "$1") + href;
      } else if (href.charAt(0) === "/") {
        if (relativeBase) {
          return href;
        }
        return base.replace(domain, "$1") + href;
      } else {
        return base + href;
      }
    }
    var noopTest = {
      exec: function noopTest2() {
      }
    };
    function merge(obj) {
      var i = 1, target, key;
      for (; i < arguments.length; i++) {
        target = arguments[i];
        for (key in target) {
          if (Object.prototype.hasOwnProperty.call(target, key)) {
            obj[key] = target[key];
          }
        }
      }
      return obj;
    }
    function splitCells(tableRow, count) {
      var row = tableRow.replace(/\|/g, function(match, offset, str) {
        var escaped = false, curr = offset;
        while (--curr >= 0 && str[curr] === "\\") {
          escaped = !escaped;
        }
        if (escaped) {
          return "|";
        } else {
          return " |";
        }
      }), cells = row.split(/ \|/);
      var i = 0;
      if (cells.length > count) {
        cells.splice(count);
      } else {
        while (cells.length < count) {
          cells.push("");
        }
      }
      for (; i < cells.length; i++) {
        cells[i] = cells[i].trim().replace(/\\\|/g, "|");
      }
      return cells;
    }
    function rtrim(str, c, invert) {
      var l = str.length;
      if (l === 0) {
        return "";
      }
      var suffLen = 0;
      while (suffLen < l) {
        var currChar = str.charAt(l - suffLen - 1);
        if (currChar === c && !invert) {
          suffLen++;
        } else if (currChar !== c && invert) {
          suffLen++;
        } else {
          break;
        }
      }
      return str.substr(0, l - suffLen);
    }
    function findClosingBracket(str, b) {
      if (str.indexOf(b[1]) === -1) {
        return -1;
      }
      var l = str.length;
      var level = 0, i = 0;
      for (; i < l; i++) {
        if (str[i] === "\\") {
          i++;
        } else if (str[i] === b[0]) {
          level++;
        } else if (str[i] === b[1]) {
          level--;
          if (level < 0) {
            return i;
          }
        }
      }
      return -1;
    }
    function checkSanitizeDeprecation(opt) {
      if (opt && opt.sanitize && !opt.silent) {
        console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
      }
    }
    function repeatString(pattern, count) {
      if (count < 1) {
        return "";
      }
      var result = "";
      while (count > 1) {
        if (count & 1) {
          result += pattern;
        }
        count >>= 1;
        pattern += pattern;
      }
      return result + pattern;
    }
    var helpers = {
      escape,
      unescape,
      edit,
      cleanUrl,
      resolveUrl,
      noopTest,
      merge,
      splitCells,
      rtrim,
      findClosingBracket,
      checkSanitizeDeprecation,
      repeatString
    };
    var defaults$1 = defaults2.defaults;
    var rtrim$1 = helpers.rtrim, splitCells$1 = helpers.splitCells, _escape = helpers.escape, findClosingBracket$1 = helpers.findClosingBracket;
    function outputLink(cap, link, raw) {
      var href = link.href;
      var title = link.title ? _escape(link.title) : null;
      var text = cap[1].replace(/\\([\[\]])/g, "$1");
      if (cap[0].charAt(0) !== "!") {
        return {
          type: "link",
          raw,
          href,
          title,
          text
        };
      } else {
        return {
          type: "image",
          raw,
          href,
          title,
          text: _escape(text)
        };
      }
    }
    function indentCodeCompensation(raw, text) {
      var matchIndentToCode = raw.match(/^(\s+)(?:```)/);
      if (matchIndentToCode === null) {
        return text;
      }
      var indentToCode = matchIndentToCode[1];
      return text.split("\n").map(function(node) {
        var matchIndentInNode = node.match(/^\s+/);
        if (matchIndentInNode === null) {
          return node;
        }
        var indentInNode = matchIndentInNode[0];
        if (indentInNode.length >= indentToCode.length) {
          return node.slice(indentToCode.length);
        }
        return node;
      }).join("\n");
    }
    var Tokenizer_1 = /* @__PURE__ */ function() {
      function Tokenizer(options) {
        this.options = options || defaults$1;
      }
      var _proto = Tokenizer.prototype;
      _proto.space = function space(src) {
        var cap = this.rules.block.newline.exec(src);
        if (cap) {
          if (cap[0].length > 1) {
            return {
              type: "space",
              raw: cap[0]
            };
          }
          return {
            raw: "\n"
          };
        }
      };
      _proto.code = function code(src, tokens) {
        var cap = this.rules.block.code.exec(src);
        if (cap) {
          var lastToken = tokens[tokens.length - 1];
          if (lastToken && lastToken.type === "paragraph") {
            return {
              raw: cap[0],
              text: cap[0].trimRight()
            };
          }
          var text = cap[0].replace(/^ {4}/gm, "");
          return {
            type: "code",
            raw: cap[0],
            codeBlockStyle: "indented",
            text: !this.options.pedantic ? rtrim$1(text, "\n") : text
          };
        }
      };
      _proto.fences = function fences(src) {
        var cap = this.rules.block.fences.exec(src);
        if (cap) {
          var raw = cap[0];
          var text = indentCodeCompensation(raw, cap[3] || "");
          return {
            type: "code",
            raw,
            lang: cap[2] ? cap[2].trim() : cap[2],
            text
          };
        }
      };
      _proto.heading = function heading(src) {
        var cap = this.rules.block.heading.exec(src);
        if (cap) {
          var text = cap[2].trim();
          if (text.endsWith("#")) {
            var trimmed = rtrim$1(text, "#");
            if (this.options.pedantic) {
              text = trimmed.trim();
            } else if (!trimmed || trimmed.endsWith(" ")) {
              text = trimmed.trim();
            }
          }
          return {
            type: "heading",
            raw: cap[0],
            depth: cap[1].length,
            text
          };
        }
      };
      _proto.nptable = function nptable(src) {
        var cap = this.rules.block.nptable.exec(src);
        if (cap) {
          var item = {
            type: "table",
            header: splitCells$1(cap[1].replace(/^ *| *\| *$/g, "")),
            align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
            cells: cap[3] ? cap[3].replace(/\n$/, "").split("\n") : [],
            raw: cap[0]
          };
          if (item.header.length === item.align.length) {
            var l = item.align.length;
            var i;
            for (i = 0; i < l; i++) {
              if (/^ *-+: *$/.test(item.align[i])) {
                item.align[i] = "right";
              } else if (/^ *:-+: *$/.test(item.align[i])) {
                item.align[i] = "center";
              } else if (/^ *:-+ *$/.test(item.align[i])) {
                item.align[i] = "left";
              } else {
                item.align[i] = null;
              }
            }
            l = item.cells.length;
            for (i = 0; i < l; i++) {
              item.cells[i] = splitCells$1(item.cells[i], item.header.length);
            }
            return item;
          }
        }
      };
      _proto.hr = function hr(src) {
        var cap = this.rules.block.hr.exec(src);
        if (cap) {
          return {
            type: "hr",
            raw: cap[0]
          };
        }
      };
      _proto.blockquote = function blockquote(src) {
        var cap = this.rules.block.blockquote.exec(src);
        if (cap) {
          var text = cap[0].replace(/^ *> ?/gm, "");
          return {
            type: "blockquote",
            raw: cap[0],
            text
          };
        }
      };
      _proto.list = function list(src) {
        var cap = this.rules.block.list.exec(src);
        if (cap) {
          var raw = cap[0];
          var bull = cap[2];
          var isordered = bull.length > 1;
          var list2 = {
            type: "list",
            raw,
            ordered: isordered,
            start: isordered ? +bull.slice(0, -1) : "",
            loose: false,
            items: []
          };
          var itemMatch = cap[0].match(this.rules.block.item);
          var next = false, item, space, bcurr, bnext, addBack, loose, istask, ischecked;
          var l = itemMatch.length;
          bcurr = this.rules.block.listItemStart.exec(itemMatch[0]);
          for (var i = 0; i < l; i++) {
            item = itemMatch[i];
            raw = item;
            if (i !== l - 1) {
              bnext = this.rules.block.listItemStart.exec(itemMatch[i + 1]);
              if (bnext[1].length > bcurr[0].length || bnext[1].length > 3) {
                itemMatch.splice(i, 2, itemMatch[i] + "\n" + itemMatch[i + 1]);
                i--;
                l--;
                continue;
              } else {
                if (!this.options.pedantic || this.options.smartLists ? bnext[2][bnext[2].length - 1] !== bull[bull.length - 1] : isordered === (bnext[2].length === 1)) {
                  addBack = itemMatch.slice(i + 1).join("\n");
                  list2.raw = list2.raw.substring(0, list2.raw.length - addBack.length);
                  i = l - 1;
                }
              }
              bcurr = bnext;
            }
            space = item.length;
            item = item.replace(/^ *([*+-]|\d+[.)]) ?/, "");
            if (~item.indexOf("\n ")) {
              space -= item.length;
              item = !this.options.pedantic ? item.replace(new RegExp("^ {1," + space + "}", "gm"), "") : item.replace(/^ {1,4}/gm, "");
            }
            loose = next || /\n\n(?!\s*$)/.test(item);
            if (i !== l - 1) {
              next = item.charAt(item.length - 1) === "\n";
              if (!loose)
                loose = next;
            }
            if (loose) {
              list2.loose = true;
            }
            if (this.options.gfm) {
              istask = /^\[[ xX]\] /.test(item);
              ischecked = void 0;
              if (istask) {
                ischecked = item[1] !== " ";
                item = item.replace(/^\[[ xX]\] +/, "");
              }
            }
            list2.items.push({
              type: "list_item",
              raw,
              task: istask,
              checked: ischecked,
              loose,
              text: item
            });
          }
          return list2;
        }
      };
      _proto.html = function html(src) {
        var cap = this.rules.block.html.exec(src);
        if (cap) {
          return {
            type: this.options.sanitize ? "paragraph" : "html",
            raw: cap[0],
            pre: !this.options.sanitizer && (cap[1] === "pre" || cap[1] === "script" || cap[1] === "style"),
            text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : _escape(cap[0]) : cap[0]
          };
        }
      };
      _proto.def = function def(src) {
        var cap = this.rules.block.def.exec(src);
        if (cap) {
          if (cap[3])
            cap[3] = cap[3].substring(1, cap[3].length - 1);
          var tag = cap[1].toLowerCase().replace(/\s+/g, " ");
          return {
            tag,
            raw: cap[0],
            href: cap[2],
            title: cap[3]
          };
        }
      };
      _proto.table = function table(src) {
        var cap = this.rules.block.table.exec(src);
        if (cap) {
          var item = {
            type: "table",
            header: splitCells$1(cap[1].replace(/^ *| *\| *$/g, "")),
            align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
            cells: cap[3] ? cap[3].replace(/\n$/, "").split("\n") : []
          };
          if (item.header.length === item.align.length) {
            item.raw = cap[0];
            var l = item.align.length;
            var i;
            for (i = 0; i < l; i++) {
              if (/^ *-+: *$/.test(item.align[i])) {
                item.align[i] = "right";
              } else if (/^ *:-+: *$/.test(item.align[i])) {
                item.align[i] = "center";
              } else if (/^ *:-+ *$/.test(item.align[i])) {
                item.align[i] = "left";
              } else {
                item.align[i] = null;
              }
            }
            l = item.cells.length;
            for (i = 0; i < l; i++) {
              item.cells[i] = splitCells$1(item.cells[i].replace(/^ *\| *| *\| *$/g, ""), item.header.length);
            }
            return item;
          }
        }
      };
      _proto.lheading = function lheading(src) {
        var cap = this.rules.block.lheading.exec(src);
        if (cap) {
          return {
            type: "heading",
            raw: cap[0],
            depth: cap[2].charAt(0) === "=" ? 1 : 2,
            text: cap[1]
          };
        }
      };
      _proto.paragraph = function paragraph(src) {
        var cap = this.rules.block.paragraph.exec(src);
        if (cap) {
          return {
            type: "paragraph",
            raw: cap[0],
            text: cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1]
          };
        }
      };
      _proto.text = function text(src, tokens) {
        var cap = this.rules.block.text.exec(src);
        if (cap) {
          var lastToken = tokens[tokens.length - 1];
          if (lastToken && lastToken.type === "text") {
            return {
              raw: cap[0],
              text: cap[0]
            };
          }
          return {
            type: "text",
            raw: cap[0],
            text: cap[0]
          };
        }
      };
      _proto.escape = function escape2(src) {
        var cap = this.rules.inline.escape.exec(src);
        if (cap) {
          return {
            type: "escape",
            raw: cap[0],
            text: _escape(cap[1])
          };
        }
      };
      _proto.tag = function tag(src, inLink, inRawBlock) {
        var cap = this.rules.inline.tag.exec(src);
        if (cap) {
          if (!inLink && /^<a /i.test(cap[0])) {
            inLink = true;
          } else if (inLink && /^<\/a>/i.test(cap[0])) {
            inLink = false;
          }
          if (!inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
            inRawBlock = true;
          } else if (inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
            inRawBlock = false;
          }
          return {
            type: this.options.sanitize ? "text" : "html",
            raw: cap[0],
            inLink,
            inRawBlock,
            text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : _escape(cap[0]) : cap[0]
          };
        }
      };
      _proto.link = function link(src) {
        var cap = this.rules.inline.link.exec(src);
        if (cap) {
          var trimmedUrl = cap[2].trim();
          if (!this.options.pedantic && trimmedUrl.startsWith("<")) {
            if (!trimmedUrl.endsWith(">")) {
              return;
            }
            var rtrimSlash = rtrim$1(trimmedUrl.slice(0, -1), "\\");
            if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
              return;
            }
          } else {
            var lastParenIndex = findClosingBracket$1(cap[2], "()");
            if (lastParenIndex > -1) {
              var start = cap[0].indexOf("!") === 0 ? 5 : 4;
              var linkLen = start + cap[1].length + lastParenIndex;
              cap[2] = cap[2].substring(0, lastParenIndex);
              cap[0] = cap[0].substring(0, linkLen).trim();
              cap[3] = "";
            }
          }
          var href = cap[2];
          var title = "";
          if (this.options.pedantic) {
            var link2 = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
            if (link2) {
              href = link2[1];
              title = link2[3];
            }
          } else {
            title = cap[3] ? cap[3].slice(1, -1) : "";
          }
          href = href.trim();
          if (href.startsWith("<")) {
            if (this.options.pedantic && !trimmedUrl.endsWith(">")) {
              href = href.slice(1);
            } else {
              href = href.slice(1, -1);
            }
          }
          return outputLink(cap, {
            href: href ? href.replace(this.rules.inline._escapes, "$1") : href,
            title: title ? title.replace(this.rules.inline._escapes, "$1") : title
          }, cap[0]);
        }
      };
      _proto.reflink = function reflink(src, links) {
        var cap;
        if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
          var link = (cap[2] || cap[1]).replace(/\s+/g, " ");
          link = links[link.toLowerCase()];
          if (!link || !link.href) {
            var text = cap[0].charAt(0);
            return {
              type: "text",
              raw: text,
              text
            };
          }
          return outputLink(cap, link, cap[0]);
        }
      };
      _proto.strong = function strong(src, maskedSrc, prevChar) {
        if (prevChar === void 0) {
          prevChar = "";
        }
        var match = this.rules.inline.strong.start.exec(src);
        if (match && (!match[1] || match[1] && (prevChar === "" || this.rules.inline.punctuation.exec(prevChar)))) {
          maskedSrc = maskedSrc.slice(-1 * src.length);
          var endReg = match[0] === "**" ? this.rules.inline.strong.endAst : this.rules.inline.strong.endUnd;
          endReg.lastIndex = 0;
          var cap;
          while ((match = endReg.exec(maskedSrc)) != null) {
            cap = this.rules.inline.strong.middle.exec(maskedSrc.slice(0, match.index + 3));
            if (cap) {
              return {
                type: "strong",
                raw: src.slice(0, cap[0].length),
                text: src.slice(2, cap[0].length - 2)
              };
            }
          }
        }
      };
      _proto.em = function em(src, maskedSrc, prevChar) {
        if (prevChar === void 0) {
          prevChar = "";
        }
        var match = this.rules.inline.em.start.exec(src);
        if (match && (!match[1] || match[1] && (prevChar === "" || this.rules.inline.punctuation.exec(prevChar)))) {
          maskedSrc = maskedSrc.slice(-1 * src.length);
          var endReg = match[0] === "*" ? this.rules.inline.em.endAst : this.rules.inline.em.endUnd;
          endReg.lastIndex = 0;
          var cap;
          while ((match = endReg.exec(maskedSrc)) != null) {
            cap = this.rules.inline.em.middle.exec(maskedSrc.slice(0, match.index + 2));
            if (cap) {
              return {
                type: "em",
                raw: src.slice(0, cap[0].length),
                text: src.slice(1, cap[0].length - 1)
              };
            }
          }
        }
      };
      _proto.codespan = function codespan(src) {
        var cap = this.rules.inline.code.exec(src);
        if (cap) {
          var text = cap[2].replace(/\n/g, " ");
          var hasNonSpaceChars = /[^ ]/.test(text);
          var hasSpaceCharsOnBothEnds = text.startsWith(" ") && text.endsWith(" ");
          if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
            text = text.substring(1, text.length - 1);
          }
          text = _escape(text, true);
          return {
            type: "codespan",
            raw: cap[0],
            text
          };
        }
      };
      _proto.br = function br(src) {
        var cap = this.rules.inline.br.exec(src);
        if (cap) {
          return {
            type: "br",
            raw: cap[0]
          };
        }
      };
      _proto.del = function del(src) {
        var cap = this.rules.inline.del.exec(src);
        if (cap) {
          return {
            type: "del",
            raw: cap[0],
            text: cap[2]
          };
        }
      };
      _proto.autolink = function autolink(src, mangle2) {
        var cap = this.rules.inline.autolink.exec(src);
        if (cap) {
          var text, href;
          if (cap[2] === "@") {
            text = _escape(this.options.mangle ? mangle2(cap[1]) : cap[1]);
            href = "mailto:" + text;
          } else {
            text = _escape(cap[1]);
            href = text;
          }
          return {
            type: "link",
            raw: cap[0],
            text,
            href,
            tokens: [{
              type: "text",
              raw: text,
              text
            }]
          };
        }
      };
      _proto.url = function url(src, mangle2) {
        var cap;
        if (cap = this.rules.inline.url.exec(src)) {
          var text, href;
          if (cap[2] === "@") {
            text = _escape(this.options.mangle ? mangle2(cap[0]) : cap[0]);
            href = "mailto:" + text;
          } else {
            var prevCapZero;
            do {
              prevCapZero = cap[0];
              cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
            } while (prevCapZero !== cap[0]);
            text = _escape(cap[0]);
            if (cap[1] === "www.") {
              href = "http://" + text;
            } else {
              href = text;
            }
          }
          return {
            type: "link",
            raw: cap[0],
            text,
            href,
            tokens: [{
              type: "text",
              raw: text,
              text
            }]
          };
        }
      };
      _proto.inlineText = function inlineText(src, inRawBlock, smartypants2) {
        var cap = this.rules.inline.text.exec(src);
        if (cap) {
          var text;
          if (inRawBlock) {
            text = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : _escape(cap[0]) : cap[0];
          } else {
            text = _escape(this.options.smartypants ? smartypants2(cap[0]) : cap[0]);
          }
          return {
            type: "text",
            raw: cap[0],
            text
          };
        }
      };
      return Tokenizer;
    }();
    var noopTest$1 = helpers.noopTest, edit$1 = helpers.edit, merge$1 = helpers.merge;
    var block = {
      newline: /^\n+/,
      code: /^( {4}[^\n]+\n*)+/,
      fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
      hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
      heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
      blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
      list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?! {0,3}bull )\n*|\s*$)/,
      html: "^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",
      def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
      nptable: noopTest$1,
      table: noopTest$1,
      lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
      _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
      text: /^[^\n]+/
    };
    block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
    block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
    block.def = edit$1(block.def).replace("label", block._label).replace("title", block._title).getRegex();
    block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
    block.item = /^( *)(bull) ?[^\n]*(?:\n(?! *bull ?)[^\n]*)*/;
    block.item = edit$1(block.item, "gm").replace(/bull/g, block.bullet).getRegex();
    block.listItemStart = edit$1(/^( *)(bull)/).replace("bull", block.bullet).getRegex();
    block.list = edit$1(block.list).replace(/bull/g, block.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + block.def.source + ")").getRegex();
    block._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
    block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
    block.html = edit$1(block.html, "i").replace("comment", block._comment).replace("tag", block._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
    block.paragraph = edit$1(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", block._tag).getRegex();
    block.blockquote = edit$1(block.blockquote).replace("paragraph", block.paragraph).getRegex();
    block.normal = merge$1({}, block);
    block.gfm = merge$1({}, block.normal, {
      nptable: "^ *([^|\\n ].*\\|.*)\\n {0,3}([-:]+ *\\|[-| :]*)(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",
      table: "^ *\\|(.+)\\n {0,3}\\|?( *[-:]+[-| :]*)(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
    });
    block.gfm.nptable = edit$1(block.gfm.nptable).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", block._tag).getRegex();
    block.gfm.table = edit$1(block.gfm.table).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", block._tag).getRegex();
    block.pedantic = merge$1({}, block.normal, {
      html: edit$1(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", block._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
      def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
      heading: /^(#{1,6})(.*)(?:\n+|$)/,
      fences: noopTest$1,
      paragraph: edit$1(block.normal._paragraph).replace("hr", block.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
    });
    var inline = {
      escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
      autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
      url: noopTest$1,
      tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
      link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
      reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
      nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
      reflinkSearch: "reflink|nolink(?!\\()",
      strong: {
        start: /^(?:(\*\*(?=[*punctuation]))|\*\*)(?![\s])|__/,
        middle: /^\*\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*\*$|^__(?![\s])((?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?)__$/,
        endAst: /[^punctuation\s]\*\*(?!\*)|[punctuation]\*\*(?!\*)(?:(?=[punctuation_\s]|$))/,
        endUnd: /[^\s]__(?!_)(?:(?=[punctuation*\s])|$)/
      },
      em: {
        start: /^(?:(\*(?=[punctuation]))|\*)(?![*\s])|_/,
        middle: /^\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*$|^_(?![_\s])(?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?_$/,
        endAst: /[^punctuation\s]\*(?!\*)|[punctuation]\*(?!\*)(?:(?=[punctuation_\s]|$))/,
        endUnd: /[^\s]_(?!_)(?:(?=[punctuation*\s])|$)/
      },
      code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
      br: /^( {2,}|\\)\n(?!\s*$)/,
      del: noopTest$1,
      text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n)))/,
      punctuation: /^([\s*punctuation])/
    };
    inline._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";
    inline.punctuation = edit$1(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex();
    inline._blockSkip = "\\[[^\\]]*?\\]\\([^\\)]*?\\)|`[^`]*?`|<[^>]*?>";
    inline._overlapSkip = "__[^_]*?__|\\*\\*\\[^\\*\\]*?\\*\\*";
    inline._comment = edit$1(block._comment).replace("(?:-->|$)", "-->").getRegex();
    inline.em.start = edit$1(inline.em.start).replace(/punctuation/g, inline._punctuation).getRegex();
    inline.em.middle = edit$1(inline.em.middle).replace(/punctuation/g, inline._punctuation).replace(/overlapSkip/g, inline._overlapSkip).getRegex();
    inline.em.endAst = edit$1(inline.em.endAst, "g").replace(/punctuation/g, inline._punctuation).getRegex();
    inline.em.endUnd = edit$1(inline.em.endUnd, "g").replace(/punctuation/g, inline._punctuation).getRegex();
    inline.strong.start = edit$1(inline.strong.start).replace(/punctuation/g, inline._punctuation).getRegex();
    inline.strong.middle = edit$1(inline.strong.middle).replace(/punctuation/g, inline._punctuation).replace(/overlapSkip/g, inline._overlapSkip).getRegex();
    inline.strong.endAst = edit$1(inline.strong.endAst, "g").replace(/punctuation/g, inline._punctuation).getRegex();
    inline.strong.endUnd = edit$1(inline.strong.endUnd, "g").replace(/punctuation/g, inline._punctuation).getRegex();
    inline.blockSkip = edit$1(inline._blockSkip, "g").getRegex();
    inline.overlapSkip = edit$1(inline._overlapSkip, "g").getRegex();
    inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
    inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
    inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
    inline.autolink = edit$1(inline.autolink).replace("scheme", inline._scheme).replace("email", inline._email).getRegex();
    inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
    inline.tag = edit$1(inline.tag).replace("comment", inline._comment).replace("attribute", inline._attribute).getRegex();
    inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
    inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
    inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
    inline.link = edit$1(inline.link).replace("label", inline._label).replace("href", inline._href).replace("title", inline._title).getRegex();
    inline.reflink = edit$1(inline.reflink).replace("label", inline._label).getRegex();
    inline.reflinkSearch = edit$1(inline.reflinkSearch, "g").replace("reflink", inline.reflink).replace("nolink", inline.nolink).getRegex();
    inline.normal = merge$1({}, inline);
    inline.pedantic = merge$1({}, inline.normal, {
      strong: {
        start: /^__|\*\*/,
        middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        endAst: /\*\*(?!\*)/g,
        endUnd: /__(?!_)/g
      },
      em: {
        start: /^_|\*/,
        middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
        endAst: /\*(?!\*)/g,
        endUnd: /_(?!_)/g
      },
      link: edit$1(/^!?\[(label)\]\((.*?)\)/).replace("label", inline._label).getRegex(),
      reflink: edit$1(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline._label).getRegex()
    });
    inline.gfm = merge$1({}, inline.normal, {
      escape: edit$1(inline.escape).replace("])", "~|])").getRegex(),
      _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
      url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
      _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
      del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
      text: /^([`~]+|[^`~])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
    });
    inline.gfm.url = edit$1(inline.gfm.url, "i").replace("email", inline.gfm._extended_email).getRegex();
    inline.breaks = merge$1({}, inline.gfm, {
      br: edit$1(inline.br).replace("{2,}", "*").getRegex(),
      text: edit$1(inline.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
    });
    var rules = {
      block,
      inline
    };
    var defaults$2 = defaults2.defaults;
    var block$1 = rules.block, inline$1 = rules.inline;
    var repeatString$1 = helpers.repeatString;
    function smartypants(text) {
      return text.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C").replace(/"/g, "\u201D").replace(/\.{3}/g, "\u2026");
    }
    function mangle(text) {
      var out = "", i, ch;
      var l = text.length;
      for (i = 0; i < l; i++) {
        ch = text.charCodeAt(i);
        if (Math.random() > 0.5) {
          ch = "x" + ch.toString(16);
        }
        out += "&#" + ch + ";";
      }
      return out;
    }
    var Lexer_1 = /* @__PURE__ */ function() {
      function Lexer(options) {
        this.tokens = [];
        this.tokens.links = Object.create(null);
        this.options = options || defaults$2;
        this.options.tokenizer = this.options.tokenizer || new Tokenizer_1();
        this.tokenizer = this.options.tokenizer;
        this.tokenizer.options = this.options;
        var rules2 = {
          block: block$1.normal,
          inline: inline$1.normal
        };
        if (this.options.pedantic) {
          rules2.block = block$1.pedantic;
          rules2.inline = inline$1.pedantic;
        } else if (this.options.gfm) {
          rules2.block = block$1.gfm;
          if (this.options.breaks) {
            rules2.inline = inline$1.breaks;
          } else {
            rules2.inline = inline$1.gfm;
          }
        }
        this.tokenizer.rules = rules2;
      }
      Lexer.lex = function lex(src, options) {
        var lexer = new Lexer(options);
        return lexer.lex(src);
      };
      Lexer.lexInline = function lexInline(src, options) {
        var lexer = new Lexer(options);
        return lexer.inlineTokens(src);
      };
      var _proto = Lexer.prototype;
      _proto.lex = function lex(src) {
        src = src.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ");
        this.blockTokens(src, this.tokens, true);
        this.inline(this.tokens);
        return this.tokens;
      };
      _proto.blockTokens = function blockTokens(src, tokens, top) {
        if (tokens === void 0) {
          tokens = [];
        }
        if (top === void 0) {
          top = true;
        }
        src = src.replace(/^ +$/gm, "");
        var token, i, l, lastToken;
        while (src) {
          if (token = this.tokenizer.space(src)) {
            src = src.substring(token.raw.length);
            if (token.type) {
              tokens.push(token);
            }
            continue;
          }
          if (token = this.tokenizer.code(src, tokens)) {
            src = src.substring(token.raw.length);
            if (token.type) {
              tokens.push(token);
            } else {
              lastToken = tokens[tokens.length - 1];
              lastToken.raw += "\n" + token.raw;
              lastToken.text += "\n" + token.text;
            }
            continue;
          }
          if (token = this.tokenizer.fences(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.heading(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.nptable(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.hr(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.blockquote(src)) {
            src = src.substring(token.raw.length);
            token.tokens = this.blockTokens(token.text, [], top);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.list(src)) {
            src = src.substring(token.raw.length);
            l = token.items.length;
            for (i = 0; i < l; i++) {
              token.items[i].tokens = this.blockTokens(token.items[i].text, [], false);
            }
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.html(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (top && (token = this.tokenizer.def(src))) {
            src = src.substring(token.raw.length);
            if (!this.tokens.links[token.tag]) {
              this.tokens.links[token.tag] = {
                href: token.href,
                title: token.title
              };
            }
            continue;
          }
          if (token = this.tokenizer.table(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.lheading(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (top && (token = this.tokenizer.paragraph(src))) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.text(src, tokens)) {
            src = src.substring(token.raw.length);
            if (token.type) {
              tokens.push(token);
            } else {
              lastToken = tokens[tokens.length - 1];
              lastToken.raw += "\n" + token.raw;
              lastToken.text += "\n" + token.text;
            }
            continue;
          }
          if (src) {
            var errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
            if (this.options.silent) {
              console.error(errMsg);
              break;
            } else {
              throw new Error(errMsg);
            }
          }
        }
        return tokens;
      };
      _proto.inline = function inline2(tokens) {
        var i, j, k, l2, row, token;
        var l = tokens.length;
        for (i = 0; i < l; i++) {
          token = tokens[i];
          switch (token.type) {
            case "paragraph":
            case "text":
            case "heading": {
              token.tokens = [];
              this.inlineTokens(token.text, token.tokens);
              break;
            }
            case "table": {
              token.tokens = {
                header: [],
                cells: []
              };
              l2 = token.header.length;
              for (j = 0; j < l2; j++) {
                token.tokens.header[j] = [];
                this.inlineTokens(token.header[j], token.tokens.header[j]);
              }
              l2 = token.cells.length;
              for (j = 0; j < l2; j++) {
                row = token.cells[j];
                token.tokens.cells[j] = [];
                for (k = 0; k < row.length; k++) {
                  token.tokens.cells[j][k] = [];
                  this.inlineTokens(row[k], token.tokens.cells[j][k]);
                }
              }
              break;
            }
            case "blockquote": {
              this.inline(token.tokens);
              break;
            }
            case "list": {
              l2 = token.items.length;
              for (j = 0; j < l2; j++) {
                this.inline(token.items[j].tokens);
              }
              break;
            }
          }
        }
        return tokens;
      };
      _proto.inlineTokens = function inlineTokens(src, tokens, inLink, inRawBlock) {
        if (tokens === void 0) {
          tokens = [];
        }
        if (inLink === void 0) {
          inLink = false;
        }
        if (inRawBlock === void 0) {
          inRawBlock = false;
        }
        var token;
        var maskedSrc = src;
        var match;
        var keepPrevChar, prevChar;
        if (this.tokens.links) {
          var links = Object.keys(this.tokens.links);
          if (links.length > 0) {
            while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
              if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
                maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString$1("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
              }
            }
          }
        }
        while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
          maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString$1("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        }
        while (src) {
          if (!keepPrevChar) {
            prevChar = "";
          }
          keepPrevChar = false;
          if (token = this.tokenizer.escape(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.tag(src, inLink, inRawBlock)) {
            src = src.substring(token.raw.length);
            inLink = token.inLink;
            inRawBlock = token.inRawBlock;
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.link(src)) {
            src = src.substring(token.raw.length);
            if (token.type === "link") {
              token.tokens = this.inlineTokens(token.text, [], true, inRawBlock);
            }
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.reflink(src, this.tokens.links)) {
            src = src.substring(token.raw.length);
            if (token.type === "link") {
              token.tokens = this.inlineTokens(token.text, [], true, inRawBlock);
            }
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.strong(src, maskedSrc, prevChar)) {
            src = src.substring(token.raw.length);
            token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.em(src, maskedSrc, prevChar)) {
            src = src.substring(token.raw.length);
            token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.codespan(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.br(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.del(src)) {
            src = src.substring(token.raw.length);
            token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.autolink(src, mangle)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (!inLink && (token = this.tokenizer.url(src, mangle))) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.inlineText(src, inRawBlock, smartypants)) {
            src = src.substring(token.raw.length);
            prevChar = token.raw.slice(-1);
            keepPrevChar = true;
            tokens.push(token);
            continue;
          }
          if (src) {
            var errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
            if (this.options.silent) {
              console.error(errMsg);
              break;
            } else {
              throw new Error(errMsg);
            }
          }
        }
        return tokens;
      };
      _createClass(Lexer, null, [{
        key: "rules",
        get: function get() {
          return {
            block: block$1,
            inline: inline$1
          };
        }
      }]);
      return Lexer;
    }();
    var defaults$3 = defaults2.defaults;
    var cleanUrl$1 = helpers.cleanUrl, escape$1 = helpers.escape;
    var Renderer_1 = /* @__PURE__ */ function() {
      function Renderer(options) {
        this.options = options || defaults$3;
      }
      var _proto = Renderer.prototype;
      _proto.code = function code(_code, infostring, escaped) {
        var lang = (infostring || "").match(/\S*/)[0];
        if (this.options.highlight) {
          var out = this.options.highlight(_code, lang);
          if (out != null && out !== _code) {
            escaped = true;
            _code = out;
          }
        }
        if (!lang) {
          return "<pre><code>" + (escaped ? _code : escape$1(_code, true)) + "</code></pre>\n";
        }
        return '<pre><code class="' + this.options.langPrefix + escape$1(lang, true) + '">' + (escaped ? _code : escape$1(_code, true)) + "</code></pre>\n";
      };
      _proto.blockquote = function blockquote(quote) {
        return "<blockquote>\n" + quote + "</blockquote>\n";
      };
      _proto.html = function html(_html) {
        return _html;
      };
      _proto.heading = function heading(text, level, raw, slugger) {
        if (this.options.headerIds) {
          return "<h" + level + ' id="' + this.options.headerPrefix + slugger.slug(raw) + '">' + text + "</h" + level + ">\n";
        }
        return "<h" + level + ">" + text + "</h" + level + ">\n";
      };
      _proto.hr = function hr() {
        return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
      };
      _proto.list = function list(body, ordered, start) {
        var type = ordered ? "ol" : "ul", startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
        return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
      };
      _proto.listitem = function listitem(text) {
        return "<li>" + text + "</li>\n";
      };
      _proto.checkbox = function checkbox(checked) {
        return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
      };
      _proto.paragraph = function paragraph(text) {
        return "<p>" + text + "</p>\n";
      };
      _proto.table = function table(header, body) {
        if (body)
          body = "<tbody>" + body + "</tbody>";
        return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
      };
      _proto.tablerow = function tablerow(content) {
        return "<tr>\n" + content + "</tr>\n";
      };
      _proto.tablecell = function tablecell(content, flags) {
        var type = flags.header ? "th" : "td";
        var tag = flags.align ? "<" + type + ' align="' + flags.align + '">' : "<" + type + ">";
        return tag + content + "</" + type + ">\n";
      };
      _proto.strong = function strong(text) {
        return "<strong>" + text + "</strong>";
      };
      _proto.em = function em(text) {
        return "<em>" + text + "</em>";
      };
      _proto.codespan = function codespan(text) {
        return "<code>" + text + "</code>";
      };
      _proto.br = function br() {
        return this.options.xhtml ? "<br/>" : "<br>";
      };
      _proto.del = function del(text) {
        return "<del>" + text + "</del>";
      };
      _proto.link = function link(href, title, text) {
        href = cleanUrl$1(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
          return text;
        }
        var out = '<a href="' + escape$1(href) + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += ">" + text + "</a>";
        return out;
      };
      _proto.image = function image(href, title, text) {
        href = cleanUrl$1(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
          return text;
        }
        var out = '<img src="' + href + '" alt="' + text + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += this.options.xhtml ? "/>" : ">";
        return out;
      };
      _proto.text = function text(_text) {
        return _text;
      };
      return Renderer;
    }();
    var TextRenderer_1 = /* @__PURE__ */ function() {
      function TextRenderer() {
      }
      var _proto = TextRenderer.prototype;
      _proto.strong = function strong(text) {
        return text;
      };
      _proto.em = function em(text) {
        return text;
      };
      _proto.codespan = function codespan(text) {
        return text;
      };
      _proto.del = function del(text) {
        return text;
      };
      _proto.html = function html(text) {
        return text;
      };
      _proto.text = function text(_text) {
        return _text;
      };
      _proto.link = function link(href, title, text) {
        return "" + text;
      };
      _proto.image = function image(href, title, text) {
        return "" + text;
      };
      _proto.br = function br() {
        return "";
      };
      return TextRenderer;
    }();
    var Slugger_1 = /* @__PURE__ */ function() {
      function Slugger() {
        this.seen = {};
      }
      var _proto = Slugger.prototype;
      _proto.serialize = function serialize(value) {
        return value.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
      };
      _proto.getNextSafeSlug = function getNextSafeSlug(originalSlug, isDryRun) {
        var slug = originalSlug;
        var occurenceAccumulator = 0;
        if (this.seen.hasOwnProperty(slug)) {
          occurenceAccumulator = this.seen[originalSlug];
          do {
            occurenceAccumulator++;
            slug = originalSlug + "-" + occurenceAccumulator;
          } while (this.seen.hasOwnProperty(slug));
        }
        if (!isDryRun) {
          this.seen[originalSlug] = occurenceAccumulator;
          this.seen[slug] = 0;
        }
        return slug;
      };
      _proto.slug = function slug(value, options) {
        if (options === void 0) {
          options = {};
        }
        var slug2 = this.serialize(value);
        return this.getNextSafeSlug(slug2, options.dryrun);
      };
      return Slugger;
    }();
    var defaults$4 = defaults2.defaults;
    var unescape$1 = helpers.unescape;
    var Parser_1 = /* @__PURE__ */ function() {
      function Parser(options) {
        this.options = options || defaults$4;
        this.options.renderer = this.options.renderer || new Renderer_1();
        this.renderer = this.options.renderer;
        this.renderer.options = this.options;
        this.textRenderer = new TextRenderer_1();
        this.slugger = new Slugger_1();
      }
      Parser.parse = function parse(tokens, options) {
        var parser = new Parser(options);
        return parser.parse(tokens);
      };
      Parser.parseInline = function parseInline(tokens, options) {
        var parser = new Parser(options);
        return parser.parseInline(tokens);
      };
      var _proto = Parser.prototype;
      _proto.parse = function parse(tokens, top) {
        if (top === void 0) {
          top = true;
        }
        var out = "", i, j, k, l2, l3, row, cell, header, body, token, ordered, start, loose, itemBody, item, checked, task, checkbox;
        var l = tokens.length;
        for (i = 0; i < l; i++) {
          token = tokens[i];
          switch (token.type) {
            case "space": {
              continue;
            }
            case "hr": {
              out += this.renderer.hr();
              continue;
            }
            case "heading": {
              out += this.renderer.heading(this.parseInline(token.tokens), token.depth, unescape$1(this.parseInline(token.tokens, this.textRenderer)), this.slugger);
              continue;
            }
            case "code": {
              out += this.renderer.code(token.text, token.lang, token.escaped);
              continue;
            }
            case "table": {
              header = "";
              cell = "";
              l2 = token.header.length;
              for (j = 0; j < l2; j++) {
                cell += this.renderer.tablecell(this.parseInline(token.tokens.header[j]), {
                  header: true,
                  align: token.align[j]
                });
              }
              header += this.renderer.tablerow(cell);
              body = "";
              l2 = token.cells.length;
              for (j = 0; j < l2; j++) {
                row = token.tokens.cells[j];
                cell = "";
                l3 = row.length;
                for (k = 0; k < l3; k++) {
                  cell += this.renderer.tablecell(this.parseInline(row[k]), {
                    header: false,
                    align: token.align[k]
                  });
                }
                body += this.renderer.tablerow(cell);
              }
              out += this.renderer.table(header, body);
              continue;
            }
            case "blockquote": {
              body = this.parse(token.tokens);
              out += this.renderer.blockquote(body);
              continue;
            }
            case "list": {
              ordered = token.ordered;
              start = token.start;
              loose = token.loose;
              l2 = token.items.length;
              body = "";
              for (j = 0; j < l2; j++) {
                item = token.items[j];
                checked = item.checked;
                task = item.task;
                itemBody = "";
                if (item.task) {
                  checkbox = this.renderer.checkbox(checked);
                  if (loose) {
                    if (item.tokens.length > 0 && item.tokens[0].type === "text") {
                      item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                      if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                        item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                      }
                    } else {
                      item.tokens.unshift({
                        type: "text",
                        text: checkbox
                      });
                    }
                  } else {
                    itemBody += checkbox;
                  }
                }
                itemBody += this.parse(item.tokens, loose);
                body += this.renderer.listitem(itemBody, task, checked);
              }
              out += this.renderer.list(body, ordered, start);
              continue;
            }
            case "html": {
              out += this.renderer.html(token.text);
              continue;
            }
            case "paragraph": {
              out += this.renderer.paragraph(this.parseInline(token.tokens));
              continue;
            }
            case "text": {
              body = token.tokens ? this.parseInline(token.tokens) : token.text;
              while (i + 1 < l && tokens[i + 1].type === "text") {
                token = tokens[++i];
                body += "\n" + (token.tokens ? this.parseInline(token.tokens) : token.text);
              }
              out += top ? this.renderer.paragraph(body) : body;
              continue;
            }
            default: {
              var errMsg = 'Token with "' + token.type + '" type was not found.';
              if (this.options.silent) {
                console.error(errMsg);
                return;
              } else {
                throw new Error(errMsg);
              }
            }
          }
        }
        return out;
      };
      _proto.parseInline = function parseInline(tokens, renderer) {
        renderer = renderer || this.renderer;
        var out = "", i, token;
        var l = tokens.length;
        for (i = 0; i < l; i++) {
          token = tokens[i];
          switch (token.type) {
            case "escape": {
              out += renderer.text(token.text);
              break;
            }
            case "html": {
              out += renderer.html(token.text);
              break;
            }
            case "link": {
              out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
              break;
            }
            case "image": {
              out += renderer.image(token.href, token.title, token.text);
              break;
            }
            case "strong": {
              out += renderer.strong(this.parseInline(token.tokens, renderer));
              break;
            }
            case "em": {
              out += renderer.em(this.parseInline(token.tokens, renderer));
              break;
            }
            case "codespan": {
              out += renderer.codespan(token.text);
              break;
            }
            case "br": {
              out += renderer.br();
              break;
            }
            case "del": {
              out += renderer.del(this.parseInline(token.tokens, renderer));
              break;
            }
            case "text": {
              out += renderer.text(token.text);
              break;
            }
            default: {
              var errMsg = 'Token with "' + token.type + '" type was not found.';
              if (this.options.silent) {
                console.error(errMsg);
                return;
              } else {
                throw new Error(errMsg);
              }
            }
          }
        }
        return out;
      };
      return Parser;
    }();
    var merge$2 = helpers.merge, checkSanitizeDeprecation$1 = helpers.checkSanitizeDeprecation, escape$2 = helpers.escape;
    var getDefaults = defaults2.getDefaults, changeDefaults = defaults2.changeDefaults, defaults$5 = defaults2.defaults;
    function marked2(src, opt, callback) {
      if (typeof src === "undefined" || src === null) {
        throw new Error("marked(): input parameter is undefined or null");
      }
      if (typeof src !== "string") {
        throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected");
      }
      if (typeof opt === "function") {
        callback = opt;
        opt = null;
      }
      opt = merge$2({}, marked2.defaults, opt || {});
      checkSanitizeDeprecation$1(opt);
      if (callback) {
        var highlight = opt.highlight;
        var tokens;
        try {
          tokens = Lexer_1.lex(src, opt);
        } catch (e) {
          return callback(e);
        }
        var done = function done2(err) {
          var out;
          if (!err) {
            try {
              out = Parser_1.parse(tokens, opt);
            } catch (e) {
              err = e;
            }
          }
          opt.highlight = highlight;
          return err ? callback(err) : callback(null, out);
        };
        if (!highlight || highlight.length < 3) {
          return done();
        }
        delete opt.highlight;
        if (!tokens.length)
          return done();
        var pending = 0;
        marked2.walkTokens(tokens, function(token) {
          if (token.type === "code") {
            pending++;
            setTimeout(function() {
              highlight(token.text, token.lang, function(err, code) {
                if (err) {
                  return done(err);
                }
                if (code != null && code !== token.text) {
                  token.text = code;
                  token.escaped = true;
                }
                pending--;
                if (pending === 0) {
                  done();
                }
              });
            }, 0);
          }
        });
        if (pending === 0) {
          done();
        }
        return;
      }
      try {
        var _tokens = Lexer_1.lex(src, opt);
        if (opt.walkTokens) {
          marked2.walkTokens(_tokens, opt.walkTokens);
        }
        return Parser_1.parse(_tokens, opt);
      } catch (e) {
        e.message += "\nPlease report this to https://github.com/markedjs/marked.";
        if (opt.silent) {
          return "<p>An error occurred:</p><pre>" + escape$2(e.message + "", true) + "</pre>";
        }
        throw e;
      }
    }
    marked2.options = marked2.setOptions = function(opt) {
      merge$2(marked2.defaults, opt);
      changeDefaults(marked2.defaults);
      return marked2;
    };
    marked2.getDefaults = getDefaults;
    marked2.defaults = defaults$5;
    marked2.use = function(extension) {
      var opts = merge$2({}, extension);
      if (extension.renderer) {
        (function() {
          var renderer = marked2.defaults.renderer || new Renderer_1();
          var _loop = function _loop2(prop2) {
            var prevRenderer = renderer[prop2];
            renderer[prop2] = function() {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              var ret = extension.renderer[prop2].apply(renderer, args);
              if (ret === false) {
                ret = prevRenderer.apply(renderer, args);
              }
              return ret;
            };
          };
          for (var prop in extension.renderer) {
            _loop(prop);
          }
          opts.renderer = renderer;
        })();
      }
      if (extension.tokenizer) {
        (function() {
          var tokenizer = marked2.defaults.tokenizer || new Tokenizer_1();
          var _loop2 = function _loop22(prop2) {
            var prevTokenizer = tokenizer[prop2];
            tokenizer[prop2] = function() {
              for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
              }
              var ret = extension.tokenizer[prop2].apply(tokenizer, args);
              if (ret === false) {
                ret = prevTokenizer.apply(tokenizer, args);
              }
              return ret;
            };
          };
          for (var prop in extension.tokenizer) {
            _loop2(prop);
          }
          opts.tokenizer = tokenizer;
        })();
      }
      if (extension.walkTokens) {
        var walkTokens = marked2.defaults.walkTokens;
        opts.walkTokens = function(token) {
          extension.walkTokens(token);
          if (walkTokens) {
            walkTokens(token);
          }
        };
      }
      marked2.setOptions(opts);
    };
    marked2.walkTokens = function(tokens, callback) {
      for (var _iterator = _createForOfIteratorHelperLoose(tokens), _step; !(_step = _iterator()).done; ) {
        var token = _step.value;
        callback(token);
        switch (token.type) {
          case "table": {
            for (var _iterator2 = _createForOfIteratorHelperLoose(token.tokens.header), _step2; !(_step2 = _iterator2()).done; ) {
              var cell = _step2.value;
              marked2.walkTokens(cell, callback);
            }
            for (var _iterator3 = _createForOfIteratorHelperLoose(token.tokens.cells), _step3; !(_step3 = _iterator3()).done; ) {
              var row = _step3.value;
              for (var _iterator4 = _createForOfIteratorHelperLoose(row), _step4; !(_step4 = _iterator4()).done; ) {
                var _cell = _step4.value;
                marked2.walkTokens(_cell, callback);
              }
            }
            break;
          }
          case "list": {
            marked2.walkTokens(token.items, callback);
            break;
          }
          default: {
            if (token.tokens) {
              marked2.walkTokens(token.tokens, callback);
            }
          }
        }
      }
    };
    marked2.parseInline = function(src, opt) {
      if (typeof src === "undefined" || src === null) {
        throw new Error("marked.parseInline(): input parameter is undefined or null");
      }
      if (typeof src !== "string") {
        throw new Error("marked.parseInline(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected");
      }
      opt = merge$2({}, marked2.defaults, opt || {});
      checkSanitizeDeprecation$1(opt);
      try {
        var tokens = Lexer_1.lexInline(src, opt);
        if (opt.walkTokens) {
          marked2.walkTokens(tokens, opt.walkTokens);
        }
        return Parser_1.parseInline(tokens, opt);
      } catch (e) {
        e.message += "\nPlease report this to https://github.com/markedjs/marked.";
        if (opt.silent) {
          return "<p>An error occurred:</p><pre>" + escape$2(e.message + "", true) + "</pre>";
        }
        throw e;
      }
    };
    marked2.Parser = Parser_1;
    marked2.parser = Parser_1.parse;
    marked2.Renderer = Renderer_1;
    marked2.TextRenderer = TextRenderer_1;
    marked2.Lexer = Lexer_1;
    marked2.lexer = Lexer_1.lex;
    marked2.Tokenizer = Tokenizer_1;
    marked2.Slugger = Slugger_1;
    marked2.parse = marked2;
    var marked_1 = marked2;
    return marked_1;
  });
});
export default marked;
var defaults = marked.defaults;
export {marked as __moduleExports, defaults};
