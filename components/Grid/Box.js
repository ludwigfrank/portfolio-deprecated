import styled from 'emotion/react'
import { fluid } from './lib'
import { Component } from 'react'

export const Box = styled.div`
    ${props => fluid(props)};
`