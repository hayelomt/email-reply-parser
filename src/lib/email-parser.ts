import { Email } from './utils/email.ts';
import { FragmentDTO } from './utils/fragment-dto.ts';
import { Fragment } from './utils/fragment.ts';
import {
  quoteHeadersRegex,
  quoteRegex,
  signatureRegex,
} from './utils/regex.ts';

export class EmailParser {
  public fragments: FragmentDTO[];
  constructor() {
    this.fragments = [];
  }

  stringReverse(text: string) {
    let s = '';
    let i = text.length;
    while (i > 0) {
      s += text.substring(i - 1, i);
      i--;
    }
    return s;
  }

  stringRTrim(text: string, mask: string) {
    for (let i = text.length - 1; i >= 0; i--) {
      if (mask != text.charAt(i)) {
        text = text.substring(0, i + 1);
        break;
      }
    }
    return text;
  }

  stringLTrim(text: string) {
    return text.replace(/^\s+/, '');
  }

  parse(text: string) {
    text = text.replace(/\r\n/g, '\n');
    text = this.fixBrokenSignatures(text);

    let fragment: FragmentDTO | null = null;

    this.stringReverse(text)
      .split('\n')
      .forEach((line) => {
        line = this.stringRTrim(line, '\n');

        if (!this.isSignature(line)) {
          line = this.stringLTrim(line);
        }
        if (fragment) {
          const last = fragment.lines[fragment.lines.length - 1];
          if (this.isSignature(last)) {
            fragment.isSignature = true;
            this.addFragment(fragment);
            fragment = null;
          } else if (line === '' && this.isQuoteHeader(last)) {
            fragment.isQuoted = true;
            this.addFragment(fragment);
            fragment = null;
          }
        }

        const isQuoted = this.isQuote(line);

        if (
          fragment === null ||
          !this.isFragmentLine(fragment, line, isQuoted)
        ) {
          if (fragment !== null) {
            this.addFragment(fragment);
          }

          fragment = new FragmentDTO();
          fragment.isQuoted = isQuoted;
        }

        fragment.lines.push(line);
      });

    if (fragment !== null) {
      this.addFragment(fragment);
    }

    const email = this.createEmail(this.fragments);

    this.fragments = [];

    return email;
  }

  fixBrokenSignatures(text: string) {
    let newText = text;

    // For any other quote header lines, if we find one of them,
    //  remove any new lines that happen to match in the first capture group
    quoteHeadersRegex.forEach((regex) => {
      const matches = newText.match(regex);
      if (matches) {
        const [_, matchGroup] = matches;
        newText = newText.replace(matchGroup, matchGroup.replace(/\n/g, ' '));
      }
    });

    return newText;
  }

  getQuoteHeadersRegex() {
    return quoteHeadersRegex;
  }

  // setQuoteHeadersRegex(quoteHeadersRegex: RegExp) {
  //   quoteHeadersRegex = quoteHeadersRegex;

  //   return this;
  // }

  createEmail(fragmentDTOs: FragmentDTO[]) {
    const fragmentList: Fragment[] = [];

    fragmentDTOs.reverse().forEach((fragment) => {
      fragmentList.push(
        new Fragment(
          this.stringReverse(fragment.lines.join('\n')).replace(/^\n/g, ''),
          fragment.isHidden,
          fragment.isSignature,
          fragment.isQuoted
        )
      );
    });

    return new Email(fragmentList);
  }

  isQuoteHeader(line: string) {
    let hasHeader = false;

    quoteHeadersRegex.forEach((regex) => {
      if (regex.test(this.stringReverse(line))) {
        hasHeader = true;
      }
    });

    return hasHeader;
  }

  isSignature(line: string) {
    const text = this.stringReverse(line);

    return signatureRegex.some((regex) => {
      return regex.test(text);
    });
  }

  isQuote(line: string) {
    return quoteRegex.test(line);
  }

  isEmpty(fragment: FragmentDTO) {
    return '' === fragment.lines.join('');
  }

  isFragmentLine(fragment: FragmentDTO, line: string, isQuoted: boolean) {
    return (
      fragment.isQuoted === isQuoted ||
      (fragment.isQuoted && (this.isQuoteHeader(line) || line === ''))
    );
  }

  addFragment(fragment: FragmentDTO) {
    if (fragment.isQuoted || fragment.isSignature || this.isEmpty(fragment)) {
      fragment.isHidden = true;
    }

    this.fragments.push(fragment);
  }
}
