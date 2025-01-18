// 'use client'
// import React from 'react';
// import { FaAndroid } from "react-icons/fa";
// import {SocialIconsRow} from './social_icons_front_hero'
// import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';



// const VivekPortfolioHero = () => {
// const router = useRouter()

// const handleClick=()=>{
//   router.push('/products')
// }

//   return (
//     <div className=" min-h-screen flex flex-col justify-between p-4 sm:p-6 md:p-8">

      
//       <main className="flex-grow flex flex-col lg:flex-row items-center justify-between mt-8 lg:mt-0">
//         <div className="max-w-xl lg:max-w-2xl text-left z-10 lg:mr-8">
//           <h2 className="text-xl sm:text-2xl mb-2 text-green-400">Hey, this is</h2>
//           <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 tracking-tighter">
//             VIVEK
//           </h1>
//           <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed">
//             Tired of your phone feeling like a factory-made cookie-cutter? I am here to spice things up! I create custom ROMs and kernels that let you unlock your phone&apos;s true potential. Think faster, smoother, and more personalized.
//           </p>
          

//           <Button
//             size='lg'
//             onClick={handleClick}            
//             >
// View my works

//             </Button>

//      <SocialIconsRow/>

//         </div>
//         <div className="text-green-400 mt-8 lg:mt-0 animate-float lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
//           <FaAndroid className="w-72 h-72 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[70vh] lg:h-[70vh] lg:max-w-[90%] lg:max-h-[90%] lg:opacity-80" />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default VivekPortfolioHero;





'use client';
import React from 'react';
import Link from 'next/link';
import { FaAndroid } from 'react-icons/fa';
import { SocialIconsRow } from './social_icons_front_hero';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const VivekPortfolioHero = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/products');
  };

  return (
    <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-12">
      {/* Main Content */}
      <main className="flex-grow flex flex-col lg:grid lg:grid-cols-2 items-center gap-12">
        {/* Left Section */}
        <div className="text-left max-w-2xl space-y-6">
          <h2 className="text-lg sm:text-xl t">Hey, this is</h2>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            VIVEK
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl  leading-relaxed">
            Tired of your phone feeling like a factory-made cookie-cutter? I create custom ROMs and kernels to unlock your phone's true potential—faster, smoother, and personalized just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={handleClick}
            >
              View My Works
            </Button>
            <SocialIconsRow />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-center lg:justify-end">
          <FaAndroid className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-[60vh] lg:h-[60vh] text-gray-400 animate-bounce-slow" />
        </div>
      </main>
    </div>
  );
};

export default VivekPortfolioHero;
