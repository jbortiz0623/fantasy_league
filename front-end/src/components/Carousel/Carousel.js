import React, {Component} from 'react';
import {Carousel} from 'react-materialize'

class Slider extends Component {
    render() {
        return (
            <Carousel className="carousel" options={{ fullWidth: true, indicators: true  }} images={[
                '../images/nbaden.jpg',
                '../images/nbaeast.jpg',
                '../images/nbala.jpg',
                '../images/nbawest.jpg'
            ]} />
      );
    }
}

export default Slider;