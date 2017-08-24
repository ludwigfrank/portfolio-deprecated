import styled from 'emotion/react'
import { Wrapper, Box } from 'components/Grid'

const Ul = styled.ul`
    margin-left: 1.08em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
`

export const UnorderedList = (props) => {
    return (
        <Wrapper>
            <Box fluid={[8, 8, 10, 10]} center>
                <Ul>
                    {props.children}
                </Ul>
            </Box>
        </Wrapper>
    )
}