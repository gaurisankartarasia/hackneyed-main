

// 'use client'
// import React, { useState } from 'react';
// import {NavLink} from 'react-router-dom'
// import { Menu } from 'lucide-react';
// import {
//   NavigationMenu,
//   NavigationMenuList,
//   NavigationMenuItem,
// } from "@/components/ui/navigation-menu";
// import {
//   Drawer,
//   DrawerContent,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";
// import { Button } from "@/components/ui/button";
// import { ModeToggle } from './theme-switch';

// const NavLinks = [
//   { title: 'Home', href: '/' },
//   { title: 'Products', href: '/products' },
//   { title: 'Contact', href: '/contact' },
// ];

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <header className="border-b">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <span className="text-2xl font-bold">Hackneyed</span>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:block">
//             <NavigationMenu>
//               <NavigationMenuList>
//                 {NavLinks.map((link) => (
//                   <NavigationMenuItem key={link.title}>
//                     <NavLink
//                       to={link.href}
//                       className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
//                     >
//                       {link.title}
//                     </NavLink>
//                   </NavigationMenuItem>
//                 ))}
//                 <ModeToggle /> {/*Theme button*/}
//               </NavigationMenuList>
//             </NavigationMenu>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <Drawer open={isOpen} onOpenChange={setIsOpen} direction="left">
//               <ModeToggle /> {/*Theme button*/}
//               <DrawerTrigger asChild>
//                 <Button variant="ghost" size="icon">
//                   <Menu className="h-6 w-6" />
//                 </Button>
//               </DrawerTrigger>
//               <DrawerContent className="h-full w-3/4 left-0 right-auto">
//                 <DrawerHeader>
//                   <DrawerTitle>Menu</DrawerTitle>
//                 </DrawerHeader>
//                 <div className="px-4 py-2">
//                   {NavLinks.map((link) => (
//                     <div key={link.title} className="py-2">
//                       <a
//                         href={link.href}
//                         className="block py-2 hover:text-primary"
//                         onClick={() => setIsOpen(false)}
//                       >
//                         {link.title}
//                       </a>
//                     </div>
//                   ))}
//                 </div>
//               </DrawerContent>
//             </Drawer>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;






// 'use client'
// import React, { useState } from 'react';
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { Menu } from 'lucide-react';
// import {
//   NavigationMenu,
//   NavigationMenuList,
//   NavigationMenuItem,
// } from "@/components/ui/navigation-menu";
// import {
//   Drawer,
//   DrawerContent,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";
// import { Button } from "@/components/ui/button";
// import { ModeToggle } from './theme-switch';

// const NavLinks = [
//   { title: 'Home', href: '/' },
//   { title: 'Products', href: '/products' },
//   { title: 'Contact', href: '/contact' },
// ];

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();

//   return (
//     <header className="border-b">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link href={'/'} className="text-2xl font-bold">Hackneyed</Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:block">
//             <NavigationMenu>
//               <NavigationMenuList>
//                 {NavLinks.map((link) => (
//                   <NavigationMenuItem key={link.title}>
//                     <Link
//                       href={link.href}
//                       className={`block select-none space-y-1 rounded-lg p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
//                         pathname === link.href ? 'bg-accent text-accent-foreground' : ''
//                       }`}
//                     >
//                       {link.title}
//                     </Link>
//                   </NavigationMenuItem>
//                 ))}
//                 <ModeToggle /> {/*Theme button*/}
//               </NavigationMenuList>
//             </NavigationMenu>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <Drawer open={isOpen} onOpenChange={setIsOpen} direction="left">
//               <ModeToggle /> {/*Theme button*/}
//               <DrawerTrigger asChild>
//                 <Button variant="ghost" size="icon">
//                   <Menu className="h-6 w-6" />
//                 </Button>
//               </DrawerTrigger>
//               <DrawerContent className="h-full w-3/4 left-0 right-auto">
//                 <DrawerHeader>
//                   <DrawerTitle>Menu</DrawerTitle>
//                 </DrawerHeader>
//                 <div className="px-4 py-2">
//                   {NavLinks.map((link) => (
//                     <div key={link.title} className="py-2">
//                       <Link
//                         href={link.href}
//                         className={`block py-2 hover:text-primary ${
//                           pathname === link.href ? 'text-primary' : ''
//                         }`}
//                         onClick={() => setIsOpen(false)}
//                       >
//                         {link.title}
//                       </Link>
//                     </div>
//                   ))}
//                 </div>
//               </DrawerContent>
//             </Drawer>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;











'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
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
  const pathname = usePathname();
  const router = useRouter();

 // Handle client-side navigation
const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  router.push(href);
  setIsOpen(false);
};


  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="/"
              onClick={(e) => handleNavigation(e, '/')}
              className="text-2xl font-bold"
            >
              Hackneyed
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {NavLinks.map((link) => (
                  <NavigationMenuItem key={link.title}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavigation(e, link.href)}
                      className={`block select-none space-y-1 rounded-lg p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                        pathname === link.href ? 'bg-accent text-accent-foreground' : ''
                      }`}
                    >
                      {link.title}
                    </a>
                  </NavigationMenuItem>
                ))}
                <ModeToggle />
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Drawer open={isOpen} onOpenChange={setIsOpen} direction="left">
              <ModeToggle />
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
                        onClick={(e) => handleNavigation(e, link.href)}
                        className={`block py-2 hover:text-primary ${
                          pathname === link.href ? 'text-primary' : ''
                        }`}
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