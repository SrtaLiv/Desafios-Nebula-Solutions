import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import i18n, { changeLanguage } from "@/i18n";
import { Languages } from "lucide-react";

export const LangToggle = () => {

    const langs = [
        { code: "en", label: "English" },
        { code: "es", label: "Español" },
    ];

    return (
        <Select
            defaultValue={i18n.language}
            onValueChange={(lang) => changeLanguage(lang)}
        >
            <SelectTrigger className="relative ps-9">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 group-has-[select[disabled]]:opacity-50">
                    <Languages size={16} aria-hidden="true" />
                </div>
                <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
                {langs.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                        {lang.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};