'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft, Video, Phone, MoreVertical, Image, Smile } from 'lucide-react';
import { useDatingStore } from '@/lib/store';
import { Message } from '@/types';

export default function ChatView() {
  const { 
    chats, 
    activeChatId, 
    setActiveChatId, 
    addMessage, 
    setCurrentView,
    currentUser 
  } = useDatingStore();
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeChat = chats.find(chat => chat.id === activeChatId);
  const otherUserId = activeChat?.participants.find(id => id !== currentUser?.id);

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChatId || !currentUser) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: otherUserId || '',
      content: newMessage.trim(),
      type: 'text',
      timestamp: new Date(),
      read: false
    };

    addMessage(activeChatId, message);
    setNewMessage('');
    
    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Simulate reply
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: otherUserId || '',
        receiverId: currentUser.id,
        content: getRandomReply(),
        type: 'text',
        timestamp: new Date(),
        read: false
      };
      addMessage(activeChatId, reply);
    }, 2000);
  };

  const getRandomReply = () => {
    const replies = [
      "That's interesting! Tell me more 😊",
      "I'd love to hear about that!",
      "That sounds amazing!",
      "I feel the same way!",
      "You're so sweet 💕",
      "I'm really enjoying our conversation",
      "That's a great point!",
      "I'd love to meet you someday",
      "You seem like a wonderful person",
      "I'm looking forward to getting to know you better"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!activeChat) {
    return (
      <div className="h-full flex flex-col">
        <div className="bg-white px-4 py-3 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentView('matches')}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Chat</h1>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No active chat</h3>
            <p className="text-gray-500">Select a match to start chatting</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentView('matches')}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          {/* Profile Info */}
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-gray-600">
                {otherUserId?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
                             <h3 className="font-semibold text-gray-800">Match #{activeChatId?.slice(-4)}</h3>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {activeChat.messages.map((message, index) => {
            const isOwn = message.senderId === currentUser?.id;
            
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    isOwn
                      ? 'bg-pink-500 text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    isOwn ? 'text-pink-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-sm px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Image className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700">
              <Smile className="w-5 h-5" />
            </button>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`p-2 rounded-full ${
              newMessage.trim()
                ? 'bg-pink-500 text-white hover:bg-pink-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            } transition-colors`}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
} 