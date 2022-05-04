import EasyEmbed from "../lib";

const createEmbed = new EasyEmbed({
    separator: '-',
    types: [
        {
            name: "erro",
            color: "#ff1745",
            footer: { text: 'gay lussac' },
            emoji: '✅'
        }
    ]
}).create;

const a = createEmbed('erro', {
    // title: 'adsa',
    description: 'teste'
});
console.log(a.embeds)