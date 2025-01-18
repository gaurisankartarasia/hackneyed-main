
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



const NavLinks = [
  { title: 'Home', href: '/' },
  { title: 'Products', href: '/products' },
  {title: 'Support', href: '/support' },
  { title: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  router.push(href);
  setIsOpen(false);
};


  return (
    <header className="border-b top-0 sticky z-50 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/"
              onClick={(e) => handleNavigation(e, '/')}
              className="text-lg font-bold flex items-center gap-2"
            >
         
         <Avatar   className='w-8 h-8'>
  <AvatarImage 

  src="https://firebasestorage.googleapis.com/v0/b/react-98765.appspot.com/o/assets%2Fme.jpg?alt=media&token=b955e7b3-74ae-4169-bc6c-a984a6aeab3c" />
  <AvatarFallback>H</AvatarFallback>
</Avatar>

              <span className='font-mono'>Hackneyed</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {NavLinks.map((link) => (
                  <NavigationMenuItem key={link.title}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavigation(e, link.href)}
                      className={`block select-none space-y-1 rounded-lg p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                        pathname === link.href ? 'bg-accent text-accent-foreground' : ''
                      }`}
                    >
                      {link.title}
                    </Link>
                  </NavigationMenuItem>
                ))}
                <ModeToggle />
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Drawer open={isOpen} onOpenChange={setIsOpen} direction="bottom">
              <ModeToggle />
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Menu</DrawerTitle>
                </DrawerHeader>
                <div className="px-4 py-2">
                  {NavLinks.map((link) => (
                    <div key={link.title} className="py-2">
                      <Link
                        href={link.href}
                        onClick={(e) => handleNavigation(e, link.href)}
                        className={`block py-2 hover:text-primary ${
                          pathname === link.href ? 'text-primary' : ''
                        }`}
                      >
                        {link.title}
                      </Link>
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