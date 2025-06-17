const afkUsers = new Map();

module.exports = {
    data: {
        name: 'afk',
        description: 'Set your AFK status with an optional reason',
        category: 'misc',
        usage: '?afk [reason]'
    },
    async execute(message, args, client) {
        const reason = args.join(' ') || 'AFK';
        afkUsers.set(message.author.id, reason);
        await message.reply(`You are now AFK: ${reason}`);

        // Remove AFK status when user sends a message
        const filter = (msg) => msg.author.id === message.author.id;
        const collector = message.channel.createMessageCollector({ filter, time: 600000, max: 1 });

        collector.on('collect', () => {
            afkUsers.delete(message.author.id);
            message.channel.send(`${message.author}, welcome back! Your AFK status has been removed.`);
        });
    }
};

module.exports.afkUsers = afkUsers;
