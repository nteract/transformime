## Classes

<dl>
<dt><a href="#Transformime">Transformime</a></dt>
<dd><p>Transforms mimetypes into HTMLElements</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#MarkdownTransform">MarkdownTransform</a></dt>
<dd><p>This is a function expression providing closure such that a reader
and writer is only created once.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#HTMLTransform">HTMLTransform(mimetype, data, document)</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Converts data with an HTML mimetype to an HTML div element with the
appropriate formatting.</p>
</dd>
<dt><a href="#ImageTransform">ImageTransform(mimetype, data, document)</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Converts base64 image mimetype data to an HTML img element.</p>
</dd>
<dt><a href="#LaTeXTransform">LaTeXTransform(mimetype, value, document)</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Converts data with LaTeX mimetype to its MathJax representation
in an HTML div.</p>
</dd>
<dt><a href="#PDFTransform">PDFTransform(mimetype, base64PDF, document)</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Transforms base 64 encoded PDF --&gt; <a href="data:application/pdf;base64,...">
which is the (current) Jupyter notebook version of the element.
This one returns a little link you can click.</p>
</dd>
<dt><a href="#ScriptTransform">ScriptTransform(mimetype, value, document)</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Transform a given javascript into a script html element</p>
</dd>
<dt><a href="#SVGTransform">SVGTransform(mimetype, data, document)</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Converts a Scalable Vector Graphics file to an svgElement for HTML.</p>
</dd>
<dt><a href="#TextTransform">TextTransform(mimetype, value, document)</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Converts console text or plaintext to an HTML pre element.</p>
</dd>
<dt><a href="#createTransform">createTransform([transformers], [doc])</a> ⇒ <code>function</code></dt>
<dd><p>Helper to create a function that transforms a MIME bundle into an HTMLElement
using the given document and list of transformers.</p>
</dd>
</dl>

<a name="Transformime"></a>

## Transformime
Transforms mimetypes into HTMLElements

**Kind**: global class  

* [Transformime](#Transformime)
    * [new Transformime(transformers)](#new_Transformime_new)
    * [.transform(bundle, document)](#Transformime+transform) ⇒ <code>Promise.&lt;{mimetype: string, el: HTMLElement}&gt;</code>
    * [.del(mimetype)](#Transformime+del)
    * [.get(mimetype)](#Transformime+get) ⇒ <code>function</code>
    * [.set(mimetype, transformer)](#Transformime+set) ⇒ <code>function</code>
    * [.push(transformer, mimetype)](#Transformime+push) ⇒ <code>function</code>
    * [._proxy(transformer, mimetype)](#Transformime+_proxy) ⇒ <code>function</code>

<a name="new_Transformime_new"></a>

### new Transformime(transformers)
Public constructor


| Param | Type | Description |
| --- | --- | --- |
| transformers | <code>Array.&lt;function()&gt;</code> | list of transformers, in reverse priority order. |

<a name="Transformime+transform"></a>

### transformime.transform(bundle, document) ⇒ <code>Promise.&lt;{mimetype: string, el: HTMLElement}&gt;</code>
Transforms a mime bundle, using the richest available representation,
into an HTMLElement.

**Kind**: instance method of <code>[Transformime](#Transformime)</code>  

| Param | Type | Description |
| --- | --- | --- |
| bundle | <code>any</code> | {mimetype1: data1, mimetype2: data2, ...} |
| document | <code>Document</code> | Any of window.document, iframe.contentDocument |

<a name="Transformime+del"></a>

### transformime.del(mimetype)
Deletes all transformers by mimetype.

**Kind**: instance method of <code>[Transformime](#Transformime)</code>  

| Param | Type | Description |
| --- | --- | --- |
| mimetype | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | mimetype the data type (e.g. text/plain, text/html, image/png) |

<a name="Transformime+get"></a>

### transformime.get(mimetype) ⇒ <code>function</code>
Gets a transformer matching the mimetype

**Kind**: instance method of <code>[Transformime](#Transformime)</code>  
**Returns**: <code>function</code> - Matching transformer  

| Param | Type | Description |
| --- | --- | --- |
| mimetype | <code>string</code> | the data type (e.g. text/plain, text/html, image/png) |

<a name="Transformime+set"></a>

### transformime.set(mimetype, transformer) ⇒ <code>function</code>
Sets a transformer matching the mimetype

**Kind**: instance method of <code>[Transformime](#Transformime)</code>  
**Returns**: <code>function</code> - inserted transformer function (may be different than arg)  

| Param | Type | Description |
| --- | --- | --- |
| mimetype | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | the data type (e.g. text/plain, text/html, image/png) |
| transformer | <code>function</code> |  |

<a name="Transformime+push"></a>

### transformime.push(transformer, mimetype) ⇒ <code>function</code>
Appends a transformer to the transformer list.

**Kind**: instance method of <code>[Transformime](#Transformime)</code>  
**Returns**: <code>function</code> - inserted transformer function (may be different than arg)  

| Param | Type |
| --- | --- |
| transformer | <code>function</code> | 
| mimetype | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | 

<a name="Transformime+_proxy"></a>

### transformime._proxy(transformer, mimetype) ⇒ <code>function</code>
Create a proxy to a transformer, using another mimetype.

**Kind**: instance method of <code>[Transformime](#Transformime)</code>  
**Returns**: <code>function</code> - transformer  

| Param | Type |
| --- | --- |
| transformer | <code>function</code> | 
| mimetype | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | 

<a name="MarkdownTransform"></a>

## MarkdownTransform
This is a function expression providing closure such that a reader
and writer is only created once.

**Kind**: global variable  
<a name="HTMLTransform"></a>

## HTMLTransform(mimetype, data, document) ⇒ <code>HTMLElement</code>
Converts data with an HTML mimetype to an HTML div element with the
appropriate formatting.

**Kind**: global function  
**Returns**: <code>HTMLElement</code> - - A div element for the containing the transformed
html.  

| Param | Type | Description |
| --- | --- | --- |
| mimetype | <code>string</code> | The mimetype of the data to be transformed, it is unused by this function but included for a common API. |
| data | <code>string</code> | The html text to be transformed. |
| document | <code>Document</code> | A Document Object Model to be used for creating an html div element. |

<a name="ImageTransform"></a>

## ImageTransform(mimetype, data, document) ⇒ <code>HTMLElement</code>
Converts base64 image mimetype data to an HTML img element.

**Kind**: global function  
**Returns**: <code>HTMLElement</code> - - An html img element for the given image.  

| Param | Type | Description |
| --- | --- | --- |
| mimetype | <code>string</code> | This is the mimetype of the data being provided, it is used for the the source linking. |
| data | <code>string</code> | The image data to be transformed. |
| document | <code>Document</code> | A Document Object Model to be used for creating an html img element. |

<a name="LaTeXTransform"></a>

## LaTeXTransform(mimetype, value, document) ⇒ <code>HTMLElement</code>
Converts data with LaTeX mimetype to its MathJax representation
in an HTML div.

**Kind**: global function  
**Returns**: <code>HTMLElement</code> - - An HTML div element containing the processed MathJax.  

| Param | Type | Description |
| --- | --- | --- |
| mimetype | <code>string</code> | The mimetype of the data to be transformed, it is unused by this function but included for a common API. |
| value | <code>string</code> | The LateX data to be transformed. |
| document | <code>Document</code> | A Document Object Model to be used for creating an html div element. |

<a name="PDFTransform"></a>

## PDFTransform(mimetype, base64PDF, document) ⇒ <code>HTMLElement</code>
Transforms base 64 encoded PDF --> <a href="data:application/pdf;base64,...">
which is the (current) Jupyter notebook version of the element.
This one returns a little link you can click.

**Kind**: global function  
**Returns**: <code>HTMLElement</code> - - A link element to the given PDF.  

| Param | Type | Description |
| --- | --- | --- |
| mimetype | <code>string</code> | The mimetype of the data to be transformed, it is unused by this function but included for a common API. |
| base64PDF | <code>string</code> | A base64 encoded PDF. |
| document | <code>Document</code> | A Document Object Model (e.g. window.document) |

<a name="ScriptTransform"></a>

## ScriptTransform(mimetype, value, document) ⇒ <code>HTMLElement</code>
Transform a given javascript into a script html element

**Kind**: global function  
**Returns**: <code>HTMLElement</code> - - A scriopt element for the given javascript  

| Param | Type | Description |
| --- | --- | --- |
| mimetype | <code>string</code> | The mimetype of the data to be transformed, it is used by this element to define the type of the HTML element. |
| value | <code>string</code> | The script to be transformed. |
| document | <code>Document</code> | A Document Object Model to be used for creating an html img element. |

<a name="SVGTransform"></a>

## SVGTransform(mimetype, data, document) ⇒ <code>HTMLElement</code>
Converts a Scalable Vector Graphics file to an svgElement for HTML.

**Kind**: global function  
**Returns**: <code>HTMLElement</code> - - An html div element containing the
transformed svg.  
**Throws**:

- <code>Error</code> - Throws an error if inner html does not have SVG as its
first tag name.


| Param | Type | Description |
| --- | --- | --- |
| mimetype | <code>string</code> | The mimetype of the data to be transformed, it is unused by this function but included for a common API. |
| data | <code>string</code> | The svg data to be transformed. |
| document | <code>Document</code> | A Document Object Model to be used for creating an html div element. |

<a name="TextTransform"></a>

## TextTransform(mimetype, value, document) ⇒ <code>HTMLElement</code>
Converts console text or plaintext to an HTML pre element.

**Kind**: global function  
**Returns**: <code>HTMLElement</code> - - A pre element for the given text  

| Param | Type | Description |
| --- | --- | --- |
| mimetype | <code>string</code> | The mimetype of the data to be transformed, it is unused by this function but included for a common API. |
| value | <code>string</code> | The text data to be transformed. |
| document | <code>Document</code> | A Document Object Model to be used for creating an html pre element. |

<a name="createTransform"></a>

## createTransform([transformers], [doc]) ⇒ <code>function</code>
Helper to create a function that transforms a MIME bundle into an HTMLElement
using the given document and list of transformers.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [transformers] | <code>Array.&lt;function()&gt;</code> | List of transformers, in reverse priority order. |
| [doc] | <code>Document</code> | E.g. window.document, iframe.contentDocument |

