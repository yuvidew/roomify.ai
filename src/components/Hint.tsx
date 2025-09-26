import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface Props{
    label : string;
    children : React.ReactNode;
    side? :"top" | "bottom" | "left" | "right";
    align? : "start" | "center" | "end";
    sideOffset? : number ;
    alignOffset? : number
}

/**
 * Wraps children with a tooltip container.
 * @param label Text displayed inside the tooltip.
 * @param children React node used as the tooltip trigger.
 * @param side Optional side of the tooltip relative to the trigger.
 * @param align Optional alignment of the tooltip.
 * @param sideOffset Optional pixel offset along the side axis.
 * @param alignOffset Optional pixel offset along the alignment axis.
 * @example
 * `	sx
 * <Hint label='Edit' side='top'>
 *   <Button>Edit</Button>
 * </Hint>
 * `
 */
export const Hint = ({
    label,
    children,
    side,
    align,
    sideOffset,
    alignOffset
}:Props) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    className="text-white bg-black border-black"
                    side={side}
                    align={align}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                >
                    <p className=" font-semibold capitalize">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
