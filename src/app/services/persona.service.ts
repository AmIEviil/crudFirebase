import { Injectable } from '@angular/core';
/*  Librerias */
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreModule } 
        from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { PersonaI } from '../model/persona.interface';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private personaCollection: AngularFirestoreCollection<PersonaI>;
  private personas : Observable<PersonaI[]>

  constructor( db : AngularFirestore) { 
    this.personaCollection=db.collection<PersonaI>('persona');
    this.personas=this.personaCollection.snapshotChanges().pipe(
      map(
        actions => {
          return actions.map(a=>{
            const id=a.payload.doc.id;
            const dato=a.payload.doc.data();
            return {id, ...dato}
          })
        }));
  }
  //metodos crud
  getPersonas(){
  return this.personas; 
  }
  getPersona(id:string){
    return this.personaCollection.doc<PersonaI>(id).valueChanges();
  }

  addPersona(persona:PersonaI){
    return this.personaCollection.add(persona);
  }
}