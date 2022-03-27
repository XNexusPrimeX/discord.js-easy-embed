import EasyEmbed from "../lib";

const embedGenerator = new EasyEmbed({
    separator: '|',
    types: [
        {
            color: '#00ff00',
            name: 'a',
            emoji: '😳'
        }
    ]
});

console.log(embedGenerator.create('a', 'testing..'));