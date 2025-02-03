"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Mail, Twitter } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"

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
              I&apos;m a software engineer currently working at Vercel. In May of 2022 I graduated from Rensselaer
              Polytechnic Institute with my BS in Computer Science.
            </p>

            <p className="font-mono leading-relaxed">
              Thank you for taking the time to check out my portfolio. I really hope you enjoy exploring it as much as I
              enjoyed building it. If you have any questions or comments, feel free to contact me using{" "}
              <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                this form
              </Link>{" "}
              or shoot me an email at{" "}
              <Link
                href="mailto:henry.heffernan@gmail.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                henry.heffernan@gmail.com
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
                  <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Click here to download it!
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-serif">About Me</h2>
              <p className="font-mono leading-relaxed">
                From a young age, I have had a curiosity about how things worked. This naturally led me to become
                absolutely obsessed with Lego and I fell in love with building things. In elementary school, I joined
                the Lego Robotics team at my local middle school, which was my first real exposure to programming. In
                2008, my family and I moved across the country from California to New York, where I attended middle
                school, high school, and college.
              </p>
              <div className="aspect-video relative">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Coding setup"
                  fill
                  className="object-cover rounded-sm"
                />
              </div>
            </div>
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
                    <li>JavaScript/TypeScript</li>
                    <li>Python</li>
                    <li>C++</li>
                    <li>Java</li>
                    <li>SQL</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Technologies</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>React/Next.js</li>
                    <li>Node.js</li>
                    <li>Git</li>
                    <li>Docker</li>
                    <li>AWS/Vercel</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-serif">Education</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold">Rensselaer Polytechnic Institute</h4>
                  <p>BS in Computer Science</p>
                  <p className="text-gray-600">2018 - 2022</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-serif">Interests</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="aspect-square relative">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Mechanical keyboard"
                      fill
                      className="object-cover rounded-sm"
                    />
                  </div>
                  <p>
                    I&apos;m passionate about mechanical keyboards and have built several custom ones. This hobby
                    combines my love for engineering, design, and typing.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="aspect-square relative">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Rock climbing"
                      fill
                      className="object-cover rounded-sm"
                    />
                  </div>
                  <p>
                    Rock climbing has been my go-to activity for both physical and mental challenges. It&apos;s like
                    solving puzzles while working out.
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
                    <h3 className="text-xl font-bold">Software Engineer</h3>
                    <p className="text-blue-600">Vercel</p>
                  </div>
                  <p className="text-gray-600">2022 - Present</p>
                </div>
                <ul className="list-disc list-inside space-y-2">
                  <li>Led the development of key platform features using Next.js and TypeScript</li>
                  <li>Optimized build performance resulting in 40% faster deployment times</li>
                  <li>Collaborated with the design team to implement new UI components</li>
                  <li>Mentored junior developers and conducted code reviews</li>
                </ul>
                <div className="aspect-video relative">
                  <Image
                    src="/placeholder.svg?height=300&width=600"
                    alt="Vercel office"
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">Software Development Intern</h3>
                    <p className="text-blue-600">Tech Startup</p>
                  </div>
                  <p className="text-gray-600">Summer 2021</p>
                </div>
                <ul className="list-disc list-inside space-y-2">
                  <li>Developed and maintained React components for the main product</li>
                  <li>Implemented responsive designs and improved mobile UX</li>
                  <li>Integrated third-party APIs and services</li>
                </ul>
              </div>

              <div className="space-y-4">
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
              </div>
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
                  <h3 className="text-xl font-bold">AI-Powered Code Assistant</h3>
                  <div className="flex gap-2">
                    <Link href="#" className="text-blue-600 hover:underline">
                      <Github className="w-5 h-5" />
                    </Link>
                    <Link href="#" className="text-blue-600 hover:underline">
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
                <p>
                  A VS Code extension that provides AI-powered code completions and suggestions. Built with TypeScript
                  and OpenAI&apos;s GPT-3 API.
                </p>
                <div className="aspect-video relative">
                  <Image
                    src="/placeholder.svg?height=300&width=600"
                    alt="AI Code Assistant"
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">Real-time Collaboration Tool</h3>
                  <div className="flex gap-2">
                    <Link href="#" className="text-blue-600 hover:underline">
                      <Github className="w-5 h-5" />
                    </Link>
                    <Link href="#" className="text-blue-600 hover:underline">
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
                <p>
                  A web application for real-time document collaboration. Built with Next.js, WebSocket, and MongoDB.
                </p>
                <div className="aspect-video relative">
                  <Image
                    src="/placeholder.svg?height=300&width=600"
                    alt="Collaboration Tool"
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">Custom Mechanical Keyboard Firmware</h3>
                  <div className="flex gap-2">
                    <Link href="#" className="text-blue-600 hover:underline">
                      <Github className="w-5 h-5" />
                    </Link>
                    <Link href="#" className="text-blue-600 hover:underline">
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
                <p>
                  Custom firmware for mechanical keyboards written in C++. Includes features like layers, macros, and
                  RGB control.
                </p>
                <div className="aspect-video relative">
                  <Image
                    src="/placeholder.svg?height=300&width=600"
                    alt="Keyboard Firmware"
                    fill
                    className="object-cover rounded-sm"
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
                    href="mailto:henry.heffernan@gmail.com"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <Mail className="w-5 h-5" />
                    henry.heffernan@gmail.com
                  </Link>
                  <Link href="#" className="flex items-center gap-2 text-blue-600 hover:underline">
                    <Twitter className="w-5 h-5" />
                    @henryheffernan
                  </Link>
                  <Link href="#" className="flex items-center gap-2 text-blue-600 hover:underline">
                    <Github className="w-5 h-5" />
                    github.com/henryheffernan
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
            <h1 className="font-serif text-4xl">Henry</h1>
            <h1 className="font-serif text-4xl mb-2">Heffernan</h1>
            <h2 className="font-serif text-xl text-gray-700 dark:text-gray-300">Showcase &apos;22</h2>
          </div>
          <ul className="space-y-4 flex-grow">
            {(["HOME", "ABOUT", "EXPERIENCE", "PROJECTS", "CONTACT"] as Tab[]).map((item) => (
              <li key={item}>
               <button
  onClick={() => {
    setActiveTab(item);
    handleClick();
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

