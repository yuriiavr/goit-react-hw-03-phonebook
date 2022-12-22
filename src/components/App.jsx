import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Section from './Section';
import Container from './Container';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const newContacts = JSON.parse(localStorage.getItem('contacts'));

    if (newContacts) {
      this.setState({ contacts: newContacts });
    }
  }

  formSubmitHandler = ({ name, number }) => {
    const { contacts } = this.state;
    const id = nanoid(5);
    const contact = {
      id,
      name,
      number,
    };

    const checkedContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    checkedContact
      ? alert(`${name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [contact, ...prevState.contacts],
        }));
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const contactsFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(contactsFilter)
    );
  };


  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };


  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <Container>
          <Section title={'Phonebook'}>
            <ContactForm onSubmit={this.formSubmitHandler} />
          </Section>
          <Section title={'Contacts'}>
            <Filter value={filter} changeFilter={this.changeFilter} />
            <ContactList
              contacts={visibleContacts}
              onDeleteContact={this.deleteContact}
            />
          </Section>
        </Container>
      </>
    );
  }
}