import { animate, style } from "@angular/animations";

export const ShakeAnimation = [
  style({ transform: 'rotate(0)' }),
  animate('0.1s', style({ transform: 'translateX(0)' })),
  animate('0.1s', style({ transform: 'translateY(-9px)' })),
  animate('0.1s', style({ transform: 'translateY(-9px) rotate(17deg)' })),
  animate('0.1s', style({ transform: 'translateY(-9px) rotate(-17deg)' })),
  animate('0.1s', style({ transform: 'translateY(-9px) rotate(17deg)' })),
  animate('0.1s', style({ transform: 'translateY(-9px) rotate(-17deg)' })),
  animate('0.1s', style({ transform: 'translateY(0) rotate(0)' })),
];