'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const initialPuzzle = [1, 2, 3, 4, 5, 6, 7, 8, 0]

export default function PuzzleGame() {
  const [puzzle, setPuzzle] = useState(initialPuzzle)

  useEffect(() => {
    shufflePuzzle()
  }, [])

  const shufflePuzzle = () => {
    const shuffled = [...initialPuzzle].sort(() => Math.random() - 0.5)
    setPuzzle(shuffled)
  }

  const handleMove = (index: number) => {
    const zeroIndex = puzzle.indexOf(0)
    if (
      (index === zeroIndex - 1 && zeroIndex % 3 !== 0) ||
      (index === zeroIndex + 1 && zeroIndex % 3 !== 2) ||
      index === zeroIndex - 3 ||
      index === zeroIndex + 3
    ) {
      const newPuzzle = [...puzzle]
      ;[newPuzzle[index], newPuzzle[zeroIndex]] = [newPuzzle[zeroIndex], newPuzzle[index]]
      setPuzzle(newPuzzle)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">رتبي الأرقام</h1>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {puzzle.map((num, index) => (
          <Card 
            key={index} 
            className={`h-20 flex items-center justify-center text-2xl cursor-pointer
              ${num === 0 ? 'bg-gray-200' : 'bg-blue-300'}`}
            onClick={() => handleMove(index)}
          >
            <CardContent>
              {num !== 0 ? num : ''}
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={shufflePuzzle} className="w-full">لغبطيهم تاني</Button>
    </div>
  )
}

