'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import confetti from 'canvas-confetti'

export default function CatchHeartsGame() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
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
        setPosition({
          x: Math.random() * (window.innerWidth - 50),
          y: Math.random() * (window.innerHeight - 50),
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [gameOver])

  const catchHeart = () => {
    if (!gameOver) {
      setScore(s => s + 1)
    }
  }

  const resetGame = () => {
    setScore(0)
    setTimeLeft(30)
    setGameOver(false)
  }

  return (
    <div className="p-4 h-screen relative overflow-hidden font-cairo">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-600">اقفش القلوب يا جميل</h1>
      <div className="text-center mb-4">
        <p className="text-xl text-red-600">القلوب: {score}</p>
        <p className="text-xl text-red-600">الوقت: {timeLeft} ثانية</p>
      </div>
      {!gameOver ? (
        <Button
          className="absolute text-4xl bg-transparent hover:bg-transparent transition-all duration-300"
          style={{ left: position.x, top: position.y }}
          onClick={catchHeart}
        >
          ❤️
        </Button>
      ) : (
        <div className="text-center">
          <p className="text-2xl mb-4 text-green-600">انتهت اللعبة! مسكت {score} قلب ❤️</p>
          <Button onClick={resetGame} className="bg-red-500 hover:bg-red-600">العب تاني</Button>
        </div>
      )}
      {gameOver && score >= 20 && confetti()}
    </div>
  )
}

