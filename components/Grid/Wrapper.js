import styled from 'emotion/react'
import { css } from 'emotion'
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
    accumulator[`@media (max-width: ${emSize}em)`] = {
        maxWidth: `${breakpoints[label].max_width}`,
        gridGap: `0px ${breakpoints[label].gutter / 16}em`
    }
    return accumulator
}, 
    {
        maxWidth: '85%',
        gridGap: `0px ${def.gutter / 16}em`
    }
)

export const WrapperCss = css`
    composes: ${mediaProps(config.breakpoints, config.def)};
    width: ${config.max_width};
    grid-template-columns: repeat(${config.columns}, 1fr);
    display: grid;
    margin: 0 auto;
`

export const Wrapper = styled.div`
    composes: ${WrapperCss}
`
