import { getType, getCurrentItem } from '../utils'
import { schema } from './schema'
import { onSpace } from './onSpace'
import { onEnter } from './onEnter'
import { onBackspace } from './onBackspace'

import Options from './options'


const PluginHeading = (opts = {}) => {
    
    opts = new Options(opts)

    const onKeyDown = (e, data, state) => {
        const args = [e, state, data, opts]

        if (data.key === 'space') return onSpace(...args)
        if (data.key === 'enter') return onEnter(...args)
        if (data.key === 'backspace') return onBackspace(...args)
    }

    return {
        onKeyDown,
        schema
    }
}

export default PluginHeading