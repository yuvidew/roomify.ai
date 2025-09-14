import React from 'react'
import { Card, CardHeader } from './ui/card'
import { OctagonAlert } from 'lucide-react'

interface Props {
    message : string
}

export const ErrorCard = ({message} : Props) => {
    return (
        <Card className=' w-96'>
            <CardHeader className=' '>
                <div className=' flex items-center justify-center'>
                <OctagonAlert className=' size-11 text-center text-red-500' />
                </div>
                <h1 className=' text-xl text-center'>{message}</h1>
            </CardHeader>
        </Card>
    )
}
