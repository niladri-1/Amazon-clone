import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { darkLogo } from '../assets/index';
import { motion } from 'framer-motion';
import { RotatingLines } from 'react-loader-spinner';
import { duration } from '@mui/material';


const Registration = () => {
    const navigate = useNavigate()
    const auth = getAuth();
    const [clientName, setClientName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    //Error message
    const [errClientName, setErrClientName] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [errPassword, setErrPassword] = useState("");
    const [errCPassword, setErrCPassword] = useState("");
    const [firebaseErr, setFirebaseErr] = useState("");

    //Loading state start
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("")

    // Email validation start
    const emailValidation = (email) => {
        return String(email).toLowerCase().match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
    }


    //Handel function start
    const handleName = (e) => {
        setClientName(e.target.value)
        setErrClientName("")
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
        setErrEmail("")
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
        setErrPassword("")
    }
    const handleCPassword = (e) => {
        setCPassword(e.target.value)
        setErrCPassword("")
    }

    // Submit button start
    const handleRegistration = (e) => {
        e.preventDefault()
        if (!clientName) {
            setErrClientName("Enter your name");
        }
        if (!email) {
            setErrEmail("Enter your email");
        } else {
            if (!emailValidation(email)) {
                setErrEmail("Enter a valid E-mail");
            }
        }
        if (!password) {
            setErrPassword("Enter your password");
        } else {
            if (password.length < 6) {
                setErrPassword("Passwords must be at least 6 characters");
            }
        }
        if (!cPassword) {
            setErrCPassword("Enter your confirm password");
        } else {
            if (cPassword !== password) {
                setErrCPassword("Password not matched");
            }
        }

        if (clientName && email && emailValidation(email) && password && password.length >= 6 && cPassword && cPassword === password) {
            setLoading(true)
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    updateProfile(auth.currentUser, {
                        displayName: clientName,
                        photoURL: "https://niladri1.netlify.app/src/webp/vinod%20(2).png",
                    });
                    // Signed up
                    const user = userCredential.user;
                    setLoading(false)
                    setSuccessMsg("Account Created Successfully!");
                    setTimeout(() => {
                        navigate("/signin")
                    }, 3000)
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log(errorCode);
                    if (errorCode.includes("auth/email-already-in-use")) {
                        setFirebaseErr("Email Already in use, try another one")
                        setLoading(false)
                    }
                    // ..
                });
            setClientName("");
            setEmail("");
            setPassword("");
            setCPassword("");
            setFirebaseErr("")
        }
    }

    return (
        <div className='w-full'>
            <div className='w-full bg-gray-100 pb-10'>
                <form className='w-[370px] mx-auto flex flex-col items-center'>
                    <Link to="/"><img className='w-32' src={darkLogo} alt="Logo" /></Link>
                    <div className='w-full border border-zinc-200 p-6'>
                        <h2 className='font-titleFont text-3xl font-medium mb-4'>Create Account</h2>
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm font-medium'>Your Name</p>
                                <input onChange={handleName} value={clientName} className='w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100' type="text" />
                                {errClientName && (
                                    <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                        <span className='italic font-titleFont font-extrabold text-base'>!</span>
                                        {errClientName}
                                    </p>
                                )
                                }
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm font-medium'>Email or mobile phone number</p>
                                <input onChange={handleEmail} value={email} className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100' type="email" />
                                {errEmail && (
                                    <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                        <span className='italic font-titleFont font-extrabold text-base'>!</span>
                                        {errEmail}
                                    </p>
                                )
                                }
                                {firebaseErr && (
                                    <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                        <span className='italic font-titleFont font-extrabold text-base'>!</span>
                                        {firebaseErr}
                                    </p>
                                )
                                }
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm font-medium'>Password</p>
                                <input onChange={handlePassword} value={password} className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100' type="password" />
                                {errPassword && (
                                    <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                        <span className='italic font-titleFont font-extrabold text-base'>!</span>
                                        {errPassword}
                                    </p>
                                )
                                }
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm font-medium'>Re-enter Password</p>
                                <input onChange={handleCPassword} value={cPassword} className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100' type="password" />
                                {errCPassword && (
                                    <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                        <span className='italic font-titleFont font-extrabold text-base'>!</span>
                                        {errCPassword}
                                    </p>
                                )
                                }
                                <p className='text-xs text-gray-600'>Passwords must be at least 6 characters.</p>
                            </div>
                            <button onClick={handleRegistration} className='w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput mt-2'>
                                Continue
                            </button>
                            {loading && (
                                <div className='flex justify-center'>
                                    <RotatingLines
                                        strokeColor="#febd69"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="50"
                                        visible={true}
                                    />
                                </div>
                            )}
                            {successMsg && (
                                <div>
                                    <motion.p
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className='text-base font-titleFont font-semibold text-gray-500 border-[1px] border-green-500 px-2 text-center'
                                    >
                                        {successMsg}</motion.p>
                                </div>
                            )
                            }
                        </div>
                        <p className='text-xs text-black leading-4 mt-4'>
                            By Continuing, you agree to Amazon's{" "}
                            <span className='text-blue-600 cursor-pointer hover:underline'>Conditions of Use{" "}</span>and{" "}
                            <span className='text-blue-600 cursor-pointer hover:underline'>Privace Notice.</span>
                        </p>
                        <div>
                            <p className='text-xs text-black'>Already have an account? {" "}
                                <Link to="/signin">
                                    <span className='text-sx text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Sign in{" "}<span><ArrowRightIcon /></span></span>
                                </Link>
                            </p>
                            <p className='text-xs text-black'>Buying for work?
                                <span className='text-sx text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>{" "} Create a free business account
                                    <span><ArrowRightIcon /></span>
                                </span>
                            </p>
                        </div>
                    </div>
                </form>
            </div >
            <div className='w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 py-10 items-center'>
                <div className='flex items-center gap-6 justify-center '>
                    <p className='text-sm text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Condition of Use</p>
                    <p className='text-sm text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Privacy Notice</p>
                    <p className='text-sm text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Privacy Notice</p>
                </div>
                <p className='text-sm text-gray-600'>© 1996-2024, ReactBd.com, Inc. or its affiliates</p>
            </div>
        </div >
    )
}

export default Registration