import { css, injectGlobal } from 'styled-components'

injectGlobal`
    body {
        margin: 0;
    }
`

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

export const flui = (arr, props) => {

    let val = `
        grid-column: span ${arr[0]};
        ${props.translate && `
            grid-column: ${props.translate[0]} / span ${arr[0]};
        `}
        ${props.grid && `
            display: grid;
            grid-template-columns: repeat(${arr[0]}, 1fr);
            grid-column-gap: ${config.def.gutter}px;
        `}
    `
    
    Object.keys(config.breakpoints).map((value, index) => {
        if (typeof arr[index + 1] != 'undefined') {
            val += `
                @media (max-width: ${config.breakpoints[value].width / 16}em) {
                    ${(props.translate) ? `
                        grid-column: ${props.translate[index + 1]} / span ${arr[index + 1]};
                        background: red;
                    ` : `
                        grid-column: span ${arr[index + 1]};
                    `}
                    ${props.grid && `
                        display: grid;
                        grid-template-columns: repeat(${arr[index + 1]}, 1fr);
                        grid-column-gap: ${config.breakpoints[value].gutter / 16}em;
                    `}
                }
            `
        } else {
            val += `
                @media (max-width: ${config.breakpoints[value].width / 16}em) {
                    grid-column: span ${config.columns};
                }
            `
        }
    })
    return val
}
