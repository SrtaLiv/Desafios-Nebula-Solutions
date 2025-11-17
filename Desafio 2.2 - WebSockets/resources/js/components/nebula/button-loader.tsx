import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonLoaderProps {
    type?: 'button' | 'submit' | 'reset';
    loading?: boolean;
    children: React.ReactNode;
    className?: string;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    disabled?: boolean;
    onClick?: () => void;
    icon?: React.ElementType;
}

export const ButtonLoader = ({
    type = 'button',
    loading = false,
    children,
    className = '',
    disabled = false,
    onClick = () => { },
    icon: Icon,
    variant = 'default',
}: ButtonLoaderProps) => {
    return (
        <Button
            type={type}
            className={cn('cursor-pointer', className)}
            disabled={disabled || loading}
            onClick={onClick}
            variant={variant}
        >
            {children}
            {loading ? <Loader2 className="animate-spin" /> : Icon && <Icon className="size-5" />}
        </Button>
    )
}