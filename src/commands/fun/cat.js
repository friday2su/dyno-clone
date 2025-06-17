const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: {
        name: 'cat',
        description: 'Get a random cat image',
        category: 'fun',
        usage: '?cat'
    },
    async execute(message, args, client) {
        try {
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            const data = await response.json();
            if (!data.length) {
                return message.reply('Could not fetch a cat image at the moment.');
            }
            await message.reply(data[0].url);
        } catch (error) {
            console.error(error);
            message.reply('Error fetching cat image.');
        }
    }
};
