import { useEffect } from "react";

type UseClickOutsideParams = {
  refs: React.RefObject<HTMLElement>[];
  cb: () => void;
};

export function useClickOutside({ refs, cb }: UseClickOutsideParams) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target instanceof Node)) return;

      const isInside = refs.some((ref) =>
        ref.current?.contains(e.target as Node),
      );

      if (isInside) return;

      cb();
    };
    window.addEventListener("click", handler);

    return () => window.removeEventListener("click", handler);
  }, [cb]);
}
