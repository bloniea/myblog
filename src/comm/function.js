import { marked } from 'marked'
import config from '@/config.js'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
// 格式化日期
export const formatDate = (d) => {
  let date = new Date(d * 1000).toDateString()
  let dateArr = date.split(' ')
  return dateArr[1] + '. ' + dateArr[2] + '. ' + dateArr[3]
}
// mdrkdown 格式转 html格式
// 用highlight.js 使代码块高亮显示
export const mdToHtml = (md, type) => {
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
      hljs.configure({
        cssSelector: 'code'
      })
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    breaks: true,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  });
  if (type && type == 'title') {
    let reg = /<\/?.+?>/g;
    let html = marked.parse(md).replace(reg, '')
    return html
  }
  let html = marked.parse(md)
  return html
}

// 图片链接无效显示为默认图
export const imgExists = (item) => {
  item.img_url = config.defaultArticleImgUrl
}
