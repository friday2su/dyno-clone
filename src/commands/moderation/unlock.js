module.exports = {
    data: {
        name: 'unlock',
        description: 'Unlock a text channel to allow sending messages',
        category: 'moderation',
        usage: '?unlock [#channel]',
        permissions: ['ManageChannels']
    },
    async execute(message, args, client) {
        if (!message.member.permissions.has('ManageChannels')) {
            return message.reply('You do not have permission to unlock channels!');
        }

        const channel = message.mentions.channels.first() || message.channel;

        try {
            await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                SendMessages: true
            });
            await message.reply(`🔓 Unlocked ${channel} successfully.`);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to unlock the channel!');
        }
    }
};
