"use client";

import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Room } from "@/types/type";
import Image from "next/image";

export const HomeView = ({
    className,
    ...props
}: React.ComponentProps<"div">) => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [images, setImages] = useState<{
        base64
        : string, mediaType: string
    }[]>([]);
    const [style, setStyle] = useState(
        "Modern minimal, warm wood, neutral palette"
    );

    const onPress = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);
        const res = await fetch("/api/parse-blueprint", { method: "POST", body: fd });
        const data = await res.json();
        setRooms(data.rooms || []);
    }


    const onGenerate = async () => {
        const res = await fetch("/api/generate-images", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rooms, style }),
        });

        const data = await res.json();
        setImages(data.images || []);
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            {/* <form> */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2">
                    <a
                        href="#"
                        className="flex flex-col items-center gap-2 font-medium"
                    >
                        <div className="flex size-8 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="size-6" />
                        </div>
                        <span className="sr-only">Acme Inc.</span>
                    </a>
                    <h1 className="text-xl font-bold">Welcome to Roomify.AI</h1>
                    <p className="text-center text-sm">
                        Upload your dream home floor-plan image
                    </p>
                </div>
                {/* start to upload image */}
                <form onSubmit={onPress} className="space-y-3">
                    <Input name="blueprint" type="file" accept="image/*,.pdf" required />
                    <Button className="w-full">
                        Extract rooms
                    </Button>
                </form>
                {/* end to upload image */}
                {rooms.length > 0 && (
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="email">Rome</Label>
                            <Textarea
                                className="w-full border p-2 rounded"
                                rows={8}
                                value={JSON.stringify(rooms, null, 2)}
                                onChange={(e) => setRooms(JSON.parse(e.target.value))}
                                required
                            />
                        </div>

                        <div className="grid gap-3">
                            <Input
                                className="w-full border p-2 rounded"
                                value={style}
                                onChange={(e) => setStyle(e.target.value)}
                                placeholder="Global style prompt"
                                required
                            />
                        </div>
                        <Button onClick={onGenerate} type="submit" className="w-full">
                            Generate images
                        </Button>
                    </div>
                )}

                {/* {images.length > 0 && (
                    <section className="grid md:grid-cols-2 gap-4">
                        {images.map((im) => (
                            <figure key={im.room} className="p-2 border rounded">
                                <figcaption className="font-medium mb-2">{im.room}</figcaption>
                                {im.imageBase64 ? <Image width={400} height={400} className="w-full h-full" src={im.imageBase64} alt={im.room} /> : <em>no image</em>}
                            </figure>
                        ))}
                    </section>
                )} */}
            </div>
            {/* </form> */}
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
};
