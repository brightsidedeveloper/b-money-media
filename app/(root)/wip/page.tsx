'use client'
import TypewriterComponent from 'typewriter-effect'

export default function page() {
  return (
    <div className='h-full flex justify-center items-center text-heading1-bold'>
      <div className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
        <TypewriterComponent
          options={{
            strings: process.env.NEXT_PUBLIC_PG
              ? [
                  'What if you could...',
                  'do anything?',
                  'What would you...',
                  'put here? :)',
                ]
              : ['Get Ready to...', 'Clown People!'],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
    </div>
  )
}
