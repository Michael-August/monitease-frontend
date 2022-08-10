import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-private-component',
    template: `
    <div class="d-flex">
        <app-side-nav></app-side-nav>
        <div class="body">
            <app-top-nav></app-top-nav>
            <div class="content">
                <router-outlet></router-outlet>
            </div>
        </div>
    </div>
  `,
  styles: [
    `.body {
        width: calc(100% - 300px);
        margin-left: 300px;
        position: relative;
    }

    .content {
        margin: 30px 30px;
        margin-top: 100px;
    }

    @media (max-width: 820px) {
        .body {
            width: 100%;
            margin-left: 0px;
            display: inline-block;
        }
    }

    @media (max-width: 393px) {
        .content {
            margin: 100px 15px;
        }
    }
    `
  ]
})
export class MonitEaseComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
