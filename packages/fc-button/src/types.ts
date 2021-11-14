export type ButtonTypes = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type ButtonSizes = 'small' | 'medium' | 'large';

export interface BaseButton {
  buttonType?: ButtonTypes;
  buttonSize?: ButtonSizes;
}
