
import { usePen } from "../hooks/usePen";

export const handleClear = () => {
  const { setLines} = usePen();

  const Clear = () => {
    setLines([]);
  

    alert("All cleared");
  };

  return Clear;
};
