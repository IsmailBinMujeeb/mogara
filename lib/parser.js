/*eslint no-undef: "off"*/
const logger = require("../src/config/logger-config.js");
const { CodeBase } = require("./CodeBase.js");
const formatHTMLStructure = require("./htmlFormatter.js");
const fs = require("fs");
const path = require("path");

const parse = (markdown) => {

    // All heading from h1 to h6
    let parsedCode = markdown
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
        .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
        .replace(/^###### (.*$)/gm, '<h6>$1</h6>');

    // Styling tags
    parsedCode = parsedCode
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/\*(.*?)\*/g, '<i>$1</i>')
        .replace(/__(.*?)__/g, '<sub>$1</sub>')
        .replace(/_(.*?)_/g, '<u>$1</u>')
        .replace(/^> (.*$)/gm, '<q>$1</q>')
        .replace(/~(.*?)~/g, '<strike>$1</strike>')
        .replace(/\^(.*?)\^/g, '<sup>$1</sup>')

    // Code and Pre tags
    parsedCode = parsedCode
        .replace(/```(.*?)```/gm, '<pre>$1</pre>')
        .replace(/`(.*?)`/gm, '<code>$1</code>')

    // links and images tags
    parsedCode = parsedCode
        .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

    // Ordered and unordered lists
    parsedCode = parsedCode
        .replace(/(?:^|\n)(\d+\.\s[^\n]+)/g, match => `<ol>\n<li>${match.replace(/\d+\.\s/, '')}</li>\n</ol>`)
        .replace(/(?:^|\n)([-*+]\s[^\n]+)/g, match => `<ul>\n<li>${match.replace(/[-*+]\s/, '')}</li>\n</ul>`)
        .replace(/<\/ul><ul>/g, '')
        .replace(/<\/ol><ol>/g, '');

    // css and js file handling
    parsedCode = parsedCode
        .replace(/<css: ([\s\S]*?) >/g, (file) => {
            file = file.replace('<css: ', '').replace(' >', '')
            const filePath = path.resolve(file);

            if (!fs.existsSync(filePath)) {
                logger.error(`File "${filePath}" not found!`);
                return file;
            }

            const cssCode = fs.readFileSync(filePath, 'utf-8');
            return `<style>${cssCode}\n</style>`
        })
        .replace(/<js: ([\s\S]*?) >/g, (file) => {
            file = file.replace('<js: ', '').replace(' >', '')
            const filePath = path.resolve(file);

            if (!fs.existsSync(filePath)) {
                logger.error(`File "${filePath}" not found!`);
                return file
            }

            const jsCode = fs.readFileSync(filePath, 'utf-8');
            return `<js ${jsCode} >`
        })

    // CSS and JS parsing
    parsedCode = parsedCode
        .replace(/<css([\s\S]*?)>/g, '<style>$1</style>')
        .replace(/<js([\s\S]*?)>/g, (code) => {
            code = code.replace('<js', '').replace('>', '');

            if(code.includes('console.log')) {
                logger.error('Mogara does not support console');
                return '';
            };

            // Removing the last line from CodeBase
            let codeBaseArray = CodeBase.code.split('\n');
            codeBaseArray.pop();
            CodeBase.code = codeBaseArray.join('\n');

            CodeBase.code += `\n${code}`;

            try {

                let res = (() => { return eval(CodeBase.code); })();

                if (res == undefined) {
                    CodeBase.code += '\n ';
                    return ''
                };
                return res;
            } catch (e) {
                let lineMatch = e.stack.match(/<anonymous>:(\d+):(\d+)/) || e.stack.match(/:(\d+):(\d+)/);

                if (lineMatch) {
                    logger.error(`${e.message}: ${e.name}`);
                }
                return `${code}`;
            }
        });
    
    // Css style modules support
    parsedCode = parsedCode
        .replace(/^@css (.*$)/gm, (style) => {
            let styleName = style.replace('@css ', '');

            const filePath = path.join( __dirname, `../public/${styleName}.css`); // It is same as path.join(__dirname, file_path_to_css)
            
            if (!fs.existsSync(filePath)) {
                logger.error(`Module "${styleName}" not found!`);
                return styleName;
            }

            const cssCode = fs.readFileSync(filePath, 'utf-8');
            return `<style>${cssCode}\n</style>`
        })

    const htmlCode = formatHTMLStructure(parsedCode);

    return htmlCode;
}

module.exports = parse;