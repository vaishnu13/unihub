'use client'

import React, { useState, useEffect } from "react";
import { useAnimate, stagger } from "framer-motion";

export const GridTrail = () => {
    const [scope, animate] = useAnimate();
    const [columns, setColumns] = useState(0);
    const [rows, setRows] = useState(0);

    useEffect(() => {
        const calculateGrid = () => {
            const columnCount = Math.floor(window.innerWidth / 50);
            const rowCount = Math.floor(window.innerHeight / 50);
            setColumns(columnCount);
            setRows(rowCount);
        };
        calculateGrid();
        window.addEventListener('resize', calculateGrid);
        return () => window.removeEventListener('resize', calculateGrid);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const target = document.elementFromPoint(clientX, clientY);

        if (target?.getAttribute("data-grid-item")) {
            animate(
                target,
                {
                    opacity: [1, 0.5, 0],
                },
                {
                    duration: 0.7,
                    ease: "easeOut",
                }
            );
        }
    };

    return (
        <div
            ref={scope}
            onMouseMove={handleMouseMove}
            className="absolute inset-0 z-0 grid h-full w-full"
            style={{
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
        >
            {Array.from({ length: columns * rows }).map((_, i) => (
                <div
                    key={i}
                    className="h-full w-full border-r border-b border-primary/10"
                    data-grid-item
                />
            ))}
        </div>
    );
};
