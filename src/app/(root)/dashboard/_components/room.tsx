import { Card } from "@/components/ui/card";
import React from "react";
import {
    Home,
    Bath,
    Bed,
    ChefHat,
    Package,
    Sofa,
    MoreHorizontal,
} from "lucide-react";
import { Room } from "@/types/type";

export const RoomCard = ({ type, name, notes, approxAreaSqFt }: Room) => {
    const matchChar = 345;
    const getIcon = (type: string) => {
        switch (type) {
            case "bedroom":
                return <Bed className="h-4 w-4" />;
            case "bathroom":
                return <Bath className="h-4 w-4" />;
            case "kitchen":
                return <ChefHat className="h-4 w-4" />;
            case "living":
                return <Sofa className="h-4 w-4" />;
            case "storage":
                return <Package className="h-4 w-4" />;
            case "hall":
                return <MoreHorizontal className="h-4 w-4" />;
            case "balcony":
                return <Home className="h-4 w-4" />;
            default:
                return <Home className="h-4 w-4" />;
        }
    };
    return (
        <Card className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 pb-4">
                <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        {getIcon(type)}
                    </div>
                    <div className="flex-1 space-y-1">
                        <h3 className="text-sm font-semibold leading-none tracking-tight">
                            {name}
                        </h3>
                        <p className="text-sm text-muted-foreground capitalize">{type}</p>
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
                        <span className="text-sm text-muted-foreground">{approxAreaSqFt} ft</span>
                    </div>

                    <div className="rounded-md bg-muted p-3">
                        {/* {notes.length <= matchChar ? (
                            <p className=" text-sm ">{notes}</p>
                        ) : (
                        )} */}
                            <div className=' relative flex flex-col gap-2'>
                                <p className=' text-[14px] space-x-[3%]  '>{notes.slice(0, matchChar)}...</p>
                            </div>

                    </div>
                </div>
            </div>
        </Card>
    );
};
