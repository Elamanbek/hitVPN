import React, { useState } from 'react';
import { generateTechArchitecture } from '../services/geminiService';
import { Bot, Code, Cpu, Database, Globe } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ArchitectureDocs: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Static Fallback Content (Technical Template)
  const STATIC_DOCS: Record<string, string> = {
    'backend': `
# Backend Architecture (FastAPI)

## Structure
\`\`\`
/app
  /api
    /v1
      /endpoints
        auth.py       # Telegram Auth
        servers.py    # Node management
        users.py      # Subscriptions
  /core
    config.py         # Env vars
    security.py       # JWT tokens
  /db
    models.py         # SQLAlchemy models
    session.py        # Postgres connection
  main.py             # App entry point
\`\`\`

## Code Example: User Model
\`\`\`python
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from app.db.base_class import Base

class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    telegram_id = Column(String, unique=True, index=True)
    is_active = Column(Boolean(), default=True)
    subscription_end = Column(DateTime, nullable=True)
    bandwidth_usage = Column(Integer, default=0) # Bytes
\`\`\`
`,
    'bot': `
# Telegram Bot Logic (aiogram)

## Flow
1. **User Start**: \`/start\` -> Check DB for user.
2. **Registration**: If new, create User entry via API.
3. **Menu**: Display "My Profile", "Get Key", "Support".
4. **Web App**: Launch this PWA via \`WebAppInfo\`.

## Code Example: Webhook Handler
\`\`\`python
@dp.message_handler(commands=['start'])
async def send_welcome(message: types.Message):
    user_data = {
        "id": message.from_user.id,
        "username": message.from_user.username
    }
    # Sync with Backend API
    await sync_user_to_db(user_data)
    
    keyboard = types.InlineKeyboardMarkup()
    web_app = types.WebAppInfo(url="https://hitvpn.app")
    keyboard.add(types.InlineKeyboardButton(text="Open Dashboard", web_app=web_app))
    
    await message.answer("Welcome to HitVPN! Manage your secure connection below:", reply_markup=keyboard)
\`\`\`
`,
    'server': `
# VPN Server Configuration

## Stack
- **OS**: Ubuntu 22.04 LTS
- **Core**: WireGuard Kernel Module + Xray-core (VLESS Reality)
- **Management**: Docker Compose

## WireGuard Docker Compose
\`\`\`yaml
version: "3"
services:
  wireguard:
    image: linuxserver/wireguard
    container_name: wireguard
    cap_add:
      - NET_ADMIN
      - SYS_MODULE
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Etc/UTC
      - SERVERURL=vpn.hitvpn.com
      - PEERS=10 # Number of pre-generated peers
    volumes:
      - ./config:/config
      - /lib/modules:/lib/modules
    ports:
      - 51820:51820/udp
    restart: unless-stopped
\`\`\`
`,
    'db': `
# Database Schema (PostgreSQL)

## Tables

### Users
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | PK |
| tg_id | BIGINT | Telegram User ID |
| balance | DECIMAL | Account balance |
| is_banned | BOOLEAN | Ban status |

### Servers
| Column | Type | Description |
|--------|------|-------------|
| id | INT | PK |
| ip_address | INET | Public IP |
| public_key | VARCHAR | WG Public Key |
| location | VARCHAR | Country Code |
| load_pct | INT | CPU Load |

### Subscriptions
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | PK |
| user_id | UUID | FK -> Users |
| start_date | TIMESTAMP | |
| end_date | TIMESTAMP | |
\`\`\`
`
  };

  const topics = [
    { id: 'backend', label: 'Backend API (FastAPI)', icon: Code },
    { id: 'bot', label: 'Telegram Bot Logic', icon: Bot },
    { id: 'server', label: 'VPN Node Config (WireGuard)', icon: Globe },
    { id: 'db', label: 'Database Schema', icon: Database },
  ];

  const handleGenerate = async (topicId: string, label: string) => {
    setSelectedTopic(topicId);
    setLoading(true);
    setContent('');
    
    // Try Gemini first, fallback to Static content if API key missing/fails
    try {
        const result = await generateTechArchitecture(label);
        if (result.includes("API Key is missing") || result.includes("Error")) {
             setContent(STATIC_DOCS[topicId]);
        } else {
             setContent(result);
        }
    } catch (e) {
        setContent(STATIC_DOCS[topicId]);
    }
    
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-8 rounded-2xl border border-indigo-500/30">
        <h2 className="text-2xl font-bold text-white mb-2">Technical Architecture Blueprint</h2>
        <p className="text-indigo-200 mb-6 max-w-2xl">
          View the system architecture and code templates. These templates are ready for the backend MVP implementation.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => handleGenerate(t.id, t.label)}
              className={`
                p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all
                ${selectedTopic === t.id 
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' 
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
            >
              <t.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 min-h-[400px] p-6">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 pt-20">
             <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
             <p className="animate-pulse">Retrieving architecture specs...</p>
          </div>
        ) : content ? (
          <div className="prose prose-invert max-w-none prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4 pt-20">
            <Cpu className="w-16 h-16 opacity-20" />
            <p>Select a module above to view the code structure.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchitectureDocs;