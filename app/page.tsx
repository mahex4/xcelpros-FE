import Image from "next/image";
import InfoBarLeft from "./_components/InfoBarLeft";
import HomeButton from "./_components/HomeButton";
import { ModeToggle } from "@/components/ModeToggle";
import { Suspense } from "react";
import { BasicHomeButton } from "./_components/BasicHomeButton";

export default function Home() {
  return (
    <div className="w-full px-4 md:px-12">
      <div className="fixed top-4 right-4 p-2">
        <ModeToggle />
      </div>
      <main className="flex flex-col gap-[32px] w-full ">
        <section className="bg-gradient-to-br w-full md:px-4 h-screen flex flex-col gap-4 md:flex-row items-center justify-between md:justify-between">
          <div id="left-holder" className=" flex flex-col gap-6 py-24">
            <div className=" text-left">
              <h1 className=" text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Track Your Nutrition <span className="text-slate-900 dark:text-slate-100">Smarter</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-slate-100 max-w-2xl mx-auto mb-8">
                Achieve your health goals with precise calorie tracking and personalized insights
              </p>
            </div>
            <Image width={400} height={200} src={'/mobile1.webp'} loading="eager" priority sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 400px" className=" rounded-md block md:hidden" alt='hero image' />
            <Suspense fallback={<BasicHomeButton />}>
              <HomeButton />
            </Suspense>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-left">
                Features
              </h2>
              <InfoBarLeft />
            </div>
          </div>
          <Image width={400} height={800} src={'/hero.webp'} loading="eager" priority sizes="(min-width: 768px) 400px, 0px" className=" rounded-md hidden md:block dark:hidden" alt='hero image' />
          <Image width={400} height={800} src={'/23.jpg'} loading="eager" priority sizes="(min-width: 768px) 400px, 0px" className=" rounded-md  hidden dark:md:block" alt='hero image' />
        </section>
      </main>
    </div>
  );
}
