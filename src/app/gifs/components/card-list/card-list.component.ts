import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gitfs.interface';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent {
  @Input() gifs: Gif[] = [];
}
