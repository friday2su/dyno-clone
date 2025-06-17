module.exports = {
    data: {
        name: 'setnick',
        description: 'Set your own nickname',
        category: 'manager',
        usage: '?setnick <new_nickname>',
        permissions: []
    },
    async execute(message, args, client) {
        const newNick = args.join(' ');
        if (!newNick) {
            return message.reply('Please provide a new nickname.');
        }

        try {
            await message.member.setNickname(newNick);
            await message.reply(`Your nickname has been changed to ${newNick}`);
        } catch (error) {
            console.error(error);
            message.reply('Failed to change your nickname.');
        }
    }
};
