import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSelect, PopoverController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  selected='';
  idiom=[];
  @ViewChild('listIdiom') idiomSelectRef: IonSelect;
  constructor(
    private popCtr: PopoverController,
    private languageS:LanguageService) { }

  ngOnInit() {
    this.idiom=this.languageS.getLanguages();
    this.selected=this.languageS.selected;
  }
  
  
  public select(lng){
    this.languageS.setLanguage(lng.target.value);
    this.popCtr.dismiss();
  }
  
  displayIdiom(event) {
  this.idiomSelectRef.interface="popover"
    this.idiomSelectRef.open(event);
 }
}
