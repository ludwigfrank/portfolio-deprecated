export const onEnter = (e, state, data, opts) => {
    if (state.isExpanded) return

    const {
        startBlock,
        startOffset,
        endOffset,
        startKey,
        document
    } = state

    if (!opts.types.includes(startBlock.type)) return
    
    if (endOffset === 0) {
        e.preventDefault()
        return state.transform()
            .insertBlock('paragraph')
            .collapseToStartOf(document.getClosestBlock(startKey))
            .apply()
    } else {
        return state
            .transform()
            .splitBlock()
            .setBlock('paragraph')
            .apply()
    }
}
