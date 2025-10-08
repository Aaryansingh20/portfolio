"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Linkedin, Mail } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import textai from "@/public/text-ai.png"
import iphone from "@/public/iphone.png"
import Buyme from "@/public/Buyme.png"
import rag from "@/public/rag.png"
type Tab = "HOME" | "ABOUT" | "EXPERIENCE" | "PROJECTS" | "CONTACT"

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<Tab>("HOME")
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const audioElement = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568.wav")
    audioElement.preload = "auto"

    audioElement.addEventListener("canplaythrough", () => {
      setAudio(audioElement)
      setError(null)
    })

    audioElement.addEventListener("error", () => {
      setError("Failed to load audio")
    })

    return () => {
      audioElement.removeEventListener("canplaythrough", () => {})
      audioElement.removeEventListener("error", () => {})
    }
  }, [])

  const handleClick = () => {
    if (audio) {
      audio.currentTime = 0 // Reset to start
      audio.play().catch((err) => {
        console.error("Playback failed", err)
        setError("Failed to play audio")
      })
    } else {
      setError("Audio not loaded yet")
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "HOME":
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-serif mb-1">Welcome</h1>
              <h2 className="text-2xl font-mono text-gray-700 dark:text-gray-300">I&apos;m Aaryan Singh</h2>
            </div>

            <p className="font-mono leading-relaxed">
             I’m Aaryan Singh, a Full-Stack AI Engineer passionate about building intelligent and interactive web solutions. I love combining AI technologies like RAG and LLMs with modern frameworks such as Next.js and React to create innovative user experiences.
            </p>

            <p className="font-mono leading-relaxed">
              Thank you for taking the time to check out my portfolio. I really hope you enjoy exploring it as much as I
              enjoyed building it. If you have any questions or comments, feel free to contact me using{" "}
              <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                this form
              </Link>{" "}
              or shoot me an email at{" "}
              <Link href="mailto:singhaaryan348@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                singhaaryan348@gmail.com
              </Link>
            </p>

            <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4">
              <div className="flex items-center gap-4">
                <div className="flex">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 transform rotate-45" />
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 transform rotate-45 -ml-4" />
                </div>
                <div className="font-mono">
                  <h3 className="text-xl mb-2">Looking for my resume?</h3>
                  <Link href="/Resume.pdf" target="_blank" download className="text-blue-600 dark:text-blue-400 hover:underline">
                    Click here to download it!
                  </Link>
                </div>
              </div>
            </div>

            {/* <div className="space-y-6">
              <h2 className="text-3xl font-serif">About Me</h2>
              <p className="font-mono leading-relaxed">
                A web developer proficient in MERN Stack and Next js. Proven track record of delivering high quality,
                user-centric websites through collaborative teamwork and meticulous attention to detail. Continuously
                enhancing skills to remain at the forefront of industry standards.
              </p>
              <div className="aspect-video relative">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Coding setup"
                  fill
                  className="object-cover rounded-sm"
                />
              </div>
            </div> */}
          </div>
        )

      case "ABOUT":
        return (
          <div className="font-mono space-y-8">
            <h2 className="text-3xl font-serif">About</h2>

            <div className="space-y-6">
              <h3 className="text-xl font-serif">Technical Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold mb-2">Languages</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>TypeScript</li>
                    <li>Python</li>
                    <li>JavaScript</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Technologies</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>React/Next.js</li>
                    <li>Node.js</li>
                    <li>Git</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-serif">Education</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-lg">Universal college of engineering</h4>
                  <p>Bachelor&apos;s in AI/ML</p>
                  <p className="text-gray-600">2021 - 2025</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-serif">Interests</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {/* <div className="aspect-square relative">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Mechanical keyboard"
                      fill
                      className="object-cover rounded-sm"
                    />
                  </div> */}
                  <p>
                    As a Full Stack Developer, I&apos;m deeply intrigued by the potential of AI and robotics, constantly
                    seeking ways to integrate these cutting-edge technologies into innovative web applications.{" "}
                  </p>
                </div>
                <div className="space-y-4">
                  {/* <div className="aspect-square relative">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Rock climbing"
                      fill
                      className="object-cover rounded-sm"
                    />
                  </div> */}
                  <p>
                    Balancing my technical skills as a Full Stack Developer, I am dedicated to maintaining physical and
                    mental discipline through rigorous training in the gym and MMA, fostering a well-rounded approach to
                    tackling challenges{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case "EXPERIENCE":
        return (
          <div className="font-mono space-y-8">
            <h2 className="text-3xl font-serif">Experience</h2>

            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">Frontend Engineer</h3>
                    <div className="flex gap-5">
                      <p className="text-blue-600">Pillow Connect</p>
                      <Link
                        href="https://www.pillow-connect.com/"
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                  <p className="text-gray-600">2024 Aug -2024 Dec</p>
                </div>
                <ul className="list-disc list-inside space-y-2">
                  <li>Led the development of frontend features using Next.js and TypeScript</li>
                  <li>Optimized build performance resulting in 40% faster deployment times</li>
                  <li>Collaborated with the design team to implement new UI components</li>
                </ul>
                {/* <div className="aspect-video relative">
                  <Image
                    src="/placeholder.svg?height=300&width=600"
                    alt="Vercel office"
                    fill
                    className="object-cover rounded-sm"
                  />
                </div> */}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">German laguage course page</h3>
                    <div className="flex gap-5">
                      <p className="text-blue-600">Freelance Project</p>
                      <Link
                        href="https://code-german.vercel.app/"
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                  <p className="text-gray-600">Dec 2024</p>
                </div>
                <ul className="list-disc list-inside space-y-2">
                  <li>Developed and maintained React components for the main product</li>
                  <li>Implemented responsive designs</li>
                </ul>
              </div>

              {/* <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">Research Assistant</h3>
                    <p className="text-blue-600">RPI Computer Science Department</p>
                  </div>
                  <p className="text-gray-600">2020 - 2021</p>
                </div>
                <ul className="list-disc list-inside space-y-2">
                  <li>Conducted research on machine learning algorithms</li>
                  <li>Published a paper on efficient data processing methods</li>
                  <li>Presented findings at student research symposium</li>
                </ul>
              </div> */}
            </div>
          </div>
        )

      case "PROJECTS":
        return (
          <div className="font-mono space-y-8">
            <h2 className="text-3xl font-serif">Projects</h2>

            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">IRIS</h3>
                  <div className="flex gap-2">
                    <Link href="https://github.com/Aaryansingh20/Rag-chat" className="text-blue-600 hover:underline">
                      <Github className="w-5 h-5" />
                    </Link>
                    <Link
                      href="https://rag-chat-prmxxwl6rpcxuy9ft7fua8.streamlit.app/"
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
                <p>
                  
Developed a powerful AI chatbot combining Gemini API and 
Retrieval Augmented Generation (RAG) with dynamic chunking 
using Q Learning for enhanced document search and response 
accuracy.  
                </p>
                <div className="aspect-video relative">
                  <Image
                    src={rag || "/placeholder.svg"}
                    alt="AI Code Assistant"
                    fill
                    className="object-contain rounded-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">Text-AI</h3>
                  <div className="flex gap-2">
                    <Link href="https://github.com/Aaryansingh20/Text-Ai" className="text-blue-600 hover:underline">
                      <Github className="w-5 h-5" />
                    </Link>
                    <Link
                      href="https://text-ai-seven.vercel.app/"
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
                <p>
                  Designed and developed a dynamic single-screen AI website leveraging the Gemini API to provide
                  seamless interaction.
                </p>
                <div className="aspect-video relative">
                  <Image
                    src={textai || "/placeholder.svg"}
                    alt="AI Code Assistant"
                    fill
                    className="object-contain rounded-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">Buymes</h3>
                  <div className="flex gap-2">
                    <Link href="https://github.com/Aaryansingh20/BuyME" className="text-blue-600 hover:underline">
                      <Github className="w-5 h-5" />
                    </Link>
                    <Link
                      href="https://buyme-omega.vercel.app/"
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
                <p>Created an frontend ui of e-commerce website ,there 3d models of clothes with responsive design.</p>
                <div className="aspect-video relative">
                  <Image
                    src={Buyme || "/placeholder.svg"}
                    alt="Collaboration Tool"
                    fill
                    className="object-contain rounded-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">Iphone website</h3>
                  <div className="flex gap-2">
                    <Link
                      href="https://github.com/Aaryansingh20/IPhone-website"
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      <Github className="w-5 h-5" />
                    </Link>
                    <Link
                      href="https://i-phone-website-olive.vercel.app/"
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
                <p>
                  Designed a visually engaging iphone website clone using react, integrating GSAP for smooth and
                  advanced animations.
                </p>
                <div className="aspect-video relative">
                  <Image
                    src={iphone || "/placeholder.svg"}
                    alt="Keyboard Firmware"
                    fill
                    className="object-contain rounded-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case "CONTACT":
        return (
          <div className="font-mono space-y-8">
            <h2 className="text-3xl font-serif">Contact</h2>

            <div className="space-y-6">
              <p>
                I&apos;m always interested in hearing about new opportunities, collaborations, or just having a chat
                about technology and development.
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-serif">Get in touch</h3>
                <div className="space-y-2">
                  <Link
                    href="mailto:singhaaryan348@gmail.com"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <Mail className="w-5 h-5" />
                    singhaaryan348@gmail.com
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/aaryan-singh-b2ab4628a/"
                    target="_blank"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <Linkedin className="w-5 h-5" />
                    @Arayan singh
                  </Link>
                  <Link
                    href="https://github.com/Aaryansingh20"
                    target="_blank"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <Github className="w-5 h-5" />
                    github.com/Aaryansingh20
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-serif">Or use this form</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-2">
                      Name
                    </label>
                    <input type="text" id="name" className="w-full p-2 border rounded-sm font-mono" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2">
                      Email
                    </label>
                    <input type="email" id="email" className="w-full p-2 border rounded-sm font-mono" required />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-2">
                      Message
                    </label>
                    <textarea id="message" rows={5} className="w-full p-2 border rounded-sm font-mono" required />
                  </div>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen p-8 md:p-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Left Navigation */}
        <nav className="md:w-48 flex flex-col">
          <div className="mb-8">
            <h1 className="font-serif text-4xl">Aaryan</h1>
            <h1 className="font-serif text-4xl mb-2">Singh</h1>
          </div>
          <ul className="space-y-4 flex-grow">
            {(["HOME", "ABOUT", "EXPERIENCE", "PROJECTS", "CONTACT"] as Tab[]).map((item) => (
              <li key={item}>
                <button
                  onClick={() => {
                    setActiveTab(item)
                    handleClick()
                  }}
                  className={`font-mono text-blue-600 dark:text-blue-400 hover:underline ${
                    activeTab === item ? "underline font-bold" : ""
                  }`}
                >
                  {activeTab === item ? "• " : ""}
                  {item}
                </button>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>

        {/* Main Content */}
        <main className="flex-1 max-w-3xl overflow-y-auto hide-scrollbar">{renderContent()}</main>
      </div>
    </div>
  )
}
