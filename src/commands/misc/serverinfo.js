const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'serverinfo',
        description: 'Get information about the server',
        category: 'misc',
        usage: '?serverinfo'
    },
    async execute(message, args, client) {
        const { guild } = message;
        const embed = new EmbedBuilder()
            .setTitle(`${guild.name} - Server Info`)
            .setThumbnail(guild.iconURL())
            .addFields(
                { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Region', value: guild.preferredLocale, inline: true },
                { name: 'Members', value: `${guild.memberCount}`, inline: true },
                { name: 'Created On', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: true },
                { name: 'Roles', value: `${guild.roles.cache.size}`, inline: true },
                { name: 'Channels', value: `${guild.channels.cache.size}`, inline: true }
            )
            .setColor('#00AAFF');

        await message.reply({ embeds: [embed] });
    }
};
