import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Form from 'react-bootstrap/Form';
import useForm from '../hooks/useForm';
import { ALL_PEOPLE_QUERY } from './Page';

const GET_PERSON_QUERY = gql`
  query GET_PERSON_QUERY($id: ID!) {
    person(_id: $id) {
      first_name
      last_name
      dob
      phone_number
      notes
    }
  }
`;

const EDIT_PERSON_MUTATION = gql`
  mutation EDIT_PERSON_MUTATION(
    $id: ID!
    $first_name: String!
    $last_name: String!
    $dob: String!
    $phone_number: String!
    $notes: String
  ) {
    editPerson(
      _id: $id
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
      dob
      phone_number
      notes
    }
  }
`;

export default function EditPerson({ id }) {
  // query selected person
  const { data, error, loading } = useQuery(GET_PERSON_QUERY, {
    variables: { id },
  });
  const [editPerson, { loading: editLoading, err: editError, data: editData }] =
    useMutation(EDIT_PERSON_MUTATION);
  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.person);
  if (loading) return <p>Loading...!</p>;

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log('RES IN EDITPERSON');
          const res = await editPerson({
            variables: {
              id,
              first_name: inputs.first_name,
              last_name: inputs.last_name,
              dob: inputs.dob,
              phone_number: inputs.phone_number,
              notes: inputs.notes,
            },
            refetchQueries: [{ query: ALL_PEOPLE_QUERY }],
          }).catch(console.error);
        }}
      >
        <fieldset className="mb-3" disabled={loading} aria-busy={loading}>
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

          <button type="submit">Edit Person</button>
        </fieldset>
      </form>
    </>
  );
}

EditPerson.propTypes = {
  id: PropTypes.any,
};
