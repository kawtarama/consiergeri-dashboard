import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../demo/service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    profileMenuItems: MenuItem[];

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,private authService: AuthService, private router: Router) { 
        this.profileMenuItems = [
            {
                label: 'Profile',
                icon: 'pi pi-user',
                command: () => {
                    this.router.navigate(['/profile']); // Navigate to profile page
                },
            },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => {
                    this.logout();
                },
            },
        ];
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/auth']); // Redirect to login page
    }
    }

