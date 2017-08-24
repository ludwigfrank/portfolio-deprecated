import { Record } from 'immutable'

const DEFAULTS = {
    // The possibles types for list containers
    types: ['portal'],
};

/**
 * The plugin options
 */
export default class Options extends new Record(DEFAULTS) {}
