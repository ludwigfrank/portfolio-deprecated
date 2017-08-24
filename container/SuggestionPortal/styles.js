import styled from 'react-emotion'
import { css } from 'emotion'
import { withTheme } from 'theming'
import { Editor } from 'slate'


export const StyledEditor = withTheme(styled(Editor)`
    background: ${p => p.theme.color.neutral[0]};
    border-bottom: 1px solid ${p => p.theme.color.neutral[8]};
    padding: 1.2em 2em;
`)

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: ${props => props.visible ? 'auto' : 'none'};;
`

export const PortalWrapper = withTheme(styled.div`
    box-shadow: ${props => props.theme.color.shadow[3]};
    width: 800px;
    margin: 0 auto;
    opacity: 0;
    background: ${p => p.theme.color.neutral[9]};
`)

export const PortalItemsWrapper = styled.div`
    width: auto;
    height: 100%;
    position: relative;
    overflow-y: scroll;
    overflow-x: hidden;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
`

export const PortalItemsOuterWrapper = styled.div`
    position: relative;
    height: 400px;
    margin: 32px 16px;
`

export const SearchParagraph = withTheme(styled.span`
    font-family: ${p => p.theme.font.primary};
    font-weight: 400;
    font-size: 1.5em;
    color: ${p => p.theme.color.neutral[1]};
`)

export const PortalItemWrapper = withTheme(styled.div`
    font-family: ${p => p.theme.font.primary};
    font-weight: 500;
    minWidth: ${props => props.active ? 'calc(100% - 32px)' : 'calc(100% / 3 - 32px)'};
    margin: 16px;
    margin-top: ${props => props.active ? '0' : '16px'};
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${p => p.theme.color.neutral[4]};
    border-radius: 4px;
    box-sizing: border-box;
    background: ${p => p.theme.color.neutral[0]};
    box-shadow: ${props => props.active ? props.theme.color.shadow[0] : props.theme.color.shadow[0]};
    opacity: ${props => props.active ? 1 : 0.6};
    transition: all 0.5s;
`)
