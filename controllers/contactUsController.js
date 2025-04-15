import { ContactModel } from "../models/contactUs.js";

export const createContactUs = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, message } = req.body;

    // Create new contact
    const contact = new ContactModel({
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
    });

    await contact.save();

    return res.status(201).json({
      message: "Thank you for contacting us. We'll get back to you soon.",
      contact,
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getAllContacts = async (req, res) => {
    try {
      const contacts = await ContactModel.find().sort({ createdAt: -1 });
      return res.status(200).json({ contacts });
    } catch (error) {
      console.error("Error getting contacts:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  export const updateContact = async (req, res) => {
    try {
        const { id, updatedData} = req.body;
    
  
      const updatedContact = await ContactModel.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
      });

      if (!updatedContact) {
        return res.status(404).json({ message: "Contact Us not found" });
      }
  
      return res.status(200).json({ message: "Contact Us updated", contact: updatedContact });
    } catch (error) {
      console.error("Error updating contact:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // DELETE a contact by ID
export const deleteContact = async (req, res) => {
    try {
      const { id } = req.body;
  
      const deletedContact = await ContactModel.findByIdAndDelete(id);
  
      if (!deletedContact) {
        return res.status(404).json({ message: "Contact not found" });
      }
  
      return res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      console.error("Error deleting contact:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  
  
  