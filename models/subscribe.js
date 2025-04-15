import {model, Schema} from "mongoose"
import { toJSON } from "@reis/mongoose-to-json"

const subscribeSchema = new Schema({
    email: { type: String},
    dateCreated: { type: Date, default: Date.now },
    deletedAt:{type:Date, default:null}
  });
     
  subscribeSchema.plugin(toJSON);


  export const SubscribeModel = model("Subscribe", subscribeSchema);