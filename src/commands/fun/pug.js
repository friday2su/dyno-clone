const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: {
        name: 'pug',
        description: 'Get a random pug image',
        category: 'fun',
        usage: '?pug'
    },
    async execute(message, args, client) {
        try {
            const response = await fetch('https://dog.ceo/api/breed/pug/images/random');
            const data = await response.json();
            if (data.status !== 'success') {
                return message.reply('Could not fetch a pug image at the moment.');
            }
            await message.reply(data.message);
        } catch (error) {
            console.error(error);
            message.reply('Error fetching pug image.');
        }
    }
};
