import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { injectGlobal } from 'emotion'
import { withTheme } from 'theming'
import TweenMax from 'gsap'

import { Raw, Block, setKeyGenerator, Plain } from 'slate'
import { PortalItemsOuterWrapper, PortalItemsWrapper, PortalItemWrapper, SearchParagraph, PortalWrapper, Wrapper, StyledEditor} from './styles'

import data from './data'
import PluginPortal from 'plugins/portal'

injectGlobal`
    *::-webkit-scrollbar-track
    {   
        background-color: #e5e5e5;
    }

    *::-webkit-scrollbar
    {
        width: 1px;
        background-color: #F5F5F5;
    }

    *::-webkit-scrollbar-thumb
    {
        background-color: #3f5061;
    }

`

const PortalItem = ({ name, onHover, onClick, active }) => {
    return (
        <PortalItemWrapper active={active}>
            {name}
        </PortalItemWrapper>
    )
}

const schema = {
    nodes: {
        'paragraph': props => 
            <SearchParagraph>{props.children}</SearchParagraph>
    }
}

const pluginPortal = PluginPortal()

const plugins = [
    pluginPortal
]

const initialState = Raw.deserialize({
  nodes: [
    {
      kind: 'block',
      type: 'paragraph',
      nodes: [
        {
          kind: 'text',
          text: ''
        }
      ]
    }
  ]
}, { terse: true })

class SuggestionPortal extends Component {
    state = {
        state: initialState,
        suggestions: [],
        visible: false
    }

    componentWillMount () {
        this.setState({ suggestions: data})
    }

    componentDidMount () {
        window.addEventListener('keypress', this.handleKeyPress, false)
        this.setState({ visible: false, state: this.state.state.transform().blur().apply()})
    }

    componentWillReceiveProps (nextProps) {

    }

    componentWillUpdate (nextProps, nextState) {

    }

    componentDidUpdate (prevProps, prevState) {

    }

    componentWillUnmount () {
        window.removeEventListener('keypress', this.handleKeyPress)
    }

    handleKeyPress = (e) => {
        if (e.key === 'j' && e.ctrlKey === true) {
            this.updateVisibility()
        }
    }

    updateVisibility = () => {
        const { visible, state } = this.state
        
        if (visible) {
            TweenMax.to(this.portalWrapper, 0.2, { opacity: 0, ease: Power3.easeIn })
            this.setState({ visible: false, state: state.transform().blur().apply()})
        } else {
            TweenMax.to(this.portalWrapper, 0.3, { opacity: 1, ease: Power3.easeOut })
            this.setState({ visible: true, state: state.transform().focus().apply()})
        }
    }

    onChange = (state) => {
        this.setState({ state, suggestions: state.suggestions }) 
    }

    onKeyDown = (e, data, state) => {
    }

    get activeSuggestion() {
        return this.state.suggestions[0] || ''
    }

    render () {
        const { suggestions, visible } = this.state

        return (
            <Wrapper onClick={this.updateVisibility} visible={visible}>
                <PortalWrapper innerRef={e => this.portalWrapper = e}>
                    <StyledEditor
                        schema={schema}
                        plugins={plugins}
                        state={this.state.state}
                        onChange={this.onChange}
                        onKeyDown={this.onKeyDown}>
                    </StyledEditor>
                    <PortalItemsOuterWrapper>
                        <PortalItemsWrapper innerRef={e => this.portalItemsWrapper = e}>
                            {suggestions.map((item, index) => (
                                <PortalItem
                                    key={index}
                                    name={item}
                                    active={item === this.activeSuggestion}
                                >
                                </PortalItem>
                            ))}
                        </PortalItemsWrapper>
                    </PortalItemsOuterWrapper>
                </PortalWrapper>
            </Wrapper>
        )
    }
}

SuggestionPortal.propTypes = {

}

export default SuggestionPortal