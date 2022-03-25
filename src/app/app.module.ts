import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoAPComponent } from './components/logo-ap/logo-ap.component';
import { SocialmediaComponent } from './components/socialmedia/socialmedia.component';
import { BannerComponent } from './components/banner/banner.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { FormationComponent } from './components/formation/formation.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { FooterComponent } from './components/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoAPComponent,
    SocialmediaComponent,
    BannerComponent,
    AboutComponent,
    ExperienceComponent,
    FormationComponent,
    SkillsComponent,
    ProjectsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    NgCircleProgressModule.forRoot({
      "backgroundGradient": true,
      "backgroundColor": "#ffffff",
      "backgroundGradientStopColor": "#c0c0c0",
      "backgroundPadding": -10,
      "radius": 60,
      "maxPercent": 100,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#61A9DC",
      "innerStrokeWidth": 0,
      "subtitleColor": "#444444",
      "animationDuration": 800,
      "showInnerStroke": false,
      "startFromZero": false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
