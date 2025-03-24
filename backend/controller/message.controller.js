import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import conversation from "../models/conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            messages: message,
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }
        
        await Promise.all([await conversation.save(),await newMessage.save()])

        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io
            .to(receiverSocketId)
            .emit("newMessage",newMessage)
        }

        res.status(201).json(newMessage)

    }

    catch (error) {
        console.log("error in message controller", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }

}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all:[senderId,userToChatId]}
        }).populate("messages");
        
        if(!conversation) return res.status(200).json("");

        const message = conversation.messages;

        res.status(200).json(message)

    }
    catch (error) {
        console.log("error in message controller", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const getLastMessage = async (req,res)=>{

    try{
        var Conversations = await conversation.find().populate("messages")
       
        Conversations = Conversations.map((Convo)=>{
           const msg =  Convo.messages[Convo.messages.length-1]
           return msg
        })
        console.log(Conversations)
        // res.status(200).json(Conversation)
        
      } catch (error) {
        // res.status(500).json({ error: "Failed to fetch the last message" });
        console.log(error)
      }
      
};
