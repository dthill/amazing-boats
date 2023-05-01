export class LoadBoatsAction {
  static readonly type = '[Boats] Load all boats';
  constructor() {}
}

export class AddBoatAction {
  static readonly type = '[Boats] Add boat';
  constructor(public name: string, public description: string) {}
}

export class DeleteBoatAction {
  static readonly type = '[Boats] Delete boat';
  constructor(public id: number) {}
}

export class EditBoatAction {
  static readonly type = '[Boats] Edit boat';
  constructor(
    public id: number,
    public name: string,
    public description: string
  ) {}
}

export class ResetBoatErrorAction {
  static readonly type = '[Boats] Reset error';
  constructor() {}
}
