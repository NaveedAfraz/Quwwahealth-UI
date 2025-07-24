import React, { useState, useRef, useEffect } from 'react';

const OtpInput = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus the first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to the next input field if a digit is entered
    if (element.value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // If all fields are filled, call the onComplete callback
    if (newOtp.every(digit => digit !== '')) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to the previous input field on backspace if the current field is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    if (!/^\d+$/.test(pastedData)) return; // Only paste if it's all digits

    const newOtp = pastedData.split('').slice(0, length);
    const updatedOtp = [...otp];
    
    newOtp.forEach((char, index) => {
      if(index < length) {
        updatedOtp[index] = char;
      }
    });

    setOtp(updatedOtp);
    onComplete(updatedOtp.join(''));
    // Focus the last pasted element
    const lastFocusedIndex = Math.min(length - 1, pastedData.length - 1);
    inputRefs.current[lastFocusedIndex].focus();
  };

  return (
    <div className="flex justify-center gap-2" onPaste={handlePaste}>
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(ref) => (inputRefs.current[index] = ref)}
          className="w-12 h-14 text-center text-2xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BD95]"
        />
      ))}
    </div>
  );
};

export default OtpInput;