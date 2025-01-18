// 'use client'
// import {
//   Navbar as NextUINavbar,
//   NavbarContent,
//   NavbarMenu,
//   NavbarMenuToggle,
//   NavbarBrand,
//   NavbarItem,
//   NavbarMenuItem,
// } from "@nextui-org/navbar";
// import {Avatar} from '@nextui-org/react'
// import { Link } from "@nextui-org/link";
// import { link as linkStyles } from "@nextui-org/theme";
// import NextLink from "next/link";
// import clsx from "clsx";

// import { siteConfig } from "@/config/site";
// import { ThemeSwitch } from "@/components/theme-switch";

// export const Navbar = () => {


//   return (
//     <NextUINavbar maxWidth="xl" position="sticky">
//       <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
//         <NavbarBrand as="li" className="gap-3 max-w-fit">
         
//           <NextLink className="flex justify-start items-center gap-1" href="/">
//           <Avatar showFallback size="sm" src="https://firebasestorage.googleapis.com/v0/b/react-98765.appspot.com/o/assets%2Fme.jpg?alt=media&token=b955e7b3-74ae-4169-bc6c-a984a6aeab3c" alt="" />
//             <p className="font-bold text-inherit">Hackneyed</p>
//           </NextLink>
//         </NavbarBrand>
//         <ul className="hidden lg:flex gap-4 justify-start ml-2">
//           {siteConfig.navItems.map((item) => (
//             <NavbarItem key={item.href}>
//               <NextLink
//                 className={clsx(
//                   linkStyles({ color: "foreground" }),
//                   "data-[active=true]:text-primary data-[active=true]:font-medium",
//                 )}
//                 color="foreground"
//                 href={item.href}
//               >
//                 {item.label}
//               </NextLink>
//             </NavbarItem>
//           ))}
//         </ul>
//       </NavbarContent>

//       <NavbarContent
//         className="hidden sm:flex basis-1/5 sm:basis-full"
//         justify="end"
//       >
//         <NavbarItem className="hidden sm:flex gap-2">
          
//           <ThemeSwitch />
//         </NavbarItem>
      
//       </NavbarContent>

//       <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        
//         <ThemeSwitch />
//         <NavbarMenuToggle />
//       </NavbarContent>

//       <NavbarMenu>
//         <div className="mx-4 mt-2 flex flex-col gap-2">
//           {siteConfig.navMenuItems.map((item, index) => (
//             <NavbarMenuItem key={`${item}-${index}`}>
//               <Link
//                 color="foreground"
                
//                 href={item.href}
//                 size="lg"
//               >
//                 {item.label}
//               </Link>
//             </NavbarMenuItem>
//           ))}
//         </div>
//       </NavbarMenu>
//     </NextUINavbar>
//   );
// };




// 'use client'
// import { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Menu, X } from 'lucide-react';
// import {ModeToggle} from '@/components/theme-switch'

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const menuItems = [
//     { text: 'Home', href: '/' },
//     { text: 'Products', href: '/products' },
//     // { text: 'Services', href: '' },
//     { text: 'Contact', href: '/contact' }
//   ];

//   return (
//     <>
//       <nav className="bg-white border-b relative z-10 sticky top-0">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <div className="flex-shrink-0">
//               <Link href="/" className="text-xl font-bold text-gray-800">
//                          {/* <Image
//                          height={25}
//                          width={25}
//                             src="https://firebasestorage.googleapis.com/v0/b/react-98765.appspot.com/o/assets%2Fme.jpg?alt=media&token=b955e7b3-74ae-4169-bc6c-a984a6aeab3c" alt="" /> */}

//                 Hackneyed
//               </Link>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex space-x-8">
//               {menuItems.map(item => (
//                 <Link
//                   key={item.text}
//                   href={item.href}
//                   className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
//                 >
//                   {item.text}
//                 </Link>
//               ))}
//               <ModeToggle/>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="md:hidden flex items-center">
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="text-gray-600 hover:text-gray-900 focus:outline-none"
//               >
//                 {isOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Mobile Menu Sidebar */}
//       <div 
//         className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out md:hidden z-30
//           ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <div className="px-4 py-6">
//           {/* Close button in sidebar */}
//           <button
//             onClick={() => setIsOpen(false)}
//             className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
//           >
//             <X size={24} />
//           </button>

//           {/* Logo in sidebar */}
//           <div className="mb-8">
//             <Link href="/" className="text-xl font-bold text-gray-800">
//               Logo
//             </Link>
//           </div>

//           {/* Menu items */}
//           <div className="space-y-3">
//             {menuItems.map(item => (
//               <Link
//                 key={item.text}
//                 href={item.href}
//                 className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
//                 onClick={() => setIsOpen(false)}
//               >
//                 {item.text}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;



'use client'
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ModeToggle } from './theme-switch';

const NavLinks = [
  { title: 'Home', href: '/' },
  { title: 'Products', href: '/products' },
  { title: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold">Hackneyed</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {NavLinks.map((link) => (
                  <NavigationMenuItem key={link.title}>
                    <NavigationMenuLink
                      href={link.href}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      {link.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                <ModeToggle /> {/*Theme button*/}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Drawer open={isOpen} onOpenChange={setIsOpen} direction="left">
              <ModeToggle /> {/*Theme button*/}
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-full w-3/4 left-0 right-auto">
                <DrawerHeader>
                  <DrawerTitle>Menu</DrawerTitle>
                </DrawerHeader>
                <div className="px-4 py-2">
                  {NavLinks.map((link) => (
                    <div key={link.title} className="py-2">
                      <a
                        href={link.href}
                        className="block py-2 hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.title}
                      </a>
                    </div>
                  ))}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;