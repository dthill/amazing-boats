import { Selector } from '@ngxs/store';
import { {{pascalCase name}}State } from './{{dashCase name}}.state';
import { {{pascalCase name}}StateModel } from './{{dashCase name}}.state-model';


export class {{pascalCase name}}Selectors {
    @Selector([{{pascalCase name}}State])
    static {{camelCase name}}(state: {{pascalCase name}}StateModel): {{pascalCase name}}StateModel {
        return state;
    }
}