import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { STATE_MODULES } from './index';
import { DEVTOOLS_REDUX_CONFIG, OPTIONS_CONFIG } from './state.config';
@NgModule({
    exports: [NgxsModule],
    imports: [
        CommonModule,
        NgxsModule.forRoot(STATE_MODULES, OPTIONS_CONFIG),
        NgxsReduxDevtoolsPluginModule.forRoot(DEVTOOLS_REDUX_CONFIG),
    ],
})
export class NgxsStateModule {}
