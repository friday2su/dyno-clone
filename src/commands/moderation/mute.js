module.exports = {
    data: {
        name: 'mute',
        description: 'Mute a member in voice and text channels',
        category: 'moderation',
        usage: '?mute @user [reason]',
        permissions: ['MuteMembers']
    },
    async execute(message, args, client) {
        if (!message.member.permissions.has('MuteMembers')) {
            return message.reply('You do not have permission to mute members!');
        }

        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a member to mute!');
        }

        try {
            // Mute in voice channel if connected
            if (member.voice.channel) {
                await member.voice.setMute(true, `Muted by ${message.author.tag}`);
            }

            // Add a muted role or create one if it doesn't exist
            let mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
            if (!mutedRole) {
                mutedRole = await message.guild.roles.create({
                    name: 'Muted',
                    color: '#555555',
                    permissions: []
                });

                // Deny send messages permission in all channels for muted role
                for (const [channelId, channel] of message.guild.channels.cache) {
                    await channel.permissionOverwrites.edit(mutedRole, {
                        SendMessages: false,
                        Speak: false,
                        AddReactions: false
                    });
                }
            }

            // Add muted role to member
            await member.roles.add(mutedRole, `Muted by ${message.author.tag}`);

            await message.reply(`Successfully muted ${member.user.tag}`);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to mute this member!');
        }
    }
};
