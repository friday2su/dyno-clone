module.exports = {
    data: {
        name: 'unmute',
        description: 'Unmute a member in voice and text channels',
        category: 'moderation',
        usage: '?unmute @user',
        permissions: ['MuteMembers']
    },
    async execute(message, args, client) {
        if (!message.member.permissions.has('MuteMembers')) {
            return message.reply('You do not have permission to unmute members!');
        }

        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a member to unmute!');
        }

        try {
            // Unmute in voice channel if connected
            if (member.voice.channel) {
                await member.voice.setMute(false, `Unmuted by ${message.author.tag}`);
            }

            // Remove muted role if exists
            const mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
            if (mutedRole && member.roles.cache.has(mutedRole.id)) {
                await member.roles.remove(mutedRole, `Unmuted by ${message.author.tag}`);
            }

            await message.reply(`Successfully unmuted ${member.user.tag}`);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to unmute this member!');
        }
    }
};
