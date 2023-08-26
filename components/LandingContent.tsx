import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const testimonials = [
  {
    name: 'Sarah Smith',
    title: 'Marketing Director',
    desc: 'Best app ever! I am so happy with the media! Will definitely be using this again!',
  },
  {
    name: 'Michael Johnson',
    title: 'Financial Analyst',
    desc: 'Best app ever! I am so happy with the media! Will definitely be using this again!',
  },
  {
    name: 'Emily Chen',
    title: 'Software Engineer',
    desc: 'Best app ever! I am so happy with the media! Will definitely be using this again!',
  },
  {
    name: 'Alex Martinez',
    title: 'Operations Manager',
    desc: 'Best app ever! I am so happy with the media! Will definitely be using this again!',
  },
]

export default function LandingContent() {
  return (
    <div className='px-10 pb-20'>
      <h2 className='text-center text-4xl text-white font-extrabold mb-10'>
        Testimonials
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {testimonials.map(({ name, title, desc }) => (
          <Card key={name} className='bg-[#1d1e20] border-none text-white'>
            <CardHeader>
              <CardTitle className='flex items-center gap-x-2'>
                <div className='flex flex-col gap-2'>
                  <p className='text-lg'>{name}</p>
                  <p className='text-zinc-400 text-sm'>{title}</p>
                </div>
              </CardTitle>
              <CardContent className='pt-4 px-0'>{desc}</CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
