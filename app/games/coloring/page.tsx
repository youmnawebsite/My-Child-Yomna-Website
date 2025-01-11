'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#000000', '#FFFFFF']

export default function ColoringGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [color, setColor] = useState(colors[0])
  const [brushSize, setBrushSize] = useState(5)
  const [isDrawing, setIsDrawing] = useState(false)
  const [undoStack, setUndoStack] = useState<ImageData[]>([])
  const [redoStack, setRedoStack] = useState<ImageData[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        saveCanvasState()
      }
    }
  }, [])

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    draw(e)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    saveCanvasState()
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx && canvas) {
      ctx.strokeStyle = color
      ctx.lineWidth = brushSize
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y)
    }
  }

  const saveCanvasState = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        setUndoStack(prev => [...prev, ctx.getImageData(0, 0, canvas.width, canvas.height)])
        setRedoStack([])
      }
    }
  }

  const undo = () => {
    const canvas = canvasRef.current
    if (canvas && undoStack.length > 1) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const currentState = undoStack[undoStack.length - 1]
        const previousState = undoStack[undoStack.length - 2]
        setRedoStack(prev => [...prev, currentState])
        setUndoStack(prev => prev.slice(0, -1))
        ctx.putImageData(previousState, 0, 0)
      }
    }
  }

  const redo = () => {
    const canvas = canvasRef.current
    if (canvas && redoStack.length > 0) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const nextState = redoStack[redoStack.length - 1]
        setUndoStack(prev => [...prev, nextState])
        setRedoStack(prev => prev.slice(0, -1))
        ctx.putImageData(nextState, 0, 0)
      }
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        saveCanvasState()
      }
    }
  }

  return (
    <div className="p-4 max-w-3xl mx-auto font-cairo">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-600">لوني يا حبيبتي</h1>
      <div className="flex justify-center space-x-2 mb-4">
        {colors.map((c) => (
          <button
            key={c}
            className={`w-8 h-8 rounded-full ${color === c ? 'ring-2 ring-offset-2 ring-black' : ''}`}
            style={{ backgroundColor: c }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>
      <div className="mb-4">
        <p className="text-center mb-2 text-green-600">حجم الفرشاة: {brushSize}</p>
        <Slider
          min={1}
          max={20}
          step={1}
          value={[brushSize]}
          onValueChange={(value) => setBrushSize(value[0])}
        />
      </div>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="border border-gray-300 mx-auto mb-4 touch-none"
        onPointerDown={startDrawing}
        onPointerMove={draw}
        onPointerUp={stopDrawing}
        onPointerOut={stopDrawing}
      />
      <div className="flex justify-center space-x-2">
        <Button onClick={undo} disabled={undoStack.length <= 1} className="bg-yellow-500 hover:bg-yellow-600">ارجعي خطوه</Button>
        <Button onClick={redo} disabled={redoStack.length === 0} className="bg-blue-500 hover:bg-blue-600">إعادة</Button>
        <Button onClick={clearCanvas} className="bg-red-500 hover:bg-red-600">امسحي كل حاجة</Button>
      </div>
    </div>
  )
}

