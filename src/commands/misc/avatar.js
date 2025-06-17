module.exports = {
    data: {
        name: 'avatar',
        description: 'Get the avatar URL of a user',
        category: 'misc',
        usage: '?avatar [@user]'
    },
    async execute(message, args, client) {
        const user = message.mentions.users.first() || message.author;
        const avatarURL = user.displayAvatarURL({ dynamic: true, size: 512 });
        await message.reply(`${user.tag}'s avatar: ${avatarURL}`);
    }
};
