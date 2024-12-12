import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
     provideHttpClient(),
     provideAnimations(),
    provideRouter(routes)
  ],
}).catch((err) => console.error(err));

// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { importProvidersFrom } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';

// bootstrapApplication(AppComponent, {
//   providers: [
//     importProvidersFrom(HttpClientModule), // Import HttpClientModule here
//   ],
// }).catch(err => console.error(err));


