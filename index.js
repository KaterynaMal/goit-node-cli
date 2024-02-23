import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

import * as contactsServise from "./contacts/contacts.js";

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsServise.listContacts();
      return console.table(allContacts);

      break;

    case "get":
      const oneContact = await contactsServise.getContactById(id);
      return console.log(oneContact);
      break;

    case "add":
      const newContact = await contactsServise.addContact(name, email, phone);
      return console.log(newContact);
      break;

    case "remove":
      const deleteContact = await contactsServise.removeContact(id);
      return console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
