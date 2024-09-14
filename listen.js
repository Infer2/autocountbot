const {
	Client: e,
	GatewayIntentBits: n
} = require("discord.js"), client = new e({
	intents: [n.Guilds, n.GuildMessages, n.MessageContent]
});
client.once("ready", () => {
	console.log(`Logged in as ${client.user.tag}`)
}), client.on("messageCreate", e => {
	"1284074257122463744" === e.channel.id && "1281993915267813446" === e.author.id && e.content.toLowerCase().includes("time") && e.channel.send("<@642737186101264404> <@283528125831446529> <@762574927487303691> Server is gonna sleep in 5 mins, GO ADD MORE!")
}), client.login(process.env.token);
