import { getType, getCurrentItem } from '../utils'
import { schema } from './schema'
import { onSpace } from './onSpace'
import { onEnter } from './onEnter'
import { onBackspace } from './onBackspace'
import { onTrigger } from './onTrigger'

import Options from './options'


const PluginPortal = (opts = {}) => {
    
    opts = new Options(opts)

    const onKeyDown = (e, data, state) => {
        const args = [e, state, data, opts]
        if (data.key === 'e' && data.isCtrl === true) return onTrigger(...args)
    }

    return {
        onKeyDown,
        schema
    }
}

export default PluginPortal