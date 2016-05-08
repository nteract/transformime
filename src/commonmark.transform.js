"use strict"

var commonmark = require("commonmark")

var MarkdownTransform = function(){
    // Stick reader and writer in a closure so they only get created once.

    let reader = new commonmark.Parser()
    let writer = new commonmark.HtmlRenderer({
        safe: true
    })

    return function(mimetype, data, document) {
        var div = document.createElement("div")

        var parsed = reader.parse(data)

        // TODO: Any other transformations on the parsed object
        // See https://github.com/jgm/commonmark.js#usage

        div.innerHTML = writer.render(parsed)

        return div
    }
}();

MarkdownTransform.mimetype = 'text/markdown'

export { MarkdownTransform }
