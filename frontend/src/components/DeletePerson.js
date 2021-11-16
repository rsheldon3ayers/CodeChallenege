import { useMutation } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';
import PropTypes from 'prop-types';
import { ALL_PEOPLE_QUERY } from './Page';

const DELETE_PERSON_MUTATION = gql`
  mutation DELETE_PERSON_MUTATION($id: ID!) {
    deletePerson(_id: $id) {
      _id
      first_name
      last_name
    }
  }
`;
export default function DeletePerson({ id }) {
  const [deletePerson, { loading, error }] = useMutation(
    DELETE_PERSON_MUTATION,
    {
      variables: { id },
      refetchQueries: [{ query: ALL_PEOPLE_QUERY }],
    }
  );
  if (error) {
    console.error();
  }
  return (
    <button
      disabled={loading}
      type="button"
      onClick={() => {
        if (window.confirm('Are you sure you want to delete this item?')) {
          deletePerson().catch((err) => alert(err.message));
        }
      }}
    >
      🗑
    </button>
  );
}

DeletePerson.propTypes = {
  id: PropTypes.any,
};
