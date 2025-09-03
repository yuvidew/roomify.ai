import React from 'react'
import { Room } from './room'

export const RoomsContainer = () => {
    return (
        <section className=' flex flex-col gap-5 w-[100%] p-5'>
            {/* start to  Total floor area: */}
            <div className="rounded-lg border bg-muted/50 p-4 text-center">
                <p className="text-sm text-muted-foreground">
                    Total floor area:
                    {/* <span className="font-medium">{roomData.reduce((sum, room) => sum + room.approxAreaSqFt, 0)} sq ft</span> */}

                    {/* TODO : show the floor area */}
                </p>
            </div>
            {/* end to  Total floor area: */}

            <div className=' grid grid-cols-2 gap-3'>
                <Room/>
            </div>
        </section>
    )
}
