import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/side-bar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getCurrent();
    if (!user) {
        redirect("/sign-in")
    }
    return (
        <SidebarProvider
        style={
            {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
        }
    >
        <AppSidebar variant="inset" />
        <SidebarInset>
            {/* start to header */}
                <Header/>
            {/* end to header */}
            {children}
        </SidebarInset>
    </SidebarProvider>
    )
}