module.exports = {
    data: {
        name: 'rps',
        description: 'Play rock-paper-scissors with the bot',
        category: 'fun',
        usage: '?rps <rock|paper|scissors>'
    },
    async execute(message, args, client) {
        const choices = ['rock', 'paper', 'scissors'];
        const userChoice = args[0]?.toLowerCase();

        if (!choices.includes(userChoice)) {
            return message.reply('Please choose rock, paper, or scissors.');
        }

        const botChoice = choices[Math.floor(Math.random() * choices.length)];

        let result;
        if (userChoice === botChoice) {
            result = "It's a tie!";
        } else if (
            (userChoice === 'rock' && botChoice === 'scissors') ||
            (userChoice === 'paper' && botChoice === 'rock') ||
            (userChoice === 'scissors' && botChoice === 'paper')
        ) {
            result = 'You win!';
        } else {
            result = 'You lose!';
        }

        await message.reply(`You chose **${userChoice}**. I chose **${botChoice}**. ${result}`);
    }
};
