import { Record } from 'immutable'

const DEFAULTS = {
    // The possibles types for list containers
    types: ['bulleted-list'],
    // The type of list items
    typeItem: 'list-item',
    // The type of default block in items
    typeDefault: 'paragraph'
};

/**
 * The plugin options
 */
export default class Options extends new Record(DEFAULTS) {}
