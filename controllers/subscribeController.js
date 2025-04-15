import { SubscribeModel } from "../models/subscribe.js";

export const CreateSubscription = async (req, res) => {
  try {
    const { email } = req.body;

    // Create new subscription
    const subscribe = new SubscribeModel({
      email
    });

    await subscribe.save();

    return res.status(201).json({
      message: "Thank you for subscribing.",
      subscribe,
    });
  } catch (error) {
    console.error("Error submitting subscription:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getAllSubscriptions = async (req, res) => {
    try {
      const subscriptions = await SubscribeModel.find().sort({ createdAt: -1 });
      return res.status(200).json({ subscriptions });
    } catch (error) {
      console.error("Error getting subscriptions:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

  export const updateSubscription = async (req, res) => {
      try {
          const { id, email} = req.body;
      
    
        const updatedSubscription = await SubscribeModel.findByIdAndUpdate(id, email, {
          new: true,
          runValidators: true,
        });
  
        if (!updatedSubscription) {
          return res.status(404).json({ message: "Subscription not found" });
        }
    
        return res.status(200).json({ message: "Subscription updated successfully", subscribe: updatedSubscription });
      } catch (error) {
        console.error("Error updating subscription:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    };
  
    // DELETE a subscription by ID
  export const deleteSubscription = async (req, res) => {
      try {
        const { id } = req.body;
    
        const deletedSubscription = await SubscribeModel.findByIdAndDelete(id);
    
        if (!deletedSubscription) {
          return res.status(404).json({ message: "Subscription not found" });
        }
    
        return res.status(200).json({ message: "Subscription deleted successfully" });
      } catch (error) {
        console.error("Error deleting subscription:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    };
  
    
    
    