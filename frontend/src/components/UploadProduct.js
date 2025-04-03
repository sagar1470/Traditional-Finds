import React, { use, useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory.js';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage.js';
import DisplayImage from './DisplayImage.js';
import { MdDelete } from "react-icons/md";


const UploadProduct = ({
  onClose
}) => {

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",

  })
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false)


  const handleOnChange = (e) => {


  }

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0]

    const uploadImageCloudinary = await uploadImage(file)
    setData((perve) => {
      return {
        ...perve,
        productImage: [...perve.productImage, uploadImageCloudinary.url],

      }
    })
  }

  const handleDeleteProductImage = async(index)=>{
   console.log("image", index);

   const newProductImage = [...data.productImage]
   newProductImage.splice(index, 1)

   setData((perve) => {
    return {
      ...perve,
      productImage: [...newProductImage],

    }
  })

  
  }


  return (
    <div className='w-full h-full fixed bg-slate-200 bg-opacity-60 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-3xl h-full max-h-[85%] overflow-hidden pb-5'>

        <div className='flex justify-between items-center mt-4 mb-2'>
          <h2 className='text-lg font-bold'> Upload Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer ' onClick={onClose}>
            <CgClose />
          </div>
        </div>


        {/* upload section */}

        <form className='grid p-5 gap-2 overflow-y-scroll h-full scrollbar scrollbar-thick scrollbar-thumb-gray-500 scrollbar-track-gray-300 '>
          <label htmlFor='productName' className='mt-2' >Product Name :</label>
          <input
            type='text'
            id='productsName'
            name='productName'
            placeholder='enter product name'
            value={data.productName}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded '
          />

          <label htmlFor='brandName' className='mt-4' >Brand Name :</label>
          <input
            type='text'
            id='brandsName'
            name='brandName'
            placeholder='enter Brand name'
            value={data.brandName}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded '
          />

          <label htmlFor='category' className='mt-4 ' >Category :</label>
          <select value={data.category} className='p-2 cursor-pointer bg-slate-100 border rounded '>
            {
              productCategory.map((el, index) => {
                return (
                  <option value={el.value} key={el.value + index}>{el.label}</option>
                )
              })
            }
          </select>

          {/* upload product image */}
          <label htmlFor='productImage' className='mt-3' >Product Image :</label>

          <label htmlFor='uploadImageInput'>
            <div className='p-2 bg-slate-100 border rounded h-72 w-full flex justify-center items-center cursor-pointer'>

              <div className='text-slate-500 flex justify-center items-center flex-col gap-1'>
                <span className='text-7xl'> <FaCloudUploadAlt /> </span>
                <p className='text-sm text-red-400'>Upload Product image</p>
                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
              </div>

            </div>
          </label>
          <div>
            {
              data?.productImage[0] ? (
                <div className='flex items-center gap'>
                  {
                    data.productImage.map((el, index) => {
                      return (
                        <div className='relative group '>
                          <img
                            src={el}
                            width={120}
                            height={120}
                            alt={el}
                            className='bg-slate-100 border m-1 cursor-pointer'
                            onClick={() => {
                              setOpenFullScreenImage(true)
                              setFullScreenImage(el)
                            }} />

                            <div className='absolute bottom-1 right-1 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                            <MdDelete />
                            </div>
                        </div>

                      )
                    })
                  }
                </div>

              ) : (
                <p className='text-red-600 text-xs'>"Please upload product Image</p>
              )
            }

          </div>

          <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700 '>Upload  Product</button>
        </form>


      </div>

      {/* *** Display image full screen */}
      {
        openFullScreenImage && (
          <DisplayImage onClose={() => { setOpenFullScreenImage(false) }} imgUrl={fullScreenImage} />
        )

      }


    </div>
  )
}

export default UploadProduct