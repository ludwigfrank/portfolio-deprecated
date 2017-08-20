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

var _state = require('../static/state.json');

var _state2 = _interopRequireDefault(_state);

var _rules = require('../editor/rules');

var _rules2 = _interopRequireDefault(_rules);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _list = require('../editor/plugins/list');

var _list2 = _interopRequireDefault(_list);

var _heading = require('../editor/plugins/heading');

var _heading2 = _interopRequireDefault(_heading);

var _Image = require('../components/Image');

var _Image2 = _interopRequireDefault(_Image);

var _Grid = require('../components/Grid');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/ludwigfrank/Documents/Development/Apps/portfolio/pages/index.js?entry';


var EditorWrapper = _styledComponents2.default.div.withConfig({
    displayName: 'pages__EditorWrapper',
    componentId: 's1nbay9k-0'
})(['max-width:660px;margin:0 auto;padding:0 24px;']);

var H1 = _styledComponents2.default.h1.withConfig({
    displayName: 'pages__H1',
    componentId: 's1nbay9k-1'
})(['font-family:KievitSlabPro;font-size:2.6em;color:#121023;letter-spacing:0;line-height:28px;font-weight:normal;margin-bottom:1.5em;margin-top:4em;']);

var H2 = _styledComponents2.default.h2.withConfig({
    displayName: 'pages__H2',
    componentId: 's1nbay9k-2'
})(['font-family:KievitSlabPro;font-size:2.2em;color:#121023;letter-spacing:0;line-height:28px;font-weight:normal;margin-bottom:0.8em;margin-top:1.5em;']);

var Paragraph = _styledComponents2.default.span.withConfig({
    displayName: 'pages__Paragraph',
    componentId: 's1nbay9k-3'
})(['font-family:Maison Neue;font-size:1.12em;color:#1B2733;letter-spacing:0;line-height:1.9em;']);

var Blockquote = _styledComponents2.default.blockquote.withConfig({
    displayName: 'pages__Blockquote',
    componentId: 's1nbay9k-4'
})(['font-family:KievitSlabPro-LightItalic;font-size:1.2em;font-style:italic;color:#1B2733;letter-spacing:0.5px;line-height:1.9em;border-left:4px solid #E6E8EB;padding:0.5em 1.5em;margin:2em 0;']);

var pluginList = (0, _list2.default)();
var pluginHeading = (0, _heading2.default)();
var plugins = [pluginList, pluginHeading];

var StyledEditor = (0, _styledComponents2.default)(_slate.Editor).withConfig({
    displayName: 'pages__StyledEditor',
    componentId: 's1nbay9k-5'
})(['', ''], _Grid.WrapperCss);

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
                    lineNumber: 83
                }
            }, props.children);
        },
        'paragraph': function paragraph(props) {
            return _react2.default.createElement(_Grid.Box, { fluid: [8, 8, 8, 8], translate: [3, 3, 3, 3], __source: {
                    fileName: _jsxFileName,
                    lineNumber: 85
                }
            }, _react2.default.createElement(Paragraph, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 86
                }
            }, props.children));
        }
    },
    rules: _rules2.default,
    marks: {
        bold: function bold(props) {
            return _react2.default.createElement('strong', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 91
                }
            }, props.children);
        },
        italic: function italic(props) {
            return _react2.default.createElement('em', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 92
                }
            }, props.children);
        },
        code: function code(props) {
            return _react2.default.createElement('code', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 93
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
            state: parseValue(_state2.default)

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
            switch (data.key) {
                case 'space':
                    return _this.onSpace(e, state);
                case 'backspace':
                    return _this.onBackspace(e, state);
                case 'enter':
                    return _this.onEnter(e, state);
            }
        }, _this.onSpace = function (e, state) {
            return;
        }, _this.onBackspace = function (e, state) {
            if (state.isExpanded) return;
            if (state.startOffset != 0) return;
            var startBlock = state.startBlock,
                document = state.document,
                startKey = state.startKey,
                startOffset = state.startOffset;

            return;
        }, _this.onEnter = function (e, state) {
            // console.log('onenter')
            if (state.isExpanded) return;
            var startBlock = state.startBlock,
                startOffset = state.startOffset,
                endOffset = state.endOffset,
                blocks = state.blocks,
                startKey = state.startKey,
                document = state.document;

            // return to default Enter behavior

            if (startBlock.type === 'paragraph') {
                return;
            }

            console.log('default');
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
            return _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 262
                }
            }, _react2.default.createElement(StyledEditor, {
                plugins: plugins,
                schema: schema,
                state: this.state.state,
                onChange: this.onChange,
                onKeyDown: this.onKeyDown,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 263
                }
            }), _react2.default.createElement(_Image2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 270
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