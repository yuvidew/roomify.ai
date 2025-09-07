"use client";

import { cn } from "@/lib/utils";
import React from "react";
import useScrollTop from "../hook/useScrollTop";
import { Logo } from "@/components/Logo";
import { UserButton } from "./UserButton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/ModeToggle";

interface Props {
    isUserLogin: boolean;
}

/**
 * Marketing header with logo, theme toggle, and auth actions.
 *
 * @param props - Component props.
 * @param props.isUserLogin - When true shows the user menu; otherwise shows Sign in/Sign up.
 */
export const Header = ({ isUserLogin }: Props) => {
    const router = useRouter()
    const { scrolled } = useScrollTop();
    return (
        <header
            className={cn(
                "z-50 bg-background fixed justify-between   top-0 flex items-center w-full p-6",
                scrolled && "border-b shadow-sm"
            )}
        >
            <div className=" flex items-center justify-between lg:w-[80%] w-full m-auto">

                {/* start to logo */}
                <Logo isTitleShow />
                {/* end to logo */}

                <div className=" flex items-center gap-2">
                    <ModeToggle/>
                    {/* start to user Button */}
                    {isUserLogin ? 
                        (
                            <UserButton /> 
                        )
                        : 
                        (
                            <div className="flex items-center justify-end gap-3">
                                <Button 
                                    variant={"outline"}
                                    onClick={() => router.push("/sign-in")}
                                >
                                    Sign in
                                </Button>

                                <Button
                                    onClick={() => router.push("/sign-up")}
                                >
                                    Sign up
                                </Button>
                            </div>
                        )
                    }
                    {/* end to user Button */}
                </div>
            </div>
        </header>
    );
};
