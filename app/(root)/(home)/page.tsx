import MeetingTypeList from "@/components/ui/meetingTypeList"

const Home = () => {

  const now = new Date()
  const date = (new Intl.DateTimeFormat('en-US', {dateStyle: 'full'})).format(now)
  const time = now.toLocaleString('en-IN', {hour:'2-digit', minute:'2-digit'}).toLocaleUpperCase()

  // console.log(time)

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='w-full h-[300px] rounded-[20px] bg-hero bg-cover'>
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className='max-w-[270px] bg-white bg-opacity-10 rounded py-2 text-center text-base font-normal'>Upcoming Meeting at: 12:09 PM</h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>{time}</h1>
            <p className='text-lg  font-medium text-sky-1 lg:text-2xl'>{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList/>
    </section>
  )
}

export default Home