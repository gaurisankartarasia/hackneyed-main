import React from "react";
import Image from "next/image";
import { Github, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AboutSection: React.FC = () => {
  return (
    <section className="py-16 px-4">
      <Card className="max-w-5xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-bold border-b-2 border-gray-300 pb-4">
            About Me
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col md:flex-row gap-8 items-center">
          <div className="relative md:w-1/3">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/personal-fe53d.appspot.com/o/me.jpg?alt=media&token=df1bf51f-073a-4d07-b4e1-397f4573fe43"
              alt="Vivekachooz"
              loading="lazy"
              width={300}
              height={300}
              className="rounded-full shadow-md w-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="md:w-2/3 space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold">Android Developer</h3>
              <p className="text-lg md:text-xl italic mt-2">
                I specialize in Android development, focusing on custom ROMs and kernels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <div className="flex items-center">
                <Github className="mr-2 text-gray-700" />
                <span className="text-gray-700 font-medium">Web:</span>
                <a
                  href="https://vivekachooz.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-600 underline hover:text-blue-800"
                >
                  vivekachooz.github.io
                </a>
              </div> */}
              <div className="flex items-center">
                <Mail className="mr-2 text-gray-700" />
                <span className="text-gray-700 font-medium">Email:</span>
                <a
                  href="mailto:vivekachooz@gmail.com"
                  className="ml-2 text-blue-600 underline hover:text-blue-800"
                >
                  vivekachooz@gmail.com
                </a>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Country:</span> India
              </div>
              {/* <div>
                <span className="font-semibold text-gray-700">Qualification:</span> BA English Graduate
              </div> */}
            </div>

            <div>
              <p className="text-gray-700">
                I'm Vivek, an Android developer, enthusiast, and freelancer. I'm also a BA English Language and
                Literature graduate. Android development is my passion.
              </p>
              <p className="text-gray-700 mt-4">
                The Android community thrives on aftermarket software development. OEMs often fail to provide adequate
                software support after release. This is where custom ROMs and kernels become essential. I provide
                aftermarket support for various devices like OnePlus Nord CE3 Lite 5G, Realme series, Asus Zenfone Max
                Pro M1, Xiaomi Redmi Note 4, and Lenovo devices. My focus is on delivering high-performance solutions
                without compromising battery life, maintaining a balanced profile across my work.
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="text-center">
          <p className="text-sm text-gray-500">
            "Passionate about crafting balanced, high-performance Android experiences."
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default AboutSection;
