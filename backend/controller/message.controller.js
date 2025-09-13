import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      messages: message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([await conversation.save(), await newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }


    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in message controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json("");

    const message = conversation.messages;

    res.status(200).json(message);
  } catch (error) {
    console.log("error in message controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLastMessage = async (req, res) => {
  try {
    var conversation = await Conversation.find().populate("messages");
    var lastMessage = {};
    conversation.map((convo) => {
      const msg = convo.messages[convo.messages.length - 1];

      if (!msg) return;

      if (msg.senderId.toString() === req.user._id.toString()) {
        lastMessage[msg.receiverId.toString()] = {
          msg: msg.messages,
          createdAt: msg.createdAt,
          fromMe: true,
        };
      } else if (msg.receiverId.toString() === req.user._id.toString()) {
        lastMessage[msg.senderId.toString()] = {
          msg: msg.messages,
          createdAt: msg.createdAt,
          fromMe: false,
        };
      }
    });
    res.status(200).json(lastMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the last message" });
  }
};

export const editMessage = async (req, res) => {
  const { MessageId } = req.params;
  const userId = req.user._id;
  const { text } = req.body;

  const message = await Message.findOne({
    _id: MessageId,
  });
  if (message.senderId.toString() !== userId.toString())
    return res.status(403).send("Unauthorized");

  if (!message) {
    return res.status(404).json({ message: "Message not found" });
  }

  message.messages = text;
  message.edited = true;
  // message.updatedAt = new Date();
  await message.save();

  io.to(getReceiverSocketId(message.receiverId)).emit("messageEdited", message);
  io.to(getReceiverSocketId(message.senderId)).emit("messageEdited", message);

  return res.status(200).json({ message: "Message not found" });
  w;
};

export const deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  const userId = req.user._id;

  const message = await Message.findOne({
    _id: messageId,
  });

  if (message.senderId.toString() !== userId.toString())
    return res.status(403).send("Unauthorized");
  if (!message) {
    return res.status(404).json({ message: "Message not found" });
  }

  // Delete the message
  await Message.deleteOne({ _id: messageId });
  res.status(200).json({ message: "Message deleted successfully" });
};
