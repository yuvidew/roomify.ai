"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScanSearch, Upload } from "lucide-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    // FormControl,
    FormField,
    FormItem,
    // FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useUploadBluePrint } from "@/features/dashboard/api/use-upload-blueprint";
import Spinner from "@/components/Spinner";
import { useState } from "react";
import Image from "next/image";
import { useCurrentUser } from "@/features/auth/api/use-current-user";

const UploadBluePrintSchema = z.object({
    blueprint: z
        .union([
            z.instanceof(File),
            z.string().transform((value) => (value === "" ? undefined : value)),
        ])
        .optional(),
});

export const DashboardView = () => {
    const { mutate, isPending } = useUploadBluePrint();
    const { data: user, isLoading } = useCurrentUser();
    const [upload_url, setUploadUrl] = useState<string | undefined>(undefined);
    const form = useForm<z.infer<typeof UploadBluePrintSchema>>({
        resolver: zodResolver(UploadBluePrintSchema),
        defaultValues: {
            blueprint: undefined,
        },
    });

    const onSubmit = (values: z.infer<typeof UploadBluePrintSchema>) => {
        mutate({ form: values });

    };


    return (
        <main className=" flex  h-full items-center justify-center">
            <div className=" h-full flex justify-center flex-col gap-8 lg:w-[45%] w-full  py-3 px-6">
                <div className=" flex flex-col gap-3">
                    <h1 className="text-xl font-bold text-left">
                        {isLoading ? <Spinner color="primary" /> :
                            <>
                                👋 Hey, <span className=" text-primary">{user?.name}</span>
                            </>
                        }
                    </h1>
                    <p className="text-left text-sm">
                        Upload your dream home floor-plan image
                    </p>
                </div>

                <Form {...form}>
                    <form
                        className=" flex flex-col gap-3"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        {upload_url === undefined ? (
                            <FormField
                                control={form.control}
                                name="blueprint"
                                render={({ field }) => (
                                    <FormItem className=" flex flex-col gap-4">
                                        <Input
                                            id="uploader"
                                            className=" hidden"
                                            name="blueprint"
                                            type="file"
                                            accept="image/*,.pdf"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                field.onChange(file ?? "");

                                                if (file) {
                                                    // Create a preview URL from File
                                                    const fileUrl = URL.createObjectURL(file);
                                                    setUploadUrl(fileUrl);
                                                } else {
                                                    setUploadUrl(undefined)
                                                }

                                            }}
                                        />
                                        <label
                                            htmlFor="uploader"
                                            className="border cursor-pointer rounded-md h-44 bg-sidebar-accent "
                                        >
                                            <div className="h-full flex flex-col items-center justify-center">
                                                <Upload className=" text-primary size-8" />
                                                <p>Upload</p>
                                            </div>
                                        </label>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) : (
                            <div className="border cursor-pointer h-96 py-5 rounded-md flex items-center justify-center bg-sidebar-accent ">
                                <Image
                                    src={upload_url}
                                    alt="Uploaded image"
                                    width={500}
                                    height={500}
                                    className=" size-full object-contain"
                                />
                            </div>
                        )}

                        <Button className="w-full" type="submit" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Spinner /> Extracting a rooms...
                                </>
                            ) : (
                                <>
                                    <ScanSearch /> Extract rooms
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </main>
    );
};
