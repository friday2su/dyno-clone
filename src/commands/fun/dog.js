const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: {
        name: 'dog',
        description: 'Get a random dog image',
        category: 'fun',
        usage: '?dog'
    },
    async execute(message, args, client) {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            if (data.status !== 'success') {
                return message.reply('Could not fetch a dog image at the moment.');
            }
            await message.reply(data.message);
        } catch (error) {
            console.error(error);
            message.reply('Error fetching dog image.');
        }
    }
};
