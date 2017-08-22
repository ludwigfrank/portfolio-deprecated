import styled from 'emotion/react'
import { UnorderedList } from 'components/text/List'

const ListItem = styled.li`
    font-family: Maison Neue;
    font-size: 1.12em;
    color: #1B2733;
    letter-spacing: 0;
    line-height: 1.9em; 
    padding-left: 0.5em;
`

export const schema = {
    nodes: {
        'bulleted-list': props => <UnorderedList>{props.children}</UnorderedList>,
        'list-item': props => <ListItem>{props.children}</ListItem>
    },
}