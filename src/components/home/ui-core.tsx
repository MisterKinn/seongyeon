"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface UICoreProps {
    boostGlow?: boolean;
}

interface RuntimeState {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    root: THREE.Group;
    outerFrame: THREE.Group;
    innerArcs: THREE.Group;
    nodesGroup: THREE.Group;
    nodes: THREE.Mesh[];
    nodeMats: THREE.MeshStandardMaterial[];
    lineMats: THREE.LineBasicMaterial[];
    arcMats: THREE.MeshStandardMaterial[];
    core: THREE.Mesh;
    coreMat: THREE.MeshStandardMaterial;
    raf: number;
    rotX: number;
    rotY: number;
    targetRotX: number;
    targetRotY: number;
    zDepth: number;
    targetZDepth: number;
    hoverGlow: number;
    targetHoverGlow: number;
}

export default function UICore({ boostGlow = false }: UICoreProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const runtimeRef = useRef<RuntimeState | null>(null);
    const boostRef = useRef(boostGlow);

    useEffect(() => {
        boostRef.current = boostGlow;
        if (runtimeRef.current) {
            runtimeRef.current.targetHoverGlow = boostGlow ? 1 : 0;
        }
    }, [boostGlow]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const prefersReduced =
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const isTouch = window.matchMedia("(hover: none)").matches;

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        const width = Math.max(container.clientWidth, 1);
        const height = Math.max(container.clientHeight, 1);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
        camera.position.set(0, 0.04, 4.6);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.02;
        container.appendChild(renderer.domElement);

        const root = new THREE.Group();
        root.position.set(0.08, -0.14, 0);
        scene.add(root);

        const ambient = new THREE.AmbientLight(0x8fa0ff, 0.14);
        scene.add(ambient);

        const keyLight = new THREE.DirectionalLight(0xdbe5ff, 1.05);
        keyLight.position.set(3.2, 2.9, 3.8);
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0x6f8dff, 0.26);
        fillLight.position.set(-2.8, -1.6, 2.6);
        scene.add(fillLight);

        const rimLight = new THREE.PointLight(0xa58aff, 0.9, 14);
        rimLight.position.set(2.6, 2.1, 1.9);
        scene.add(rimLight);

        const outerMat = new THREE.MeshStandardMaterial({
            color: 0x1a244f,
            roughness: 0.8,
            metalness: 0.2,
            emissive: 0x101a3f,
            emissiveIntensity: 0.18,
        });

        const arcMatA = new THREE.MeshStandardMaterial({
            color: 0x2e417f,
            roughness: 0.56,
            metalness: 0.17,
            emissive: 0x4053b4,
            emissiveIntensity: 0.2,
        });

        const arcMatB = new THREE.MeshStandardMaterial({
            color: 0x344b92,
            roughness: 0.58,
            metalness: 0.15,
            emissive: 0x3a4aa4,
            emissiveIntensity: 0.18,
        });

        const coreMat = new THREE.MeshStandardMaterial({
            color: 0x27376e,
            roughness: 0.24,
            metalness: 0.16,
            emissive: 0x293a88,
            emissiveIntensity: 0.22,
        });

        const nodeMatFactory = () =>
            new THREE.MeshStandardMaterial({
                color: 0x8ca9ff,
                roughness: 0.4,
                metalness: 0.12,
                emissive: 0x3d58b8,
                emissiveIntensity: 0.4,
            });

        const insetShadow = new THREE.Mesh(
            new THREE.RingGeometry(0.32, 1.0, 64),
            new THREE.MeshBasicMaterial({
                color: 0x070d24,
                transparent: true,
                opacity: 0.42,
            }),
        );
        insetShadow.position.z = -0.04;
        root.add(insetShadow);

        const centerShadow = new THREE.Mesh(
            new THREE.CircleGeometry(0.44, 40),
            new THREE.MeshBasicMaterial({
                color: 0x050914,
                transparent: true,
                opacity: 0.5,
            }),
        );
        centerShadow.position.set(0.03, -0.03, -0.03);
        root.add(centerShadow);

        const outerFrame = new THREE.Group();
        root.add(outerFrame);

        const edgeLength = 1.02;
        const edgeThickness = 0.095;
        const hexRadius = 1.7;

        for (let i = 0; i < 6; i += 1) {
            const angle = (i / 6) * Math.PI * 2;
            const segment = new THREE.Mesh(
                new THREE.BoxGeometry(edgeLength, edgeThickness, 0.12),
                outerMat,
            );
            segment.position.set(
                Math.cos(angle) * hexRadius,
                Math.sin(angle) * hexRadius,
                0.02,
            );
            segment.rotation.z = angle + Math.PI / 2;
            outerFrame.add(segment);
        }

        const innerArcs = new THREE.Group();
        root.add(innerArcs);

        const arcMats = [arcMatA, arcMatB];
        for (let i = 0; i < 3; i += 1) {
            const arc = new THREE.Mesh(
                new THREE.TorusGeometry(1.05, 0.055, 16, 64, Math.PI / 2.2),
                arcMats[i % arcMats.length],
            );
            arc.rotation.z = (i / 3) * Math.PI * 2 + 0.28;
            arc.userData.speed = 0.00045 + i * 0.00018;
            innerArcs.add(arc);
        }

        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.34, 3), coreMat);
        core.scale.set(1, 1, 0.84);
        core.position.z = 0.1;
        root.add(core);

        const nodesGroup = new THREE.Group();
        root.add(nodesGroup);

        const nodes: THREE.Mesh[] = [];
        const nodeMats: THREE.MeshStandardMaterial[] = [];
        const lineMats: THREE.LineBasicMaterial[] = [];

        for (let i = 0; i < 6; i += 1) {
            const nodeMat = nodeMatFactory();
            const node = new THREE.Mesh(new THREE.SphereGeometry(0.1, 20, 20), nodeMat);
            const angle = (i / 6) * Math.PI * 2;
            node.position.set(
                Math.cos(angle) * 1.48,
                Math.sin(angle) * 1.48,
                0.14 + (i % 2 === 0 ? 0.02 : -0.01),
            );
            node.userData.phase = Math.random() * Math.PI * 2;
            node.userData.speed = 0.011 + Math.random() * 0.008;
            node.userData.base = 0.96 + Math.random() * 0.06;
            nodeMats.push(nodeMat);
            nodes.push(node);
            nodesGroup.add(node);
        }

        const linesGroup = new THREE.Group();
        root.add(linesGroup);
        for (let i = 0; i < nodes.length; i += 1) {
            const next = (i + 1) % nodes.length;
            const geometry = new THREE.BufferGeometry().setFromPoints([
                nodes[i].position.clone(),
                nodes[next].position.clone(),
            ]);
            const material = new THREE.LineBasicMaterial({
                color: 0x8fa7ff,
                transparent: true,
                opacity: 0.24,
            });
            lineMats.push(material);
            const line = new THREE.Line(geometry, material);
            line.userData.phase = Math.random() * Math.PI * 2;
            linesGroup.add(line);
        }

        runtimeRef.current = {
            renderer,
            scene,
            camera,
            root,
            outerFrame,
            innerArcs,
            nodesGroup,
            nodes,
            nodeMats,
            lineMats,
            arcMats,
            core,
            coreMat,
            raf: 0,
            rotX: 0,
            rotY: 0,
            targetRotX: 0,
            targetRotY: 0,
            zDepth: 0,
            targetZDepth: 0,
            hoverGlow: boostRef.current ? 1 : 0,
            targetHoverGlow: boostRef.current ? 1 : 0,
        };

        const maxTilt = THREE.MathUtils.degToRad(4.5);

        const onMouseMove = (event: MouseEvent) => {
            const runtime = runtimeRef.current;
            if (!runtime || prefersReduced || isTouch) return;
            const rect = container.getBoundingClientRect();
            const px = (event.clientX - rect.left) / Math.max(rect.width, 1);
            const py = (event.clientY - rect.top) / Math.max(rect.height, 1);
            runtime.targetRotY = (px - 0.5) * maxTilt;
            runtime.targetRotX = (py - 0.5) * maxTilt;
            runtime.targetHoverGlow = 1;
        };

        const onMouseLeave = () => {
            const runtime = runtimeRef.current;
            if (!runtime || prefersReduced) return;
            runtime.targetRotX = 0;
            runtime.targetRotY = 0;
            runtime.targetHoverGlow = boostRef.current ? 1 : 0;
        };

        const onScroll = () => {
            const runtime = runtimeRef.current;
            if (!runtime) return;
            const progress = Math.min(window.scrollY / window.innerHeight, 1);
            runtime.targetZDepth = -0.52 * progress;
        };

        const onResize = () => {
            const runtime = runtimeRef.current;
            if (!runtime || !containerRef.current) return;
            const nextWidth = Math.max(containerRef.current.clientWidth, 1);
            const nextHeight = Math.max(containerRef.current.clientHeight, 1);
            runtime.camera.aspect = nextWidth / nextHeight;
            runtime.camera.updateProjectionMatrix();
            runtime.renderer.setSize(nextWidth, nextHeight);
        };

        if (!prefersReduced && !isTouch) {
            container.addEventListener("mousemove", onMouseMove);
            container.addEventListener("mouseleave", onMouseLeave);
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        onScroll();

        const animate = () => {
            const runtime = runtimeRef.current;
            if (!runtime) return;

            runtime.rotY += (runtime.targetRotY - runtime.rotY) * 0.08;
            runtime.rotX += (runtime.targetRotX - runtime.rotX) * 0.08;
            runtime.zDepth += (runtime.targetZDepth - runtime.zDepth) * 0.05;
            runtime.hoverGlow +=
                (runtime.targetHoverGlow - runtime.hoverGlow) * 0.08;

            runtime.root.rotation.y = runtime.rotY;
            runtime.root.rotation.x = runtime.rotX;
            runtime.root.position.z = runtime.zDepth;

            if (!prefersReduced) {
                runtime.outerFrame.rotation.z += 0.00012;
                runtime.nodesGroup.rotation.z -= 0.00018;
                runtime.innerArcs.rotation.z += 0.00035;

                runtime.innerArcs.children.forEach((arc, index) => {
                    arc.rotation.z += (arc.userData.speed as number) + index * 0.00002;
                });

                const t = performance.now() * 0.001;
                runtime.innerArcs.scale.setScalar(1 + Math.sin(t * 1.2) * 0.012);

                runtime.nodes.forEach((node, index) => {
                    node.userData.phase += node.userData.speed;
                    const pulse =
                        Math.sin(node.userData.phase) * 0.08 + node.userData.base;
                    node.scale.setScalar(pulse);
                    node.rotation.y += 0.003 + index * 0.0002;
                    const glow = 0.32 + Math.sin(node.userData.phase) * 0.16;
                    runtime.nodeMats[index].emissiveIntensity =
                        glow + runtime.hoverGlow * 0.16;
                });

                runtime.lineMats.forEach((lineMat, index) => {
                    lineMat.opacity =
                        0.18 +
                        (Math.sin(t * 1.4 + index * 0.9) + 1) * 0.06 +
                        runtime.hoverGlow * 0.04;
                });

                runtime.core.rotation.y += 0.0013;
                runtime.core.rotation.x -= 0.0009;
            }

            runtime.arcMats[0].emissiveIntensity = 0.2 + runtime.hoverGlow * 0.08;
            runtime.arcMats[1].emissiveIntensity = 0.18 + runtime.hoverGlow * 0.07;
            runtime.coreMat.emissiveIntensity = 0.22 + runtime.hoverGlow * 0.18;

            runtime.camera.position.x = runtime.rotY * 0.8;
            runtime.camera.position.y = 0.04 - runtime.rotX * 0.65;
            runtime.camera.lookAt(0, 0, runtime.zDepth * 0.4);

            runtime.renderer.render(runtime.scene, runtime.camera);
            runtime.raf = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            if (!prefersReduced && !isTouch) {
                container.removeEventListener("mousemove", onMouseMove);
                container.removeEventListener("mouseleave", onMouseLeave);
            }

            if (runtimeRef.current) {
                cancelAnimationFrame(runtimeRef.current.raf);
            }

            scene.traverse((object) => {
                if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
                    object.geometry.dispose();
                    if (Array.isArray(object.material)) {
                        object.material.forEach((mat) => mat.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });

            renderer.dispose();
            if (renderer.domElement.parentElement === container) {
                container.removeChild(renderer.domElement);
            }

            runtimeRef.current = null;
        };
    }, []);

    return <div ref={containerRef} className="ui-core-canvas" />;
}
