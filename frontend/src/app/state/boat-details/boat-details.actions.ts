export class LoadBoatDetailsAction {
    static readonly type = '[BoatDetails] Load boat details';
    constructor(public id: string | null) {}
}

export class EditBoatDetailsAction {
    static readonly type = '[BoatDetails] Edit boat details';
    constructor(
        public id: number,
        public name: string,
        public description: string
    ) {}
}
