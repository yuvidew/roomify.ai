"use client";
import React from "react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { useGetRoomsList } from "@/features/documents/api/use-get-rooms-list";
import { Skeleton } from "../ui/skeleton";
import { House } from "lucide-react";
import Link from "next/link";

interface Props {
    onOpenChange: (value: boolean) => void;
    open: boolean;
}

/**
 * Search command dialog component.
 * @param onOpenChange - Callback invoked when the open state changes.
 * @param open - Whether the dialog is currently open.
 */
export const SearchCommand = ({ onOpenChange, open }: Props) => {
    const { data, isLoading, isError } = useGetRoomsList();

    const documents = Array.isArray(data?.documents) ? data.documents : [];

    
    return (
        <CommandDialog onOpenChange={onOpenChange} open={open}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Documents">
                    {isLoading
                        ? [1, 2, 3, 4].map((item) => (
                            <Skeleton key={item} className=" h-8 rounded-sm" />
                        ))
                        : documents.map(({ $id, home_title }) => (
                            <CommandItem 
                                key={$id}

                            >
                                <Link href={`/${$id}`} className="flex items-center gap-3 w-full">
                                <House />
                                {home_title}
                                </Link>
                            </CommandItem>
                        ))
                    }

                    {isError && <p className=" text-center text-muted-foreground"> Failed to fetch list</p>}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};
