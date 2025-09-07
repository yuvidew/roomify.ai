"use client"
import React from 'react';

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"

interface Props {
    onOpenChange : (value : boolean) => void,
    open : boolean
}

/**
 * Search command dialog component.
 * @param onOpenChange - Callback invoked when the open state changes.
 * @param open - Whether the dialog is currently open.
 */
export const SearchCommand = ({onOpenChange, open} : Props) => {
    // TODO : listing the all fetched floor list 
    return (
        <CommandDialog
            onOpenChange={onOpenChange}
            open={open}
        >
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                    <CommandItem>Calendar</CommandItem>
                    <CommandItem>Search Emoji</CommandItem>
                    <CommandItem>Calculator</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                    <CommandItem>Profile</CommandItem>
                    <CommandItem>Billing</CommandItem>
                    <CommandItem>Settings</CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}
