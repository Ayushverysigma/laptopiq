import { useState, useRef } from "react";

export function useToast() {
  const [msg, setMsg] = useState(null);
  const timer = useRef(null);

  const show = (m) => {
    setMsg(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(null), 2600);
  };

  return { msg, show };
}
