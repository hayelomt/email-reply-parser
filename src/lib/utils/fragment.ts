export class Fragment {
  public content: string;
  public isHidden: boolean;
  public isSignature: boolean;
  public isQuoted: boolean;

  constructor(
    content: string,
    isHidden: boolean,
    isSignature: boolean,
    isQuoted: boolean
  ) {
    this.content = content;
    this.isHidden = isHidden;
    this.isSignature = isSignature;
    this.isQuoted = isQuoted;
  }

  public getIsHidden(): boolean {
    return this.isHidden;
  }

  public getIsSignature(): boolean {
    return this.isSignature;
  }

  public getIsQuoted(): boolean {
    return this.isQuoted;
  }

  public getContent(): string {
    return this.content;
  }

  public isEmpty(): boolean {
    return '' === this.getContent().replace(/\n/g, '');
  }

  public toString(): string {
    return this.getContent();
  }
}
