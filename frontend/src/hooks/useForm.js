import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs

  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join(' ');
  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial);
  }, [initialValues]);

  // used for onChange handler
  function handleChange(e) {
    const { value, name } = e.target;
    setInputs({
      // copy existing state object
      ...inputs,
      // update the inputs with the value the user enters
      [name]: value,
    });
  }
  function resetForm() {
    setInputs(initial);
  }
  function clearForm() {
    const blankSlate = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankSlate);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
