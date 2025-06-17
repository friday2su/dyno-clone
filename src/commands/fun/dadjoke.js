const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: {
        name: 'dadjoke',
        description: 'Get a random dad joke',
        category: 'fun',
        usage: '?dadjoke'
    },
    async execute(message, args, client) {
        try {
            const response = await fetch('https://icanhazdadjoke.com/', {
                headers: { Accept: 'application/json' }
            });
            const data = await response.json();
            if (!data.joke) {
                return message.reply('Could not fetch a dad joke at the moment.');
            }
            await message.reply(data.joke);
        } catch (error) {
            console.error(error);
            message.reply('Error fetching dad joke.');
        }
    }
};
