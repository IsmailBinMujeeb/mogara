import server from "../src/server.js"

const parse = (markdown, onPort, isDebugMod) => {

    // All heading from h1 to h6
    let parsedCode = markdown
        .replace(/^# (.*$)/gm, '<h1>$1</h1><hr>')
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
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/```(.*?)```/g, '<pre>$1</pre>')

    server(parsedCode, onPort, isDebugMod);
}

export default parse;