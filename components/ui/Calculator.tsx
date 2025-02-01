"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, History } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [operation, setOperation] = useState("")
  const [prevValue, setPrevValue] = useState<number | null>(null)

  const handleNumberClick = (num: string) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num))
  }

  const handleOperationClick = (op: string) => {
    setOperation(op)
    setPrevValue(Number.parseFloat(display))
    setDisplay("0")
  }

  const handleEquals = () => {
    const current = Number.parseFloat(display)
    let result = 0
    switch (operation) {
      case "+":
        result = (prevValue || 0) + current
        break
      case "-":
        result = (prevValue || 0) - current
        break
      case "*":
        result = (prevValue || 1) * current
        break
      case "/":
        result = (prevValue || 0) / current
        break
    }
    setDisplay(result.toString())
    setOperation("")
    setPrevValue(null)
  }

  const handleClear = () => {
    setDisplay("0")
    setOperation("")
    setPrevValue(null)
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
      <div className="flex items-center p-2 text-sm">
        <Menu className="h-4 w-4 mr-3" />
        <span className="font-semibold">Standard</span>
        <History className="h-4 w-4 ml-auto" />
      </div>

      {/* Display */}
      <div className="h-32 p-6 text-right">
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
        <CalcButton>%</CalcButton>
        <CalcButton onClick={handleClear}>CE</CalcButton>
        <CalcButton onClick={handleClear}>C</CalcButton>
        <CalcButton>⌫</CalcButton>

        <CalcButton>¹/x</CalcButton>
        <CalcButton>x²</CalcButton>
        <CalcButton>²√x</CalcButton>
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

        <CalcButton>+/-</CalcButton>
        <CalcButton onClick={() => handleNumberClick("0")}>0</CalcButton>
        <CalcButton onClick={() => handleNumberClick(".")}>.</CalcButton>
        <CalcButton onClick={handleEquals} className="bg-[#8f4bab] hover:bg-[#9b5bb7] active:bg-[#8f4bab]">
          =
        </CalcButton>
      </div>
    </div>
  )
}

