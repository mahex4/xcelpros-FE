import { Button } from "@/components/ui/button";
import { Activity, ChartBar, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full font-[family-name:var(--font-geist-sans)] px-4 md:px-24">
      <main className="flex flex-col gap-[32px] w-full ">
        <section className="bg-gradient-to-br py-12 md:px-4 h-screen flex flex-col md:flex-row items-center justify-center md:justify-between">
          <div className=" text-left">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Track Your Nutrition <span className="text-slate-900">Smarter</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Achieve your health goals with precise calorie tracking and personalized insights
            </p>
            <div className="w-full relative aspect-video mb-12 rounded-md overflow-hidden border flex md:hidden">
              <Image fill src={'/mobile1.webp'} alt='hero image' />
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-start">
              <Link className="w-full md:w-auto" href="/signup"><Button className="w-full md:w-auto text-xl">Get Started - It&apos;s Free</Button></Link>
              <Link className="w-full md:w-auto" href="/signin"><Button variant="secondary" className="w-full md:w-auto text-xl">View Demo</Button></Link>
            </div>
          </div>
          <div className="h-full relative aspect-[2/3] rounded-md overflow-hidden border hidden md:flex">
            <Image fill src={'/hero.webp'} alt='hero image' /> 
          </div>
        </section>
        <section className=" w-full">
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-bold text-left">
              Features
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Activity />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Tracking</h3>
                <p className="text-gray-600">
                  Effortlessly log meals in seconds with our user centric UI Experience.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp />
                </div>
                <h3 className="text-xl font-semibold mb-2">Stay Alert</h3>
                <p className="text-gray-600">
                  Easy tracking allows you to stay on top of your calorie restrictions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <ChartBar />
                </div>
                <h3 className="text-xl font-semibold mb-2">Beautiful Insights</h3>
                <p className="text-gray-600">
                  Stunning visualizations that show your progress and nutrition balance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center h-[50vh]">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
