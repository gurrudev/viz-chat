'use client'
import { useState } from 'react'
import HomeCard from './homeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './meetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from "./use-toast"
import ReactDatePicker from 'react-datepicker'
import Input from 'postcss/lib/input'


const MeetingTypeList = () => {
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
    const router = useRouter()
    const { user } = useUser()
    const client = useStreamVideoClient()
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    })
    const [callDetails, setcallDetails] = useState<Call>()
    const { toast } = useToast()


    const createMeeting = async () => {
        if (!client || !user) return
        try {
            if (!values.dateTime) {
                toast({ title: "Please select date and time" })
                return
            }
            const id = crypto.randomUUID()
            const call = client.call('default', id)

            if (!call) throw new Error('Faild to create call')

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
            const description = values.description || 'Instant Meeting'

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })

            setcallDetails(call)

            if (!values.description) {
                router.push(`/meeting/${call.id}`)
            }
            toast({ title: "Meeting Created" })
        } catch (err) {
            console.log(err)
            toast({ title: "Faild to create meeting" })
        }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard
                image='/icons/add-meeting.svg'
                title='New Meeting'
                description="Start an Instant Meeting"
                handleClick={() => setMeetingState('isInstantMeeting')}
                className="bg-orange-1"
            />
            <HomeCard
                image='/icons/schedule.svg'
                title='Schedule Meeting'
                description="Plan Your Meeting"
                handleClick={() => setMeetingState('isScheduleMeeting')}
                className="bg-blue-1"
            />
            <HomeCard
                image='/icons/recordings.svg'
                title='Recordings'
                description="Checkout Your Recordings"
                handleClick={() => router.push('/recordings')}
                className="bg-purple-1"
            />
            <HomeCard
                image='/icons/join-meeting.svg'
                title='Join Meeting'
                description="Via Invitation Link"
                handleClick={() => setMeetingState('isJoiningMeeting')}
                className="bg-yellow-1"
            />

            {(!callDetails) ?
                (<MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title='Create Meeting'
                    className='text-center'
                    buttonText='Schedule Meeting'
                    handleClick={createMeeting}
                >
                    <div className='flex flex-col gap-2.5'>
                        <label className='text-base leading-[22px] text-sky-1'>
                            Add Description
                        </label>
                        <textarea className='border-none bg-gray-800 p-2 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0' onChange={(e)=>setValues({...values, description: e.target.value})}/>
                    </div>
                    <div className="flex w-full flex-col gap-2.5 ">
                        <label className='text-base text-normal leading-[22px] text-sky-1'>Select Date and Time</label>
                        <ReactDatePicker
                            selected={values.dateTime}
                            onChange={(date)=> setValues({...values, dateTime: date!})}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption='time'
                            dateFormat={'MMMM d, yyyy h:mm aa'}
                            className='w-full rounded bg-gray-800 p-2 focus:outline-none'
                        />
                    </div>
                </MeetingModal>)
                :
                (<MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title='Meeting Created'
                    className='text-cente'
                    buttonText='Copy Meeting Link'
                    handleClick={()=>{
                        navigator.clipboard.writeText(meetingLink)
                        toast({title: 'Link Copied'})
                    }}
                    image='/icons/checked.svg'
                    buttonIcon='/icons/copy.svg'
                />)
            }

            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title='Start an Instant Meeting'
                className='text-center'
                buttonText='Start Meeting'
                handleClick={createMeeting}

            />

            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title='Meeting link'
                className='text-center'
                buttonText='Join Meeting'
                handleClick={()=>router.push(values.link)}

            >
                <input
                    placeholder='Enter meeting link here...'
                    className='bg-gray-800 focus:outline-none p-2.5 rounded'
                    onChange={(e)=>setValues({...values, link: e.target.value})}
                />
            </MeetingModal>

        </section>
    )
}

export default MeetingTypeList