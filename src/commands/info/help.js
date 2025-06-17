const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'help',
        description: 'List all commands or info about a specific command',
        category: 'misc',
        usage: '?help [command]'
    },
    async execute(message, args, client) {
        const { commands } = client;
        const prefix = process.env.PREFIX || '?';

        if (!args.length) {
            // List all commands by category
            const categories = {};
            commands.forEach(cmd => {
                if (!categories[cmd.data.category]) {
                    categories[cmd.data.category] = [];
                }
                categories[cmd.data.category].push(cmd.data.name);
            });

            const embed = new EmbedBuilder()
                .setTitle('Help - List of Commands')
                .setColor('#0096FF');

            for (const category in categories) {
                embed.addFields({ name: category.charAt(0).toUpperCase() + category.slice(1), value: categories[category].join(', '), inline: false });
            }

            return message.channel.send({ embeds: [embed] });
        }

        // Info about a specific command
        const name = args[0].toLowerCase();

        // Try to get command by name or alias (case-insensitive)
        let command = commands.get(name);
        if (!command) {
            command = commands.find(cmd => cmd.data.name.toLowerCase() === name);
        }

        if (!command) {
            return message.reply('That\'s not a valid command!');
        }

        const embed = new EmbedBuilder()
            .setTitle(`Help - ${command.data.name}`)
            .addFields(
                { name: 'Description', value: command.data.description || 'No description available.' },
                { name: 'Usage', value: command.data.usage || 'No usage info available.' }
            )
            .setColor('#0096FF');

        message.channel.send({ embeds: [embed] });
    }
};
