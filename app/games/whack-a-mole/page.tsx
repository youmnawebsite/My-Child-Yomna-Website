'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import confetti from 'canvas-confetti'

export default function WhackAMoleGame() {
  const [moles, setMoles] = useState(Array(9).fill(false))
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
        setMoles(prev => prev.map((_, i) => i === Math.floor(Math.random() * 9)))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [gameOver])

  const whackMole = (index: number) => {
    if (moles[index] && !gameOver) {
      setScore(s => s + 1)
      setMoles(prev => prev.map((m, i) => i === index ? false : m))
    }
  }

  const resetGame = () => {
    setMoles(Array(9).fill(false))
    setScore(0)
    setTimeLeft(30)
    setGameOver(false)
  }

  return (
    <div className="p-4 font-cairo">
      <h1 className="text-3xl font-bold text-center mb-6 text-brown-600">اضربي البتاع ده يا بنوتي</h1>
      <div className="text-center mb-4">
        <p className="text-xl text-brown-600">النقط: {score}</p>
        <p className="text-xl text-brown-600">الوقت: {timeLeft} ثانية</p>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {moles.map((mole, index) => (
          <Button
            key={index}
            className={`h-24 text-4xl ${mole ? 'bg-brown-400' : 'bg-green-400'} transition-all duration-300`}
            onClick={() => whackMole(index)}
            disabled={gameOver}
          >
            {mole ? '🐹' : ''}
          </Button>
        ))}
      </div>
      {gameOver && (
        <div className="text-center">
          <p className="text-2xl mb-4 text-green-600"> خلصتي اللعبه يحبيبتي
             نقطك: {score}</p>
          <Button onClick={resetGame} className="bg-brown-500 hover:bg-brown-600">العبي تاني</Button>
        </div>
      )}
      {gameOver && score >= 25 && confetti()}
    </div>
  )
}

