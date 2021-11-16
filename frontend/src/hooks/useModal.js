import { useState } from 'react';

export default function useModal() {
  const [isShowing, setIsShowing] = useState(false);
  const [id, setId] = useState();
  const [addPerson, setAdd] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
    id,
    setId,
    addPerson,
    setAdd,
    setIsShowing,
  };
}
