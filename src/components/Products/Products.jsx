import React, {useEffect, useState} from 'react'
import axios from "axios";
import {InfinitySpin} from "react-loader-spinner";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import {useQuery} from "react-query";

export default function Products() {
    // const [productsList,setProducts] = useState([])
    // const [isLoading, setLoading] = useState(false)

   async function getProducts() {
    return await    axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }

    let {data,isLoading} = useQuery('product',getProducts,)




    return (
        <div className={''}>
            {isLoading !== true?
                <div className={'row gy-3'}>
                    {data.data.data.map((product) => {
                        return <div className={'col-md-3  '} key={product._id}>
                            <div className={'product h-100 p-5 d-flex justify-content-between flex-column  '}>
                                <img src={product.imageCover} className={'w-100 '} alt={product.title}/>
                                <p className={''}>{product.category.name}</p>
                                <h6 className={'text-main '}>{product.title}</h6>
                                <div className={'d-flex my-3 justify-content-between  w-100'}>
                                    <p>{product.price} EGP</p>
                                    <p className={''}>
                                        {product.ratingsAverage}
                                        <i className={'fa-solid fa-star'}></i>
                                    </p>
                                </div>
                                <button className={'btn btn-success  my-2 w-100'}>Add to Cart</button>
                            </div>

                        </div>
                    })}
                </div>
                :
              <LoadingComponent/>

            }
        </div>
    )
}
