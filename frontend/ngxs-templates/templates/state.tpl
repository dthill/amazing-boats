import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { {{pascalCase name}}Action } from './{{dashCase name}}.actions';
import { {{pascalCase name}}StateModel } from './{{dashCase name}}.state-model';

const defaults: {{pascalCase name}}StateModel = {};

@State<{{pascalCase name}}StateModel>({
    name: '{{camelCase name}}',
    defaults
})
@Injectable()
export class {{pascalCase name}}State {
    constructor(){}

    @Action({{pascalCase name}}Action)
    add(ctx: StateContext<{{pascalCase name}}StateModel>, { payload }: {{pascalCase name}}Action) {}
}
