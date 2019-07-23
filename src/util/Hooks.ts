import { useEffect } from "react";

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useComponentMount = (fn: () => (void | (() => void | undefined))) => useEffect(() => fn(), []);
export const useComponentUpdate = (
    fn: () => (void | (() => void | undefined)),
    deps: unknown[] = [],
// eslint-disable-next-line react-hooks/exhaustive-deps
) => useEffect(() => fn(), [fn, ...deps]);
