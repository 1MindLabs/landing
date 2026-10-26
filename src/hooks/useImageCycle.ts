import { useEffect, useState } from "react";
import type { Project } from "../types";

const START_DELAY = 5000;
const STAGGER = 2500;
const INTERVAL = 5000;

export function useImageCycle(projects: readonly Project[]) {
  const [imageIndices, setImageIndices] = useState<Record<string, number>>({});

  useEffect(() => {
    const cleanups = projects
      .filter((project) => project.images.length > 1)
      .map(({ title, images }, order) => {
        let interval: ReturnType<typeof setInterval> | undefined;

        const advance = () =>
          setImageIndices((indices) => ({
            ...indices,
            [title]: ((indices[title] ?? 0) + 1) % images.length,
          }));

        const timeout = setTimeout(
          () => {
            advance();
            interval = setInterval(advance, INTERVAL);
          },
          START_DELAY + order * STAGGER,
        );

        return () => {
          clearTimeout(timeout);
          clearInterval(interval);
        };
      });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [projects]);

  return (project: Project) => imageIndices[project.title] ?? 0;
}
