import EasyEmbed from "../lib";

const embedGenerator = new EasyEmbed();

console.log(embedGenerator.create('success', 'testing..'));
console.log(embedGenerator.create('success', {
    title: 'testing..',
    description: 'testing..',
    color: '#34eb6b',
    author: {
        name: 'test',
        iconURL: 'https://cdn.discordapp.com/avatars/724098180989879062/c8f9f8f8f9f8f9f9f9f9f9f9f9f9f9f9.png?size=128'
    },
    fields: [
        {
            name: 'test',
            value: 'test'
        }
    ],
    footer: {
        text: 'test'
    },
    timestamp: new Date()
}));
console.log(embedGenerator.create('success', 'testing..', {
    ephemeral: true
}))