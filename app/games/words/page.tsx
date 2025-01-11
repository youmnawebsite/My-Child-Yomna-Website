'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import confetti from 'canvas-confetti'

const words = [
  'حب', 'سعادة', 'نجاح', 'أمل', 'حلم', 'قوة', 'إبداع', 'تفاؤل', 'إصرار', 'طموح',
  'شجاعة', 'صبر', 'تحدي', 'إنجاز', 'فرح', 'عزيمة', 'تفوق', 'إرادة', 'نور', 'حكمة'
]

export default function WordsGame() {
  const [currentWord, setCurrentWord] = useState('')
  const [scrambledWord, setScrambledWord] = useState('')
  const [userGuess, setUserGuess] = useState('')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    newWord()
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

  const newWord = () => {
    const word = words[Math.floor(Math.random() * words.length)]
    setCurrentWord(word)
    setScrambledWord(scrambleWord(word))
    setUserGuess('')
  }

  const scrambleWord = (word: string) => {
    return word.split('').sort(() => Math.random() - 0.5).join('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userGuess.toLowerCase() === currentWord.toLowerCase()) {
      setScore(score + 1)
      if (score + 1 >= 10) {
        setGameOver(true)
        confetti()
      } else {
        newWord()
      }
    }
  }

  const resetGame = () => {
    setScore(0)
    setTimeLeft(60)
    setGameOver(false)
    newWord()
  }

  return (
    <div className="p-4 max-w-2xl mx-auto font-cairo">
      <h1 className="text-3xl font-bold text-center mb-6 text-yellow-600">الكلمة السحرية يا ذكي</h1>
      <div className="text-center mb-4">
        <p className="text-xl text-yellow-600">النقط: {score}</p>
        <p className="text-xl text-yellow-600">الوقت: {timeLeft} ثانية</p>
      </div>
      {!gameOver ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center">
            <p className="text-2xl font-bold mb-2 text-yellow-600">الكلمة المخلبطة:</p>
            <p className="text-4xl">{scrambledWord}</p>
          </div>
          <Input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder="اكتب الكلمة الصح"
            className="text-center"
          />
          <div className="text-center">
            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600">أرسل</Button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-2xl mb-4 text-green-600">
            {score >= 10 ? 'برافو عليك يا ذكي! كسبت اللعبة 🎉' : 'انتهى الوقت!'}
          </p>
          <p className="text-xl mb-4 text-yellow-600">نقطك النهائية: {score}</p>
          <Button onClick={resetGame} className="bg-yellow-500 hover:bg-yellow-600">العب تاني</Button>
        </div>
      )}
    </div>
  )
}

