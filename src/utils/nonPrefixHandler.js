require('dotenv').config();

const allowedUsers = process.env.NON_PREFIX_USERS ? process.env.NON_PREFIX_USERS.split(',').map(id => id.trim()) : [];

function isAllowedUser(userId) {
    return allowedUsers.includes(userId);
}

/**
 * Parses message content for commands without prefix if author is allowed.
 * Returns command name and args if valid, else null.
 */
function parseNonPrefixCommand(message, prefix, client) {
    if (!isAllowedUser(message.author.id)) return null;

    // Check if message starts with any command name (without prefix)
    const content = message.content.trim();
    const commandNames = Array.from(client.commands.keys());

    for (const cmdName of commandNames) {
        if (content.toLowerCase().startsWith(cmdName.toLowerCase())) {
            const args = content.slice(cmdName.length).trim().split(/\s+/);
            return { commandName: cmdName, args };
        }
    }
    return null;
}

module.exports = {
    isAllowedUser,
    parseNonPrefixCommand
};
