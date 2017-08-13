import { Block } from 'slate'

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
    {
        match: node => node.kind === 'document',
        validate: document => !document.nodes.size || document.nodes.first().type != 'heading-one' ? document.nodes : null,
        normalize: (transform, document, nodes) => {
            if (!nodes.size) {
                const title = Block.create({
                    type: 'heading-one',
                    data: {}
                })
                return transform.insertNodeByKey(document.key, 0, title)
            }

            return transform.setNodeByKey(nodes.first().key, 'heading-one')
        }
    },

    // Rule that only allows for one title, normalizes by making titles paragraphs
    {
        match: node => node.kind === 'document',
        validate: document => {
            const invalidChildren = document.nodes.filter((child, index) => child.type === 'heading-one' && index !== 0)
            return invalidChildren.size ? invalidChildren : null
        },
        normalize: (transform, document, invalidChildren) => {
            console.log('Only one type 1 heading is allowed in the document.')
            let updatedTransform = transform
            invalidChildren.forEach(child => {
                updatedTransform = transform.setNodeByKey(child.key, 'pragraph')
            })

            return updatedTransform
        }
    },

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
