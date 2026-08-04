import { Search, Settings, PanelsTopLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PcomStatus } from "@/components/pcom-status";
import { UserMenu } from "@/components/user-menu";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function AppHeader({ title, section }: { title: string; section?: string}) {
    return (
        <header className="sticky top-0 z-30 border-b border-border/80 bg-background/80 backdrop-blur-xl"

    )
}