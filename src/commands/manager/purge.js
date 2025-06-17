module.exports = {
    data: {
        name: 'purge',
        description: 'Delete a number of messages from a channel',
        category: 'manager',
        usage: '?purge <number>',
        permissions: ['ManageMessages']
    },
    async execute(message, args, client) {
        if (!message.member.permissions.has('ManageMessages')) {
            return message.reply('You do not have permission to purge messages!');
        }

        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount < 1 || amount > 100) {
            return message.reply('Please provide a number between 1 and 100.');
        }

        try {
            await message.channel.bulkDelete(amount, true);
            await message.reply(`Deleted ${amount} messages.`).then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        } catch (error) {
            console.error(error);
            message.reply('Failed to delete messages.');
        }
    }
};
