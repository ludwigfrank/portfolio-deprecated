'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('next/node_modules/babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('next/node_modules/babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('next/node_modules/babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('next/node_modules/babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('next/node_modules/babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _slate = require('slate');

var _state3 = require('../static/state.json');

var _state4 = _interopRequireDefault(_state3);

var _rules = require('../editor/rules');

var _rules2 = _interopRequireDefault(_rules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/ludwigfrank/Documents/Development/Apps/portfolio/pages/index.js?entry';


var EditorWrapper = _styledComponents2.default.div.withConfig({
    displayName: 'pages__EditorWrapper',
    componentId: 's1qmh5q8-0'
})(['max-width:660px;margin:0 auto;padding:0 24px;']);

var H1 = _styledComponents2.default.h1.withConfig({
    displayName: 'pages__H1',
    componentId: 's1qmh5q8-1'
})(['font-family:MetaSerifPro;font-size:32px;color:#121023;letter-spacing:0;line-height:28px;font-weight:normal;margin-bottom:1.5em;margin-top:4em;']);

var H2 = _styledComponents2.default.h2.withConfig({
    displayName: 'pages__H2',
    componentId: 's1qmh5q8-2'
})(['font-family:MetaSerifPro;font-size:26px;color:#121023;letter-spacing:0;line-height:28px;font-weight:normal;margin-bottom:0.8em;margin-top:1.5em;']);

var Paragraph = _styledComponents2.default.span.withConfig({
    displayName: 'pages__Paragraph',
    componentId: 's1qmh5q8-3'
})(['font-family:Maison Neue;font-size:1.04em;color:#1B2733;letter-spacing:0;line-height:1.9em;']);

var Blockquote = _styledComponents2.default.blockquote.withConfig({
    displayName: 'pages__Blockquote',
    componentId: 's1qmh5q8-4'
})(['font-family:Maison Neue;font-size:1.04em;font-style:italic;color:#1B2733;letter-spacing:0.5px;line-height:1.9em;border-left:4px solid #E6E8EB;padding-left:1.5em;margin:1em 0;']);

/**
 * Define a schema.
 *
 * @type {Object}
 */

var schema = {
    nodes: {
        'block-quote': function blockQuote(props) {
            return _react2.default.createElement(Blockquote, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 63
                }
            }, props.children);
        },
        'bulleted-list': function bulletedList(props) {
            return _react2.default.createElement('ul', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 64
                }
            }, props.children);
        },
        'heading-one': function headingOne(props) {
            return _react2.default.createElement(H1, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 65
                }
            }, props.children);
        },
        'heading-two': function headingTwo(props) {
            return _react2.default.createElement(H2, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 66
                }
            }, props.children);
        },
        'heading-three': function headingThree(props) {
            return _react2.default.createElement('h3', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 67
                }
            }, props.children);
        },
        'heading-four': function headingFour(props) {
            return _react2.default.createElement('h4', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 68
                }
            }, props.children);
        },
        'heading-five': function headingFive(props) {
            return _react2.default.createElement('h5', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 69
                }
            }, props.children);
        },
        'heading-six': function headingSix(props) {
            return _react2.default.createElement('h6', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 70
                }
            }, props.children);
        },
        'list-item': function listItem(props) {
            return _react2.default.createElement('li', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 71
                }
            }, props.children);
        }
        // 'paragraph': props => <Paragraph>{props.children}</Paragraph>
    },
    rules: _rules2.default,
    marks: {
        bold: function bold(props) {
            return _react2.default.createElement('strong', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 76
                }
            }, props.children);
        },
        italic: function italic(props) {
            return _react2.default.createElement('em', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 77
                }
            }, props.children);
        },
        code: function code(props) {
            return _react2.default.createElement('code', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 78
                }
            }, props.children);
        }

        /**
         * Fix SSR.
         * from https://github.com/ianstormtaylor/slate/issues/53
         * 
         * @ return {String}
         */

    } };var getCounter = function getCounter() {
    var count = 0;
    return function () {
        return '' + count++;
    };
};

var parseValue = function parseValue() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var initialState = arguments[1];

    (0, _slate.setKeyGenerator)(getCounter());
    if (!value) return initialState ? parseValue(initialState) : _slate.Plain.deserialize('');
    return _slate.Raw.deserialize(value, { terse: true });
};

/**
 * The auto-markdown example.
 *
 * @type {Component}
 */

var MainEditor = function (_Component) {
    (0, _inherits3.default)(MainEditor, _Component);

    function MainEditor() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, MainEditor);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MainEditor.__proto__ || (0, _getPrototypeOf2.default)(MainEditor)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            // state: Raw.deserialize(initialState, { terse: true })
            state: parseValue(_state4.default)

            /**
             * Get the block type for a series of auto-markdown shortcut `chars`.
             *
             * @param {String} chars
             * @return {String} block
             */

        }, _this.getType = function (chars) {
            switch (chars) {
                case '*':
                case '-':
                    return 'list-item';
                case '>':
                    return 'block-quote';
                case '#':
                    return 'heading-one';
                case '##':
                    return 'heading-two';
                case '###':
                    return 'heading-three';
                case '####':
                    return 'heading-four';
                case '#####':
                    return 'heading-five';
                case '######':
                    return 'heading-six';
                default:
                    return null;
            }
        }, _this.onChange = function (state) {
            _this.setState({ state: state });
        }, _this.onKeyDown = function (e, data, state) {
            // console.log(state.blocks.first().text)
            switch (data.key) {
                case 'space':
                    return _this.onSpace(e, state);
                case 'backspace':
                    return _this.onBackspace(e, state);
                case 'enter':
                    return _this.onEnter(e, state);
                // case '2': return this.onAt(e, state, data.isShift)
            }
        }, _this.onSpace = function (e, state) {
            if (state.isExpanded) return;
            var _state = state,
                startBlock = _state.startBlock,
                startOffset = _state.startOffset;

            var chars = startBlock.text.slice(0, startOffset).replace(/\s*/g, '');
            var type = _this.getType(chars);

            if (!type) return;
            if (type == 'list-item' && startBlock.type == 'list-item') return;

            // As long as only one Heading at the top is allowed
            if (type == 'heading-one') return;

            e.preventDefault();

            var transform = state.transform().setBlock(type);

            if (type == 'list-item') transform.wrapBlock('bulleted-list');

            state = transform.extendToStartOf(startBlock).delete().apply();

            return state;
        }, _this.onBackspace = function (e, state) {
            if (state.isExpanded) return;
            if (state.startOffset != 0) return;
            var _state2 = state,
                startBlock = _state2.startBlock;

            if (startBlock.type == 'paragraph') return;
            e.preventDefault();

            var transform = state.transform().setBlock('paragraph');

            if (startBlock.type == 'list-item') transform.unwrapBlock('bulleted-list');

            state = transform.apply();
            return state;
        }, _this.onEnter = function (e, state) {
            // console.log('onenter')
            if (state.isExpanded) return;
            var startBlock = state.startBlock,
                startOffset = state.startOffset,
                endOffset = state.endOffset;

            if (startOffset == 0 && startBlock.length == 0) return _this.onBackspace(e, state);
            if (endOffset != startBlock.length) return;

            if (startBlock.type != 'heading-one' && startBlock.type != 'heading-two' && startBlock.type != 'heading-three' && startBlock.type != 'heading-four' && startBlock.type != 'heading-five' && startBlock.type != 'heading-six' && startBlock.type != 'block-quote') {
                return;
            }

            e.preventDefault();
            return state.transform().splitBlock().setBlock('paragraph').apply();
        }, _this.onAt = function (e, state, isShift) {
            if (isShift) {
                console.log('DO IT');
            }
            return;
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    /**
     * Deserialize the raw initial state.
     *
     * @type {Object}
     */

    /**
     * On change.
     *
     * @param {State} state
     */

    /**
     * On key down, check for our specific key shortcuts.
     *
     * @param {Event} e
     * @param {Data} data
     * @param {State} state
     * @return {State or Null} state
     */

    /**
     * On space, if it was after an auto-markdown shortcut, convert the current
     * node into the shortcut's corresponding type.
     *
     * @param {Event} e
     * @param {State} state
     * @return {State or Null} state
     */

    /**
     * On backspace, if at the start of a non-paragraph, convert it back into a
     * paragraph node.
     *
     * @param {Event} e
     * @param {State} state
     * @return {State or Null} state
     */

    /**
     * On return, if at the end of a node type that should not be extended,
     * create a new paragraph below it.
     *
     * @param {Event} e
     * @param {State} state
     * @return {State or Null} state
     */

    (0, _createClass3.default)(MainEditor, [{
        key: 'render',

        /**
        *
        * Render the example.
        *
        * @return {Component} component
        */

        value: function render() {
            return _react2.default.createElement(EditorWrapper, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 290
                }
            }, _react2.default.createElement(_slate.Editor, {
                schema: schema,
                state: this.state.state,
                onChange: this.onChange,
                onKeyDown: this.onKeyDown,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 291
                }
            }));
        }
    }]);

    return MainEditor;
}(_react.Component);

/**
 * Export.
 */

exports.default = MainEditor;