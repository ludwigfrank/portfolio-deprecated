import { getType, getCurrentItem } from '../utils'
import { schema } from './schema'
import { onSpace } from './onSpace'
import { onEnter } from './onEnter'
import onBackspace from './onBackspace'

import Options from './options'


const PluginList = (opts = {}) => {
    
    opts = new Options(opts)

    const onKeyDown = (e, data, state) => {
        const args = [e, state, data, opts]

        if (data.key === 'space') return onSpace(...args)
        if (data.key === 'enter') return onEnter(...args)
        if (data.key === 'backspace') return onBackspace(...args)
    }

    const onBackspace = (e, state) => {
        const { startBlock, startOffset, selection } = state
        if (selection.isExpanded) return
        if (startOffset != 0) return
        if (startBlock.type != name) return

        e.preventDefault()

        return state
            .transform()
            .setBlock('paragraph')
            .unwrapBlock('bulleted-list')
            .apply()
    }


    return {
        onKeyDown,
        schema
    }
}

export default PluginList