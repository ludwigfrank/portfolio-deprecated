import { KievitLight, KievitLightItalic } from './fonts'
import styled from 'emotion/react'
import { Wrapper, Box } from './../Grid'

export const H1 = styled.h1`
    font-family: KievitSlabPro;
    font-size: 2.6em;
    color: #121023;
    letter-spacing: 0;
    line-height: 28px;
    font-weight: normal;
    margin-bottom: 1.5em;
    margin-top: 4em;
`

export const H2 = styled.h2`
    font-family: KievitSlabPro;
    font-size: 2.2em;
    color: #121023;
    letter-spacing: 0;
    line-height: 28px;
    font-weight: normal;
    margin-bottom: 0.8em;
    margin-top: 1.5em;
`

export const H3 = styled.h3`
    font-family: KievitSlabPro;
    font-size: 1.9em;
    color: #121023;
    letter-spacing: 0;
    line-height: 28px;
    font-weight: normal;
    margin-bottom: 0.5em;
    margin-top: 1em;
`


export const Heading = (props) => {
    return (
        <Wrapper>
            <Box>
                <H1>{props.children}</H1>
            </Box>
        </Wrapper>
    )
}