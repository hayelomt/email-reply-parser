import { EmailParser } from './email-parser.ts';

export default class EmailReplyParser {
  read(text: string) {
    return new EmailParser().parse(text);
  }

  parseReply(text: string) {
    return this.read(text).getVisibleText();
  }

  parseReplied(text: string) {
    return this.read(text).getQuotedText();
  }
}
