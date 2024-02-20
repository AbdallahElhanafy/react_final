import React from 'react'
import axios from "axios";
import {useQuery} from "react-query";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

export default function Brands() {
   async function getBrands() {
      return  await  axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    }

    let {data,isLoading,isFetching}=useQuery('brands',getBrands, )


    return (
        <div>
            {isLoading !== true ?
                <div className={'row gy-2'}>{
                    data.data.data.map((brand) => {
                        return <div className={'col-md-3'} key={brand._id}>
                            <img src={brand.image} className={'w-100'} alt={'brand-img'}/>

                        </div>
                    })

                }</div>

                :
                <LoadingComponent/>
            }

        </div>

    )
}
