import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gitfs.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() gif: Gif | null = null;
}
