import User from '@/lib/models/user.model'
import { connectToDB } from '@/lib/mongoose'
import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    try {
        connectToDB()
    
    
        const clerkUser = await currentUser()
    
        if (!clerkUser) return NextResponse.json({ error: 'No User '})
    
        const subscription = await req.json()
    
        //Save subscription to database
        const user = await User.findOneAndUpdate({id: clerkUser.id}, { subscription }, { upsert:true})
    
        return NextResponse.json({ user })
      } catch (err: any) {
        console.log('[ERRO SUBING USEr]', err)
        return NextResponse.json({ error: err.message })
      }

  } catch (error) {
    console.log('[SERVER ERROR - PUSH SUBSCRIBE]: ', error)
  }
}
