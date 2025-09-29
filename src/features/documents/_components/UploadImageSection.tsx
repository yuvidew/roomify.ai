import { ExtractRoom } from "@/types/type";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
// import 'highlight.js/styles/github.css';

interface Props {
    home_details: ExtractRoom;
}

/**
 * Displays the uploaded floor plan image with extracted markdown details.
 * @param home_details extract metadata, e.g. { $id: "abc123", home_title: "Living Space", img_url: "/floor-plan.png", user_id: "user_1" }.
 */
export const UploadImageSection = ({ home_details }: Props) => {
    return (
        <section className="bg-sidebar p-4  rounded-md">
            {/* start to floor plan image */}

            <Dialog>
                <DialogTrigger>
                    <Image
                        src={home_details.img_url}
                        alt={home_details.home_title}
                        width={600}
                        height={600}
                        className=" size-36 object-contain rounded-md"
                    />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="sr-only">
                            {home_details.home_title || "Floor plan preview"}
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                            Enlarged view of the uploaded floor plan image.
                        </DialogDescription>
                    </DialogHeader>

                    <Image
                        src={home_details.img_url}
                        alt={home_details.home_title}
                        width={600}
                        height={600}
                        className=" size-96 object-contain rounded-md m-auto"
                    />
                </DialogContent>
            </Dialog>
            {/* end to floor plan image */}

            {/* TODO: solve the show description issue it's not working */}
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    // Custom component overrides
                    h1: ({ children }) => (
                        <h1 className="text-4xl font-bold  mb-6 mt-8 border-b pb-2">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-3xl font-semibold  mb-4 mt-6">{children}</h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-2xl font-medium  mb-3 mt-4">{children}</h3>
                    ),
                    p: ({ children }) => (
                        <p className=" mb-4 leading-relaxed">{children}</p>
                    ),
                    ul: ({ children }) => (
                        <ul className="list-disc list-inside mb-4 space-y-2 ">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal list-inside mb-4 space-y-2 ">
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => <li className="ml-4">{children}</li>,
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-blue-500 pl-4 italic  bg-gray-50 py-2 mb-4">
                            {children}
                        </blockquote>
                    ),
                    code: ({  className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || "");
                        return match ? (
                            <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto mb-4">
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            </pre>
                        ) : (
                            <code
                                className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono"
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    },
                    a: ({ children, href }) => (
                        <a
                            href={href}
                            className="text-blue-600 hover:text-blue-800 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {children}
                        </a>
                    ),
                    table: ({ children }) => (
                        <div className="overflow-x-auto mb-4">
                            <table className="min-w-full border-collapse border border-gray-300">
                                {children}
                            </table>
                        </div>
                    ),
                    th: ({ children }) => (
                        <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-semibold">
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="border border-gray-300 px-4 py-2">{children}</td>
                    ),
                }}
            >
                {home_details.home_description}
            </ReactMarkdown>
        </section>
    );
};

