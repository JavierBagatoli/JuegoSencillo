export interface Weapon{
    nombre: string,
    descripcion: string,
    id: number,
    type: 'weapon' | 'armor' | 'shield',
    icon: any,
    damage: number,
    defense: number,
    uses: number,
}