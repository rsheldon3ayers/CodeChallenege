import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Modal from './Modal';
import useModal from '../hooks/useModal';
import DeletePerson from './DeletePerson';

export const ALL_PEOPLE_QUERY = gql`
  query ALL_PEOPLE_QUERY {
    people {
      first_name
      last_name
      dob
      phone_number
      address
      notes
      _id
    }
  }
`;

function Page() {
  const { error, loading, data } = useQuery(ALL_PEOPLE_QUERY);
  const { isShowing, toggle, id, setId, addPerson, setAdd } = useModal();
  if (loading) return 'Loading...';
  if (error) console.error();

  function handleClick(personId, add) {
    setId(personId);
    setAdd(add);
    toggle();
  }

  return (
    <>
      <table>
        <tr>
          <th>Name</th>
          <th>Birthday</th>
          <th>Phone Number</th>
          <th>Address</th>
          <th>Notes</th>
          <th>Options</th>
        </tr>
        {data.people.map((person) => (
          <tr id={person._id} key={person._id}>
            <td>
              {person.first_name} {person.last_name}
            </td>
            <td>
              {new Date(parseInt(person.dob)).toLocaleDateString('en-US', {
                timeZone: 'UTC',
              })}
            </td>
            <td>{person.phone_number}</td>
            <td>{person.address}</td>
            <td>{person.notes}</td>

            <td>
              <button
                className="edit"
                id={person._id}
                type="button"
                onClick={() => handleClick(person._id, false)}
              >
                ✏️
              </button>
              <DeletePerson id={person._id} />
            </td>
          </tr>
        ))}
      </table>
      <button
        className="add-button"
        type="button"
        onClick={() => handleClick(id, true)}
      >
        +
      </button>
      <Modal
        id={id}
        isShowing={isShowing}
        hide={toggle}
        addPerson={addPerson}
        toggle={toggle}
      />
    </>
  );
}

export default Page;
