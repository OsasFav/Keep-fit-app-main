/* eslint-disable @next/next/no-img-element */
import assets from '@/assets';
import { HeadingWithUnderline } from '@/styles/styledComponents';
import Image from 'next/image';
import React from 'react';
import { FaHeartbeat, FaHome, FaUserCheck } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className='items-center justify-center '>
          <HeadingWithUnderline >About Us</HeadingWithUnderline>
        </div>
        <p className="text-xl text-gray-700 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
          Welcome to <span className="text-primary font-semibold">KeepFit</span>, your premier destination for personalized fitness training in the comfort of your own home. We believe that fitness should be accessible, convenient, and tailored to your individual needs.
        </p>
        <p className="text-xl text-gray-700 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
          That&apos;s why we created <span className="text-primary font-semibold">KeepFit</span> – to connect you with certified personal trainers who come to you, bringing all the expertise and equipment necessary to achieve your fitness goals.
        </p>
        <div className="mt-12 text-center">
          <Image
            src={assets.team}
            alt="KeepFit Trainers"
            className="rounded-lg shadow-lg mx-auto w-full h-80 object-cover max-w-3xl"
          />
        </div>
      </div>
    </section>

  );
};

const Mission = () => {
  return (
    <section className="bg-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Our Mission</h2>
        <p className="text-lg text-gray-700 text-center mb-6">
          At KeepFit, our mission is to empower individuals to lead healthier, happier lives through personalized fitness solutions.
        </p>
        <p className="text-lg text-gray-700 text-center">
          We are committed to delivering top-quality training that fits seamlessly into your lifestyle, making fitness an enjoyable and sustainable part of your everyday routine.
        </p>
      </div>
    </section>
  );
};


const KeepFit = () => {
  return (
    <div>
      <AboutUs />
      <Mission />
      {/* <WhyChooseUs /> */}
    </div>
  );
};

export default KeepFit;
