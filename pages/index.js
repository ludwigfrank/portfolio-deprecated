import { Component } from 'react'
import styled from 'styled-components'
import { Editor, Raw, Block, setKeyGenerator, Plain } from 'slate'
import initialState from '../static/state.json'
import rules from '../editor/rules'

const EditorWrapper = styled.div`
    max-width: 660px;
    margin: 0 auto;
    padding: 0 24px;
`

const H1 = styled.h1`
    font-family: MetaSerifPro;
    font-size: 32px;
    color: #121023;
    letter-spacing: 0;
    line-height: 28px;
    font-weight: normal;
    margin-bottom: 1.5em;
    margin-top: 4em;
`

const H2 = styled.h2`
    font-family: MetaSerifPro;
    font-size: 26px;
    color: #121023;
    letter-spacing: 0;
    line-height: 28px;
    font-weight: normal;
    margin-bottom: 0.8em;
    margin-top: 1.5em;
`

const Paragraph = styled.span`
    font-family: Maison Neue;
    font-size: 1.04em;
    color: #1B2733;
    letter-spacing: 0;
    line-height: 1.9em;
`

const Blockquote = styled.blockquote`
    font-family: Maison Neue;
    font-size: 1.04em;
    font-style: italic;
    color: #1B2733;
    letter-spacing: 0.5px;
    line-height: 1.9em;
    border-left: 4px solid #E6E8EB;
    padding-left: 1.5em;
    margin: 1em 0;
`

/**
 * Define a schema.
 *
 * @type {Object}
 */

const schema = {
    nodes: {
        'block-quote': props => <Blockquote>{props.children}</Blockquote>,
        'bulleted-list': props => <ul>{props.children}</ul>,
        'heading-one': props => <H1>{props.children}</H1>,
        'heading-two': props => <H2>{props.children}</H2>,
        'heading-three': props => <h3>{props.children}</h3>,
        'heading-four': props => <h4>{props.children}</h4>,
        'heading-five': props => <h5>{props.children}</h5>,
        'heading-six': props => <h6>{props.children}</h6>,
        'list-item': props => <li>{props.children}</li>,
        // 'paragraph': props => <Paragraph>{props.children}</Paragraph>
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
        // console.log(state.blocks.first().text)
        switch (data.key) {
            case 'space': return this.onSpace(e, state)
            case 'backspace': return this.onBackspace(e, state)
            case 'enter': return this.onEnter(e, state)
            // case '2': return this.onAt(e, state, data.isShift)
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
        if (state.isExpanded) return
        const { startBlock, startOffset } = state
        const chars = startBlock.text.slice(0, startOffset).replace(/\s*/g, '')
        const type = this.getType(chars)

        if (!type) return
        if (type == 'list-item' && startBlock.type == 'list-item') return
        
        // As long as only one Heading at the top is allowed
        if (type == 'heading-one') return

        e.preventDefault()

        const transform = state
            .transform()
            .setBlock(type)

        if (type == 'list-item') transform.wrapBlock('bulleted-list')

        state = transform
            .extendToStartOf(startBlock)
            .delete()
            .apply()

        return state
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
        const { startBlock } = state

        if (startBlock.type == 'paragraph') return
        e.preventDefault()

        const transform = state
            .transform()
            .setBlock('paragraph')

        if (startBlock.type == 'list-item') transform.unwrapBlock('bulleted-list')

        state = transform.apply()
        return state
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
        const { startBlock, startOffset, endOffset } = state
        if (startOffset == 0 && startBlock.length == 0) return this.onBackspace(e, state)
        if (endOffset != startBlock.length) return

        if (
            startBlock.type != 'heading-one' &&
            startBlock.type != 'heading-two' &&
            startBlock.type != 'heading-three' &&
            startBlock.type != 'heading-four' &&
            startBlock.type != 'heading-five' &&
            startBlock.type != 'heading-six' &&
            startBlock.type != 'block-quote'
        ) {
            return
        }

        e.preventDefault()
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
        <EditorWrapper>
            <Editor
                schema={schema}
                state={this.state.state}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
            />
        </EditorWrapper>
        )
    }
}

/**
 * Export.
 */

export default MainEditor
