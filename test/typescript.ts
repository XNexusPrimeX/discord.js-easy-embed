import EasyEmbed from "../lib";

const createEmbed = new EasyEmbed({
    separator: '-',
    types: [
        {
            name: "erro",
            color: "#ff1745",
            emoji: "❌",
            footer: {
                text: "errozin"
            }
        }
    ]
}).create;

const a = createEmbed('erro', 'Hello World');
console.log(a)