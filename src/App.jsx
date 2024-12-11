import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import SearchBox from "./components/SearchBox";
import ContactList from "./components/ContactList";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "./redux/operations";


function App() {
  const dispatch = useDispatch();
  const contactList = useSelector(state => state.contact.items);
  const status = useSelector(state => state.contact.status)

  const [contacts, setContacts] = useState(() => {
    // LocalStorage'dan veri yükleme
    const storedContacts = JSON.parse(localStorage.getItem("personData"));
    return (
      storedContacts || contactList
    );
  });
  //*dispatch ile fetchContacts çağrılır.
  useEffect(()=>{
    dispatch(fetchContacts);
  },[dispatch]);

  useEffect(() => {
    // LocalStorage'ı güncelle
    localStorage.setItem("personData", JSON.stringify(contacts));
  }, [contacts]);

  // eslint-disable-next-line no-unused-vars
  const addContact = (newContact) => {
    const contactExists = contacts.some(
      (contact) =>
        contact.name.toLowerCase() === newContact.name.toLowerCase() &&
        contact.phone === newContact.phone
    );

    if (contactExists) {
      alert("This contact already exists. Please add a new contact.");
    } else {
      setContacts((prevContacts) => [...prevContacts, newContact]);
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox  />
      <ContactList />
      {status === "loading" && <p>Loading ...</p>}
    </div>
  );
}

export default App;
