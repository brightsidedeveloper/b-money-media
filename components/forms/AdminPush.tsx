"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { sendGlobalMessage } from "@/lib/actions/admin.actions"
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast"

export default function AdminPush() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!title) return alert("Title is required")
    if (!body) return alert("Body is required")
    setLoading(true)
    try {
      const { error } = await sendGlobalMessage(title, body)
      if (!error) toast.success("Message sent")
      else toast.error(error)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Input
        placeholder="Body"
        value={body}
        onChange={e => setBody(e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? <Loader2 className="w-4 h-5 animate-spin" /> : "Push"}
      </Button>
    </div>
  )
}
