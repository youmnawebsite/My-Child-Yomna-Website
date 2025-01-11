'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼']

export default function MemoryGame() {
  const [cards, setCards] = useState<string[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [solved, setSolved] = useState<number[]>([])
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    shuffleCards()
  }, [])

  const shuffleCards = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlipped([])
    setSolved([])
  }

  const handleClick = (index: number) => {
    if (flipped.length === 0) {
      setFlipped([index])
      return
    }

    if (flipped.length === 1) {
      setDisabled(true)
      if (cards[flipped[0]] === cards[index] && flipped[0] !== index) {
        setSolved([...solved, flipped[0], index])
        setFlipped([])
        setDisabled(false)
      } else {
        setFlipped([...flipped, index])
        setTimeout(() => {
          setFlipped([])
          setDisabled(false)
        }, 1000)
      }
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">افتكري اماكن الحيوانات</h1>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {cards.map((card, index) => (
          <Card 
            key={index} 
            className={`h-16 flex items-center justify-center text-2xl cursor-pointer
              ${flipped.includes(index) || solved.includes(index) ? '' : 'bg-purple-300'}`}
            onClick={() => !disabled && !flipped.includes(index) && !solved.includes(index) && handleClick(index)}
          >
            <CardContent>
              {flipped.includes(index) || solved.includes(index) ? card : ''}
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={shuffleCards} className="w-full">لغبطيهم تاني</Button>
    </div>
  )
}

