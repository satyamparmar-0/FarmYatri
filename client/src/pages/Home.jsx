import React from 'react';
import { Link } from 'react-router-dom';

import { Carousel } from 'react-responsive-carousel'; // Make sure to install this
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import image1 from '../assets/images/image1.png'; // Adjust the path as necessary
import image2 from '../assets/images/image2.png'; // Adjust the path as necessary
import image3 from '../assets/images/image3.png'; // Adjust the path as necessary
import image4 from '../assets/images/image4.jpg'; // Adjust the path as necessary
import front from '../assets/images/front.jpg'; // Adjust the path as necessary

const HomePage = () => {
    return (
        <div className="bg-[#F7FBF6] font-[Inter] text-[#213528]">

            {/* ===== Navbar ===== */}
            <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b border-[#E6EDE4]">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                    {/* Replace with actual logo */}
                    <div className="w-10 h-10 bg-[#2F8F4A] rounded-full flex items-center justify-center text-white font-bold text-lg">F</div>
                    <span className="text-2xl font-bold">the farmYatri</span>
                </div>

                {/* Nav Items */}
                <div className="flex items-center space-x-6 text-sm font-semibold text-[#5B6B57]">
                    <a href="#how-it-works" className="hover:text-[#2F8F4A]">How it works</a>
                    <a href="#marketplace" className="hover:text-[#2F8F4A]">Marketplace</a>
                    <a href="#about" className="hover:text-[#2F8F4A]">About</a>
                    <Link to="/login">
                        <button className="text-[#2F8F4A] hover:underline">Login</button>
                    </Link>

                    <Link to="/register">
                        <button className="bg-[#2F8F4A] text-white px-4 py-2 rounded-md hover:bg-[#256f3a]">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </nav>

            {/* ===== Hero Section ===== */}
            <header className="relative w-full bg-[#F7FBF6] overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between">
                    <div className="w-full md:w-1/2 space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Fresh produce, directly from farmers
                        </h1>
                        <p className="text-[#5B6B57] text-lg">
                            Empowering Indian farmers and connecting them with local markets and consumers.
                        </p>
                        <button className="mt-4 bg-[#2F8F4A] text-white px-6 py-3 rounded-md text-base font-semibold hover:bg-[#256f3a]">
                            Explore Marketplace
                        </button>
                    </div>
                    <div className="hidden md:block w-full md:w-1/2 max-w-md mx-auto">
                        <img
                            src={image4}
                            alt="Farm illustration"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                </div>
            </header>

            {/* ===== Image Slider ===== */}
            <section className="max-w-6xl mx-auto px-4 py-12">
                <Carousel
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                    showStatus={false}
                    interval={3000}
                    dynamicHeight={false}
                >
                    <div className="h-64 w-full overflow-hidden rounded-lg bg-white flex items-center justify-center">
                        <img
                            src={image4}
                            alt="Slide 1"
                            className="h-full w-auto object-contain"
                        />
                    </div>

                    <div className="h-64 w-full overflow-hidden rounded-lg bg-white flex items-center justify-center">
                        <img
                            src={image2}
                            alt="Slide 2"
                            className="h-full w-auto object-contain"
                        />
                    </div>

                    <div className="h-64 w-full overflow-hidden rounded-lg bg-white flex items-center justify-center">
                        <img
                            src={image3}
                            alt="Slide 3"
                            className="h-full w-auto object-contain"
                        />
                    </div>

                </Carousel>
            </section>

            {/* ===== Placeholder Content ===== */}
            <section className="bg-[#FFFFFF] px-6 py-12">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold mb-4">What We Offer</h2>
                    <p className="text-[#5B6B57] max-w-2xl mx-auto">
                        This section can include services like seed & fertilizer supply, direct crop selling, market price tracking, etc.
                    </p>
                </div>
            </section>

            {/* ===== Blog Section ===== */}
            <section className="bg-[#FFFFFF] px-6 py-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-10 text-center">Latest from the Blog</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Blog Card 1 */}
                        <div className="bg-[#F7FBF6] rounded-lg shadow-sm overflow-hidden">
                            <img src={image2} alt="Organic Farming" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">The Rise of Organic Farming</h3>
                                <p className="text-sm text-[#5B6B57] mb-2">Aug 18, 2025</p>
                                <p className="text-[#5B6B57] text-base">
                                    Learn how organic practices are changing the lives of Indian farmers and making farming sustainable.
                                </p>
                            </div>
                        </div>

                        {/* Blog Card 2 */}
                        <div className="bg-[#F7FBF6] rounded-lg shadow-sm overflow-hidden">
                            <img src={image4} alt="Market Prices" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">Understanding Market Prices</h3>
                                <p className="text-sm text-[#5B6B57] mb-2">Aug 10, 2025</p>
                                <p className="text-[#5B6B57] text-base">
                                    A guide to help farmers monitor real-time market trends and get better prices for their produce.
                                </p>
                            </div>
                        </div>

                        {/* Blog Card 3 */}
                        <div className="bg-[#F7FBF6] rounded-lg shadow-sm overflow-hidden">
                            <img src={image1} alt="Government Schemes" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">Top Govt Schemes for Farmers</h3>
                                <p className="text-sm text-[#5B6B57] mb-2">Aug 1, 2025</p>
                                <p className="text-[#5B6B57] text-base">
                                    Explore beneficial government schemes like PM-KISAN, crop insurance, and subsidies in India.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Footer ===== */}
            <footer className="bg-white border-t border-[#E6EDE4] py-6 mt-10 text-center text-sm text-[#5B6B57]">
                <p>© 2025 the farmYatri. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
