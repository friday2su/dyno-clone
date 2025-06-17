module.exports = {
    data: {
        name: 'undeafen',
        description: 'Undeafen a member in a voice channel',
        category: 'moderation',
        usage: '?undeafen @user',
        permissions: ['MuteMembers']
    },
    async execute(message, args, client) {
        if (!message.member.permissions.has('MuteMembers')) {
            return message.reply('You do not have permission to undeafen members!');
        }

        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a member to undeafen!');
        }

        if (!member.voice.channel) {
            return message.reply('This member is not in a voice channel!');
        }

        try {
            await member.voice.setDeaf(false, `Undeafened by ${message.author.tag}`);
            await message.reply(`Successfully undeafened ${member.user.tag}`);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to undeafen this member!');
        }
    }
};
