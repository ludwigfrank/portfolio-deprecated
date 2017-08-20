import React from 'react'
import { Wrapper } from './Wrapper'
import { Guides } from './Guides'
import { Box } from './Box'

const Home = (props) => {
  return (
    <div>
        <Wrapper>
            <Box fluid={[4, 6, 4, 8]} translate={[5, 4, 5, 3]} grid>
                <Box fluid={[3, 3, 3, 3]} grid></Box>
                <Box fluid={[1, 2, 1, 1]} translate={[4, 7, 4, 3]}></Box>
            </Box>
        </Wrapper>
        <Guides></Guides>
    </div>
  )
}

export default Home