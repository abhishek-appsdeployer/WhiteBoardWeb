import React, { useState } from 'react';
import { SliderPicker, HuePicker } from 'react-color';

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    // alert(`Selected color: ${color.hex}`);
    console.log(color.hex)
  };

  return (
    <div >
      <HuePicker color={selectedColor} onChange={handleColorChange} />
    </div>
  );
};

export default React.memo(ColorPicker);
