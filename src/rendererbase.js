"use strict";

export class RendererBase {
    get mimetype() {
        throw new Error('mimetype not implemented');
    }

    render(data, metadata) {
        throw new Error('render not implemented');
    }
}
