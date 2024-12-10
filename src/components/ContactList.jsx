import Contact from "./Contact";
import Styles from "./ContactList.module.css"
import { useSelector, useDispatch } from "react-redux";
import  {selectNameFilter} from "../redux/filtersSlice"
const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contacts.items);
  const nameFilter = useSelector(selectNameFilter); // Redux'tan filtre değerini alıyoruz


  const filteredContacts = nameFilter
    ? contacts.filter((contact) =>
        contact.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
    : contacts;


  
  return (
    <div className={Styles["contact-list"]}>
      {filteredContacts.length > 0 ? (
        filteredContacts.map((contact,index) => (
          <Contact key={index}
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
