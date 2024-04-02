'use client'

import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './button'

const MeetingSetup = ({setIsSetupComplete}: {setIsSetupComplete: (value: boolean)=> void}) => {

    const [isMicCamToggledOn, setMicCamToggledOn] = useState(false)

    const call = useCall()

    useEffect(()=>{
        if(isMicCamToggledOn){
            call?.camera.disable()
            call?.microphone.disable()
        }else{
            call?.camera.enable()
            call?.microphone.enable()
        }
    },[isMicCamToggledOn, call?.camera, call?.microphone])

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
        <h1 className='text-2xl font-bold'>Setup</h1>
        <VideoPreview/>
        <div className="flex h-16 items-center justify-between gap-3">
            <label className='flex items-center cursor-pointer justify-center gap-2 font-medium'>
                <input type="checkbox"
                name='mic_cam'
                checked={isMicCamToggledOn}
                className='cursor-pointer'
                onChange={(e)=> setMicCamToggledOn(e.target.checked)} />
                Join with mic and camera off
            </label>
            <DeviceSettings/>
        </div>
        <Button className='bg-green-500 rounded-md px-4 py-2.5' 
            onClick={()=>{
                call?.join()
                setIsSetupComplete(true)
            }}
        >
            Join Meetting
        </Button>
    </div>
  )
}

export default MeetingSetup