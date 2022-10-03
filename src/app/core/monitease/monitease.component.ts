import { Component, OnInit } from '@angular/core';
declare let $: any

@Component({
    selector: 'app-private-component',
    template: `
    <div class="d-flex">
        <app-side-nav [sideBarState] = "sideBarState"></app-side-nav>
        <div [ngClass]="{'body': sideBarState == false, 'toggledBody': sideBarState == true}" id="body">
            <app-top-nav (toggleBoolean)="toggleSideBar($event)"></app-top-nav>
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

    .toggledBody {
        width: 100%; 
        /* margin-left: 300px;
        position: relative; */
    }

    @media (max-width: 820px) {
        .body {
            width: 100%;
            margin-left: 0px;
            display: inline-block;
        }

        .mediaBody {
            width: 100%;
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

    sideBarState = false

    ngOnInit(): void {
        
    }

    toggleSideBar(event: any) {
        // console.log(event);
        // if(event == true) {
        //     $('#bar').click( () => {
        //         $('#side-bar').addClass("slideout")
        //         $(this).css("width", "100%")
        //     })
        // } 
        // if(event == false) {
        //     $('#bar').click(function () {
        //         $('#side-bar').addClass("slidein")
                
        //     })
        // }
        this.sideBarState = event
        console.log(event);
    }
}
