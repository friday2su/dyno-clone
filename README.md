# Dyno Clone

A Discord bot with MongoDB integration inspired by the popular Dyno bot. This clone provides moderation, utility, and fun commands for Discord servers.

## Features

- Command handling system with folder organization
- MongoDB integration for data persistence
- Multiple command categories
- Support for both prefix and non-prefix commands
- Advanced permission management

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) instance (local or Atlas)
- [Discord Developer Account](https://discord.com/developers/applications)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/friday2su/dyno-clone.git
   cd dyno-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   DISCORD_TOKEN=your_discord_bot_token
   PREFIX=!
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the bot:
   ```bash
   # Development mode (with hot reload)
   npm run dev
   
   # Production mode
   npm start
   ```

## Project Structure

```
dyno-clone/
├── src/
│   ├── commands/     # Bot commands organized by category
│   ├── models/       # MongoDB models
│   ├── utils/        # Utility functions
│   └── index.js      # Entry point
├── .env              # Environment variables
└── package.json      # Project dependencies and scripts
```

## Adding Commands

1. Create a new file in the appropriate category folder under `src/commands/`
2. Use this template for your command:

```javascript
module.exports = {
  name: 'commandname',
  description: 'Command description',
  usage: '!commandname <args>',
  category: 'category',
  data: {
    name: 'commandname',
    description: 'Command description'
  },
  async execute(message, args, client) {
    // Command logic here
  }
};
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Discord.js](https://discord.js.org/) for the Discord API wrapper
- [Mongoose](https://mongoosejs.com/) for MongoDB object modeling 