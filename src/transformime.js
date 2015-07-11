
/**
 * Transforms mimetypes into HTMLElements
 */
class Transformime {

    /**
     * Public constructor
     */
    constructor() {
    
        // Initialize instance variables.
        this.renderers = [
            new TextRenderer(),
            new HTMLRenderer()
        ];
        this.fallbackRenderer = new DefaultRenderer();
    }

    transformMimeBundle(bundle) {
        this._validateMimebundle(bundle);
        
        let element;
        let richRenderer = this.fallbackRenderer;

        // Choose the last renderer as the most rich
        for (let renderer of this.renderers) {
            if (bundle.data && renderer.mimetype in bundle.data) {
                richRenderer = renderer;
            }
        }

        if (bundle.data){
            let data = bundle.data[richRenderer.mimetype];
            element = richRenderer.render(data, metadata);
            return element;
        }

        throw new Error('Renderer for ' + Object.keys(json).join(', ') + ' not found.');
    }

    renderMimetype(data, mimetype) {
        var renderer = this.get_renderer(mimetype);
        if (renderer) {
            return renderer.render(data, metadata);
        }

        throw new Error('Renderer for mimetype ' + mimetype + ' not found.');
    }

    /**
     * Validate a mime bundle.
     * @param  {object} bundle
     * @return {object} bundle
     */
    _validateMimebundle(bundle) {
        if (typeof bundle.data !== 'object') {
            console.warn('Mimebundle missing data', bundle);
            bundle.data = {};
        }

        if (typeof bundle.metadata !== 'object') {
            console.warn('Mimebundle missing metadata', bundle);
            bundle.metadata = {};
        }

        return bundle;
    }
}
