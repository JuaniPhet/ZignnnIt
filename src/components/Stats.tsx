"use client"

import Image from "next/image";

export default function Stats() {
    return (
        <div className="relative isolate overflow-hidden bg-[#202020] text-white py-24 sm:py-32">
            <Image
                src="/img/stats_background.jpg"
                alt="Work with us background"
                fill
                sizes="100vw"
                className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center opacity-30"
            />

            <div className="container mx-auto px-4 w-full">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-4xl sm:text-7xl font-semibold text-white">
                        Work with us
                    </h2>
                    <p className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed">
                        We transform your ideas into unique digital and visual
                        experiences. Whether it’s a website, a mobile app, or graphic
                        design, we bring our expertise to your projects to bring them to
                        life.
                    </p>
                </div>
                <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                    <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex flex-col-reverse gap-1 border-l-2 border-amber-500 pl-4">
                            <dt className="text-lg text-gray-300">Projects delivered</dt>
                            <dd className="text-5xl sm:text-6xl font-semibold text-white">50+</dd>
                        </div>
                        <div className="flex flex-col-reverse gap-1 border-l-2 border-amber-500 pl-4">
                            <dt className="text-lg text-gray-300">Happy Clients</dt>
                            <dd className="text-5xl sm:text-6xl font-semibold text-white">40+</dd>
                        </div>
                        <div className="flex flex-col-reverse gap-1 border-l-2 border-amber-500 pl-4">
                            <dt className="text-lg text-gray-300">Experience in the field</dt>
                            <dd className="text-5xl sm:text-6xl font-semibold text-white">5 years</dd>
                        </div>
                        <div className="flex flex-col-reverse gap-1 border-l-2 border-amber-500 pl-4">
                            <dt className="text-lg text-gray-300">Creativity guaranteed</dt>
                            <dd className="text-5xl sm:text-6xl font-semibold text-white">100%</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}