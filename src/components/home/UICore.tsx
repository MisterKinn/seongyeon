"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface UICoreScene {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    coreGroup: THREE.Group;
    orbitGroup: THREE.Group;
    glassShell: THREE.Mesh;
    neonRing: THREE.Mesh;
    coreSphere: THREE.Mesh;
    orbitNodes: THREE.Mesh[];
    animationId: number;
    pointerX: number;
    pointerY: number;
    targetRotationX: number;
    targetRotationY: number;
}

export default function UICore() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<UICoreScene | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        const container = containerRef.current;

        // Clear any previous scene
        sceneRef.current = null;

        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = new THREE.Scene();
        scene.background = null;
        scene.fog = new THREE.Fog(0x05091f, 5.5, 10.5);

        const camera = new THREE.PerspectiveCamera(58, width / height, 0.1, 1000);
        camera.position.set(0, 0.25, 4.8);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        // Clear any existing canvas elements (prevents duplication from StrictMode)
        const existingCanvas = container.querySelector("canvas");
        if (existingCanvas) {
            existingCanvas.remove();
        }

        container.appendChild(renderer.domElement);

        const coreGroup = new THREE.Group();
        scene.add(coreGroup);

        const orbitGroup = new THREE.Group();
        coreGroup.add(orbitGroup);

        const ambientLight = new THREE.AmbientLight(0x6d87ff, 0.42);
        scene.add(ambientLight);

        const keyLight = new THREE.PointLight(0x79a7ff, 1.3, 18);
        keyLight.position.set(-2, 2.3, 4.6);
        scene.add(keyLight);

        const rimLight = new THREE.PointLight(0xa855f7, 1.25, 20);
        rimLight.position.set(2.4, -1.8, 3.8);
        scene.add(rimLight);

        const backLight = new THREE.PointLight(0x4f7dff, 0.8, 16);
        backLight.position.set(0, 0, -4.5);
        scene.add(backLight);

        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x89a8ff,
            roughness: 0.05,
            metalness: 0.06,
            transmission: 0.88,
            thickness: 0.95,
            ior: 1.22,
            transparent: true,
            opacity: 0.84,
            emissive: 0x1b2f8f,
            emissiveIntensity: 0.2,
        });

        const neonRingMaterial = new THREE.MeshStandardMaterial({
            color: 0xa589ff,
            emissive: 0x6f4dff,
            emissiveIntensity: 0.9,
            roughness: 0.2,
            metalness: 0.45,
        });

        const coreMaterial = new THREE.MeshStandardMaterial({
            color: 0x4a6fff,
            emissive: 0x1d35aa,
            emissiveIntensity: 0.6,
            roughness: 0.18,
            metalness: 0.55,
        });

        const nodeMaterial = new THREE.MeshStandardMaterial({
            color: 0x7fe0ff,
            emissive: 0x49c7ff,
            emissiveIntensity: 1.3,
            roughness: 0.15,
            metalness: 0.35,
        });

        const orbitLineMaterial = new THREE.LineBasicMaterial({
            color: 0x8f9cff,
            transparent: true,
            opacity: 0.5,
        });

        const glassShell = new THREE.Mesh(
            new THREE.IcosahedronGeometry(1.25, 3),
            glassMaterial,
        );
        glassShell.scale.set(1, 1, 0.92);
        coreGroup.add(glassShell);

        const neonRing = new THREE.Mesh(
            new THREE.TorusGeometry(1.52, 0.06, 24, 160),
            neonRingMaterial,
        );
        neonRing.rotation.x = Math.PI * 0.43;
        neonRing.rotation.z = Math.PI * 0.12;
        coreGroup.add(neonRing);

        const coreSphere = new THREE.Mesh(
            new THREE.IcosahedronGeometry(0.42, 4),
            coreMaterial,
        );
        coreGroup.add(coreSphere);

        const orbitPath = new THREE.EllipseCurve(0, 0, 1.7, 1.18, 0, Math.PI * 2, false);
        const orbitPoints = orbitPath.getPoints(96).map((p) => new THREE.Vector3(p.x, p.y, 0));
        const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
        const orbitLine = new THREE.LineLoop(orbitGeometry, orbitLineMaterial);
        orbitLine.rotation.x = Math.PI * 0.35;
        orbitGroup.add(orbitLine);

        const orbitNodes: THREE.Mesh[] = [];
        const orbitCount = 6;
        for (let i = 0; i < orbitCount; i++) {
            const node = new THREE.Mesh(new THREE.SphereGeometry(0.07, 18, 18), nodeMaterial);
            node.userData.phase = (i / orbitCount) * Math.PI * 2;
            orbitNodes.push(node);
            orbitGroup.add(node);
        }

        sceneRef.current = {
            scene,
            camera,
            renderer,
            coreGroup,
            orbitGroup,
            glassShell,
            neonRing,
            coreSphere,
            orbitNodes,
            animationId: 0,
            pointerX: 0,
            pointerY: 0,
            targetRotationX: 0,
            targetRotationY: 0,
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current || prefersReduced) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            if (sceneRef.current) {
                sceneRef.current.targetRotationY = (x - 0.5) * Math.PI * 0.22;
                sceneRef.current.targetRotationX = (y - 0.5) * Math.PI * 0.18;
            }
        };

        const handleMouseLeave = () => {
            if (sceneRef.current && !prefersReduced) {
                sceneRef.current.targetRotationX = 0;
                sceneRef.current.targetRotationY = 0;
            }
        };

        if (!prefersReduced) {
            container.addEventListener("mousemove", handleMouseMove);
            container.addEventListener("mouseleave", handleMouseLeave);
        }

        const animate = () => {
            if (!sceneRef.current) return;

            const {
                coreGroup,
                orbitGroup,
                glassShell,
                neonRing,
                coreSphere,
                orbitNodes,
                camera,
                renderer,
                scene,
            } = sceneRef.current;
            const time = performance.now() * 0.001;

            sceneRef.current.pointerX +=
                (sceneRef.current.targetRotationY - sceneRef.current.pointerX) * 0.07;
            sceneRef.current.pointerY +=
                (sceneRef.current.targetRotationX - sceneRef.current.pointerY) * 0.07;

            coreGroup.rotation.y = sceneRef.current.pointerX;
            coreGroup.rotation.x = sceneRef.current.pointerY;

            if (!prefersReduced) {
                coreGroup.rotation.z = Math.sin(time * 0.25) * 0.05;
                glassShell.rotation.y += 0.0026;
                glassShell.rotation.z += 0.0012;
                neonRing.rotation.z += 0.0032;
                orbitGroup.rotation.z -= 0.0041;
                coreSphere.rotation.y += 0.0055;
                coreSphere.rotation.x += 0.0038;
                coreSphere.scale.setScalar(1 + Math.sin(time * 2.0) * 0.035);
            }

            orbitNodes.forEach((node, i) => {
                const phase = node.userData.phase as number;
                const t = phase + time * 0.85;
                node.position.set(
                    Math.cos(t) * 1.7,
                    Math.sin(t) * 1.18,
                    Math.sin(t * 1.6 + i) * 0.12,
                );
                const pulse = 0.82 + (Math.sin(time * 2.4 + phase) + 1) * 0.16;
                node.scale.setScalar(pulse);
            });

            renderer.render(scene, camera);
            sceneRef.current.animationId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            if (!containerRef.current || !sceneRef.current) return;

            const newWidth = containerRef.current.clientWidth;
            const newHeight = containerRef.current.clientHeight;

            sceneRef.current.camera.aspect = newWidth / newHeight;
            sceneRef.current.camera.updateProjectionMatrix();
            sceneRef.current.renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (!prefersReduced) {
                container.removeEventListener("mousemove", handleMouseMove);
                container.removeEventListener("mouseleave", handleMouseLeave);
            }

            if (sceneRef.current) {
                cancelAnimationFrame(sceneRef.current.animationId);
                sceneRef.current.scene.traverse((obj) => {
                    const mesh = obj as THREE.Mesh;
                    if (mesh.geometry) {
                        mesh.geometry.dispose();
                    }
                    if (Array.isArray(mesh.material)) {
                        mesh.material.forEach((m) => m.dispose());
                    } else if (mesh.material) {
                        mesh.material.dispose();
                    }
                });
                renderer.dispose();
                if (renderer.domElement.parentNode === container) {
                    container.removeChild(renderer.domElement);
                }
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "100%",
                minHeight: "500px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        />
    );
}
