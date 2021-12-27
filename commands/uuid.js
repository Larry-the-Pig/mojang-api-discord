module.exports = {
    name: 'uuid',
    
    execute(args, msg, Discord, api, color) {
        if (!args || args[0].length <= 0) {
            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("Please enter a username");
            msg.channel.send({ embeds: [embed] });

            return
        }
        api.nameToUuid(args[0])
        .then(res => {
            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle(res[0].name)
                .setDescription(`UUID: ${res[0].id}`)
                .setThumbnail(`https://crafatar.com/avatars/${res[0].id}?overlay&size=128&rand=${Math.random()}`)

            msg.channel.send({ embeds: [embed] });

            return
        })
        .catch(err => {
            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle('User does not exist');
            msg.channel.send({ embeds: [embed] });

            return
        })
    }
}