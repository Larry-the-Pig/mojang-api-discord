module.exports = {
    name: "history",

    execute(args, msg, Discord, api, color) {
        if (!args || args[0].length <= 0) {
            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("Please enter a username or UUID");
            msg.channel.send({ embeds: [embed] });

            return
        }

        if (args[0].length != 32) {
            api.nameToUuid(args[0])
            .then(res => {
                getHistory(res[0].id)
            })
            .catch(err => {
                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle('User does not exist');
                msg.channel.send({ embeds: [embed] });

                return
            })
        } else {
            getHistory(args[0])
        }

        function getHistory(uuid) {
            api.nameHistory(uuid)
                .then((res) => {
                    const embed = new Discord.MessageEmbed()
                        .setColor(color)
                        .setTitle(`${res[res.length - 1].name}'s Name History`)
                        .setThumbnail(`https://crafatar.com/avatars/${uuid}?overlay&size=128&rand=${Math.random()}`)

                    for (let i = res.length - 1; i >= 0; i--) {
                        if(i != 0) {
                            const date = new Date(res[i].changedToAt);
                            embed.addField(res[i].name, date.toLocaleString(), false)
                        } else {
                            embed.addField(res[i].name, "First", false)
                        }
                    }

                    msg.channel.send({ embeds: [embed] })
                })
        }
    }
}