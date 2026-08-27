"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function HeroImgsSec() {
  const [activeTab, setActiveTab] = useState("organize"); // organize, hired, boards
  const btnsData = [
    {
      state: "organize",
      text: "Organize Applications",
      img: "/hero-imgs/hero1.png",
    },
    { state: "hired", text: "Get Hired", img: "/hero-imgs/hero2.png" },
    { state: "manage", text: "Manage Boards", img: "/hero-imgs/hero3.png" },
  ];
  const activeImg = btnsData.find((item) => item.state === activeTab)?.img;

  return (
    <section className="border rounded-2xl bg-white py-16 max-w-7xl mx-auto mb-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Tabs */}
          <div className="flex gap-2 justify-center mb-10">
            {btnsData.map((item) => (
              <Button
                key={item.state}
                onClick={() => setActiveTab(item.state)}
                className={`cursor-pointer p-4 text-sm font-medium rounded-lg transition-colors ${
                  item.state !== activeTab
                    ? "bg-zinc-200 hover:bg-zinc-300 text-zinc-700"
                    : "bg-primary text-zinc-100 hover:bg-primary/85"
                }`}
              >
                {item.text}
              </Button>
            ))}
          </div>
          {/* Images */}
          <div className="relative w-full max-w-5xl mx-auto aspect-video ">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0 overflow-hidden rounded-xl border border-zinc-200 shadow-xl"
              >
                <Image
                  src={activeImg!}
                  alt={activeTab}
                  fill
                  className="object-contain rounded-xl shadow-lg"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
