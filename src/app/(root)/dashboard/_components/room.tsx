import { Card } from '@/components/ui/card'
import { Lamp } from 'lucide-react'
import React from 'react'

export const Room = () => {
    return (
        <Card
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
        >
            <div className="p-6 pb-4">
                <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Lamp/>
                    </div>
                    <div className="flex-1 space-y-1">
                        <h3 className="text-sm font-semibold leading-none tracking-tight">
                            MASTER BED ROOM
                        </h3>
                        <p className="text-sm text-muted-foreground capitalize">
                            bedroom
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold">260</div>
                        <div className="text-xs text-muted-foreground">sq ft</div>
                    </div>
                </div>
            </div>

            <div className="p-6 pt-0">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Dimensions</span>
                        <span className="text-sm text-muted-foreground">19.70x8.11 ft</span>
                    </div>

                    <div className="rounded-md bg-muted p-3">
                        <p className="text-sm text-muted-foreground">
                            Main entrance verandah, L-shaped. Area calculated for the main rectangular section. Dimensions calculated from 6005x2471 mm.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    )
}
