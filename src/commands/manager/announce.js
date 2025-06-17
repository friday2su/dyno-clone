const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'announce',
        description: 'Make an announcement in a specified channel',
        category: 'manager',
        usage: '?announce #channel <message>',
        permissions: ['ManageMessages']
    },
    async execute(message, args, client) {
        if (!message.member.permissions.has('ManageMessages')) {
            return message.reply('You do not have permission to make announcements!');
        }

        const channel = message.mentions.channels.first();
        if (!channel) {
            return message.reply('Please mention a channel to send the announcement.');
        }

        const announcement = args.slice(1).join(' ');
        if (!announcement) {
            return message.reply('Please provide a message for the announcement.');
        }

        try {
            const embed = new EmbedBuilder()
                .setTitle('Announcement')
                .setDescription(announcement)
                .setColor('#FF0000')
                .setTimestamp();

            await channel.send({ embeds: [embed] });
            await message.reply(`Announcement sent to ${channel}`);
        } catch (error) {
            console.error(error);
            message.reply('Failed to send announcement.');
        }
    }
};
