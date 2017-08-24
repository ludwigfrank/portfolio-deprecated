export const onBackspace = (e, state, data, opts) => {
    const {
        startBlock,
        startOffset,
        startKey,
        selection,
        document
    } = state

    if (selection.isExpanded) return
    if (startOffset != 0) return
    if (!opts.types.includes(startBlock.type)) return

    // If the previous block is a paragraph and empty delete it
    if (startBlock.isEmpty) {
        return state
            .transform()
            .setBlock('paragraph')
            .apply()
    }
    if (document.getPreviousBlock(startKey).type == 'paragraph' &&
        startBlock.type === 'heading-two' &&
        document.getPreviousBlock(startKey).isEmpty == true
    ) {
            return state
                .transform()
                .deleteBackward(1)
                .setBlock(startBlock.type)
                .apply()
    } else {
        return
    }
}