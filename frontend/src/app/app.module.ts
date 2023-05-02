import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { InterceptorsModule } from './interceptors/interceptors.module';
import { NgxsStateModule } from './state/state.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        InterceptorsModule,
        NgxsStateModule,
        HeaderComponent,
        FooterComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
