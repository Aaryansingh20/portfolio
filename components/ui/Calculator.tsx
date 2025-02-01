"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { History } from "lucide-react"
import { cn } from "@/lib/utils"
import type React from "react"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [smallDisplay, setSmallDisplay] = useState("")
  const [operation, setOperation] = useState("")
  const [prevValue, setPrevValue] = useState<number | null>(null)
  const [isNewCalculation, setIsNewCalculation] = useState(true)

  const handleNumberClick = (num: string) => {
    if (isNewCalculation) {
      setDisplay(num)
      setSmallDisplay("")
      setIsNewCalculation(false)
    } else {
      setDisplay((prev) => (prev === "0" ? num : prev + num))
    }
  }

  const handleOperationClick = (op: string) => {
    if (prevValue !== null) {
      handleEquals()
    }
    setOperation(op)
    setPrevValue(Number.parseFloat(display))
    setSmallDisplay(`${display} ${op}`)
    setIsNewCalculation(true)
  }

  const handleEquals = () => {
    if (operation && prevValue !== null) {
      const current = Number.parseFloat(display)
      let result = 0
      switch (operation) {
        case "+":
          result = prevValue + current
          break
        case "-":
          result = prevValue - current
          break
        case "*":
          result = prevValue * current
          break
        case "/":
          result = prevValue / current
          break
        case "%":
          result = prevValue % current
          break
      }
      setDisplay(result.toString())
      setSmallDisplay(`${prevValue} ${operation} ${current} =`)
      setOperation("")
      setPrevValue(null)
      setIsNewCalculation(true)
    }
  }

  const handleClear = () => {
    setDisplay("0")
    setSmallDisplay("")
    setOperation("")
    setPrevValue(null)
    setIsNewCalculation(true)
  }

  const handleClearEntry = () => {
    setDisplay("0")
    setIsNewCalculation(true)
  }

  const handleBackspace = () => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"))
  }

  const handleDecimal = () => {
    if (!display.includes(".")) {
      setDisplay((prev) => prev + ".")
    }
  }

  const handleToggleSign = () => {
    setDisplay((prev) => (Number.parseFloat(prev) * -1).toString())
  }

  const handleSpecialOperation = (op: string) => {
    const current = Number.parseFloat(display)
    let result = 0
    switch (op) {
      case "1/x":
        result = 1 / current
        setSmallDisplay(`1/(${current})`)
        break
      case "x²":
        result = Math.pow(current, 2)
        setSmallDisplay(`sqr(${current})`)
        break
      case "√":
        result = Math.sqrt(current)
        setSmallDisplay(`√(${current})`)
        break
    }
    setDisplay(result.toString())
    setIsNewCalculation(true)
  }

  const CalcButton = ({ children, className, ...props }: React.ComponentProps<typeof Button>) => (
    <Button
      variant="ghost"
      className={cn(
        "h-16 text-lg font-light rounded-none hover:bg-gray-700/50 active:bg-gray-600/50 transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  )

  return (
    <div className="w-80 bg-[#202020] text-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between p-2 text-sm">
        <span className="font-semibold">Standard</span>
        <History className="h-4 w-4" />
      </div>

      {/* Display */}
      <div className="h-32 p-6 text-right">
        <div className="text-sm text-gray-400 mb-1 h-4">{smallDisplay}</div>
        <div className="text-6xl font-light truncate">{display}</div>
      </div>

      {/* Memory Buttons */}
      <div className="grid grid-cols-6 gap-[1px] bg-[#202020] text-xs">
        <CalcButton className="text-gray-400">MC</CalcButton>
        <CalcButton className="text-gray-400">MR</CalcButton>
        <CalcButton className="text-gray-400">M+</CalcButton>
        <CalcButton className="text-gray-400">M-</CalcButton>
        <CalcButton className="text-gray-400">MS</CalcButton>
        <CalcButton className="text-gray-400">M▾</CalcButton>
      </div>

      {/* Main Buttons */}
      <div className="grid grid-cols-4 gap-[1px] bg-[#202020]">
        <CalcButton onClick={() => handleOperationClick("%")}>%</CalcButton>
        <CalcButton onClick={handleClearEntry}>CE</CalcButton>
        <CalcButton onClick={handleClear}>C</CalcButton>
        <CalcButton onClick={handleBackspace}>⌫</CalcButton>

        <CalcButton onClick={() => handleSpecialOperation("1/x")}>¹/x</CalcButton>
        <CalcButton onClick={() => handleSpecialOperation("x²")}>x²</CalcButton>
        <CalcButton onClick={() => handleSpecialOperation("√")}>²√x</CalcButton>
        <CalcButton onClick={() => handleOperationClick("/")}>/</CalcButton>

        <CalcButton onClick={() => handleNumberClick("7")}>7</CalcButton>
        <CalcButton onClick={() => handleNumberClick("8")}>8</CalcButton>
        <CalcButton onClick={() => handleNumberClick("9")}>9</CalcButton>
        <CalcButton onClick={() => handleOperationClick("*")}>×</CalcButton>

        <CalcButton onClick={() => handleNumberClick("4")}>4</CalcButton>
        <CalcButton onClick={() => handleNumberClick("5")}>5</CalcButton>
        <CalcButton onClick={() => handleNumberClick("6")}>6</CalcButton>
        <CalcButton onClick={() => handleOperationClick("-")}>-</CalcButton>

        <CalcButton onClick={() => handleNumberClick("1")}>1</CalcButton>
        <CalcButton onClick={() => handleNumberClick("2")}>2</CalcButton>
        <CalcButton onClick={() => handleNumberClick("3")}>3</CalcButton>
        <CalcButton onClick={() => handleOperationClick("+")}>+</CalcButton>

        <CalcButton onClick={handleToggleSign}>+/-</CalcButton>
        <CalcButton onClick={() => handleNumberClick("0")}>0</CalcButton>
        <CalcButton onClick={handleDecimal}>.</CalcButton>
        <CalcButton onClick={handleEquals} className="bg-[#8f4bab] hover:bg-[#9b5bb7] active:bg-[#8f4bab]">
          =
        </CalcButton>
      </div>
    </div>
  )
}

