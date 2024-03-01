import React from 'react'
import { useLoaderData } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import ApiIcon from '@mui/icons-material/Api';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch } from 'react-redux';
import { addToCard } from '../../redux/amazonSlice';

const Products = () => {
    const dispatch = useDispatch();
    const data = useLoaderData();
    const productData = data.data;
    return (
        <div className='max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-10 px-4'>
            {
                productData.map((item) => (
                    <div key={item.id} className='bg-white h-auto boder-[1px] border-gray-200 py-8 z-30 hover:border-transparent
                            shadow-none hover:shadow-testShadow duration-200 relative flex flex-col gap-4'>
                        <span className='text-sm capitalize italic absolute top-2 right-2 text-gray-500'>{item.category}</span>
                        <div className='w-full h-auto flex items-center justify-center relative group'>
                            <img className='w-52 h-64 object-contain' src={item.image} alt="Product-Img" />
                            <ul className='w-full h-36 bg-gray-100 absolute bottom-[-170px] flex flex-col items-end justify-center
                                    gap-2 font-titleFont px-2 border-l border-r group-hover:bottom-0 duration-700'>
                                <li className='productLi'>Compare {" "}<span><ApiIcon /></span></li>
                                <li className='productLi'>Add to Cart {" "}<span><ShoppingCartIcon /></span></li>
                                <li className='productLi'>View Details {" "}<span><ArrowCircleRightIcon /></span></li>
                                <li className='productLi'>Add to Wishlist {" "}<span><FavoriteIcon /></span></li>
                            </ul>
                        </div>
                        <div className='px-4 z-10 bg-white'>
                            <div className='flex items-center justify-between'>
                                <h2 className='font-titleFont tracking-wide text-lg text-amazon_blue font-medium'>{item.title.substring(0, 20)}</h2>
                                <p className='text-sm text-gray-600 font-semibold'>${item.price}</p>
                            </div>
                            <div>
                                <p className='text-sm'>{item.description.substring(0, 100)}...</p>
                                <div className='text-yellow-500'>
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                </div>
                            </div>
                            <button onClick={() => dispatch(addToCard({
                                id: item.id,
                                title: item.title,
                                description: item.description,
                                price: item.price,
                                category: item.category,
                                image: item.image,
                                quantity: 1,
                            }))} className='addtocart'>Add to Cart</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Products