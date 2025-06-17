module.exports = {
    data: {
        name: 'lock',
        description: 'Lock a text channel to prevent sending messages',
        category: 'moderation',
        usage: '?lock [#channel]',
        permissions: ['ManageChannels']
    },
    async execute(message, args, client) {
        if (!message.member.permissions.has('ManageChannels')) {
            return message.reply('You do not have permission to lock channels!');
        }

        const channel = message.mentions.channels.first() || message.channel;

        try {
            await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                SendMessages: false
            });
            await message.reply(`🔒 Locked ${channel} successfully.`);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to lock the channel!');
        }
    }
};
