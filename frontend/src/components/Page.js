import React from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import AddPerson from './AddPerson';

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
  if (loading) return 'Loading...';
  if (error) console.log(error);
  console.log('PERSON======', data.people[1]._id);
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
              <a>✏️</a> 🗑
            </td>
          </tr>
        ))}
      </table>
      <AddPerson />
    </>
  );
}

export default Page;
