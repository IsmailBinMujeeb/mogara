import server from "../src/server.js"

const parse = (markdown, onPort, isDebugMod) => {

    // All heading from h1 to h6
    let parsedCode = markdown
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
        .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
        .replace(/^###### (.*$)/gm, '<h6>$1</h6>')

    server(parsedCode, onPort, isDebugMod);
}

export default parse;