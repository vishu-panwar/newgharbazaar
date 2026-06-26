import React, { useState } from 'react';
import { Search, Send, Phone, Video, MoreVertical, CheckCheck, MessageSquare, UserPlus } from 'lucide-react';
import './Messages.css';

const contacts = [
  {
    id: 1,
    name: 'Ali Khan',
    role: 'Property Owner',
    phone: '+91 98765 43210',
    avatar: 'AK',
    lastMessage: 'Sure, we can discuss the price.',
    time: '10:30 AM',
    unread: 2,
    online: true,
    chat: [
      { id: 101, text: 'Hi Ali, I saw your Villa listing.', sender: 'me', time: '10:00 AM' },
      { id: 102, text: 'Hello! Yes, it is still available.', sender: 'them', time: '10:15 AM' },
      { id: 103, text: 'Would you be open to a slight negotiation?', sender: 'me', time: '10:20 AM' },
      { id: 104, text: 'Sure, we can discuss the price.', sender: 'them', time: '10:30 AM' },
    ]
  },
  {
    id: 2,
    name: 'Design Studio Pro',
    role: 'Service Provider',
    phone: '+91 87654 32109',
    avatar: 'DS',
    lastMessage: 'I have attached the catalog.',
    time: 'Yesterday',
    unread: 0,
    online: false,
    chat: [
      { id: 201, text: 'Can you share your interior design catalog?', sender: 'me', time: 'Yesterday' },
      { id: 202, text: 'I have attached the catalog.', sender: 'them', time: 'Yesterday' },
    ]
  },
  {
    id: 3,
    name: 'Sara Ali',
    role: 'Broker',
    phone: '+91 76543 21098',
    avatar: 'SA',
    lastMessage: 'The paperwork is ready to sign.',
    time: 'Monday',
    unread: 0,
    online: true,
    chat: [
      { id: 301, text: 'Is the Bahria Town apartment deal finalized?', sender: 'me', time: 'Monday' },
      { id: 302, text: 'Yes! The paperwork is ready to sign.', sender: 'them', time: 'Monday' },
    ]
  },
  {
    id: 4,
    name: 'Raj Verma',
    role: 'Property Owner',
    phone: '+91 65432 10987',
    avatar: 'RV',
    lastMessage: 'Let me know when you want to visit.',
    time: 'Tuesday',
    unread: 0,
    online: false,
    chat: [
      { id: 401, text: 'Are you available for a site visit this weekend?', sender: 'me', time: 'Tuesday' },
      { id: 402, text: 'Let me know when you want to visit.', sender: 'them', time: 'Tuesday' },
    ]
  }
];

export default function Messages() {
  const [activeContactId, setActiveContactId] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const [activeTab, setActiveTab] = useState('messages');
  const [searchQuery, setSearchQuery] = useState('');

  const activeContact = contacts.find(c => c.id === activeContactId);

  const filteredContacts = contacts.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    // In a real app, this would update state and send to backend
    setMessageInput('');
  };

  return (
    <div className="messages-page">
      <div className="client-page-header">
        <div>
          <h1>Purchased Contacts & Messages</h1>
          <p>Access your purchased contacts and communicate directly with owners and providers</p>
        </div>
        <div className="category-filters">
          <button className={activeTab === 'contacts' ? 'active' : ''} onClick={() => setActiveTab('contacts')}>Contacts</button>
          <button className={activeTab === 'messages' ? 'active' : ''} onClick={() => setActiveTab('messages')}>Messages</button>
        </div>
      </div>

      {activeTab === 'messages' ? (
        <div className="messages-container">
          {/* Sidebar */}
          <div className="messages-sidebar">
            <div className="search-bar">
              <Search size={18} color="#9ca3af" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="contacts-list">
              {filteredContacts.length === 0 ? (
                <div className="empty-contacts">
                  <MessageSquare size={32} color="#d1d5db" />
                  <p>No messages found.</p>
                </div>
              ) : (
                filteredContacts.map(contact => (
                  <div 
                    key={contact.id} 
                    className={`contact-item ${activeContactId === contact.id ? 'active' : ''}`}
                    onClick={() => setActiveContactId(contact.id)}
                  >
                    <div className="contact-avatar-wrapper">
                      <div className="contact-avatar">{contact.avatar}</div>
                      {contact.online && <div className="online-indicator"></div>}
                    </div>
                    <div className="contact-info">
                      <div className="contact-header">
                        <h4>{contact.name}</h4>
                        <span className="contact-time">{contact.time}</span>
                      </div>
                      <div className="contact-footer">
                        <p className="last-message">{contact.lastMessage}</p>
                        {contact.unread > 0 && <span className="unread-badge">{contact.unread}</span>}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="chat-area">
            {activeContact ? (
              <>
                <div className="chat-header">
                  <div className="chat-header-info">
                    <div className="contact-avatar">{activeContact.avatar}</div>
                    <div>
                      <h2>{activeContact.name}</h2>
                      <p>{activeContact.role} &bull; <span style={{color: '#10b981', fontWeight: 600}}>{activeContact.phone}</span></p>
                    </div>
                  </div>
                  <div className="chat-header-actions">
                    <button className="icon-btn" title="Call Contact"><Phone size={20} /></button>
                    <button className="icon-btn" title="Video Call"><Video size={20} /></button>
                    <button className="icon-btn"><MoreVertical size={20} /></button>
                  </div>
                </div>

                <div className="chat-messages">
                  <div className="chat-date-separator"><span>Today</span></div>
                  {activeContact.chat.map(msg => (
                    <div key={msg.id} className={`message-bubble-wrapper ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                      <div className="message-bubble">
                        <p>{msg.text}</p>
                        <div className="message-meta">
                          <span>{msg.time}</span>
                          {msg.sender === 'me' && <CheckCheck size={14} color="#f3e8ff" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="chat-input-area">
                  <form onSubmit={handleSend} className="chat-input-form">
                    <input 
                      type="text" 
                      placeholder="Type your message..." 
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <button type="submit" className="send-btn" disabled={!messageInput.trim()}>
                      <Send size={18} />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="no-chat-selected">
                <MessageSquare size={48} color="#d1d5db" />
                <h3>Select a contact</h3>
                <p>Choose a contact from the list to view their details and start messaging.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="contacts-grid-view">
          <div className="contacts-grid">
            {contacts.map(contact => (
              <div key={contact.id} className="purchased-contact-card">
                <div className="pc-header">
                  <div className="pc-avatar">{contact.avatar}</div>
                </div>
                <div className="pc-info">
                  <h3>{contact.name}</h3>
                  <span className="pc-role">{contact.role}</span>
                  <div className="pc-phone">
                    <Phone size={14} /> {contact.phone}
                  </div>
                </div>
                <div className="pc-actions">
                  <button className="action-btn primary" onClick={() => { setActiveContactId(contact.id); setActiveTab('messages'); }}>
                    <MessageSquare size={16} /> Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
