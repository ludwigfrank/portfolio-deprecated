import { getType, getCurrentItem } from '../utils'
import { schema } from './schema'
import { onSpace } from './onSpace'
import { onEnter } from './onEnter'
import { onBackspace } from './onBackspace'
import { onTrigger } from './onTrigger'

import Options from './options'


const filterItems = (input) => {
        const items = [
            "Heading, Text",
            "Heading 2, Text",
            "Heading 3, Text",
            "New York, NY",
            "Los Angeles, CA",
            "Chicago, IL",
            "Houston, TX",
            "Philadelphia, PA",
            "Phoenix, AZ",
            "San Antonio, TX",
            "San Diego, CA",
            "Dallas, TX",
            "San Jose, CA",
            "Jacksonville, FL",
            "Indianapolis, IN",
            "San Francisco, CA",
            "Austin, TX",
            "Columbus, OH",
            "Fort Worth, TX",
            "Louisville, KY",
            "Charlotte, NC",
            "Detroit, MI",
            "El Paso, TX",
            "Memphis, TN",
            "Baltimore, MD",
            "Boston, MA",
            "Seattle, WA",
            "Washington, DC"
        ]
        return input 
            ? items.filter(i => i && i.toLowerCase().includes(input.toLowerCase()))
            : items
    }

const PluginPortal = (opts = {}) => {
    
    opts = new Options(opts)

    const onKeyDown = (e, data, state) => {
        const args = [e, state, data, opts]
        if (data.key === 'space') return onSpace(...args)
        if (data.key === 'enter') return onEnter(...args)
        if (data.key === 'backspace') return onBackspace(...args)
    }

    const onBeforeChange = (state) => {
        const { startBlock } = state
        state.suggestions = filterItems(startBlock.text)
    }

    return {
        onKeyDown,
        onBeforeChange
    }
}

export default PluginPortal