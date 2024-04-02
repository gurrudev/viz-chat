import { cn } from '@/lib/utils'
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import '@stream-io/video-react-sdk/dist/css/styles.css';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react';
import { Button } from './button';
import { useRouter, useSearchParams } from 'next/navigation';
import EndCallButton from './endCallButton';
import Loader from './loader';


type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const MeetingRoom = () => {
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
    const [showParticipants, setShowParticipants] = useState(false)
    const searchParams = useSearchParams()
    const isPersonalRoom = !!searchParams.get('personal')

    const {useCallCallingState} = useCallStateHooks()
    const callingState = useCallCallingState() 

    const router = useRouter()

    if(callingState !== CallingState.JOINED) return <Loader/>

    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-left':
                return <SpeakerLayout participantsBarPosition={'left'} />
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition={'right'} />
            default:
                break;
        }
    }

    return (
        <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
            <div className="relative flex size-full items-center justify-center">
                <div className="flex size-full max-w-[1000px] items-center">
                    <CallLayout />
                </div>
                <div className={cn("h-[calc(100vh-86px)] hidden ml-2", { 'show-block': showParticipants })}>
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>
            <div className="fixed bottom-0 flex flex-wrap w-full items-center justify-center gap-5">
                <CallControls onLeave={()=>router.push('/')}/>

                <DropdownMenu>
                    <div className="flex items-center">

                        <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] py-2 px-4 hover:bg-[#4c535b]'>
                            <LayoutList className='text-white' />
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>

                        {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
                            <div key={index}>
                                <DropdownMenuItem
                                    className='cursor-pointer hover:bg-[#4c535b]'
                                    onClick={() => {
                                        setLayout(item.toLowerCase() as CallLayoutType)
                                    }}
                                >{item}</DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </div>
                        ))}

                    </DropdownMenuContent>
                </DropdownMenu>
                <CallStatsButton />
                <Button className='' onClick={() => setShowParticipants((prev) => !prev)}>
                    <div className='cursor-pointer rounded-2xl bg-[#19232d] py-2 px-4 hover:bg-[#4c535b]'>
                        <Users size={20} className='text-white' />
                    </div>
                </Button>
                {!isPersonalRoom && <EndCallButton/>}
            </div>
        </section>
    )
}

export default MeetingRoom