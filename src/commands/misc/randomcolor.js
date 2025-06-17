const { MessageEmbed } = require('discord.js');

function getRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

module.exports = {
    data: {
        name: 'randomcolor',
        description: 'Generate a random color',
        category: 'misc',
        usage: '?randomcolor'
    },
    async execute(message, args, client) {
        const color = getRandomColor();
        const embed = new MessageEmbed()
            .setTitle('Random Color')
            .setDescription(`Here is a random color: ${color}`)
            .setColor(color);

        await message.reply({ embeds: [embed] });
    }
};
