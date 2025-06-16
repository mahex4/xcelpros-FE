import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import InfoBarLeft from "./_components/InfoBarLeft";
import { getUserFromToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUserFromToken();

    if (user) redirect('/dashboard');

  return (
    <div className="w-full font-[family-name:var(--font-geist-sans)] px-4 md:px-12">
      <main className="flex flex-col gap-[32px] w-full ">
        <section className="bg-gradient-to-br w-full md:px-4 h-screen flex flex-col gap-4 md:flex-row items-center justify-between md:justify-between">
          <div id="left-holder" className=" flex flex-col gap-6 py-24">
            <div className=" text-left">
              <h1 className=" md:3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Track Your Nutrition <span className="text-slate-900">Smarter</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Achieve your health goals with precise calorie tracking and personalized insights
              </p>
              <div className="w-full relative aspect-video mb-12 rounded-md overflow-hidden border flex md:hidden">
                <Image fill src={'/mobile1.webp'} alt='hero image' />
              </div>
              <div className="flex flex-col md:flex-row gap-4 justify-start">
                <Link className="w-full md:w-auto" href="/signup"><Button className="w-full md:w-auto text-xl">Get Started - Sign Up Now</Button></Link>
                <Link className="w-full md:w-auto" href="/signin?email=demo@gmail.com&password=Pa$$w0rd"><Button variant="secondary" className="w-full md:w-auto text-xl">View Demo</Button></Link>
              </div>
              Already a member? <Link href="/signin"><Button variant="link">Sign In</Button></Link>
            </div>
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
