'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import confetti from 'canvas-confetti'

export default function NumbersGame() {
  const [number1, setNumber1] = useState(0)
  const [number2, setNumber2] = useState(0)
  const [operation, setOperation] = useState('+')
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    newProblem()
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          setGameOver(true)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const newProblem = () => {
    const operations = ['+', '-', '×']
    const newOperation = operations[Math.floor(Math.random() * operations.length)]
    let num1, num2
    switch (newOperation) {
      case '+':
        num1 = Math.floor(Math.random() * 50) + 1
        num2 = Math.floor(Math.random() * 50) + 1
        break
      case '-':
        num1 = Math.floor(Math.random() * 50) + 26
        num2 = Math.floor(Math.random() * 25) + 1
        break
      case '×':
        num1 = Math.floor(Math.random() * 10) + 1
        num2 = Math.floor(Math.random() * 10) + 1
        break
      default:
        num1 = 0
        num2 = 0
    }
    setNumber1(num1)
    setNumber2(num2)
    setOperation(newOperation)
    setUserAnswer('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let correctAnswer
    switch (operation) {
      case '+':
        correctAnswer = number1 + number2
        break
      case '-':
        correctAnswer = number1 - number2
        break
      case '×':
        correctAnswer = number1 * number2
        break
      default:
        correctAnswer = 0
    }
    if (parseInt(userAnswer) === correctAnswer) {
      setScore(score + 1)
      if (score + 1 >= 15) {
        setGameOver(true)
        confetti()
      } else {
        newProblem()
      }
    }
  }

  const resetGame = () => {
    setScore(0)
    setTimeLeft(60)
    setGameOver(false)
    newProblem()
  }

  return (
    <div className="p-4 max-w-2xl mx-auto font-cairo">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">احسبي يعني تقريبا بتحبي الماث</h1>
      <div className="text-center mb-4">
        <p className="text-xl text-purple-600">النقط: {score}</p>
        <p className="text-xl text-purple-600">الوقت: {timeLeft} ثانية</p>
      </div>
      {!gameOver ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center">
            <p className="text-4xl font-bold mb-2 text-purple-600">
              {number1} {operation} {number2} = ?
            </p>
          </div>
          <Input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="اكتبي الإجابة يا شطورة"
            className="text-center"
          />
          <div className="text-center">
            <Button type="submit" className="bg-purple-500 hover:bg-purple-600">أرسل</Button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-2xl mb-4 text-green-600">
            {score >= 15 ? 'برافو عليكي يحبيبتي خلصتي اللعبه    🎉' : 'خلص الوقت'}
          </p>
          <p className="text-xl mb-4 text-purple-600">نقطك النهائية: {score}</p>
          <Button onClick={resetGame} className="bg-purple-500 hover:bg-purple-600">العب تاني</Button>
        </div>
      )}
    </div>
  )
}

