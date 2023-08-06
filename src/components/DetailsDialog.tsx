"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Github, Sparkles, Youtube, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Props = {};

const DetailsDialog = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <span className="items-center px-2 py-1 text-white rounded-md bg-slate-800 animate-bounce hidden sm:flex">
          Credits
          <Sparkles className="w-5 h-5 ml-1" />
        </span>
      </DialogTrigger>
      <DialogContent className="w-[70vw] max-w-[100vw] md:w-[50vw]">
        <DialogHeader>
          <DialogTitle className="text-2xl"><strong>QuizBraniac</strong>, where you are warmly invited!</DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-3 my-2">
              <p className="flex items-center">
                <Github className="w-5 h-5" />
                <Link
                  className="ml-1 underline"
                  href="https://github.com/bbkx226"
                >
                  GitHub
                </Link>
              </p>
              <p className="flex items-center">
                <Youtube className="w-5 h-5" />
                <Link
                  className="ml-1 underline"
                  href="https://www.linkedin.com/in/bbkx/"
                >
                  LinkedIn
                </Link>
              </p>
              <p className="flex items-center">
                <Globe className="w-5 h-5" />
                <Link
                  className="ml-1 underline"
                  href="https://www.bbkx.live/"
                >
                  Portfolio
                </Link>
              </p>
            </div>
            <p className="my-2 mt-4 ">
                I extend my heartfelt gratitude to Elliott Chong for his unwavering patience and dedication in guiding the creation of this website. 
                His invaluable teachings have been instrumental in bringing this project to fruition.
                To anyone who stumbled upon this website for any purpose, I highly recommend exploring Elliott Chong's impressive work on <a href="https://github.com/Elliott-Chong" target="_blank" className="underline">GitHub</a>!
            </p>
            <hr />
            <p className="my-2 font-semibold">
              <h4 className="text-base font-semibold">My other projects</h4>
              <div className="grid justify-around lg:grid-cols-4 mt-2 gap-y-3">
                <a href="https://shirtify-me.vercel.app/" target="_blank">
                    <div className="flex items-center gap-2">
                    <Image
                        alt="Shirtify"
                        src="/shirtify.png"
                        width={80}
                        height={80}
                    />
                    <span className="">Shirtify</span>
                    </div>
                </a>
                <a href="https://bbkxterminal.web.app/" target="_blank">
                    <div className="flex items-center gap-2">
                    <Image
                        alt="Terminal Website"
                        src="/terminalportfolio.png"
                        width={80}
                        height={80}
                        style={{marginTop: "1rem"}}
                    />
                    <span className="">Terminal Website</span>
                    </div>
                </a>
                <a href="https://brandongpt-summarizer.web.app/" target="_blank">
                    <div className="flex items-center gap-2">
                    <Image
                        alt="AI Summarizer"
                        src="/aisummarizer.png"
                        width={80}
                        height={80}
                    />
                    <span className="">AI Summarizer</span>
                    </div>
                </a>
                <a href="https://imagegeneratorai-6e92d.web.app/" target="_blank" className="hidden sm:block">
                    <div className="flex items-center gap-2">
                    <Image
                        alt="AI Image Generator"
                        src="/imageaigenerator.jpg"
                        width={80}
                        height={80}
                        style={{marginTop: "1.5rem"}}
                    />
                    <span className="">AI Image Generator</span>
                    </div>
                </a>
                <a href="https://brancoin-crypto.vercel.app/" target="_blank" className="hidden sm:block">
                    <div className="flex items-center gap-2">
                    <Image
                        alt="Brancoin"
                        src="/bcstamp.png"
                        width={80}
                        height={80}
                    />
                    <span className="">BranCoin</span>
                    </div>
                </a>
                <a href="https://ai-verse.vercel.app/" target="_blank" className="hidden sm:block">
                    <div className="flex items-center gap-2">
                    <Image
                        alt="AI-verse"
                        src="/aiverse.png"
                        width={80}
                        height={80}
                    />
                    <span className="">AI-verse</span>
                    </div>
                </a>
                <a href="https://blockchainapp-4e293.web.app/" target="_blank" className="hidden sm:block">
                    <div className="flex items-center gap-2">
                    <Image
                        alt="Opac1ty"
                        src="/opacity.png"
                        width={80}
                        height={80}
                    />
                    <span className="">Opac1ty</span>
                    </div>
                </a>

                <a href="https://app.engati.com/static/standalone/bot.html?bot_key=63ef367dfa364830&env=p" target="_blank" className="hidden sm:block">
                    <div className="flex items-center gap-2">
                    <Image
                        alt="Guzheng Chatbot"
                        src="/guzheng.jpg"
                        width={80}
                        height={80}
                    />
                    <span className="">Guzheng Chatbot</span>
                    </div>
                </a>
              </div>
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;