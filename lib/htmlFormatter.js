/*eslint no-undef: "off"*/

const cheerio = require('cheerio');

const ClientSideSocket = `
<script src="/socket.io/socket.io.js"></script>
<script>
    const socket = io();
    socket.on('fileUpdated', (html) => {
        console.log('Hey')
        document.documentElement.innerHTML = html
    });
</script>
`

const formatHTMLStructure = (parsedCode) => {

    let $ = cheerio.load(parsedCode);

    const styles = [];
    $('style').each((index, element) => {
        styles.push($(element).html()); // Get only the CSS content inside <style> tags
    });

    let headTag = `<head>\n<style>\n${styles.join('\n')}\n</style>\n</head>`

    $('style').remove()
    let bodyTag = `<body>\n${$('body').html()}\n${ClientSideSocket}</body>`;

    return `<html>\n${headTag}\n${bodyTag}\n</html>`
}

module.exports = formatHTMLStructure;