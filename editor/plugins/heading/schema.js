import styled from 'styled-components'
import { Box } from '../../../components/Grid'

const H1 = styled.h1`
    font-family: KievitSlabPro;
    font-size: 2.6em;
    color: #121023;
    letter-spacing: 0;
    line-height: 28px;
    font-weight: normal;
    margin-bottom: 1.5em;
    margin-top: 4em;
`

const H2 = styled.h2`
    font-family: KievitSlabPro;
    font-size: 2.2em;
    color: #121023;
    letter-spacing: 0;
    line-height: 28px;
    font-weight: normal;
    margin-bottom: 0.8em;
    margin-top: 1.5em;
`

const H3 = styled.h3`
    font-family: KievitSlabPro;
    font-size: 1.9em;
    color: #121023;
    letter-spacing: 0;
    line-height: 28px;
    font-weight: normal;
    margin-bottom: 0.5em;
    margin-top: 1em;
`

export const schema = {
    nodes: {
        'heading-one': props => 
            <Box fluid={[12, 12, 12, 12]} data-key={props.attributes['data-key']}>
                <H1>{props.children}</H1>
            </Box>,
        'heading-two': props => 
            <Box fluid={[12, 12, 12, 12]} data-key={props.attributes['data-key']}>
                <H2>{props.children}</H2>
            </Box>,
        'heading-three': props => 
            <Box fluid={[12, 12, 12, 12]} data-key={props.attributes['data-key']}>
                <H3>{props.children}</H3>
            </Box>,
    },
}