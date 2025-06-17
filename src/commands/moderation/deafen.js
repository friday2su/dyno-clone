module.exports = {
    data: {
        name: 'deafen',
        description: 'Deafen a member in a voice channel',
        category: 'moderation',
        usage: '?deafen @user',
        permissions: ['MuteMembers']
    },
    async execute(message, args, client) {
        if (!message.member.permissions.has('MuteMembers')) {
            return message.reply('You do not have permission to deafen members!');
        }

        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a member to deafen!');
        }

        if (!member.voice.channel) {
            return message.reply('This member is not in a voice channel!');
        }

        try {
            await member.voice.setDeaf(true, `Deafened by ${message.author.tag}`);
            await message.reply(`Successfully deafened ${member.user.tag}`);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to deafen this member!');
        }
    }
};
