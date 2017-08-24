const getType = (startBlock, startOffset) => {
    switch (startBlock.text.slice(0, startOffset).replace(/\s*/g, '')) {
        case '*':
        case '-': return 'list-item'
        case '$': return 'portal'
        case '>': return 'block-quote'
        case '#': return 'heading-one'
        case '##': return 'heading-two'
        case '###': return 'heading-three'
        case '####': return 'heading-four'
        case '#####': return 'heading-five'
        case '######': return 'heading-six'
        default:
            return null
    }
}

export { getType }