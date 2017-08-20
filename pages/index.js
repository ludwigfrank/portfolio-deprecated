import { Component } from 'react'
import styled from 'styled-components'
import { Editor, Raw, Block, setKeyGenerator, Plain } from 'slate'
import initialState from '../static/state.json'
import rules from '../editor/rules'
import debug from 'debug'

import PluginList from '../editor/plugins/list'
import PluginHeading from '../editor/plugins/heading'

import Image from '../components/Image'

import { Box, Guides, Wrapper, WrapperCss } from '../components/Grid'


const EditorWrapper = styled.div`
    max-width: 660px;
    margin: 0 auto;
    padding: 0 24px;
`

const H1 = styled.h1`
    font-family: KievitSlabPro;
    font-size: 2.6em;
    color: #121023;
    letter-spacing: 0;
    line-height: 28px;
    font-weight: normal;
    margin-bottom: 1.5em;
    margin-top: 4em;
`

const H2 = styled.h2`
    font-family: KievitSlabPro;
    font-size: 2.2em;
    color: #121023;
    letter-spacing: 0;
    line-height: 28px;
    font-weight: normal;
    margin-bottom: 0.8em;
    margin-top: 1.5em;
`

const Paragraph = styled.span`
    font-family: Maison Neue;
    font-size: 1.12em;
    color: #1B2733;
    letter-spacing: 0;
    line-height: 1.9em;
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
    pluginHeading
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
            <Box fluid={[8, 8, 8, 8]} translate={[3, 3, 3, 3]}>
                <Paragraph>{props.children}</Paragraph>
            </Box>
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
    

        // return to default Enter behavior
        if ( startBlock.type === 'paragraph' ) {
            return
        } 

        console.log('default')
        return state
            .transform()
            .splitBlock()
            .setBlock('paragraph')
            .apply()
    }

    onAt = (e, state, isShift) => {
        if (isShift) {
            console.log('DO IT')
        }
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
            <div>
                <StyledEditor
                    plugins={plugins}
                    schema={schema}
                    state={this.state.state}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                />
                <Image></Image>
            </div>
        )
    }
}

/**
 * Export.
 */

export default MainEditor
