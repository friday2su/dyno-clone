module.exports = {
    data: {
        name: 'ping',
        description: 'Replies with bot latency',
        category: 'moderation',
        usage: '?ping',
        aliases: ['latency']
    },
    async execute(message, args, client) {
        const sent = await message.reply('Pinging...');
        sent.edit(`Pong! 🏓\nLatency: ${sent.createdTimestamp - message.createdTimestamp}ms\nAPI Latency: ${Math.round(client.ws.ping)}ms`);
    }
};
