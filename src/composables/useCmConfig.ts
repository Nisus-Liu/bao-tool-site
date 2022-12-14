import {onMounted, ref} from "vue";
import CodeMirror, {EditorConfiguration} from "codemirror";
// import type { EditorConfiguration } from "codemirror";
// language
import "codemirror/mode/javascript/javascript.js";
// C like, 如 java, mode:'text/x-java'
import "codemirror/mode/clike/clike.js"
// theme
import "codemirror/theme/eclipse.css";
import "codemirror/theme/idea.css"
import "codemirror/theme/xq-light.css"
import "codemirror/addon/hint/show-hint.css"
import "codemirror/addon/hint/show-hint.js"
import "codemirror/addon/hint/anyword-hint.js"
import "codemirror/addon/edit/matchbrackets.js"
import "codemirror/addon/edit/closebrackets.js"

const AT_KEYWORDS = [
  "required",
  // java doc
  "className",
  "author",
  "since",
  // json schema
  "minLength", "maxLength",
  "minimum", "maximum",
  "mock",
  "string", "integer", "natural", "float", "character", "boolean", "url", "domain", "ip", "id", "guid", "now", "timestamp",
  "date", "time", "datetime", "image", "imageData", "color", "hex", "rgba", "rgb", "hsl",
  "email", "paragraph", "sentence", "word", "cparagraph", "ctitle", "title", "name", "cname",
  "cfirst", "clast", "first", "last", "csentence", "cword", "region", "province", "city",
  "county", "upper", "lower", "pick", "shuffle", "protocol"
]

const DEFAULT_CM_OPTIONS = {
  tabSize: 4,
  mode: 'text/javascript',  // 模式
  // mode: "application/json",
  theme: "eclipse", // Theme, import 对应的 css 才能生效
  lineNumbers: true,  // 是否显示行数
  line: true,
  // viewportMargin: Infinity,  // 处理高度自适应时搭配使用
  highlightDifferences: true,
  autofocus: false,
  indentUnit: 2,
  smartIndent: true, // 自动缩进
  // readOnly: true,  // 只读
  showCursorWhenSelecting: true,
  firstLineNumber: 1,
  foldGutter: true, // Code folding
  styleActiveLine: true, // Display the style of the selected row
  matchBrackets: true, // 括号匹配高亮
  autoCloseBrackets: true, // 括号自动补全
  // 更多配置查询 https://codemirror.net/doc/manual.html#config
  // ^^代码提示配置
  // showHint: true, // 貌似不需要
  hintOptions: {
    completeSingle: false,
    alignWithWord: false,
    hint: getAtHints,
  }
  // $$代码提示配置
};

// '@...' 提示
function getAtHints(cm, option) {
  return new Promise((accept) => {
    setTimeout(() => {
      let list: Array<any> = [];
      // let atKwRe = /@\w*/;
      let cursor = cm.getCursor(), curLine = cm.getLine(cursor.line)
      let start = cursor.ch, end = cursor.ch
      const lastAtIx = curLine.lastIndexOf('@');
      if (lastAtIx >= 0) {
        const pre = curLine.substring(lastAtIx + 1);
        if (pre) {
          list = AT_KEYWORDS
              .filter(it => it.startsWith(pre))
              .map(it => it.substr(pre.length));
        } else {
          list = AT_KEYWORDS;
        }
      }

      return accept({list: list,
        from: CodeMirror.Pos(cursor.line, start),
        to: CodeMirror.Pos(cursor.line, end)})
    }, 100)

  })
}

export default function useCmConfig(customOptions: EditorConfiguration = {}) {

  const cmRef = ref();

  const cmOptions = Object.assign({}, DEFAULT_CM_OPTIONS, customOptions);

  onMounted(() => {
    if (cmRef.value == null) {
      // 外面没有使用这个 cmRef
      return;
    }
    // cminstance 拿到原始 cm 对象
    let editor = cmRef.value.cminstance;
    // 代码自动提示功能，记住使用cursorActivity事件不要使用change事件，这是一个坑，那样页面直接会卡死
    editor.on('inputRead', function () {
      editor.showHint()
    })
  })


  return {
    cmOptions,
    cmRef,
  }
}