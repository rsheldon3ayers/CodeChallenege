import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // creat a state object

  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join(' ');
  useEffect(() => {
    // This functions run when the things we are watching change
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }

    setInputs({
      // copy existing data
      ...inputs,
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
