
import GetAllCategory from '@/api/GetAllCategory.api'
import CategorySwiper from '@/app/CategorySwiper/CategorySwiper';
import React from 'react'


export default  async function CategorySlider() {
    
  const data = await GetAllCategory();
  
  return <>
     <CategorySwiper  data={data}/>
  </>
}
