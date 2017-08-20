import { Record } from 'immutable'

const DEFAULTS = {
    // The possibles types for list containers
    types: ['heading-one', 'heading-two', 'heading-three'],
};

/**
 * The plugin options
 */
export default class Options extends new Record(DEFAULTS) {}
