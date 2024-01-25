import { Fragment } from './fragment.ts';

export class Email {
  constructor(public fragments: Fragment[] = []) {}

  getFragments() {
    return this.fragments;
  }

  getVisibleText() {
    return this.filterText((fragment) => {
      return !fragment.isHidden;
    });
  }

  getQuotedText() {
    return this.filterText((fragment) => {
      return fragment.isQuoted;
    });
  }

  filterText(filter: (f: Fragment) => boolean) {
    const filteredFragments = this.fragments.filter(filter);

    return filteredFragments.join('\n').replace(/~*$/, '');
  }
}
