export class LoadBoatsAction {
    static readonly type = '[Boats] Load all boats';
}

export class AddBoatAction {
    static readonly type = '[Boats] Add boat';
    constructor(public name: string, public description: string) {}
}

export class DeleteBoatAction {
    static readonly type = '[Boats] Delete boat';
    constructor(public id: number) {}
}

export class ResetBoatErrorAction {
    static readonly type = '[Boats] Reset error';
}
