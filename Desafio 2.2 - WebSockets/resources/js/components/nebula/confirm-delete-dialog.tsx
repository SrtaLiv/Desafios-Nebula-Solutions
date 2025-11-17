import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface ConfirmDeleteDialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onConfirm: () => void;
    className?: string;
    title?: string;
    description?: string;
    confirmationText?: string;
    children?: React.ReactNode; // Optional trigger content
}

export const ConfirmDeleteDialog = ({
    open,
    onOpenChange,
    onConfirm,
    className = '',
    title = 'Are you absolutely sure?',
    description = 'This action cannot be undone',
    confirmationText = 'DELETE',
    children,
}: ConfirmDeleteDialogProps) => {

    const [inputValue, setInputValue] = useState('');
    const [isControlled] = useState(open !== undefined && onOpenChange !== undefined);

    const isConfirmDisabled = inputValue !== confirmationText;

    const handleConfirm = () => {
        if (!isConfirmDisabled) {
            onConfirm();
            setInputValue(''); // Reset input after confirmation
            
            // Close dialog in both controlled and uncontrolled modes
            if (onOpenChange) {
                onOpenChange(false); // Close dialog if controlled
            } else {
                // For uncontrolled mode, we need to manually trigger the close
                // This will be handled by making the confirm button a DialogClose
            }
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            setInputValue(''); // Reset input when dialog closes
        }
        if (onOpenChange) {
            onOpenChange(newOpen);
        }
    };

    const dialogProps = isControlled
        ? { open, onOpenChange: handleOpenChange }
        : { onOpenChange: handleOpenChange };

    return (
        <Dialog {...dialogProps}>
            {children && (
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
            )}
            <DialogContent className={className}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-normal">
                        To confirm, type <span className="font-bold">{confirmationText}</span> in the box below:
                    </label>
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        // disable ring
                        className="font-mono"
                        autoComplete="off"
                    />
                </div>

                <DialogFooter className="flex gap-2">
                    <DialogClose asChild className="flex-1">
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    {isControlled ? (
                        <Button
                            className="flex-1"
                            onClick={handleConfirm}
                            disabled={isConfirmDisabled}
                        >
                            Confirm
                        </Button>
                    ) : (
                        <DialogClose asChild className="flex-1">
                            <Button
                                onClick={handleConfirm}
                                disabled={isConfirmDisabled}
                            >
                                Confirm
                            </Button>
                        </DialogClose>
                    )}
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )

}