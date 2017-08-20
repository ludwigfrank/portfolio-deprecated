import { getType } from '../utils'

const onSpace = (e, state, data, opts) => {
    if (state.isExpanded) return

    const {
        startBlock,
        startOffset
    } = state

    if (getType(startBlock, startOffset) !== opts.typeItem) return

    e.preventDefault()

    const transform = state
        .transform()
        .setBlock('list-item')
        .wrapBlock('bulleted-list')

    state = transform
        .extendToStartOf(startBlock)
        .delete()
        .apply()

    return state
}

export default onSpace