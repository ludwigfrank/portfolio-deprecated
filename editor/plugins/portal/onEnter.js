export const onEnter = (e, state, data, opts) => {
    if (state.isExpanded) return

    const {
        startBlock,
        startOffset,
        endOffset,
        startKey,
        document
    } = state

    e.preventDefault()
    return state
}
