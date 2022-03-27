## About
The easy-embed is a package to make Discord.js Embeds most easier to use

---
## How to use

### TypeScript:
```ts
import EasyEmbed from "discord.js-easy-embed";
const embedGenerator = new EasyEmbed();

console.log(embedGenerator.create('success', 'testing..'));

/* returns:
{
  embeds: [
    MessageEmbed {
      type: 'rich',
      title: '✅ | testing..',
      description: null,
      color: GREEN,
      ...
    }
  ],
  ephemeral: true
}
*/
```

### JavaScript:
```js
const EasyEmbed = require('discord.js-easy-embed').EasyEmbed;
const embedGenerator = new EasyEmbed();

console.log(embedGenerator.create('wait', 'testing..'));

/* returns:
{
  embeds: [
    MessageEmbed {
      type: 'rich',
      title: '⌚ | testing..',
      description: null,
      color: PURPLE,
      ...
    }
  ],
  ephemeral: true
}
*/
```
---
## Adding your config
```ts
const embedGenerator = new EasyEmbed({
  // If enabled, all messages are ephemeral by default
  ephemeral: true,
  // The character that stay between emoji and title
  separator: ' - ',
  // Types of embeds
  types: [
    {
      // Color of embed line
      color: '#F5F5F5'
      // Name is only used if the text of embed is most big than 40 characters
      name: 'Accepted',

      emoji: '✅',
    }
  ]
});

embedGenerator.create('Accepted', 'heheeeh', {
  // The create function returns a MessageOptions for use in this way:
  // message.reply(embedGenerator.create())
  // but if this options is true, the function return a MessageEmbed
  isEmbed: false,
  
  // If this option is undefined, the ephemeral of constructor is used
  isEphemeral: false
})
```