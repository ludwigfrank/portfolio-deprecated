export const onEnter = (e, state, data, opts) => {
    if (state.isExpanded) return
    
    const {
        startBlock,
        startOffset
    } = state

    if (startBlock.type != opts.typeItem) return

    e.preventDefault()

    if (startOffset == 0 && startBlock.length == 0) {
        return state
            .transform()
            .setBlock('paragraph')
            .unwrapBlock('bulleted-list')
            .apply()
    }
}
