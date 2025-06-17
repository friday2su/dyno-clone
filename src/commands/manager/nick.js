module.exports = {
    data: {
        name: 'nick',
        description: 'Change the nickname of a user',
        category: 'manager',
        usage: '?nick @user <new_nickname>',
        permissions: ['ManageNicknames']
    },
    async execute(message, args, client) {
        if (!message.member.permissions.has('ManageNicknames')) {
            return message.reply('You do not have permission to change nicknames!');
        }

        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a user to change nickname.');
        }

        const newNick = args.slice(1).join(' ');
        if (!newNick) {
            return message.reply('Please provide a new nickname.');
        }

        try {
            await member.setNickname(newNick);
            await message.reply(`Changed nickname of ${member.user.tag} to ${newNick}`);
        } catch (error) {
            console.error(error);
            message.reply('Failed to change nickname.');
        }
    }
};
