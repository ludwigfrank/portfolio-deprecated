import styled from 'styled-components'
import { fluid, flui } from './lib'
import { Component } from 'react'

export const Box = styled.div`
    ${props => flui(props.fluid, props)};
`