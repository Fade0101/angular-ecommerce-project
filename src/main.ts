import { bootstrapApplication } from '@angular/platform-browser';
// 1. Change 'App' to 'AppComponent' here:
import { AppComponent } from './app/app'; 
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

// 2. Change 'App' to 'AppComponent' here:
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient() // Ensures your json-server fake API works globally
  ]
}).catch((err) => console.error(err));