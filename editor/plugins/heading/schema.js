import { Box, Wrapper } from '../../../components/Grid'
import { H1, H2, H3 } from '../../../components/text/Heading'

export const schema = {
    nodes: {
        'heading-one': props => 
            {<Wrapper>
                <Box fluid={[8, 8, 10, 10]} center data-key={props.attributes['data-key']}>
                    <H1>{props.children}</H1>
                </Box>
            </Wrapper>},
        'heading-two': props => 
            <Wrapper>
                <Box fluid={[8, 8, 10, 10]} center data-key={props.attributes['data-key']}>
                    <H2>{props.children}</H2>
                </Box>
            </Wrapper>,
        'heading-three': props => 
            <Wrapper>
                <Box fluid={[8, 8, 10, 10]} center data-key={props.attributes['data-key']}>
                    <H3>{props.children}</H3>
                </Box>
            </Wrapper>,
    },
}