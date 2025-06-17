module.exports = {
    data: {
        name: 'flip',
        description: 'Flip a coin',
        category: 'fun',
        usage: '?flip'
    },
    async execute(message, args, client) {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        await message.reply(`🪙 The coin landed on: ${result}`);
    }
};
