import React from 'react'
import Slider from "react-slick";
import img1 from '../../assets/img1.jpg'
import img2 from '../../assets/img2.jpg'
import img3 from '../../assets/img3.jpg'
export default function HomeSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className={'row g-0'}>
            <div className={'col-md-8'}>
                <Slider {...settings}>
                    <img src={img3} alt={'img'} height={'500'}/>
                    <img src={img3} alt={'img'} height={'500'}/>
                    <img src={img3} alt={'img'} height={'500'}/>
                </Slider>
            </div>

            <div className={'col-md-4'}>
                <img src={img2} alt={'img'} height={'250'}/>
                <img src={img3} alt={'img'} height={'250'}/>
            </div>


        </div>
    )
}
