import { Component, OnInit } from '@angular/core';
/** librerias */
import { PersonaService } from 'src/app/services/persona.service';
import { PersonaI } from 'src/app/model/persona.interface';
import { ActivatedRoute } from '@angular/router';
import { NavController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  persona : PersonaI={
    nombre:'',
    apellido:''
  };
  personaId:null;

  constructor(private route: ActivatedRoute,private persoServ: PersonaService,
              private nav: NavController, private loadingCrtl: LoadingController) { }

  ngOnInit() {
    this.personaId=this.route.snapshot.params['id'];
     this.cargarPersona();
  }
  async cargarPersona(){
    const loading = await this.loadingCrtl.create({
      message:'Cargando....'
    });
    await loading.present()
    this.persoServ.getPersona(this.personaId).subscribe(resp=>{
      loading.dismiss();
      this.persona=resp;
      
    });
  }
}
