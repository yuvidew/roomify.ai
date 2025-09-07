"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Home,
    Bath,
    Bed,
    ChefHat,
    Package,
    Sofa,
    MoreHorizontal,
} from "lucide-react";

interface Props  {
    rooms : {
        value : string,
        label : string
    }[],
    isShowIcons? : boolean,
    onChangeValue : (value : string) => void
}

export const SearchWithDropDown = ({rooms , isShowIcons = false , onChangeValue} : Props) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    const getIcon = (type: string) => {
            switch (type) {
                case "bedroom":
                    return <Bed className="h-4 w-4 text-primary" />;
                case "bathroom":
                    return <Bath className="h-4 w-4 text-primary" />;
                case "kitchen":
                    return <ChefHat className="h-4 w-4 text-primary" />;
                case "living":
                    return <Sofa className="h-4 w-4 text-primary" />;
                case "storage":
                    return <Package className="h-4 w-4 text-primary" />;
                case "hall":
                    return <MoreHorizontal className="h-4 w-4 text-primary" />;
                case "balcony":
                    return <Home className="h-4 w-4 text-primary" />;
                default:
                    return <Home className="h-4 w-4 text-primary" />;
            }
        };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? rooms.find((room) => room.value === value)?.label
                        : "Select room..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search room..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No room found.</CommandEmpty>
                        <CommandGroup>
                            <CommandItem
                                // value="all"
                                onSelect={() => {
                                    onChangeValue("")
                                    // setValue("all")
                                    setOpen(false)
                                }}
                            >
                                All
                            </CommandItem>
                            {rooms.map((room) => (
                                <CommandItem
                                    key={room.value}
                                    value={room.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                        onChangeValue(currentValue === value ? "" : currentValue)
                                    }}
                                >
                                    {isShowIcons && getIcon(room.label)}
                                    {room.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === room.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
