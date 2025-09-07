import React from "react";
import Spinner from "@/components/Spinner";
import { useCurrentUser } from "@/features/auth/api/use-current-user";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DottedSeparator } from "@/components/dotted-separator";
import { LogOut } from "lucide-react";
import { useLogout } from "@/features/auth/api/use-logout";

export const UserButton = () => {
    const { data: user, isLoading } = useCurrentUser();
    const { mutate: onLogout, isPending } = useLogout();

    if (!user) {
        return null;
    }

    const { name, email } = user;

    const avatarFallback = name
        ? name.charAt(0).toUpperCase()
        : email.charAt(0).toUpperCase() ?? "U";

    return (
        <div
            className="md:ml-auto md:justify-end justify-between w-full
            flex items-center gap-x-2"
        >
            {isLoading ? (
                <Spinner color="primary" />
            ) : (
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="outline-none relative">
                        <Avatar className="size-10 hover:opacity-75 transition ">
                            <AvatarFallback className=" bg-primary font-medium text-white flex items-center justify-center">
                                {avatarFallback}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        side="bottom"
                        className="w-60"
                        sideOffset={10}
                    >
                        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
                            <Avatar className="size-[52px] border border-neutral-300">
                                <AvatarFallback className="bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center">
                                    {avatarFallback}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-sm font-medium text-neutral-900">
                                    {name || "User"}
                                </p>
                                <p className="text-xs text-neutral-500">{email}</p>
                            </div>
                        </div>
                        <DottedSeparator className="mb-1" />
                        <DropdownMenuItem
                            onClick={() => onLogout()}
                            className="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer"
                        >
                            {isPending ? (
                                <Spinner />
                            ) : (
                                <>
                                    <LogOut className="size-4 mr-2" />
                                    Log out
                                </>
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
};
