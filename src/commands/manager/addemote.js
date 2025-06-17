module.exports = {
    data: {
        name: 'addemote',
        description: 'Add a custom emote to the server',
        category: 'manager',
        usage: '?addemote <name> <image_url>',
        permissions: ['ManageEmojisAndStickers']
    },
    async execute(message, args, client) {
        if (!message.member.permissions.has('ManageEmojisAndStickers')) {
            return message.reply('You do not have permission to add emotes!');
        }

        const name = args[0];
        const imageUrl = args[1];

        if (!name || !imageUrl) {
            return message.reply('Usage: ?addemote <name> <image_url>');
        }

        try {
            const emoji = await message.guild.emojis.create({ attachment: imageUrl, name: name });
            await message.reply(`Emote added: <:${emoji.name}:${emoji.id}>`);
        } catch (error) {
            console.error(error);
            message.reply('Failed to add emote. Make sure the URL is valid and the bot has permissions.');
        }
    }
};
