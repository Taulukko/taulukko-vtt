import Phaser from 'phaser';

import { Component, OnInit } from '@angular/core';

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  create() {
    console.log('create method');
  }
  preload() {
    this.load.setBaseURL( window.location.href);//http://localhost:PORT

    this.load.image('background', 'assets/space3.png');
    this.load.image('logo', 'assets/logo199x59.png');
    this.load.image('green', 'assets/green.png');
  }
  override update() {
   // console.log('update method');
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title: string = "Taulukko VTT";
  phaserGame?: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      height: 600,
      width: 800,
      scene: [ MainScene ],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 100 }
        }
      }
    };

  }

  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }
}
