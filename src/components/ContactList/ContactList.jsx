import s from './ContactList.module.css';

const ContactList = ({ contacts, onRemove, children }) => {
  return (

      <div className={s.contacts}>
        <h2>Contacts</h2>
        {children}
        <ul>
          {contacts.length === 0 ? (
            <p>No contacts yet&#128521;</p>
          ) : (
            <>
              {contacts.map(contact => {
                return (
                  <li key={contact.id}>
                    <p>
                      <span>{contact.name} : </span>
                      {contact.number}
                    </p>
                    <button
                      onClick={() => {
                        onRemove(contact.id);
                      }}
                    >
                      🗑
                    </button>
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </div>

  );
};

export default ContactList;
