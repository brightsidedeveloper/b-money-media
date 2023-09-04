import AwardClown from './AwardClown'

export default function page() {
  return (
    <div className='-mt-12 flex flex-col gap-3'>
      <h1 className='text-heading2-semibold text-light-1'>Admin Dashboard</h1>
      <AwardClown />
    </div>
  )
}
