import { Box, Wrapper } from '../../../components/Grid'
import styled from 'reac-emotion'


export const schema = {
    nodes: {
        'heading-one': props => 
            {<Wrapper>
                <Box fluid={[8, 8, 10, 10]} center data-key={props.attributes['data-key']}>
                    <H1>{props.children}</H1>
                </Box>
            </Wrapper>},
    },
}