module.exports = {
    data: {
        name: 'uptime',
        description: 'Show how long the bot has been online',
        category: 'misc',
        usage: '?uptime'
    },
    async execute(message, args, client) {
        const totalSeconds = (client.uptime / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor(totalSeconds / 3600) % 24;
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const seconds = Math.floor(totalSeconds % 60);

        const uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        message.channel.send(`I have been online for: ${uptime}`);
    }
};
