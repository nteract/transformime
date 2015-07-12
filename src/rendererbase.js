"use strict";

export class RendererBase {
    get mimetype() {
        throw new Error('mimetype not implemented');
    }

    transform(data, parentDoc) {
        throw new Error('render not implemented');
    }
}
