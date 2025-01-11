'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

export default function BubblePopGame() {
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number }[]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(t => t - 1)
      } else {
        clearInterval(timer)
        setGameOver(true)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setBubbles(prev => [
          ...prev,
          {
            id: Date.now(),
            x: Math.random() * (window.innerWidth - 50),
            y: window.innerHeight
          }
        ])
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [gameOver])

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setBubbles(prev => prev.map(bubble => ({
          ...bubble,
          y: bubble.y - 5
        })).filter(bubble => bubble.y > -50))
      }, 50)

      return () => clearInterval(interval)
    }
  }, [gameOver])

  const popBubble = (id: number) => {
    setBubbles(prev => prev.filter(bubble => bubble.id !== id))
    setScore(s => s + 1)
  }

  const resetGame = () => {
    setBubbles([])
    setScore(0)
    setTimeLeft(30)
    setGameOver(false)
  }

  return (
    <div className="p-4 h-screen relative overflow-hidden font-cairo">
      <h1 className="text-3xl font-bold text-center mb-6 text-cyan-600">طقطقي الفقاقيع</h1>
      <div className="text-center mb-4">
        <p className="text-xl text-cyan-600">النقط: {score}</p>
        <p className="text-xl text-cyan-600">الوقت: {timeLeft} ثانية</p>
      </div>
      {!gameOver ? (
        bubbles.map(bubble => (
          <Button
            key={bubble.id}
            className="absolute rounded-full w-12 h-12 bg-cyan-300 hover:bg-cyan-400 transition-all duration-300"
            style={{ left: bubble.x, top: bubble.y }}
            onClick={() => popBubble(bubble.id)}
          >
            🫧
          </Button>
        ))
      ) : (
        <div className="text-center">
          <p className="text-2xl mb-4 text-green-600">شطوره جبتي : {score}</p>
          <Button onClick={resetGame} className="bg-cyan-500 hover:bg-cyan-600">العبي تاني</Button>
        </div>
      )}
    </div>
  )
}

