import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { cn } from "@/lib/utils";
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useMemo } from 'react';
import { LayoutGrid, } from 'lucide-react';
import { type NavItem } from '@/types';

interface AdminLayoutProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    breadcrumbs?: BreadcrumbItem[];
}

export const AdminLayout = ({
    children,
    className = '',
    title = 'Dashboard',
    breadcrumbs = [],
}: AdminLayoutProps) => {

    const { flash, auth } = usePage<SharedData>().props

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    const navItems: NavItem[] = useMemo(() => {
        return [
            {
                title: t('admin:dashboard'),
                href: '/dashboard',
                icon: LayoutGrid,
            },
        ];
    }, [t]);

    const TOASTER_STYLE = {
        background: '#18181b',
        color: '#ffffff',
    };

    return (
        <>
            <Head title={title} />
            <Toaster
                position="bottom-right"
                reverseOrder={false}
                toastOptions={{
                    style: TOASTER_STYLE,
                }}
            />
            <AppShell variant="sidebar">
                <AppSidebar
                    navItems={navItems}
                />
                <AppContent variant="sidebar" className="overflow-x-hidden">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    <main className={cn("flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto", className)}>
                        {children}
                    </main>
                </AppContent>
            </AppShell>
        </>
    );
}
