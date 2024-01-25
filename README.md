# Email Reply Parser

**Email Reply Parser is a deno port of [Email reply parser node](https://github.com/crisp-oss/email-reply-parser) library to parse plain-text email replies and extract content**

This library supports most email replies, signatures and locales.

## Features

This library is used at [Crisp](https://crisp.chat/) everyday with around 1 million inbound emails. Over the years, we improved this library so it can work with most emails.

- Strip email replies like `On DATE, NAME <EMAIL> wrote:`
- Supports around **10 locales**, including English, French, Spanish, Portuguese, Italian, Japanese, Chinese.
- Removes signatures like `Sent from my iPhone`
- Removes signatures like `Best wishes`

## Usage

```typescript
var email = new EmailReplyParser().read(MY_EMAIL_STRING);

console.log(email.getVisibleText());
```

## Credits

- [@baptistejamin](https://github.com/baptistejamin)

## License

email-reply-parser is released under the MIT License. See the bundled LICENSE file for details.
