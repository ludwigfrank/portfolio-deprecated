export const onTrigger = (e, state, data, opts) => {
    if (state.isExpanded) return

    const {
        startBlock,
        startOffset,
        endOffset,
        startKey,
        document
    } = state

    console.log('triggered')
}
