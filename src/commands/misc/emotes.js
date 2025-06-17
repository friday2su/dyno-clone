module.exports = {
    data: {
        name: 'emotes',
        description: 'List all custom emotes in the server',
        category: 'misc',
        usage: '?emotes'
    },
    async execute(message, args, client) {
        const emotes = message.guild.emojis.cache.map(e => e.toString()).join(' ');
        if (!emotes) {
            return message.reply('This server has no custom emotes.');
        }
        await message.reply(`Custom emotes in this server:\n${emotes}`);
    }
};
