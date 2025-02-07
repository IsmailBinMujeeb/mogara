import * as cheerio from 'cheerio';

const formatHTMLStructure = (parsedCode) => {

    let $ = cheerio.load(parsedCode);

    const styles = [];
    $('style').each((index, element) => {
        styles.push($(element).html()); // Get only the CSS content inside <style> tags
    });

    let headTag = `<head>\n<style>\n${styles.join('\n')}\n</style>\n</head>`

    $('style').remove()
    let bodyTag = `<body>\n${$('body').html()}\n</body>`;

    return `<html>\n${headTag}\n${bodyTag}\n</html>`
}

export default formatHTMLStructure;