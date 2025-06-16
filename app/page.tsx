import Image from "next/image";
import InfoBarLeft from "./_components/InfoBarLeft";
import HomeButton from "./_components/HomeButton";
import { ModeToggle } from "@/components/ModeToggle";

export default async function Home() {
  return (
    <div className="w-full font-[family-name:var(--font-geist-sans)] px-4 md:px-12">
      <div className="fixed top-4 right-4 p-2">
        <ModeToggle />
      </div>
      <main className="flex flex-col gap-[32px] w-full ">
        <section className="bg-gradient-to-br w-full md:px-4 h-screen flex flex-col gap-4 md:flex-row items-center justify-between md:justify-between">
          <div id="left-holder" className=" flex flex-col gap-6 py-24">
            <div className=" text-left">
              <h1 className=" md:3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Track Your Nutrition <span className="text-slate-900 dark:text-slate-100">Smarter</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-slate-100 max-w-2xl mx-auto mb-8">
                Achieve your health goals with precise calorie tracking and personalized insights
              </p>
            </div>
            <HomeButton />
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-left">
                Features
              </h2>
              <InfoBarLeft />
            </div>
          </div>
          <Image width={400} height={800} src={'/hero.webp'} className=" rounded-md" alt='hero image' />
        </section>
      </main>
    </div>
  );
}
