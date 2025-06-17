module.exports = {
    data: {
        name: 'membercount',
        description: 'Get the total number of members in the server',
        category: 'misc',
        usage: '?membercount'
    },
    async execute(message, args, client) {
        const count = message.guild.memberCount;
        await message.reply(`This server has ${count} members.`);
    }
};
