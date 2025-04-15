import { DemoModel } from "../models/demo.js";

export const Newdemo = async (req, res) => {
  try {
    const { name, email, companyName, jobTitle, phoneNumber, industry } = req.body;

    // Create new demo
    const demo = new DemoModel({
      name,
      email,
      companyName,
      phoneNumber,
      jobTitle,
      industry,
    });

    await demo.save();

    return res.status(201).json({
      message: "Demo submitted successfully",
      demo,
    });
  } catch (error) {
    console.error("Error submitting demo:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getAllDemos = async (req, res) => {
    try {
      const demos = await DemoModel.find().sort({ createdAt: -1 });
      return res.status(200).json({ demos });
    } catch (error) {
      console.error("Error getting demos:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  export const updateDemo = async (req, res) => {
      try {
          const { id, updatedData} = req.body;
      
    
        const updatedDemo = await DemoModel.findByIdAndUpdate(id, updatedData, {
          new: true,
          runValidators: true,
        });
  
        if (!updatedDemo) {
          return res.status(404).json({ message: "Demo not found" });
        }
    
        return res.status(200).json({ message: "Demo has been updated succesfully", demo: updatedDemo });
      } catch (error) {
        console.error("Error updating demo:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    };
  
    // DELETE a demo by ID
  export const deleteDemo = async (req, res) => {
      try {
        const { id } = req.body;
    
        const deletedDemo = await DemoModel.findByIdAndDelete(id);
    
        if (!deletedDemo) {
          return res.status(404).json({ message: "Demo not found" });
        }
    
        return res.status(200).json({ message: "Demo deleted successfully" });
      } catch (error) {
        console.error("Error deleting demo:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    };
  
    
    
    