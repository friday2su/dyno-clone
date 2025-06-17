const { MessageEmbed } = require('discord.js');

module.exports = {
    data: {
        name: 'color',
        description: 'Get information about a color by hex code',
        category: 'misc',
        usage: '?color <hexcode>'
    },
    async execute(message, args, client) {
        if (!args[0]) {
            return message.reply('Please provide a hex color code (e.g., #ff0000)');
        }

        const hex = args[0].replace('#', '');
        if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
            return message.reply('Invalid hex color code!');
        }

        const embed = new MessageEmbed()
            .setTitle(`Color: #${hex.toUpperCase()}`)
            .setColor(`#${hex}`)
            .setDescription(`Hex: #${hex.toUpperCase()}`);

        await message.reply({ embeds: [embed] });
    }
};
