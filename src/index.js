const fs = require('fs');
const docx = require('docx')
const parse = require('./parserDoc')

const { Document, Paragraph, TextRun, ImageRun, Packer } = docx

// 需要生成 doc 图片根目录
const rootDir = 'imgs'
const imgsPath = []

parse.parserDir(rootDir, imgsPath)


console.log('logger: ', imgsPath)


const paragraphs = [];
imgsPath.map(item => {
  const [title, intro] = item.name.split('-')

  // TODO 样式修改配置
  paragraphs.push(new Paragraph({ children: [new TextRun({ text: title })] }))
  paragraphs.push(new Paragraph({ children: [new TextRun(intro.split('.')[0])] }))
  paragraphs.push(new Paragraph({
    children: [new ImageRun({
      data: fs.readFileSync(item.path),
      transformation: {
        width: 600,
        height: 300 // 高度可以根据截图宽高比例调整
      }
    })]
  }))
})

const doc = new Document({
  sections: [{
    children: paragraphs
  }]
})


Packer.toBuffer(doc).then(buff => {
  fs.writeFileSync(rootDir + '.doc', buff)
})


