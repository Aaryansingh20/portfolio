"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shuffle, Clock, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"]

export default function MemoryGame() {
  const [cards, setCards] = useState<string[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [solved, setSolved] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [time, setTime] = useState(0)

  useEffect(() => {
    shuffleCards()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (!gameOver) {
        setTime((prevTime) => prevTime + 1)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [gameOver])

  const shuffleCards = () => {
    const shuffledCards = [...emojis, ...emojis].sort(() => Math.random() - 0.5)
    setCards(shuffledCards)
    setFlipped([])
    setSolved([])
    setMoves(0)
    setTime(0)
    setGameOver(false)
  }

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || solved.includes(index) || flipped.includes(index)) return

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)
    setMoves(moves + 1)

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped
      if (cards[first] === cards[second]) {
        setSolved([...solved, first, second])
        setFlipped([])
        if (solved.length + 2 === cards.length) {
          setGameOver(true)
        }
      } else {
        setTimeout(() => setFlipped([]), 1000)
      }
    }
  }

  return (
    <div className="min-h-[600px] bg-gray-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Memory Game</h1>
          <div className="flex justify-center gap-4 text-gray-600">
            <motion.div className="flex items-center gap-1" whileHover={{ scale: 1.1 }}>
              <Clock className="w-4 h-4" />
              <span>{time}s</span>
            </motion.div>
            <motion.div className="flex items-center gap-1" whileHover={{ scale: 1.1 }}>
              <Shuffle className="w-4 h-4" />
              <span>{moves} moves</span>
            </motion.div>
          </div>
        </motion.div>
        <div className="grid grid-cols-4 gap-2 mb-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: flipped.includes(index) || solved.includes(index) ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="aspect-square"
            >
              <Button
                className={`w-full h-full text-2xl ${
                  flipped.includes(index) || solved.includes(index)
                    ? "bg-white text-gray-800 shadow-md"
                    : "bg-gray-200 text-transparent hover:bg-gray-300"
                }`}
                onClick={() => handleCardClick(index)}
                style={{ transform: "rotateY(180deg)" }}
              >
                {card}
              </Button>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 ease-in-out"
              onClick={shuffleCards}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Game
            </Button>
          </motion.div>
        </div>
      </Card>
      <AnimatePresence>
        {gameOver && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Card className="bg-white p-6 rounded-2xl text-center shadow-xl">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Congratulations!</h2>
                <p className="mb-4 text-gray-600">
                  You completed the game in {time} seconds and {moves} moves.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={shuffleCards}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 ease-in-out"
                  >
                    Play Again
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

