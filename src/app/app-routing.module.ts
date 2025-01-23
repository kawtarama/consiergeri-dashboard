import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from 'src/app/demo/components/auth/auth-service/auth-guard'
// @NgModule({
//     imports: [
//         RouterModule.forRoot([
//             { path: '', redirectTo: 'auth', pathMatch: 'full' },
//             {
//                 path: '', component: AppLayoutComponent,
//                 children: [
//                     { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
//                     { path: 'pages',canActivate: [AuthGuard], loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
//                 ]
//             },
//             { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
//             { path: 'notfound', component: NotfoundComponent },
//             { path: '**', redirectTo: '/notfound' },
//         ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
//     ],
//     exports: [RouterModule]
// })
// export class AppRoutingModule {
// }
@NgModule({
    imports: [
      RouterModule.forRoot([
        { path: '', redirectTo: 'auth', pathMatch: 'full' },
        {
          path: '', component: AppLayoutComponent,
          children: [
            { path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'pages', canActivate: [AuthGuard], loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
          ]
        },
        { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
        { path: 'notfound', component: NotfoundComponent },
        { path: '**', redirectTo: '/notfound' },
      ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }