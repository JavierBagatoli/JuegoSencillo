export interface Weapon{
    nombre: string,
    descripcion: string,
    id: number,
    type: 'weapon' | 'armor',
    icon: any,
    damage: number,
    defense: number,
    uses: number,
}