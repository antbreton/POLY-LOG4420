import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

/**
* Defines the component responsible to manage the confirmation page.
*/
@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent {
  nom : string = "";
  commandeId : string = "00000";
  constructor(private activatedRoute: ActivatedRoute) {
    this.nom = this.activatedRoute.snapshot.queryParams["nom"];

    this.commandeId = this.pad(this.activatedRoute.snapshot.queryParams["id"]);
  }

  pad(num : number) : string {
    var s = "0000000000" + num;
    return s.substr(s.length-5);
  }
}
