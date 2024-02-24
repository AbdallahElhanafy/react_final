import React, {useEffect, useState} from 'react'
import Slider from "react-slick";
import axios from "axios";
import Brands from "../Brands/Brands";

export default function Category() {

const [categories,setCategories] = useState([])

   async function getCategory() {
   let {data} =  await  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
       setCategories(data.data)
    }

    useEffect(() => {
        getCategory()
    }, []);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };

    return (
        <div>
            <Slider {...settings}>
                {
                    categories.map((category,index) =>{
                       return <div key={index}>
                           <img height={'300'} className={'w-100'} alt={'img'} src={category.image}/>
                           <h6>{category.name}</h6>
                       </div>
                    })
                }



            </Slider>
            <Brands/>

        </div>
    )
}
