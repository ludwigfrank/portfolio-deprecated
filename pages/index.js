import { Component } from 'react'
import styled from 'emotion/react'
import { injectGlobal } from 'emotion'
import { Editor, Raw, Block, setKeyGenerator, Plain } from 'slate'
import { ThemeProvider } from 'theming'
import { DEFAULT_THEME } from '../theme' 
import { Paragraph } from 'components/text'
import initialState from '../static/state.json'
import rules from '../editor/rules'
import debug from 'debug'
import SuggestionPortal from 'container/SuggestionPortal'

import PluginList from '../editor/plugins/list'
import PluginHeading from '../editor/plugins/heading'
import PluginPortal from '../editor/plugins/portal'


import Image from '../components/Image'

import { Box, Guides, Wrapper, WrapperCss } from '../components/Grid'


const EditorWrapper = styled.div`
    max-width: 660px;
    margin: 0 auto;
    padding: 0 24px;
`


const Blockquote = styled.blockquote`
    font-family: KievitSlabPro-LightItalic;
    font-size: 1.2em;
    font-style: italic;
    color: #1B2733;
    letter-spacing: 0.5px;
    line-height: 1.9em;
    border-left: 4px solid #E6E8EB;
    padding: 0.5em 1.5em; 
    margin: 2em 0;
`

const pluginList = PluginList()
const pluginHeading = PluginHeading()

const plugins = [
    pluginList,
    pluginHeading,
]

const StyledEditor = styled(Editor)`
    ${WrapperCss}
`


/**
 * Define a schema.
 *
 * @type {Object}
 */

const schema = {
    nodes: {
        'block-quote': props => <Blockquote>{props.children}</Blockquote>,
        'paragraph': props =>
            <Wrapper>
                <Box fluid={[8, 8, 10, 10]} center>
                    <Paragraph>{props.children}</Paragraph>
                </Box>
            </Wrapper>
    },
    rules,
    marks: {
        bold: props => <strong>{props.children}</strong>,
        italic: props => <em>{props.children}</em>,
        code: props => <code>{props.children}</code>
    }
}

/**
 * Fix SSR.
 * from https://github.com/ianstormtaylor/slate/issues/53
 * 
 * @ return {String}
 */


const getCounter = () => {
    let count = 0
    return () => `${count++}`
}

const parseValue = (value = {}, initialState) => {
    setKeyGenerator(getCounter())
    if (!value) return initialState ? parseValue(initialState) : Plain.deserialize('')
    return Raw.deserialize(value, { terse: true })
}

/**
 * The auto-markdown example.
 *
 * @type {Component}
 */

class MainEditor extends Component {

    /**
     * Deserialize the raw initial state.
     *
     * @type {Object}
     */

    state = {
        // state: Raw.deserialize(initialState, { terse: true })
        state: parseValue(initialState)
    }

    /**
     * Get the block type for a series of auto-markdown shortcut `chars`.
     *
     * @param {String} chars
     * @return {String} block
     */

    getType = (chars) => {
        switch (chars) {
            case '*':
            case '-': return 'list-item'
            case '>': return 'block-quote'
            case '#': return 'heading-one'
            case '##': return 'heading-two'
            case '###': return 'heading-three'
            case '####': return 'heading-four'
            case '#####': return 'heading-five'
            case '######': return 'heading-six'
            default: return null
        }
    }


    /**
     * On change.
     *
     * @param {State} state
     */

    onChange = (state) => {
        this.setState({ state })
    }


    /**
     * On key down, check for our specific key shortcuts.
     *
     * @param {Event} e
     * @param {Data} data
     * @param {State} state
     * @return {State or Null} state
     */

    onKeyDown = (e, data, state) => {
        switch (data.key) {
            case 'space': return this.onSpace(e, state)
            case 'backspace': return this.onBackspace(e, state)
            case 'enter': return this.onEnter(e, state)
        }
    }

    /**
     * On space, if it was after an auto-markdown shortcut, convert the current
     * node into the shortcut's corresponding type.
     *
     * @param {Event} e
     * @param {State} state
     * @return {State or Null} state
     */

    onSpace = (e, state) => {
        return
    }

    /**
     * On backspace, if at the start of a non-paragraph, convert it back into a
     * paragraph node.
     *
     * @param {Event} e
     * @param {State} state
     * @return {State or Null} state
     */

    onBackspace = (e, state) => {
        if (state.isExpanded) return
        if (state.startOffset != 0) return
        const { startBlock, document, startKey, startOffset } = state


        return
    }

    /**
     * On return, if at the end of a node type that should not be extended,
     * create a new paragraph below it.
     *
     * @param {Event} e
     * @param {State} state
     * @return {State or Null} state
     */

    onEnter = (e, state) => {
        // console.log('onenter')
        if (state.isExpanded) return
        const { startBlock, startOffset, endOffset, blocks, startKey, document } = state
    
        console.log('default')
        return
    }



     /**
     *
     * Render the example.
     *
     * @return {Component} component
     */

    render() {
        return (
            <ThemeProvider theme={DEFAULT_THEME}>
                <div>
                    <SuggestionPortal />
                    <Editor
                        plugins={plugins}
                        schema={schema}
                        state={this.state.state}
                        onChange={this.onChange}
                        onKeyDown={this.onKeyDown}
                    />
                </div>
            </ThemeProvider>
        )
    }
}

/**
 * Export.
 */

export default MainEditor

injectGlobal`
    * {
        margin: 0;
        padding: 0;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-font-smoothing: antialiased;
    }


    /*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */

    /* Document
    ========================================================================== */

    /**
     * 1. Correct the line height in all browsers.
     * 2. Prevent adjustments of font size after orientation changes in
     *    IE on Windows Phone and in iOS.
     */

    html {
    line-height: 1.15; /* 1 */
    -ms-text-size-adjust: 100%; /* 2 */
    -webkit-text-size-adjust: 100%; /* 2 */
    }

    /* Sections
    ========================================================================== */

    /**
     * Remove the margin in all browsers (opinionated).
     */

    body {
    margin: 0;
    }

    /**
     * Add the correct display in IE 9-.
     */

    article,
    aside,
    footer,
    header,
    nav,
    section {
    display: block;
    }



    h1 {
    font-size: 2em;
    margin: 0.67em 0;
    }

    /* Grouping content
    ========================================================================== */

    /**
     * Add the correct display in IE 9-.
     * 1. Add the correct display in IE.
     */

    figcaption,
    figure,
    main { /* 1 */
    display: block;
    }

    /**
     * Add the correct margin in IE 8.
     */

    figure {
    margin: 1em 40px;
    }

    /**
     * 1. Add the correct box sizing in Firefox.
     * 2. Show the overflow in Edge and IE.
     */

    hr {
    box-sizing: content-box; /* 1 */
    height: 0; /* 1 */
    overflow: visible; /* 2 */
    }


    pre {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
    }

    /* Text-level semantics
    ========================================================================== */

    /**
     * 1. Remove the gray background on active links in IE 10.
     * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.
     */

    a {
    background-color: transparent; /* 1 */
    -webkit-text-decoration-skip: objects; /* 2 */
    }

    /**
     * 1. Remove the bottom border in Chrome 57- and Firefox 39-.
     * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
     */

    abbr[title] {
    border-bottom: none; /* 1 */
    text-decoration: underline; /* 2 */
    text-decoration: underline dotted; /* 2 */
    }


    b,
    strong {
    font-weight: inherit;
    }

    /**
     * Add the correct font weight in Chrome, Edge, and Safari.
     */

    b,
    strong {
    font-weight: bolder;
    }



    code,
    kbd,
    samp {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
    }

    /**
     * Add the correct font style in Android 4.3-.
     */

    dfn {
    font-style: italic;
    }

    /**
     * Add the correct background and color in IE 9-.
     */

    mark {
    background-color: #ff0;
    color: #000;
    }

    /**
     * Add the correct font size in all browsers.
     */

    small {
    font-size: 80%;
    }



    sub,
    sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
    }

    sub {
    bottom: -0.25em;
    }

    sup {
    top: -0.5em;
    }

    /* Embedded content
    ========================================================================== */

    /**
     * Add the correct display in IE 9-.
     */

    audio,
    video {
    display: inline-block;
    }

    /**
     * Add the correct display in iOS 4-7.
     */

    audio:not([controls]) {
    display: none;
    height: 0;
    }

    /**
     * Remove the border on images inside links in IE 10-.
     */

    img {
    border-style: none;
    }

    /**
     * Hide the overflow in IE.
     */

    svg:not(:root) {
    overflow: hidden;
    }

    /* Forms
    ========================================================================== */

    /**
     * 1. Change the font styles in all browsers (opinionated).
     * 2. Remove the margin in Firefox and Safari.
     */

    button,
    input,
    optgroup,
    select,
    textarea {
    font-family: sans-serif; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
    }

    /**
     * Show the overflow in IE.
     * 1. Show the overflow in Edge.
     */

    button,
    input { /* 1 */
    overflow: visible;
    }

    /**
     * Remove the inheritance of text transform in Edge, Firefox, and IE.
     * 1. Remove the inheritance of text transform in Firefox.
     */

    button,
    select { /* 1 */
    text-transform: none;
    }



    button,
    html [type="button"], /* 1 */
    [type="reset"],
    [type="submit"] {
    -webkit-appearance: button; /* 2 */
    }

    /**
     * Remove the inner border and padding in Firefox.
     */

    button::-moz-focus-inner,
    [type="button"]::-moz-focus-inner,
    [type="reset"]::-moz-focus-inner,
    [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
    }

    /**
     * Restore the focus styles unset by the previous rule.
     */

    button:-moz-focusring,
    [type="button"]:-moz-focusring,
    [type="reset"]:-moz-focusring,
    [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
    }

    /**
     * Correct the padding in Firefox.
     */

    fieldset {
    padding: 0.35em 0.75em 0.625em;
    }


    legend {
    box-sizing: border-box; /* 1 */
    color: inherit; /* 2 */
    display: table; /* 1 */
    max-width: 100%; /* 1 */
    padding: 0; /* 3 */
    white-space: normal; /* 1 */
    }

    /**
     * 1. Add the correct display in IE 9-.
     * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.
     */

    progress {
    display: inline-block; /* 1 */
    vertical-align: baseline; /* 2 */
    }

    /**
     * Remove the default vertical scrollbar in IE.
     */

    textarea {
    overflow: auto;
    }

    /**
     * 1. Add the correct box sizing in IE 10-.
     * 2. Remove the padding in IE 10-.
     */

    [type="checkbox"],
    [type="radio"] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
    }

    /**
     * Correct the cursor style of increment and decrement buttons in Chrome.
     */

    [type="number"]::-webkit-inner-spin-button,
    [type="number"]::-webkit-outer-spin-button {
    height: auto;
    }

    /**
     * 1. Correct the odd appearance in Chrome and Safari.
     * 2. Correct the outline style in Safari.
     */

    [type="search"] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
    }

    /**
     * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.
     */

    [type="search"]::-webkit-search-cancel-button,
    [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
    }



    ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
    }

    /* Interactive
    ========================================================================== */

    /*
    * Add the correct display in IE 9-.
    * 1. Add the correct display in Edge, IE, and Firefox.
    */

    details, /* 1 */
    menu {
    display: block;
    }

    /*
    * Add the correct display in all browsers.
    */

    summary {
    display: list-item;
    }

    /* Scripting
    ========================================================================== */

    /**
     * Add the correct display in IE 9-.
     */

    canvas {
    display: inline-block;
    }

    /**
     * Add the correct display in IE.
     */

    template {
    display: none;
    }

    /* Hidden
    ========================================================================== */

    /**
     * Add the correct display in IE 10-.
     */

    [hidden] {
    display: none;
    }
`
