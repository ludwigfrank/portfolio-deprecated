import styled, { css } from 'styled-components'
import { config, media } from './lib'
import React from 'react'


/**
* On drop or paste text.
*
* @param {Event} e
* @param {Object} data
* @param {State} state
* @param {Editor} editor
* @return {String}
*/

const mediaProps = (breakpoints, def) => Object.keys(breakpoints).reduce((accumulator, label) => {
    const emSize = breakpoints[label].width / 16
    accumulator += 
    //  Media query styles.
    `
        @media (max-width: ${emSize}em) {
            max-width: ${breakpoints[label].max_width};
            grid-gap: 0px ${breakpoints[label].gutter / 16}em;
        }
    `
    return accumulator
}, 
    //  Default styles.
    `
        max-width: 85%;
        grid-gap: 0px ${def.gutter / 16}em;

    `
)

export const Wrapper = styled.div`
    width: ${config.max_width};
    grid-template-columns: repeat(${config.columns}, 1fr);
    display: grid;
    margin: 0 auto;
    ${mediaProps(config.breakpoints, config.def)}
`

export const WrapperCss = css`
    width: ${config.max_width};
    grid-template-columns: repeat(${config.columns}, 1fr);
    display: grid;
    margin: 0 auto;
    ${mediaProps(config.breakpoints, config.def)}
`