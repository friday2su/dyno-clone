module.exports = {
    data: {
        name: 'lockdown',
        description: 'Lock all text channels in the server',
        category: 'moderation',
        usage: '?lockdown',
        permissions: ['ManageChannels']
    },
    async execute(message, args, client) {
        if (!message.member.permissions.has('ManageChannels')) {
            return message.reply('You do not have permission to lockdown channels!');
        }

        try {
            const channels = message.guild.channels.cache.filter(ch => ch.isTextBased());

            for (const [channelId, channel] of channels) {
                await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                    SendMessages: false
                });
            }

            await message.reply('🔒 Server lockdown activated: All text channels are locked.');
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to lockdown the server!');
        }
    }
};
