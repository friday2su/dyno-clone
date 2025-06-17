module.exports = {
    data: {
        name: 'roll',
        description: 'Roll a dice with specified sides',
        category: 'misc',
        usage: '?roll [sides]'
    },
    async execute(message, args, client) {
        const sides = parseInt(args[0]) || 6;
        if (sides <= 1) {
            return message.reply('Please provide a number greater than 1 for sides.');
        }
        const result = Math.floor(Math.random() * sides) + 1;
        await message.reply(`🎲 You rolled a ${result} (1-${sides})`);
    }
};
