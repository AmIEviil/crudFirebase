import { Component } from '@angular/core';
/** Librerias */
import { PersonaService } from '../services/persona.service';
import { PersonaI } from '../model/persona.interface';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  personas : PersonaI[];
  constructor(private personaServ:PersonaService) {}

  ngOnInit():void{
    this.personaServ.getPersonas().subscribe(resp=>{
      this.personas=resp;
    });
  }
}
