import { Record } from 'immutable'

const DEFAULTS = {
    // The possibles types for list containers
    types: ['header-one', 'header-two', 'header-three'],
};

/**
 * The plugin options
 */
export default class Options extends new Record(DEFAULTS) {}
