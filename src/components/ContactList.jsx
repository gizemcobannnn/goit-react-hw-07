import Contact from "./Contact";
import Styles from "./ContactList.module.css"
import { useSelector } from "react-redux";

import { selectFilteredContacts } from "../redux/contactsSlice";
const ContactList = () => {
  const selectedContacts = useSelector(selectFilteredContacts);


//filtredContact was deleted.


  
  return (
    <div className={Styles["contact-list"]}>
      {selectedContacts.length > 0 ? (
        selectedContacts.map((contact) => (
          <Contact key={contact.id}
            contact={contact}
           />
        ))
      ) : (
        <p>No contacts found</p>
      )}
    </div>
  );
};


export default ContactList;
