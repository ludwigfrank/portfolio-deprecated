export const DEFAULT_THEME = {
    color: {
        neutral: {
            1: '#121023',
            2: '#1b2733',
            3: '#3f5061',
            4: '#515665',
            5: '#3f5061',
            6: '#3f5061',
            7: '#dfdfe0',
            8: '#EAEAEC',
            9: '#f8f8f9',
            0: '#ffffff'
        },
        shadow: {
            0: '0 0px 0px 0px rgba(0 ,0 , 0, 0)',
            1: '0 8px 16px -2px rgba(22, 1, 17, 0.1)',
            3: '0 20px 40px -2px rgba(22, 1, 17, 0.16)'
        }
    },
    font: {
        primary: 'aktiv-grotesk',
        secondary: 'chaparral-pro-caption',
        style: {
            lineHight: '2em',
            fontSize: '2em'
        }
    },
    grid: {
        columns: 12,
        width: '1152px',
        breakpoints: {
            def: {
                width: 1260,
                gutter: 40,
                maxWidth: '85%',
                color: '#8F75D5'
            },
            lg: {
                width: 1260,
                gutter: 32,
                maxWidth: '85%',
                color: '#FD7988'
            },
            md: {
                width: 960,
                gutter: 28,
                maxWidth: '85%',
                color: '#F6AB99'
            },
            sm: {
                width: 720,
                gutter: 16,
                maxWidth: '100%',
                color: '#F1DDAE'
            }
        }
    },
    size: {
        half: 4,
        one: 8,
        two: 16,
        three: 32
    }
}