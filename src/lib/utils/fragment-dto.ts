export class FragmentDTO {
  public lines: string[];
  public isHidden: boolean;
  public isSignature: boolean;
  public isQuoted: boolean;

  constructor() {
    this.lines = [];
    this.isHidden = false;
    this.isSignature = false;
    this.isQuoted = false;
  }
}
