import React, { Component } from 'react'
import { string, object, func, number } from 'prop-types'
import styled from 'styled-components'

// TODO: add new animation with shutter and scale
const absolutePositioning = props => props.absolutePositioning && 'position: absolute'
const ImgWrapper = styled.div`
    height: ${props => props.height};
    width: ${props => props.width};
    overflow: hidden;
    background: black;
    ${absolutePositioning}
    position: relative;
    transition: all 0.3s ease;
    ${props => props.shadow} {
        box-shadow: 0px 16px 32px rgba(0,0,0,0.16), 0px 8px 16px rgba(0,0,0,0.16), 0px 4px 8px rgba(0,0,0,0.16)
    }
`

ImgWrapper.propTypes = {
    height: string.isRequired,
    width: string.isRequired
}

const Img = styled.div`
    background: url(${props => props.imageSrc}) center center;
    filter: ${props => props.isLoaded ? 'blur(0px)' : 'blur(20px)'};
    transform: ${props => props.isLoaded ? 'scale(1)' : 'scale(1.5)'};

    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    transition: transform 1.3s, filter 0.7s ease;
    z-index: 1;
`

export default class ProgressiveImage extends Component {

    static propTypes = {
        placeholder: string,
        src: string,
        onError: func,
        onLoad: func,
        config: object,

        width: string,
        height: string,
    }

    static defaultProps = {
        onError: () => console.log('Error loading image XY'),
        src: '../../../static/images/sea.jpg',
        placeholder: '../../../static/images/sea-prev.jpg',
        config: { rootMargin: '50px 0px', threshhold: 0.01 },
        height: '200px',
        width: '100%',
    }

    state = {
        isLoaded: false,
        image: this.props.placeholder,
        observer: null,
        supportsIntersectionObserver: false,
        theNode: null,
        observed: false
    }

    componentDidMount () {
        const { src } = this.props

        // if intersectionObserver is not supportet, load the image immidiatly.
        if (!('IntersectionObserver' in window)) { 
            this.loadImage(src) 
        } else {
            // set the observer which listens to wether the image is inside the viewport
            this.setState({ observer: new IntersectionObserver(this.onObserverUpdate, this.props.config) }, () => {
                if (this.node) this.state.observer.observe(this.node)
            })
        }
    }

    componentWillReceiveProps (nextProps) {
        const { src, placeholder } = nextProps

        // We only invalidate the current image if the src has changed.
        if (src !== this.props.src) {
            this.innerImage.style.transform = 'scale(1.2)'
            this.innerImage.style.opacity = 0
            setTimeout(() => {
                this.innerImage.style.transform = 'scale(1)'
                this.innerImage.style.opacity = 1
                this.setState({ image: placeholder }, () => {
                    this.loadImage(src)
                })
            }, 150)
        }
    }

    componentWillUnmount () {
        if (this.image) {
            this.image.onload = null
            this.image.onerror = null
        }

        if('IntersectionObserver' in window) this.state.observer.disconnect()
    }

    loadImage = (src) => {
        if (this.image) {
            this.image.onload = null
            this.image.onerror = null
        }

        const image = new Image()
        this.image = image
        image.onload = this.onLoad
        image.onerror = this.onError
        image.src = src
    }


    onObserverUpdate = (entries) => {
        console.log('intersecting')
        entries.forEach(entry => {
            if (entry.intersectionRatio < 0) {
                return
            }
            if (entry.isIntersecting) {
                this.loadImage(this.props.src)
            }
        })
    }

    onLoad = () => {
        // use this.image.src instead of this.props.src to
        // avoid the possibility of props being updated and the
        // new image loading before the new props are available as
        // this.props.
        this.setState({
            isLoaded: true,
            image: this.image.src
        })
    }

    onError = (errorEvent) => {
        const { onError } = this.props
        if (onError) onError(errorEvent)
    }

    render () {
        const { width, height, onClick } = this.props
        const { image, isLoaded } = this.state
        return (
            <div ref={ node => this.node = node } onClick={onClick}>
                <ImgWrapper width={ width } height={ height }>
                    <div ref={ element => this.innerImage = element } style={{ width: '100%', height: '100%', transition: 'all 0.2s ease-out'}}>
                        <Img imageSrc={ image } isLoaded={ isLoaded } />
                    </div>
                </ImgWrapper>
            </div>

        )
    }
}