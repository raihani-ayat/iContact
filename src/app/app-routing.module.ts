import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  
  {
    path: 'index',
    loadChildren: () => import('./index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'sign-up-email',
    loadChildren: () => import('./sign-up-email/sign-up-email.module').then( m => m.SignUpEmailPageModule)
  },
  {
    path: 'sign-up-confirm',
    loadChildren: () => import('./sign-up-confirm/sign-up-confirm.module').then( m => m.SignUpConfirmPageModule)
  },
  {
    path: 'login-email',
    loadChildren: () => import('./login-email/login-email.module').then( m => m.LoginEmailPageModule)
  },
  {
    path: 'add-contact',
    loadChildren: () => import('./add-contact/add-contact.module').then( m => m.AddContactPageModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then( m => m.ContactsPageModule)
  }
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
