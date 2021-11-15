import React, { useState } from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import AddPerson from './AddPerson';
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
      notes
      _id
    }
  }
`;

function Page() {
  const { error, loading, data } = useQuery(ALL_PEOPLE_QUERY);
  const { isShowing, toggle, id, setId, addPerson, setAdd, toggleAdd } =
    useModal();
  if (loading) return 'Loading...';
  if (error) console.log(error);

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
          <th>Notes</th>
        </tr>
        {data.people.map((person) => (
          <tr id={person._id} key={person._id}>
            <td>
              {person.first_name} {person.last_name}
            </td>
            <td>{person.dob}</td>
            <td>{person.phone_number}</td>
            <td>{person.notes}</td>

            <td>
              <button
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
      <button type="button" onClick={() => handleClick(id, true)}>
        Add Person
      </button>
      <Modal
        id={id}
        isShowing={isShowing}
        hide={toggle}
        addPerson={addPerson}
      />
    </>
  );
}

export default Page;
