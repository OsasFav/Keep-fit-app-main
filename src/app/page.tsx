"use client"

/* eslint-disable @next/next/no-img-element */
import assets from "@/assets"
import { allQuestions } from "@/data/faq"
import { ROUTE } from "@/lib/route"
import { HeadingWithUnderline } from "@/styles/styledComponents"
import {
  FaDumbbell,
  FaCalendarAlt,
  FaClipboardList,
  FaBars,
  FaTimes,
} from "react-icons/fa"
import Image from "next/image"
import Link from "next/link"
import { Element, Link as ScrollLink } from "react-scroll"

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion"
import KeepFit from "./gpt"
import React, { useState } from "react"

export default function Home() {
  const [activeItem, setActiveItem] = React.useState(null)
  const [nav, setNav] = useState(false)
  const handleClick = () => setNav(!nav)

  const toggleItem = (id) => {
    console.log(id)
    setActiveItem((prevActiveItem) => (prevActiveItem === id ? null : id))
  }
  const aboutus = [
    {
      title: "Create an Account",
      content:
        "Simply enter your personal details and get started. This will give you access to our full range of services and personalized features tailored just for you.",
    },
    {
      title: "Choose Your Preferred Trainer",
      content:
        "Once your account is set up, browse through our diverse selection of personal trainers. Review and select the trainer who best matches your fitness goals and schedule.",
    },
    {
      title: "Confirm Your Bookings",
      content:
        "After choosing your trainer, you can easily book your session. Select the date and time that works best for you, and confirm your booking with a simple click.",
    },
  ]

  return (
    <div>
      <div className="h-dvh background-animation items-center justify-between flex-col relative text-white">
        <div className=" bg-black bg-opacity-70 absolute top-0 left-0 w-full h-dvh "></div>
        <nav className="container py-5 justify-between items-center relative z-10">
          <Image width={60} className="w-10 md:w-14" src={assets.logo} alt="" />
          <ul className="!hidden md:!flex items-center gap-8 text-lg">
            <ScrollLink
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              to={"how"}
            >
              <li className="cursor-pointer">How it works</li>
            </ScrollLink>
            <ScrollLink
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              to={"faq"}
            >
              <li className="cursor-pointer">FAQ</li>
            </ScrollLink>
            <Link href={"/trainer/register"}>
              {" "}
              <li>Register as a PT</li>
            </Link>
            <Link href={ROUTE.login}>
              {" "}
              <li className="button">Login</li>
            </Link>
          </ul>

          <div onClick={handleClick} className="md:hidden z-30">
            {!nav ? <FaBars /> : <FaTimes />}
          </div>
          <ul
            className={
              !nav
                ? "hidden"
                : "absolute top-0 left-0 w-full h-screen bg-[#0a192f] z-20 flex gap-8 flex-col justify-center items-center"
            }
          >
            <ScrollLink
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              to={"how"}
              onClick={handleClick}
            >
              <li className="cursor-pointer">How it works</li>
            </ScrollLink>
            <ScrollLink
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              to={"faq"}
              onClick={handleClick}
            >
              <li className="cursor-pointer">FAQ</li>
            </ScrollLink>
            <Link onClick={handleClick} href={"/trainer/register"}>
              {" "}
              <li>Register as a PT</li>
            </Link>
            <Link onClick={handleClick} href={ROUTE.login}>
              {" "}
              <li className="button">Login</li>
            </Link>
          </ul>
        </nav>
        <header className="relative z-[9] ">
          <div className="items-center justify-center flex-col gap-6">
            <h1 className="text-3xl lg:text-6xl font-medium">
              Stay <span className="text-primary italic cabin">home</span>,
              <br /> stay{" "}
              <span className="italic text-primary cabin">healthy</span>!
            </h1>
            <Link href={ROUTE.createAccount}>
              <button className="lg:text-lg">Start your journey now </button>
            </Link>
          </div>
        </header>
        <div></div>
      </div>

      <main className="space-y-14">
        <section className="bg-white py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="items-center justify-center ">
              <HeadingWithUnderline>About Us</HeadingWithUnderline>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
              Welcome to{" "}
              <span className="text-primary font-semibold">KeepFit</span>, your
              premier destination for personalized fitness training in the
              comfort of your own home. We believe that fitness should be
              accessible, convenient, and tailored to your individual needs.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
              That&apos;s why we created{" "}
              <span className="text-primary font-semibold">KeepFit</span> – to
              connect you with certified personal trainers who come to you,
              bringing all the expertise and equipment necessary to achieve your
              fitness goals.
            </p>
            <div className="mt-12 text-center">
              <Image
                src={assets.team}
                alt="KeepFit Trainers"
                className="rounded-lg shadow-lg mx-auto w-full h-96 object-cover max-w-4xl"
              />
            </div>
          </div>
        </section>
        <section id="what" className="bg-[#F9FAFB] py-16 lg:py-28">
          <div className="container mx-auto">
            <HeadingWithUnderline>What we Offer </HeadingWithUnderline>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Certified Trainers */}
              <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="text-blue-500 text-5xl mb-4">
                  <FaDumbbell />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Certified Trainers
                </h3>
                <p className="text-gray-700">
                  Our team consists of highly qualified and certified personal
                  trainers with diverse specialties, ensuring expert guidance.
                </p>
                {/* <img
                  src="trainer.jpg"
                  alt="Certified Trainers"
                  className="mt-4 rounded-lg w-full h-40 object-cover"
                /> */}
              </div>

              {/* Convenient Scheduling */}
              <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="text-green-500 text-5xl mb-4">
                  <FaCalendarAlt />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Convenient Scheduling
                </h3>
                <p className="text-gray-700">
                  Flexible scheduling options allow you to book sessions at
                  times that work best for you, making it easier to stay
                  consistent.
                </p>
                {/* <img
                  src="schedule.jpg"
                  alt="Convenient Scheduling"
                  className="mt-4 rounded-lg w-full h-40 object-cover"
                /> */}
              </div>

              {/* Personalized Programs */}
              <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="text-red-500 text-5xl mb-4">
                  <FaClipboardList />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Personalized Programs
                </h3>
                <p className="text-gray-700">
                  Our trainers create customized workout plans based on your
                  fitness level, goals, and preferences for optimal results.
                </p>
                {/* <img
                  src="program.jpg"
                  alt="Personalized Programs"
                  className="mt-4 rounded-lg w-full h-40 object-cover"
                /> */}
              </div>
            </div>
          </div>
        </section>

        <Element id="how" className="container py-16 ">
          <HeadingWithUnderline>How it Works</HeadingWithUnderline>

          <div className="  items-center gap-10 !grid grid-cols-1 md:grid-cols-2">
            <Image
              alt="about us"
              className="relative rounded w-full h-auto inset-0 object-cover object-center aspect-[4/3] hidden md:block"
              src={assets.aboutus}
              loading="lazy"
            />
            <div className="space-y-6">
              {aboutus.map((each, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="!max-w-6 w-full !h-6 items-center justify-center bg-primary text-white cabin rounded-full text-xs mt-1">
                    {i + 1}
                  </span>
                  <div>
                    <h6 className="text-lg font-semibold cabin mb-1">
                      {each.title}
                    </h6>
                    <p className="tetx-[15px] leading-7 text-gray-500">
                      {each.content}
                    </p>
                  </div>
                </div>
              ))}
              <Link href={ROUTE.createAccount} className="pl-10">
                <button>Learn more</button>
              </Link>
            </div>
          </div>
        </Element>

        <section className=" p-8 md:p-16 bg-[#F9FAFB]">
          <div className="container mx-auto ">
            <div
              className="items-center justify-
     "
            >
              <HeadingWithUnderline>
                {" "}
                Why Choose <span className="text-primary">KeepFit?</span>
              </HeadingWithUnderline>
            </div>
            <p className="text-xl text-gray-600 mb-12">
              Experience the benefits of working with a dedicated team of
              certified professionals who make fitness enjoyable and
              personalized to your needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Expertise and Professionalism */}
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Expertise and Professionalism
                </h3>
                <p className="text-gray-600">
                  Our trainers are certified, experienced, and passionate about
                  helping you achieve your fitness goals.
                </p>
              </div>

              {/* Comfort and Privacy */}
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Comfort and Privacy
                </h3>
                <p className="text-gray-600">
                  Train in the privacy and comfort of your own home with a
                  focused and personalized workout session.
                </p>
              </div>

              {/* Holistic Approach */}
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Holistic Approach
                </h3>
                <p className="text-gray-600">
                  We offer comprehensive guidance on nutrition, lifestyle
                  habits, and overall wellness for lasting results.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Element id="faq" className=" py-16 lg:py-28">
          <div className="max-w-[817px] mx-auto px-5 lg:px-0">
            <div className=" lg:mb-4">
              <HeadingWithUnderline>FAQs</HeadingWithUnderline>

              <p className="text-lg lg:text-2xl lg:leading-[51px] font-bold text-[#101828]">
                For trainee
              </p>
            </div>

            <Accordion allowZeroExpanded>
              {allQuestions.map((q, index) => {
                if (q.type === "trainee")
                  return (
                    <AccordionItem key={index}>
                      <AccordionItemHeading>
                        <AccordionItemButton>{q.question}</AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>{q.answer}</p>
                      </AccordionItemPanel>
                    </AccordionItem>
                  )
              })}
            </Accordion>

            <div className=" mt-14">
              <p className="text-lg lg:text-2xl lg:leading-[51px] font-bold text-[#101828]">
                For trainer
              </p>
            </div>

            <Accordion allowZeroExpanded>
              {allQuestions.map((q, index) => {
                if (q.type === "trainer") {
                  return (
                    <AccordionItem key={index}>
                      <AccordionItemHeading>
                        <AccordionItemButton>{q.question}</AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>{q.answer}</p>
                      </AccordionItemPanel>
                    </AccordionItem>
                  )
                }
                return null // Ensures no undefined or empty content is returned
              })}
            </Accordion>
          </div>
        </Element>

        <section className="bg-gray-600 py-32">
          <div className="max-w-[890px] px-5 items-center justify-center flex-col mx-auto space-y-10">
            <h2 className="text-[#F9FAFB] text-2xl lg:text-[40px] lg:leading-[51.2px] text-center font-bold">
              Ready to start your personalized{" "}
              <span className="text-primary italic cabin">fitness journey</span>
              ?
              {/* Experience the future of fitness with <span className="text-primary italic cabin">KeepFit</span>  Contact us today! */}
            </h2>
            <p className="text-[#F9FAFB] text-lg lg:text-2xl !mt-4 ">
              Get in touch with us today to schedule your first session.
            </p>
            <Link href={ROUTE.createAccount}>
              <button>Get Started</button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="items-center text-center justify-center font-medium py-8  relative z-10">
        Copyright &copy; 1996–{new Date().getFullYear()} KeepFit ™. All rights
        reserved.
      </footer>
    </div>
  )
}

// const changeBg = keyframes`
//   0% {
//     background-image: url(${homebg1});
//   }
//   33% {
//     background-image: url(homebg1);
//   }
//   66% {
//     background-image: url(homebg1});
//   }
//   100% {
//     background-image: url(homebg1);
//   }
// `;

// const BgImg = styled.div`
//   width: 100%;
//   height: 100vh;
//   position: relative;
//   animation: ${changeBg} 15s infinite;
//   background-size: cover;
//   background-position: center;
// `;
