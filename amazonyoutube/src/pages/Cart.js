import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';
import { decrementQuantity, deleteItem, incrementQuantity, resetCart } from '../redux/amazonSlice';
import { emptyCart } from "../assets/index";
import { Link } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.amazon.products);
    const [totalPrice, setTotalPrice] = useState("")
    useEffect(() => {
        let Total = 0;
        products.map((item) => {
            Total += item.price * item.quantity;
            return setTotalPrice(Total.toFixed(2))
        })
    }, [products])

    return (
        <div className="w-full bg-gray-100 p-4"> {
            products.length > 0 ? (
                <div className="container mx-auto h-auto grid grid-cols-5 gap-8">
                    <div className="w-full h-full bg-white px-4 col-span-4">
                        <div className="font-titleFont flex items-center justify-between border-b-[1px] border-b-gray-400 py-3">
                            <h2 className='text-3xl font-medium'>Shopping Card</h2>
                            <h4 className='text-xl font-normal'>Subtitle</h4>
                        </div>
                        {/* Products starts here */}
                        <div> {
                            products.map((item) => (
                                <div key={item.id} className='w-full border-b-[1px] border-gray-300 p-4 flex items-center gap-6'>
                                    <div className='w-full flex items-center justify-between gap-6'>
                                        <div className='w-1/5'>
                                            <img className='w-full h-44 object-contain' src={item.image} alt="Products-Img" />
                                        </div>
                                        <div className='w-3/5'>
                                            <h2 className='font-semibold text-lg'>{item.title}</h2>
                                            <p className='text-sm'>{item.description.substring(0, 200)}</p>
                                            <p className='text-base mt-4'>Unit Price: <span className="font-semibold">${item.price}</span></p>
                                            <div className="bg-[#f0f2f2] flex justify-center items-center gap-1 w-24 py-1 text-center drop-shadow-lg rounded-md">
                                                <p>Qty: </p>
                                                <p onClick={() => dispatch(decrementQuantity(item.id))} className='qtyclass'>-</p>
                                                <p>{item.quantity}</p>
                                                <p onClick={() => dispatch(incrementQuantity(item.id))} className='qtyclass'>+</p>
                                            </div>
                                            <button onClick={() => dispatch(deleteItem(item.id))} className='bg-red-500 w-36 rounded-lg text-white mt-2 hover:bg-red-700 active:bg-red-900 duration-300'>Delete Item</button>
                                        </div>
                                        <div>
                                            <p className="text-lg font-titleFont font-semibold">${item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                        <div className='w-full py-2'>
                            <button onClick={() => dispatch(resetCart())} className='px-10 py-2 bg-red-500 hover:bg-red-600 active:bg-red-500 text-white rounded-lg font-titleFont font-semibold text-lg tracking-wide'>Clear Cart</button>
                        </div>
                    </div>
                    <div className="w-full h-52 bg-white col-span-1 flex flex-col justify-center items-center p-4">
                        <div>
                            <p className='flex gap-2 items-start text-sm'>
                                <span>
                                    <CheckCircleIcon className='bg-white text-green-500 rounded-full' />
                                </span>{" "}
                                Your order qualifies for FREE Shipping Choose this option at checkout. See details....
                            </p>
                        </div>
                        <div>
                            <div>
                                <p className='font-semibold px-10 py-1 flex items-center gap-2 justify-between'>
                                    Total: <span className='text-lg font-bold'>${totalPrice}</span>
                                </p>
                            </div>
                            <button className='proceedTopay_btn'>Proceed to Pay</button>
                        </div>
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ y: 70, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className='flex justify-center items-center gap-4 py-10'>
                    <div>
                        <img className='w-80 rounded-lg p-4 mx-auto' src={emptyCart} alt="EmptyCartImg" />
                    </div>
                    <div className='w-96 p-4 bg-white flex flex-col items-center rounded-md shadow-lg'>
                        <h1 className='font-titleFont text-xl font-bold'>Your Cart feels lonely!</h1>
                        <p className='text-sm text-center'>
                            Your Shopping cart lives to serve. Give it purpose - fill it with books, electronics, videos, etc. and make it happy.
                        </p>
                        <Link className='w-full' to="/"><button className='continueshop'>Contiue Shopping</button></Link>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

export default Cart