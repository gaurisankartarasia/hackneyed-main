"use client";

import { FC } from 'react';
import dynamic from 'next/dynamic';
import {Card, CardTitle, CardDescription, CardContent} from '@/components/ui/card'
import {Coffee} from 'lucide-react'

// Dynamically import the icon to reduce bundle size
const ArrowUpRight = dynamic(() => import('lucide-react').then((mod) => mod.Users), { ssr: false });

interface SupportGroup {
  name: string;
  description: string;
  link: string;
  icon?:any;
}

const supportGroups: SupportGroup[] = [
  {
    name: 'larry',
    description: 'Support Group for Oneplus Nord CE3 Lite 5G/N30.',
    link: 'https://t.me/OnePlusNordCE3Lite',
  },
  {
    name: 'oscar',
    description: 'Support Group for Realme 9 Pro 5G/9 5G/Q5.',
    link: 'https://t.me/lineageos_oscar',
  },
  {
    name: 'X00TD/X00T',
    description: 'Support Group for Asus Zenfone Max Pro M1.',
    link: 'https://t.me/LineageosX00TD',
  },
  {
    name: 'Hackneyed',
    description: 'Updates Channel for all my works.',
    link: 'https://t.me/HackneyedUpdates',
  },
  {
    name: 'mido',
    description: 'Support Group for Xiaomi Redmi Note 4 (Deprecated).',
    link: '#',
  },
  {
    name: 'karate/karatep',
    description: 'Support Group for Lenovo K6 Power/Note.',
    link: 'https://t.me/k6_development',
  },
  {
    name: 'Donate Me',
    description: 'Donate if you love my work!',
    link: 'https://paypal.me/vvkachoooz',
    icon: <Coffee/>
  },
];

const SupportSection: FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Support</h2>
          <p className="text-lg text-gray-600">Support groups for my works.</p>
        </div>

        {/* Support Group Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {supportGroups.map((group, index) => (
                          <a  key={index} href={group.link} target="_blank" rel="noopener noreferrer">

            <Card 
             
              className="flex items-center hover:shadow-lg p-6 rounded  transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-900 rounded-full">
                  <ArrowUpRight className="text-white w-6 h-6" />
                </div>
              </div>

              {/* Text Content */}
                <div  className="ml-6">
                <CardTitle className="text-xl  mb-1">{group.name}</CardTitle>
                <CardDescription >{group.description}</CardDescription>
                </div>
              
            </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
