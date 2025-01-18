'use client'
import React from 'react';
import Link from 'next/link';
import { FaAndroid } from "react-icons/fa";
import {SocialIconsRow} from './social_icons_front_hero'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';



const VivekPortfolioHero = () => {
const router = useRouter()

const handleClick=()=>{
  router.push('/products')
}

  return (
    <div className=" min-h-screen flex flex-col justify-between p-4 sm:p-6 md:p-8">

      
      <main className="flex-grow flex flex-col lg:flex-row items-center justify-between mt-8 lg:mt-0">
        <div className="max-w-xl lg:max-w-2xl text-left z-10 lg:mr-8">
          <h2 className="text-xl sm:text-2xl mb-2 text-green-400">Hey, this is</h2>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 tracking-tighter">
            VIVEK
          </h1>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed">
            Tired of your phone feeling like a factory-made cookie-cutter? I am here to spice things up! I create custom ROMs and kernels that let you unlock your phone&apos;s true potential. Think faster, smoother, and more personalized.
          </p>
          {/* <Link 
            href="/products" 
            className="inline-block bg-green-400 text-black py-2 px-6 sm:py-3 sm:px-8 rounded-full font-bold hover:bg-green-300 transition-colors duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            View my works
          </Link> */}

          <Button
            size='lg'
            onClick={handleClick}            
            >
View my works

            </Button>

     <SocialIconsRow/>

        </div>
        <div className="text-green-400 mt-8 lg:mt-0 animate-float lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
          <FaAndroid className="w-72 h-72 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[70vh] lg:h-[70vh] lg:max-w-[90%] lg:max-h-[90%] lg:opacity-80" />
        </div>
      </main>
    </div>
  );
};

export default VivekPortfolioHero;
