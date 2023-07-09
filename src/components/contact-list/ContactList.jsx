import { deleteContact, fetchContacts } from 'redux/operations';
import { StyledList } from './StyledContactList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getContacts, getFilteredName } from 'redux/selectors';

export default function ContactList() {
  const contacts = useSelector(getContacts);
  const filteredName = useSelector(getFilteredName);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filteredName.toLowerCase())
  );

  return (
    <>
      <StyledList>
        {visibleContacts.map(contact => (
          <li key={contact.id}>
            <p>
              {contact.name}: {contact.phone}
            </p>
            <button onClick={() => dispatch(deleteContact(contact.id))}>
              Delete
            </button>
          </li>
        ))}
      </StyledList>
    </>
  );
}
