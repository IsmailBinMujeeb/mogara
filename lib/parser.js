import server from "../src/server.js"

const parse = (markdown) => {

    let parsedCode = markdown
        .replace(/^# (.*$)/gm, '<h1>$1</h1>');

    server(parsedCode);
}

export default parse;