import { useCallback, useState } from "react";

export function useSelection<T>(items: readonly T[]) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);

  const next = useCallback(
    () =>
      setSelectedIndex((index) =>
        index === null ? index : Math.min(index + 1, items.length - 1),
      ),
    [items.length],
  );

  const prev = useCallback(
    () =>
      setSelectedIndex((index) =>
        index === null ? index : Math.max(index - 1, 0),
      ),
    [],
  );

  return {
    selected: selectedIndex === null ? null : items[selectedIndex],
    select: setSelectedIndex,
    close,
    next,
    prev,
  };
}
