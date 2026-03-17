export interface Weapon{
    nombre: string,
    descripcion: string,
    id: number,
    type: 'weapon' | 'armor' | 'shield' | 'room_civil' | 'room_weapon' | 'room_shield',
    icon: any,
    damage: number,
    defense: number,
    uses: number,
}