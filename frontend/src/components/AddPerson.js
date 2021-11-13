import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import useForm from '../hooks/useForm';
import { ALL_PEOPLE_QUERY } from './Page';

const ADD_NEW_PERSON_MUTATION = gql`
  mutation ADD_NEW_PERSON_MUTATION(
    $first_name: String!
    $last_name: String!
    $dob: String!
    $phone_number: String!
    $notes: String
  ) {
    addPerson(
      personInput: {
        first_name: $first_name
        last_name: $last_name
        dob: $dob
        phone_number: $phone_number
        notes: $notes
      }
    ) {
      first_name
      last_name
      notes
    }
  }
`;
export default function AddPerson() {
  // I need a form in a modal that can add a new person to the data base
  // I need it to update the form on the main page.
  const { inputs, handleChange, clearForm, resetForm } = useForm();
  const [addPerson, { loading, error, data }] = useMutation(
    ADD_NEW_PERSON_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PEOPLE_QUERY }],
    }
  );

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        // Submit the inputfields to the backend:
        const res = await addPerson();
        clearForm();
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="first_name">
          First Name
          <input
            required
            type="first_name"
            id="first_name"
            name="first_name"
            value={inputs.first_name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="last_name">
          Last Name
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Last Name"
            value={inputs.last_name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="dob">
          Birthday
          <input
            type="date"
            id="dob"
            name="dob"
            placeholder="Birthday"
            value={inputs.dob}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="phone_number">
          Birthday
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            placeholder="Phone Number"
            value={inputs.phone_number}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="notes">
          Notes
          <textarea
            id="notes"
            name="notes"
            placeholder="notes"
            value={inputs.notes}
            onChange={handleChange}
          />
        </label>

        <button type="submit">+ Add Person</button>
      </fieldset>
    </form>
  );
}
