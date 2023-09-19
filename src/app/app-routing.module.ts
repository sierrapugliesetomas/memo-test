import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { ScoresComponent } from './scores/scores.component';

const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'high-score', component: ScoresComponent},
  { path: '**', component: GameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }