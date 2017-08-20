import { Block } from 'slate'
import styled from 'styled-components'

const Paragraph = styled.span`
    font-family: Maison Neue;
    font-size: 1.04em;
    color: #1B2733;
    letter-spacing: 0;
    line-height: 1.9em;
`

const defaultBlock = {
    type: 'paragraph',
    isVoid: false,
    data: {
        text: 'Hello'
    }
}

const rules = [
    // Rule that always makes the first block a title, normalizes by
    // inserting one if no children, or setting the top to be a title


    // Insert a paragraph below a voide node (e.g. image) if that node is the last one in the document.
    {
        match: node => node.kind === 'document',
        validate: document => {
            const lastNode = document.nodes.last()
            return lastNode && lastNode.isVoid ? true : null
        },
        normalize: (transform, document) => {
            const block = Block.create(defaultBlock)
            transform.insertNodeByKey(document.key, 0, block)
        }
    }
]

export default rules
