"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, Plus, Settings, X } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
}

export default function Notepad() {
  const [notes, setNotes] = useState<Note[]>([{ id: "1", title: "Untitled", content: "" }])
  const [activeNoteId, setActiveNoteId] = useState("1")

  const activeNote = notes.find((note) => note.id === activeNoteId) || notes[0]

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(notes.map((note) => (note.id === activeNoteId ? { ...note, content: e.target.value } : note)))
  }

  const createNewNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: "Untitled",
      content: "",
    }
    setNotes([...notes, newNote])
    setActiveNoteId(newNote.id)
  }

  const closeNote = (id: string) => {
    if (notes.length === 1) return
    const newNotes = notes.filter((note) => note.id !== id)
    setNotes(newNotes)
    if (id === activeNoteId) {
      setActiveNoteId(newNotes[0].id)
    }
  }

  const saveNote = () => {
    // In a real app, this would save to a database
    console.log("Saving note:", activeNote)
    alert("Note saved!")
  }

  return (
    <div className="flex flex-col h-screen bg-[#1E1E1E] text-white">
      {/* Top Menu Bar */}
      <div className="flex items-center bg-[#2D2D2D] px-2 py-1 text-sm">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-white hover:bg-[#3D3D3D]">
              File
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#2D2D2D] text-white border-[#3D3D3D]">
            <DropdownMenuItem onClick={createNewNote}>New File</DropdownMenuItem>
            <DropdownMenuItem onClick={saveNote}>Save</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-white hover:bg-[#3D3D3D]">
              Edit
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#2D2D2D] text-white border-[#3D3D3D]">
            <DropdownMenuItem>Cut</DropdownMenuItem>
            <DropdownMenuItem>Copy</DropdownMenuItem>
            <DropdownMenuItem>Paste</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-white hover:bg-[#3D3D3D]">
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#2D2D2D] text-white border-[#3D3D3D]">
            <DropdownMenuItem>Word Wrap</DropdownMenuItem>
            <DropdownMenuItem>Toggle Line Numbers</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center bg-[#252526] border-b border-[#3D3D3D] overflow-x-auto">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`group flex items-center min-w-[120px] px-3 py-2 cursor-pointer border-r border-[#3D3D3D] ${
              note.id === activeNoteId ? "bg-[#1E1E1E]" : "bg-[#2D2D2D]"
            }`}
            onClick={() => setActiveNoteId(note.id)}
          >
            <FileText className="w-4 h-4 mr-2" />
            <span className="text-sm truncate">{note.title}</span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto p-0 h-4 w-4 opacity-0 group-hover:opacity-100 hover:bg-transparent"
              onClick={(e) => {
                e.stopPropagation()
                closeNote(note.id)
              }}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ))}
        <Button
          variant="ghost"
          size="icon"
          className="h-full px-3 text-white hover:bg-[#3D3D3D]"
          onClick={createNewNote}
        >
          <Plus className="w-4 h-4" />
        </Button>
        <div className="ml-auto">
          <Button variant="ghost" size="icon" className="h-full px-3 text-white hover:bg-[#3D3D3D]">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Editor Area */}
      <Textarea
        value={activeNote.content}
        onChange={handleContentChange}
        placeholder="Start typing..."
        className="flex-grow resize-none p-4 bg-[#1E1E1E] text-white border-none rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      {/* Status Bar */}
      <div className="flex items-center justify-between px-2 py-1 text-xs bg-[#007ACC] text-white">
        <div>Ln 1, Col 1</div>
        <div>UTF-8</div>
      </div>
    </div>
  )
}

