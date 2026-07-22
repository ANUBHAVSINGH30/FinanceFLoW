import type { ReactNode } from "react";
import Loginbg from "../../../assets/bgimage.jpg";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout ({children}: AuthLayoutProps) {
    return <>
        {/* ═══════════════════════════
          MOBILE  (below md)
      ═══════════════════════════ */}
      <div className="flex flex-col min-h-screen overflow-hidden bg-[#EDEBE3] md:hidden">

        {/* Hero top */}
        <div className="relative flex flex-col items-center justify-start bg-[#EDEBE3]">
          {/* blobs */}
          <div className="absolute top-0 left-0 w-44 h-44 rounded-full bg-[#DDD9CC] opacity-60 -translate-x-16 -translate-y-10" />
          <div className="absolute top-12 right-4 w-32 h-32 rounded-full bg-[#D6D2C4] opacity-50" />

          {/* illustration */}
          <div className="relative z-10 w-full h-[30vh] sm:h-[34vh] min-h-[280px] max-h-[360px] overflow-hidden">
            <img
              src={Loginbg}
              alt="Finance illustration"
              className="h-full w-full object-cover object-[50%_40%]"
            />
            <div className="absolute inset-0 bg-[#2D4A24] opacity-10" />
          </div>
        </div>

        {/* White form card — rounded top corners only, pulled over the image */}
        <div className="relative z-20 -mt-8 flex-1 bg-white rounded-t-[32px] px-7 pt-7 pb-7 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
          {children}
        </div>

        {/* Home indicator */}
        <div className="bg-white flex justify-center pb-2 pt-1">
          <div className="w-28 h-1 bg-[#1A1A1A] rounded-full opacity-20" />
        </div>
      </div>

      {/* ═══════════════════════════
          DESKTOP  (md and above)
          — centered floating card
          — form LEFT, image RIGHT
          — exactly like reference image 2
      ═══════════════════════════ */}
      <div className="hidden md:flex min-h-screen w-full items-center justify-center bg-[#EDEBE3] p-6 lg:p-8">

        {/* Outer floating card */}
        <div className="flex w-full max-w-[1000px] h-fit rounded-[28px] overflow-hidden shadow-2xl">


          {/* RIGHT — image fills fully, no gaps, rounded right corners via parent overflow-hidden */}
          <div className="relative min-w-[300px] flex-1 overflow-hidden">
            <img
              src={Loginbg}
              alt="Finance illustration"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* subtle dark overlay so image feels intentional */}
            <div className="absolute inset-0 bg-[#2D4A24] opacity-10" />
          </div>



            {/* LEFT — white form side */}
          
          <div className="flex w-full md:w-[45%] lg:w-[42%] max-w-[480px] flex-shrink flex-col justify-center bg-white px-8 py-10 lg:px-12 lg:py-14">

        

            {children}
          </div>

        </div>
      </div>
    </>
}