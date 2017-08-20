import { getType } from '../utils'

export const onSpace = (e, state, data, opts) => {
    if (state.isExpanded) return

    const {
        startBlock,
        startOffset
    } = state

    const type = getType(startBlock, startOffset)
    if (!opts.types.includes(type)) return
    
    e.preventDefault()

    return state
        .transform()
        .setBlock(type)
        .extendToStartOf(startBlock)
        .delete()
        .apply()
}