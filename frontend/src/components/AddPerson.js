import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import useForm from '../hooks/useForm';
import { ALL_PEOPLE_QUERY } from './Page';

const ADD_NEW_PERSON_MUTATION = gql`
  mutation ADD_NEW_PERSON_MUTATION(
    $first_name: String!
    $last_name: String!
    $dob: String!
    $phone_number: String!
    $address: String!
    $notes: String
  ) {
    addPerson(
      personInput: {
        first_name: $first_name
        last_name: $last_name
        dob: $dob
        phone_number: $phone_number
        address: $address
        notes: $notes
      }
    ) {
      first_name
      last_name
      notes
    }
  }
`;
export default function AddPerson({ toggle }) {
  // I need a form in a modal that can add a new person to the data base
  // I need it to update the form on the main page.
  const { inputs, handleChange, clearForm } = useForm();

  const [addPerson, { loading, error, data }] = useMutation(
    ADD_NEW_PERSON_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PEOPLE_QUERY }],
    }
  );

  if (error) {
    console.error();
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        // Submit the input fields to the backend:
        const res = await addPerson();
        if (res) {
          clearForm();
        }
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <div className="form-header">
          <h2>Complete the fields below</h2>
          <p> *Optional</p>
        </div>
        <label htmlFor="first_name">
          <input
            required
            type="first_name"
            id="first_name"
            name="first_name"
            placeholder="First Name"
            value={inputs.first_name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="last_name">
          <input
            required
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Last Name"
            value={inputs.last_name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="dob">
          <input
            required
            type="date"
            id="dob"
            name="dob"
            placeholder="Birthday"
            value={inputs.dob}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="phone_number">
          <input
            required
            type="text"
            id="phone_number"
            name="phone_number"
            placeholder="Phone Number"
            value={inputs.phone_number}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="address">
          <input
            required
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            value={inputs.address}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="notes">
          <textarea
            id="notes"
            name="notes"
            placeholder="*Notes"
            value={inputs.notes}
            onChange={handleChange}
          />
        </label>
        <div className="button-container">
          <button onClick={toggle} type="button">
            Cancel
          </button>
          <button disabled={loading} type="submit">
            Add
          </button>
        </div>
      </fieldset>
    </form>
  );
}
AddPerson.propTypes = {
  toggle: PropTypes.any,
};
