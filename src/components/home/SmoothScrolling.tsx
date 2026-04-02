"use client";
import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

function SmoothScrolling({ children }: { children: ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.15,
            duration: 0.8,
            wheelMultiplier: 1,
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}

export default SmoothScrolling;
