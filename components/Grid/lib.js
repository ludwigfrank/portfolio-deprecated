import { css } from 'emotion'

export const config = {
    columns: 12,
    max_width: '1152px',
    breakpoints: {
        lg: { width: 1260, gutter: 32, max_width: '85%',  color: '#FD7988' },
        md: { width: 960,  gutter: 28, max_width: '85%',  color: '#F6AB99' },
        sm: { width: 720,  gutter: 16, max_width: '100%', color: '#F1DDAE' },
        // xs: { width: 376,  gutter: 16 },
    },
    def: { width: 1260, gutter: 40, max_width: '85%',  color: '#8F75D5' }
}

// iterate through the sizes and create a media template
export const media = Object.keys(config.breakpoints).reduce((accumulator, label) => {
    // use em in breakpoints to work properly cross-browser and support users
    // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
    const emSize = config.breakpoints[label].width / 16
    accumulator[label] = (...args) => css`
        @media (max-width: ${emSize}em) {
            ${css(...args)}
        }
    `
    return accumulator
}, {})


  /**
   * Generate the columns for the fluid layout.
   * Pass 'grid' as a prop generate a subgrid of the given node.
   * Pass 'translate' as a prop with an array as value to translate. You can also 
   * pass 'center' as a value to automaticly center the element.
   * 
   * @param {Array} arr
   * @param {Object} props
   * @return {String}
   */

export const fluid = (props) => Object.keys(config.breakpoints).reduce((accumulator, label, index) => {
    const emSize = config.breakpoints[label].width / 16
    let gridColumn

    if (typeof props.fluid[index + 1] == 'number') {
        gridColumn = `span ${props.fluid[index + 1]}`
    } else {
        gridColumn = `span ${config.columns}`
    }

    accumulator[`@media (max-width: ${emSize}em)`] = {
        gridColumn
    }
    return accumulator
}, 
    {
        gridColumn: `span ${props.fluid[0]}`
    }
)