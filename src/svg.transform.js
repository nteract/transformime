"use strict";

export function SVGTransform(mimetype, value, doc) {
    const container = doc.createElement('div');
    container.innerHTML = value;

    const svgElement = container.getElementsByTagName('svg')[0];
    if (!svgElement) {
        throw new Error("SVGTransform: Error: Failed to create <svg> element");
    }

    return svgElement;
}
SVGTransform.mimetype = 'image/svg+xml';
