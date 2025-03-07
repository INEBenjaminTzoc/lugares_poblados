import { ReactNode } from "react";

interface HeaderProps {
    title: string;
    description: ReactNode;
}

export function Header({ title, description }: HeaderProps) {
    return (
        <>
            <h2 className="text-center scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                { title }
            </h2>
            <div className="w-full px-16">
                <p className="text-center text-lg text-muted-foreground">
                    { description }
                </p>
            </div>
        </>
    )
}