"use strict"

var mathjaxHelper = require('mathjax-electron')

export function LaTeXTransform(mimetype, value, document) {
    var container = document.createElement('div')
    container.innerHTML = value

    mathjaxHelper.loadMathJax(document)
    mathjaxHelper.mathProcessor(container)
    return container
}
LaTeXTransform.mimetype = 'text/latex'
