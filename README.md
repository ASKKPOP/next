# Jupiter Frontend Client

A modern, responsive React/Next.js frontend for the Jupiter dating application, featuring real-time chat, community features, and social media integration.

## 🏗️ Architecture

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Real-time**: Socket.IO Client
- **UI Components**: Headless UI + Heroicons

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend API server running

### Installation

1. **Clone and setup**
   ```bash
   cd asianlove-frontend
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API server URL
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Frontend Running**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000 (should be running)

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes (if needed)
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Landing page
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── AdSense.tsx    # Google AdSense integration
│   ├── AppLayout.tsx  # Main app layout
│   ├── ChatView.tsx   # Chat functionality
│   ├── CommunityView.tsx # Community features
│   ├── MatchesView.tsx # Match management
│   ├── ProfileView.tsx # User profile
│   ├── SettingsView.tsx # App settings
│   ├── SocialMediaView.tsx # Social media integration
│   └── SwipeView.tsx  # Dating swipe interface
├── lib/               # Utilities and configurations
│   ├── store.ts       # Zustand state management
│   ├── api.ts         # API client functions
│   ├── socket.ts      # WebSocket client
│   └── utils.ts       # Utility functions
├── types/             # TypeScript type definitions
│   ├── user.ts        # User-related types
│   ├── match.ts       # Match-related types
│   ├── message.ts     # Message-related types
│   └── api.ts         # API response types
└── hooks/             # Custom React hooks
    ├── useAuth.ts     # Authentication hook
    ├── useSocket.ts   # WebSocket hook
    └── useApi.ts      # API hook
```

## 🎨 Features

### Core Dating Features
- **User Profiles**: Rich profile creation and editing
- **Swipe Interface**: Tinder-like swipe functionality
- **Matching System**: Smart matching algorithm
- **Real-time Chat**: Instant messaging with Socket.IO
- **Photo Management**: Multiple photo uploads and management

### Community Features
- **Reddit-like Forum**: Community posts and discussions
- **Categories**: Organized discussion topics
- **Voting System**: Upvote/downvote posts
- **Comments**: Nested comment system
- **Anonymous Posting**: Option to post anonymously

### Social Media Integration
- **Facebook Connect**: Share posts to Facebook
- **Instagram Connect**: Share posts to Instagram
- **Post Management**: Schedule and manage social posts
- **Analytics**: Track post performance

### Monetization
- **Google AdSense**: Strategic ad placements
- **Premium Features**: Premium subscription system
- **In-app Purchases**: Virtual gifts and boosts

## 🔧 Configuration

### Environment Variables
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WS_URL=ws://localhost:5000

# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_ENABLED=true

# Social Media APIs
NEXT_PUBLIC_FACEBOOK_APP_ID=your-facebook-app-id
NEXT_PUBLIC_INSTAGRAM_APP_ID=your-instagram-app-id

# Feature Flags
NEXT_PUBLIC_COMMUNITY_ENABLED=true
NEXT_PUBLIC_SOCIAL_ENABLED=true
NEXT_PUBLIC_ADSENSE_ENABLED=true
```

## 🎯 Key Components

### AppLayout
Main application layout with navigation and view management.

### SwipeView
Core dating interface with card swiping and profile viewing.

### ChatView
Real-time messaging interface with typing indicators and notifications.

### CommunityView
Reddit-style community forum with posts, comments, and voting.

### SocialMediaView
Social media integration for sharing and connecting accounts.

## 🔌 API Integration

The frontend communicates with the backend API through:

### REST API Calls
```typescript
// Example API call
const response = await fetch(`${API_URL}/api/users`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

### WebSocket Events
```typescript
// Real-time chat
socket.emit('send_message', { matchId, content });
socket.on('new_message', handleNewMessage);
```

## 🎨 Styling

### Tailwind CSS
- Responsive design system
- Custom color palette
- Component-based styling
- Dark mode support

### Framer Motion
- Smooth page transitions
- Interactive animations
- Gesture-based interactions
- Loading states

## 📱 Responsive Design

- **Desktop**: Full-featured interface
- **Tablet**: Optimized touch interface
- **Mobile**: Mobile-first design
- **Progressive Web App**: Offline capabilities

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🚀 Deployment

### Vercel Deployment
```bash
npm run build
vercel --prod
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Performance

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Component and route lazy loading
- **Caching**: Static generation and ISR
- **Bundle Analysis**: Webpack bundle analyzer

## 🔒 Security

- **HTTPS Only**: Secure connections
- **CSP Headers**: Content Security Policy
- **Input Validation**: Client-side validation
- **XSS Protection**: React's built-in protection
- **CSRF Protection**: Token-based protection

## 📈 Analytics

- **Google Analytics**: User behavior tracking
- **AdSense Analytics**: Ad performance metrics
- **Custom Events**: User interaction tracking
- **Performance Monitoring**: Core Web Vitals

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📞 Support

For frontend support and questions:
- Email: frontend@asianlove.com
- Documentation: https://docs.asianlove.com
- Issues: GitHub Issues

---

**Built with ❤️ for the Jupiter dating community**
