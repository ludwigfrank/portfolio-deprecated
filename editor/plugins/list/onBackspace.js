const onBackspace = (e, state, data, opts) => {
    const {
        startBlock,
        startOffset,
        selection
    } = state
    if (selection.isExpanded) return
    if (startOffset != 0) return
    if (startBlock.type != opts.typeItem) return

    e.preventDefault()

    return state
        .transform()
        .setBlock('paragraph')
        .unwrapBlock('bulleted-list')
        .apply()
}

export default onBackspace