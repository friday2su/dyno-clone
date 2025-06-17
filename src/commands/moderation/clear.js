module.exports = {
    data: {
        name: 'clear',
        description: 'Delete multiple messages at once',
        category: 'moderation',
        usage: '?clear [amount] [@user]',
        aliases: ['purge', 'prune'],
        permissions: ['ManageMessages']
    },
    async execute(message, args, client) {
        // Check if the user has permission to manage messages
        if (!message.member.permissions.has('ManageMessages')) {
            return message.reply('You do not have permission to manage messages!');
        }

        // Check if the amount is provided
        const amount = parseInt(args[0]);
        if (!amount || isNaN(amount)) {
            return message.reply('Please provide a valid number of messages to delete!');
        }

        // Limit the amount to 100 messages (Discord API limitation)
        if (amount > 100) {
            return message.reply('You can only delete up to 100 messages at once!');
        }

        try {
            // Get messages to delete
            let messages;
            const targetUser = message.mentions.users.first();

            if (targetUser) {
                // If a user is mentioned, fetch their messages
                const fetchedMessages = await message.channel.messages.fetch({ limit: 100 });
                messages = fetchedMessages
                    .filter(msg => msg.author.id === targetUser.id)
                    .first(amount);
            } else {
                // Otherwise fetch the specified amount
                messages = await message.channel.messages.fetch({ limit: amount + 1 }); // +1 to include command message
            }

            // Delete messages
            await message.channel.bulkDelete(messages, true);
            
            // Send confirmation
            const confirmMessage = await message.channel.send(
                `Successfully deleted ${amount} message${amount > 1 ? 's' : ''}${targetUser ? ` from ${targetUser.tag}` : ''}.`
            );

            // Delete confirmation after 5 seconds
            setTimeout(() => confirmMessage.delete().catch(() => {}), 5000);

        } catch (error) {
            console.error(error);
            if (error.code === 50034) {
                message.reply('Cannot delete messages older than 14 days!');
            } else {
                message.reply('There was an error trying to delete messages!');
            }
        }
    }
};
