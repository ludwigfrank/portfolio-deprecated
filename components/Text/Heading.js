import { KievitLight, KievitLightItalic } from './fonts'
import styled from 'emotion/react'
import { withTheme } from 'theming'
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

export const H2 = withTheme(styled('h2')`
    color: ${p => p.theme.color.neutral[1]};
    font-family: ${p => p.theme.font.secondary};
    font-size: 2.2em;
    font-weight: 100;
    letter-spacing: 0;
    line-height: 28px;
    margin-bottom: 0.8em;
    margin-top: 1.5em;
`)

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

export const Paragraph = withTheme(styled('span')`
    color: ${p => p.theme.color.neutral[3]};
    font-family: ${p => p.theme.font.primary};
    letter-spacing: 0;
    font-weight: 400;
    line-height: 1.9em;
`)

export const Heading = (props) => {
    return (
        <Wrapper>
            <Box>
                <H1>{props.children}</H1>
            </Box>
        </Wrapper>
    )
}