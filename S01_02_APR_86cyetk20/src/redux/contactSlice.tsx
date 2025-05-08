
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Contact type
export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  company: string;
  notes: string;
  photo?: string;
}

interface ContactState {
  contacts: Contact[];
}

const loadContacts = (): Contact[] => {
  const storedContacts = localStorage.getItem("contacts");
  return storedContacts ? JSON.parse(storedContacts) : [];
};

const initialState: ContactState = {
  contacts: loadContacts(),
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
      localStorage.setItem("contacts", JSON.stringify(state.contacts));
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const updated = action.payload;
      const index = state.contacts.findIndex(contact => contact.id === updated.id);
      if (index !== -1) {
        state.contacts[index] = updated;
        localStorage.setItem("contacts", JSON.stringify(state.contacts));
      }
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      localStorage.setItem("contacts", JSON.stringify(state.contacts));
    },
  },
});

export const { addContact, updateContact, deleteContact } = contactSlice.actions;
export default contactSlice.reducer;
