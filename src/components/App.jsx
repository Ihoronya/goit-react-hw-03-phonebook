import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    // Завантаження контактів з localStorage при запуску застосунку
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }

    // Завантаження фільтра з localStorage при запуску застосунку
    const savedFilter = localStorage.getItem('filter');
    if (savedFilter) {
      this.setState({ filter: savedFilter });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Збереження контактів у localStorage після зміни стану
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }

    // Збереження фільтра у localStorage після зміни стану
    if (prevState.filter !== this.state.filter) {
      localStorage.setItem('filter', this.state.filter);
    }
  }

  handleAddContact = newContact => {
    if (this.checkIsDuplicate(newContact)) return false;
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  }

  checkIsDuplicate = newContact => {
    const { contacts } = this.state;
    const isExistContact = contacts.some(contact => contact.name.toLowerCase() === newContact.name.toLowerCase());

    isExistContact && alert(`${newContact.name} is already in contacts`);

    return isExistContact;
  };

  handleRemoveContact = id =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));

  handleFilterChange = filter => this.setState({ filter });

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <>
        <ContactForm
          onAdd={this.handleAddContact}
        />
       
        <ContactList
          contacts={visibleContacts}
          onRemove={this.handleRemoveContact}
        >
          <Filter filter={filter} onChange={this.handleFilterChange} />
        </ContactList>
      </>
    );
  }
}

export default App;