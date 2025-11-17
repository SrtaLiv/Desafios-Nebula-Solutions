import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { User } from "@/types";
import { useInitials } from '@/hooks/use-initials';

interface UserAvatarProps {
    user: User;
    className?: string;
}

export const UserAvatar = ({
    user,
    className = '',
}: UserAvatarProps) => {

    const getInitials = useInitials();

    return (
        <Avatar className={className}>
            <AvatarImage src={user?.avatar} alt={user.name} className="object-cover" />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
    )
}
