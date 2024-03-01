import React, { useEffect, useRef, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {motion} from "framer-motion";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SideNavContent from './SideNavContent';



const HeaderBottom = () => {
    const ref=useRef();
    const [sidebar, setSidebar] = useState(false);
    useEffect(()=>{
        document.body.addEventListener("click",(e)=> {
            if(e.target.contains(ref.current)){
                setSidebar(false)
            }
        })
    },[ref,sidebar])
    return (
        <div className='w-full px-4 h-[36px] bg-amazon_light text-white flex items-center'>
            {/* ========================= ListItems Start Here ======================== */}
            <ul className='flex items-center gap-2 text-sm tracking-wide'>
                <li onClick={() => setSidebar(true)} className='headerHover flex items-center gap-1'><MenuIcon />All</li>
                <li className='headerHover hidden md:inline-flex'>Today's Deals</li>
                <li className='headerHover hidden md:inline-flex'>Customar Service</li>
                <li className='headerHover hidden md:inline-flex'>Gift Cards</li>
                <li className='headerHover hidden md:inline-flex'>Registars</li>
                <li className='headerHover hidden md:inline-flex'>Sell</li>
            </ul>
            {/* ========================= ListItems End Here ========================== */}
            {/* ========================= SideNav Start Here ========================== */}
            {
                sidebar && (
                    <div className='w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-80'>
                        <div className='w-full h-full relative'>
                            <motion.div ref={ref} initial={{x:-500,opacity:0}} animate={{x:0, opacity:1}} transition={{duration:.5}} className='w-[80%] md:w-[350px] h-full bg-white border border-black'>
                                <div className='w-full bg-amazon_light text-white py-2 px-6 flex items-center gap-4'>
                                    <AccountCircleIcon />
                                    <h3 className='font-titleFont font-bold text-lg tracking-wide'>
                                        Hello, Sign in</h3>
                                </div>
                                <SideNavContent
                                    title= "Digital Content & device"
                                    one= "Amazon Music"
                                    two= "Kindle E-readers & Books"
                                    three= "Amazon Appstore"
                                />
                                <SideNavContent
                                    title= "Shop By Department"
                                    one= "Electronics"
                                    two= "Computer"
                                    three= "Smart Home"
                                />
                                <SideNavContent
                                    title= "Programs & Features"
                                    one= "Gift Cards"
                                    two= "Amazon Live"
                                    three= "International Shopping"
                                />
                                <SideNavContent
                                    title= "Help & Settings"
                                    one= "Your Account"
                                    two= "customer Service"
                                    three= "Contact us"
                                />
                            <span onClick={()=> setSidebar(false)} className='cursor-pointer absolute top-0 left-[82%] md:left-[360px] w-10 h-10 text-gray-400 flex items-center justify-center borde hover:text-gray-200 duration-300'>
                                <CloseIcon /></span>
                            </motion.div>
                        </div>
                    </div>
                )
            }
            {/* ========================= SideNav End Here ============================ */}
        </div>
    );
}

export default HeaderBottom