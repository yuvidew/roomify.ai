import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/side-bar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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