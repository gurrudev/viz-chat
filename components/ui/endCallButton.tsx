'use client'

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk"
import { Button } from "./button"
import { useRouter } from "next/navigation"

const EndCallButton = () => {
    const call = useCall()
    const {useLocalParticipant} = useCallStateHooks()
    const localParticipant = useLocalParticipant()
    const router = useRouter()

    const isMeetingOwner = localParticipant && call?.state.createdAt && localParticipant.userId === call.state.createdBy?.id

    if(!isMeetingOwner) return null

  return (
    <Button onClick={async()=>{
        await call.endCall();
        router.push('/')
    }} className="bg-red-500">End call for everyone</Button>
  )
}

export default EndCallButton